from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ...application.use_cases import EjecutarComandoUseCase
from ..middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/api/comandos", tags=["Comandos"])


class EjecutarRequest(BaseModel):
    proceso_id: int
    funcion_id: int
    orden_ejecucion: int


def create_comando_router(use_case: EjecutarComandoUseCase):
    @router.post("/ejecutar")
    async def ejecutar(req: EjecutarRequest, _user=Depends(get_current_user)):
        try:
            return await use_case.execute(
                proceso_id=req.proceso_id,
                funcion_id=req.funcion_id,
                orden_ejecucion=req.orden_ejecucion,
            )
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    return router
