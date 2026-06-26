from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ...interface_adapters.controllers import (
    create_auth_router,
    create_intencion_router,
    create_comando_router,
    create_metricas_router,
    create_feedback_router,
)
from ...application.use_cases import (
    AutenticarUsuarioUseCase,
    IniciarIntencionUseCase,
    EjecutarComandoUseCase,
    ObtenerMetricasUseCase,
    ObtenerLogsAuditoriaUseCase,
    GenerarFeedbackUseCase,
)


def create_app(
    auth_uc: AutenticarUsuarioUseCase,
    intencion_uc: IniciarIntencionUseCase,
    comando_uc: EjecutarComandoUseCase,
    metricas_uc: ObtenerMetricasUseCase,
    logs_uc: ObtenerLogsAuditoriaUseCase,
    feedback_uc: GenerarFeedbackUseCase,
) -> FastAPI:
    app = FastAPI(
        title="Nahomy C2 API",
        description="Plataforma de Command & Control corporativa",
        version="1.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(create_auth_router(auth_uc))
    app.include_router(create_intencion_router(intencion_uc))
    app.include_router(create_comando_router(comando_uc))
    app.include_router(create_metricas_router(metricas_uc, logs_uc))
    app.include_router(create_feedback_router(feedback_uc))

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    return app
