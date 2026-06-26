from pydantic import BaseModel


class UsuarioInfo(BaseModel):
    id: str
    nombre: str
    rol: str


class AuthResponseDTO(BaseModel):
    token: str
    usuario: UsuarioInfo
