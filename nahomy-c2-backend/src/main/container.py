from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from ..infrastructure.persistence.database import engine, async_session_factory
from ..infrastructure.persistence.models import Base
from ..infrastructure.persistence.repositories import (
    SQLAlchemyUsuarioRepository,
    SQLAlchemyProcesoIntencionRepository,
    SQLAlchemyEjecucionAutomatizadaRepository,
    SQLAlchemyFeedbackReporteRepository,
    SQLAlchemyLogAuditoriaRepository,
    SQLAlchemyMetricaRendimientoRepository,
)
from ..infrastructure.messaging.rabbitmq_adapter import RabbitMQAdapter
from ..infrastructure.webserver.fastapi_server import create_app
from ..infrastructure.config.rabbitmq_config import get_rabbitmq_url
from ..application.use_cases import (
    AutenticarUsuarioUseCase,
    IniciarIntencionUseCase,
    EjecutarComandoUseCase,
    GenerarFeedbackUseCase,
    ObtenerMetricasUseCase,
    ObtenerLogsAuditoriaUseCase,
)
from ..interface_adapters.message_handlers import IntencionMessageHandler


class Container:
    def __init__(self):
        self._session_factory = async_session_factory
        self._message_bus: RabbitMQAdapter | None = None
        self.app = None

    async def initialize(self):
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        self._message_bus = RabbitMQAdapter(get_rabbitmq_url())
        await self._message_bus.connect()

        async def get_session() -> AsyncSession:
            async with self._session_factory() as session:
                yield session

        repos = {}
        async with self._session_factory() as session:
            repos["usuario"] = SQLAlchemyUsuarioRepository(session)
            repos["proceso"] = SQLAlchemyProcesoIntencionRepository(session)
            repos["ejecucion"] = SQLAlchemyEjecucionAutomatizadaRepository(session)
            repos["feedback"] = SQLAlchemyFeedbackReporteRepository(session)
            repos["log"] = SQLAlchemyLogAuditoriaRepository(session)
            repos["metrica"] = SQLAlchemyMetricaRendimientoRepository(session)

        auth_uc = AutenticarUsuarioUseCase(repos["usuario"])
        intencion_uc = IniciarIntencionUseCase(
            repos["proceso"], repos["usuario"], self._message_bus
        )
        comando_uc = EjecutarComandoUseCase(
            repos["proceso"], repos["ejecucion"], self._message_bus
        )
        feedback_uc = GenerarFeedbackUseCase(
            repos["feedback"], repos["metrica"], self._message_bus
        )
        metricas_uc = ObtenerMetricasUseCase(repos["metrica"])
        logs_uc = ObtenerLogsAuditoriaUseCase(repos["log"])

        handler = IntencionMessageHandler(self._message_bus)
        self._message_bus.subscribe(
            "c2.intention.*", handler.handle_intencion_iniciada
        )
        self._message_bus.subscribe(
            "c2.command.*", handler.handle_comando_ejecutado
        )

        self.app = create_app(
            auth_uc, intencion_uc, comando_uc, metricas_uc, logs_uc, feedback_uc
        )

        print("[Container] Inicializado correctamente")

    async def shutdown(self):
        if self._message_bus:
            await self._message_bus.disconnect()
        await engine.dispose()
        print("[Container] Recursos liberados")
