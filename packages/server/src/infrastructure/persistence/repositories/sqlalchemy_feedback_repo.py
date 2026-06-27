from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ....domain.entities import FeedbackReporte
from ....domain.value_objects import NivelAlerta, NivelAlertaValue
from ....domain.repositories import IFeedbackReporteRepository
from ..models import FeedbackReporteModel


class SQLAlchemyFeedbackReporteRepository(IFeedbackReporteRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def find_by_id(self, id: int) -> FeedbackReporte | None:
        model = await self._session.get(FeedbackReporteModel, id)
        return self._to_domain(model) if model else None

    async def find_by_proceso_id(self, proceso_id: int) -> FeedbackReporte | None:
        result = await self._session.execute(
            select(FeedbackReporteModel).where(FeedbackReporteModel.proceso_id == proceso_id)
        )
        model = result.scalar_one_or_none()
        return self._to_domain(model) if model else None

    async def save(self, feedback: FeedbackReporte) -> int:
        model = FeedbackReporteModel(
            proceso_id=feedback.proceso_id,
            resumen_ia=feedback.resumen_ia,
            nivel_alerta=feedback.nivel_alerta.value if feedback.nivel_alerta else None,
        )
        self._session.add(model)
        await self._session.flush()
        return model.id

    async def update(self, feedback: FeedbackReporte) -> None:
        model = await self._session.get(FeedbackReporteModel, feedback.id)
        if model:
            model.resumen_ia = feedback.resumen_ia
            model.nivel_alerta = feedback.nivel_alerta.value if feedback.nivel_alerta else None

    def _to_domain(self, model: FeedbackReporteModel) -> FeedbackReporte:
        return FeedbackReporte(
            id=model.id,
            proceso_id=model.proceso_id,
            resumen_ia=model.resumen_ia,
            nivel_alerta=NivelAlertaValue(NivelAlerta(model.nivel_alerta)) if model.nivel_alerta else None,
        )
