from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ....domain.entities import EjecucionAutomatizada
from ....domain.repositories import IEjecucionAutomatizadaRepository
from ..models import EjecucionAutomatizadaModel


class SQLAlchemyEjecucionAutomatizadaRepository(IEjecucionAutomatizadaRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def find_by_id(self, id: int) -> EjecucionAutomatizada | None:
        model = await self._session.get(EjecucionAutomatizadaModel, id)
        return self._to_domain(model) if model else None

    async def find_by_proceso_id(self, proceso_id: int) -> list[EjecucionAutomatizada]:
        result = await self._session.execute(
            select(EjecucionAutomatizadaModel)
            .where(EjecucionAutomatizadaModel.proceso_id == proceso_id)
            .order_by(EjecucionAutomatizadaModel.orden_ejecucion)
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def save(self, ejecucion: EjecucionAutomatizada) -> int:
        model = EjecucionAutomatizadaModel(
            proceso_id=ejecucion.proceso_id,
            funcion_id=ejecucion.funcion_id,
            orden_ejecucion=ejecucion.orden_ejecucion,
            resultado_raw=ejecucion.resultado_raw,
            estado=ejecucion.estado,
        )
        self._session.add(model)
        await self._session.flush()
        return model.id

    async def update(self, ejecucion: EjecucionAutomatizada) -> None:
        model = await self._session.get(EjecucionAutomatizadaModel, ejecucion.id)
        if model:
            model.resultado_raw = ejecucion.resultado_raw
            model.estado = ejecucion.estado

    def _to_domain(self, model: EjecucionAutomatizadaModel) -> EjecucionAutomatizada:
        return EjecucionAutomatizada(
            id=model.id,
            proceso_id=model.proceso_id,
            funcion_id=model.funcion_id,
            orden_ejecucion=model.orden_ejecucion,
            resultado_raw=model.resultado_raw,
            estado=model.estado,
        )
