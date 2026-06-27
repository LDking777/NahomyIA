from abc import ABC, abstractmethod
from ..entities import EjecucionAutomatizada


class IEjecucionAutomatizadaRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: int) -> EjecucionAutomatizada | None:
        ...

    @abstractmethod
    async def find_by_proceso_id(self, proceso_id: int) -> list[EjecucionAutomatizada]:
        ...

    @abstractmethod
    async def save(self, ejecucion: EjecucionAutomatizada) -> int:
        ...

    @abstractmethod
    async def update(self, ejecucion: EjecucionAutomatizada) -> None:
        ...
