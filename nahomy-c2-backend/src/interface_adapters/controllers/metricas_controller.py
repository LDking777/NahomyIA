from fastapi import APIRouter, Depends, Query
from ...application.use_cases import ObtenerMetricasUseCase, ObtenerLogsAuditoriaUseCase
from ..middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/api", tags=["Metricas"])


def create_metricas_router(
    metricas_uc: ObtenerMetricasUseCase,
    logs_uc: ObtenerLogsAuditoriaUseCase,
):
    @router.get("/metricas")
    async def get_metricas(_user=Depends(get_current_user)):
        return await metricas_uc.execute()

    @router.get("/logs")
    async def get_logs(
        limit: int = Query(50, ge=1, le=200),
        offset: int = Query(0, ge=0),
        _user=Depends(get_current_user),
    ):
        return await logs_uc.execute(limit=limit, offset=offset)

    return router
