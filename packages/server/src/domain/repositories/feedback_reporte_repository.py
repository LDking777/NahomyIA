from abc import ABC, abstractmethod
from ..entities import FeedbackReporte


class IFeedbackReporteRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: int) -> FeedbackReporte | None:
        ...

    @abstractmethod
    async def find_by_proceso_id(self, proceso_id: int) -> FeedbackReporte | None:
        ...

    @abstractmethod
    async def save(self, feedback: FeedbackReporte) -> int:
        ...

    @abstractmethod
    async def update(self, feedback: FeedbackReporte) -> None:
        ...
