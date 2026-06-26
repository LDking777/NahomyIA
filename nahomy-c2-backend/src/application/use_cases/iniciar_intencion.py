from ...domain.entities import ProcesoIntencion
from ...domain.value_objects import EstadoProceso, EstadoProcesoValue, UserId
from ...domain.events import IntentionStartedEvent
from ...domain.repositories import IUsuarioRepository, IProcesoIntencionRepository
from ..ports import IMessageBus


class IniciarIntencionUseCase:
    def __init__(
        self,
        proceso_repo: IProcesoIntencionRepository,
        usuario_repo: IUsuarioRepository,
        message_bus: IMessageBus,
    ):
        self._proceso_repo = proceso_repo
        self._usuario_repo = usuario_repo
        self._message_bus = message_bus

    async def execute(
        self, usuario_id: str, agente_id: int, intencion: str
    ) -> dict:
        usuario = await self._usuario_repo.find_by_id(UserId(usuario_id))
        if not usuario:
            raise ValueError(f"Usuario {usuario_id} no encontrado")

        proceso = ProcesoIntencion(
            id=0,
            agente_id=agente_id,
            intencion=intencion,
            estado=EstadoProcesoValue(EstadoProceso.INICIADO),
            fecha_creacion=None,
            fecha_cierre=None,
        )

        proceso_id = await self._proceso_repo.save(proceso)

        event = IntentionStartedEvent(
            usuario_id=usuario_id,
            agente_id=agente_id,
            intencion=intencion,
            proceso_id=proceso_id,
        )
        await self._message_bus.publish(event)

        return {"proceso_id": proceso_id}
