from ...domain.entities import FeedbackReporte
from ...domain.value_objects import NivelAlerta, NivelAlertaValue
from ...domain.repositories import IFeedbackReporteRepository, IMetricaRendimientoRepository
from ..ports import IMessageBus


class GenerarFeedbackUseCase:
    def __init__(
        self,
        feedback_repo: IFeedbackReporteRepository,
        metrica_repo: IMetricaRendimientoRepository,
        message_bus: IMessageBus,
    ):
        self._feedback_repo = feedback_repo
        self._metrica_repo = metrica_repo
        self._message_bus = message_bus

    async def execute(self, proceso_id: int) -> dict:
        metricas = await self._metrica_repo.find_by_proceso_id(proceso_id)
        if not metricas:
            raise ValueError(f"No hay métricas para el proceso {proceso_id}")

        promedio = sum(m.tiempo_ejecucion_ms for m in metricas) / len(metricas)
        total_bytes = sum(m.bytes_transferidos for m in metricas)

        alerta = (
            NivelAlertaValue(NivelAlerta.ALTO)
            if promedio > 5000 or total_bytes > 1_000_000
            else NivelAlertaValue(NivelAlerta.BAJO)
        )

        resumen = (
            f"Proceso #{proceso_id} analizado. "
            f"Tiempo promedio: {promedio:.2f}ms. "
            f"Bytes transferidos: {total_bytes / 1024:.2f} KB. "
            f"Nivel de alerta: {alerta.value}."
        )

        feedback = FeedbackReporte(
            id=0,
            proceso_id=proceso_id,
            resumen_ia=resumen,
            nivel_alerta=alerta,
        )
        feedback_id = await self._feedback_repo.save(feedback)

        return {"feedback_id": feedback_id}
