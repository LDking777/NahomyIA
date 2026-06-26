from pydantic import BaseModel


class IniciarIntencionDTO(BaseModel):
    usuario_id: str
    agente_id: int
    intencion: str
