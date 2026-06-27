from datetime import datetime
from pydantic import BaseModel


class MetricaItenDTO(BaseModel):
    id: int
    proceso_id: int
    tiempo_ejecucion_ms: int
    bytes_transferidos: int
    resultado_exitoso: bool
    fecha_metrica: datetime

    model_config = {"from_attributes": True}


class MetricasResponseDTO(BaseModel):
    promedio_tiempo_respuesta: float
    total_bytes_transferidos: int
    metricas: list[MetricaItenDTO]
