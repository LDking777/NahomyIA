from .auth_controller import create_auth_router
from .intencion_controller import create_intencion_router
from .comando_controller import create_comando_router
from .metricas_controller import create_metricas_router
from .feedback_controller import create_feedback_router

__all__ = [
    "create_auth_router",
    "create_intencion_router",
    "create_comando_router",
    "create_metricas_router",
    "create_feedback_router",
]
