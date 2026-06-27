from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ....domain.entities import ProcesoIntencion
from ....domain.value_objects import EstadoProceso, EstadoProcesoValue
from ....domain.repositories import IProcesoIntencionRepository
from ..models import ProcesoIntencionModel


class SQLAlchemyProcesoIntencionRepository(IProcesoIntencionRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def find_by_id(self, id: int) -> ProcesoIntencion | None:
        model = await self._session.get(ProcesoIntencionModel, id)
        return self._to_domain(model) if model else None

    async def find_all(self) -> list[ProcesoIntencion]:
        result = await self._session.execute(
            select(ProcesoIntencionModel).order_by(ProcesoIntencionModel.fecha_creacion.desc())
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def find_activos(self) -> list[ProcesoIntencion]:
        result = await self._session.execute(
            select(ProcesoIntencionModel)
            .where(ProcesoIntencionModel.fecha_cierre.is_(None))
            .order_by(ProcesoIntencionModel.fecha_creacion.desc())
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def find_by_agente_id(self, agente_id: int) -> list[ProcesoIntencion]:
        result = await self._session.execute(
            select(ProcesoIntencionModel)
            .where(ProcesoIntencionModel.agente_id == agente_id)
            .order_by(ProcesoIntencionModel.fecha_creacion.desc())
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def save(self, proceso: ProcesoIntencion) -> int:
        model = ProcesoIntencionModel(
            agente_id=proceso.agente_id,
            intencion=proceso.intencion,
            estado=proceso.estado.value,
        )
        self._session.add(model)
        await self._session.flush()
        return model.id

    async def update(self, proceso: ProcesoIntencion) -> None:
        model = await self._session.get(ProcesoIntencionModel, proceso.id)
        if model:
            model.estado = proceso.estado.value
            model.fecha_cierre = proceso.fecha_cierre

    def _to_domain(self, model: ProcesoIntencionModel) -> ProcesoIntencion:
        return ProcesoIntencion(
            id=model.id,
            agente_id=model.agente_id,
            intencion=model.intencion,
            estado=EstadoProcesoValue(EstadoProceso(model.estado)),
            fecha_creacion=model.fecha_creacion or datetime.now(),
            fecha_cierre=model.fecha_cierre,
        )
