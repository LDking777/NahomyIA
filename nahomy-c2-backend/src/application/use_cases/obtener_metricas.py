import asyncio
from ..dto.metricas_response import MetricasResponseDTO, MetricaItenDTO
from ...domain.repositories import IMetricaRendimientoRepository


class ObtenerMetricasUseCase:
    def __init__(self, metrica_repo: IMetricaRendimientoRepository):
        self._metrica_repo = metrica_repo

    async def execute(self) -> MetricasResponseDTO:
        promedio, total_bytes, metricas = await asyncio.gather(
            self._metrica_repo.get_promedio_tiempo_respuesta(),
            self._metrica_repo.get_total_bytes_transferidos(),
            self._metrica_repo.find_all(),
        )

        return MetricasResponseDTO(
            promedio_tiempo_respuesta=promedio,
            total_bytes_transferidos=total_bytes,
            metricas=[
                MetricaItenDTO(
                    id=m.id,
                    proceso_id=m.proceso_id,
                    tiempo_ejecucion_ms=m.tiempo_ejecucion_ms,
                    bytes_transferidos=m.bytes_transferidos,
                    resultado_exitoso=m.resultado_exitoso,
                    fecha_metrica=m.fecha_metrica,
                )
                for m in metricas
            ],
        )
