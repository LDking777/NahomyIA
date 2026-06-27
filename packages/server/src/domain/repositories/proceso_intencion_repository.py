from abc import ABC, abstractmethod
from ..entities import ProcesoIntencion


class IProcesoIntencionRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: int) -> ProcesoIntencion | None:
        ...

    @abstractmethod
    async def find_all(self) -> list[ProcesoIntencion]:
        ...

    @abstractmethod
    async def find_activos(self) -> list[ProcesoIntencion]:
        ...

    @abstractmethod
    async def find_by_agente_id(self, agente_id: int) -> list[ProcesoIntencion]:
        ...

    @abstractmethod
    async def save(self, proceso: ProcesoIntencion) -> int:
        ...

    @abstractmethod
    async def update(self, proceso: ProcesoIntencion) -> None:
        ...
