from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ....domain.entities import LogAuditoria
from ....domain.repositories import ILogAuditoriaRepository
from ..models import LogAuditoriaModel


class SQLAlchemyLogAuditoriaRepository(ILogAuditoriaRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def find_by_id(self, id: int) -> LogAuditoria | None:
        model = await self._session.get(LogAuditoriaModel, id)
        return self._to_domain(model) if model else None

    async def find_all(self, limit: int = 50, offset: int = 0) -> list[LogAuditoria]:
        result = await self._session.execute(
            select(LogAuditoriaModel)
            .order_by(LogAuditoriaModel.fecha_registro.desc())
            .limit(limit)
            .offset(offset)
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def find_by_proceso_id(self, proceso_id: int) -> list[LogAuditoria]:
        result = await self._session.execute(
            select(LogAuditoriaModel)
            .where(LogAuditoriaModel.proceso_id == proceso_id)
            .order_by(LogAuditoriaModel.fecha_registro.desc())
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def find_by_usuario_id(self, usuario_id: str) -> list[LogAuditoria]:
        result = await self._session.execute(
            select(LogAuditoriaModel)
            .where(LogAuditoriaModel.usuario_id == usuario_id)
            .order_by(LogAuditoriaModel.fecha_registro.desc())
        )
        return [self._to_domain(m) for m in result.scalars().all()]

    async def save(self, log: LogAuditoria) -> int:
        model = LogAuditoriaModel(
            usuario_id=log.usuario_id,
            proceso_id=log.proceso_id,
            accion=log.accion,
            tabla_afectada=log.tabla_afectada,
            detalles=log.detalles,
        )
        self._session.add(model)
        await self._session.flush()
        return model.id

    def _to_domain(self, model: LogAuditoriaModel) -> LogAuditoria:
        return LogAuditoria(
            id=model.id,
            usuario_id=model.usuario_id,
            proceso_id=model.proceso_id,
            accion=model.accion,
            tabla_afectada=model.tabla_afectada,
            detalles=model.detalles,
            fecha_registro=model.fecha_registro or datetime.now(),
        )
