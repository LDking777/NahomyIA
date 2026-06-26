from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ...application.use_cases import AutenticarUsuarioUseCase

router = APIRouter(prefix="/api/auth", tags=["Auth"])


class LoginRequest(BaseModel):
    nombre: str
    password: str


def create_auth_router(use_case: AutenticarUsuarioUseCase):
    @router.post("/login")
    async def login(req: LoginRequest):
        try:
            return await use_case.execute(req.nombre, req.password)
        except ValueError as e:
            raise HTTPException(status_code=401, detail=str(e))

    return router
