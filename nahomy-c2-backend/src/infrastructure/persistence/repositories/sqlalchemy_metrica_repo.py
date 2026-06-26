from datetime import datetime
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from ....domain.entities import MetricaRendimiento
from ....domain.repositories import IMetricaRendimientoRepository
from ..models import MetricaRendimientoModel


class SQLAlchemyMetricaRendimientoRepository(IMetricaRendimientoRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def find_by_id(self, id: int) -> MetricaRendimiento | None:
        model = await self._session.get(MetricaRendimientoModel, id)
        return self._to_domain(model) if model else None

    async def find_by_proceso_id(self, proceso_id: int) -> list[MetricaRendimiento]:
        result = await self._session.execute(
            select(MetricaRendimientoModel).where(MetricaRendimientoModel.proceso_id == proceso_id)
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def find_all(self) -> list[MetricaRendimiento]:
        result = await self._session.execute(
            select(MetricaRendimientoModel).order_by(MetricaRendimientoModel.fecha_metrica.desc()).limit(100)
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def save(self, metrica: MetricaRendimiento) -> int:
        model = MetricaRendimientoModel(
            proceso_id=metrica.proceso_id,
            tiempo_ejecucion_ms=metrica.tiempo_ejecucion_ms,
            bytes_transferidos=metrica.bytes_transferidos,
            resultado_exitoso=metrica.resultado_exitoso,
        )
        self._session.add(model)
        await self._session.flush()
        return model.id

    async def get_promedio_tiempo_respuesta(self) -> float:
        result = await self._session.execute(
            select(func.avg(MetricaRendimientoModel.tiempo_ejecucion_ms))
        )
        return result.scalar() or 0.0

    async def get_total_bytes_transferidos(self) -> int:
        result = await self._session.execute(
            select(func.sum(MetricaRendimientoModel.bytes_transferidos))
        )
        return result.scalar() or 0

    def _to_domain(self, model: MetricaRendimientoModel) -> MetricaRendimiento:
        return MetricaRendimiento(
            id=model.id,
            proceso_id=model.proceso_id,
            tiempo_ejecucion_ms=model.tiempo_ejecucion_ms,
            bytes_transferidos=model.bytes_transferidos,
            resultado_exitoso=model.resultado_exitoso,
            fecha_metrica=model.fecha_metrica or datetime.now(),
        )
