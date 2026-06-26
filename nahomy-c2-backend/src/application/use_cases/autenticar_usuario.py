import os
import bcrypt
import jwt
from ..dto.auth_response import AuthResponseDTO, UsuarioInfo
from ...domain.repositories import IUsuarioRepository

JWT_SECRET = os.getenv("JWT_SECRET", "nahomy-c2-secret-key")


class AutenticarUsuarioUseCase:
    def __init__(self, usuario_repo: IUsuarioRepository):
        self._usuario_repo = usuario_repo

    async def execute(self, nombre: str, password: str) -> AuthResponseDTO:
        usuario = await self._usuario_repo.find_by_nombre(nombre)
        if not usuario:
            raise ValueError("Credenciales inválidas")

        if not bcrypt.checkpw(
            password.encode("utf-8"),
            usuario.password_hash.value.encode("utf-8"),
        ):
            raise ValueError("Credenciales inválidas")

        token = jwt.encode(
            {
                "id": usuario.id.value,
                "nombre": usuario.nombre,
                "rol": usuario.rol,
            },
            JWT_SECRET,
            algorithm="HS256",
        )

        return AuthResponseDTO(
            token=token,
            usuario=UsuarioInfo(
                id=usuario.id.value,
                nombre=usuario.nombre,
                rol=usuario.rol,
            ),
        )
