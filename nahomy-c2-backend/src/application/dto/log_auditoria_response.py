from datetime import datetime
from pydantic import BaseModel


class LogAuditoriaItemDTO(BaseModel):
    id: int
    usuario_id: str | None
    proceso_id: int | None
    accion: str
    tabla_afectada: str
    detalles: str | None
    fecha_registro: datetime

    model_config = {"from_attributes": True}


class LogAuditoriaResponseDTO(BaseModel):
    total: int
    logs: list[LogAuditoriaItemDTO]
