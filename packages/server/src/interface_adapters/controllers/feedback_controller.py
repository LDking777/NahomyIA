from fastapi import APIRouter, Depends, HTTPException
from ...application.use_cases import GenerarFeedbackUseCase
from ..middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/api/feedback", tags=["Feedback"])


def create_feedback_router(use_case: GenerarFeedbackUseCase):
    @router.post("/{proceso_id}")
    async def generar(proceso_id: int, _user=Depends(get_current_user)):
        try:
            return await use_case.execute(proceso_id)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    return router
