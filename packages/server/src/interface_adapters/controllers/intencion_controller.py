from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ...application.use_cases import IniciarIntencionUseCase
from ..middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/api/intenciones", tags=["Intenciones"])


class IniciarRequest(BaseModel):
    usuario_id: str
    agente_id: int
    intencion: str


def create_intencion_router(use_case: IniciarIntencionUseCase):
    @router.post("")
    async def iniciar(req: IniciarRequest, _user=Depends(get_current_user)):
        try:
            return await use_case.execute(
                usuario_id=req.usuario_id,
                agente_id=req.agente_id,
                intencion=req.intencion,
            )
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    return router
