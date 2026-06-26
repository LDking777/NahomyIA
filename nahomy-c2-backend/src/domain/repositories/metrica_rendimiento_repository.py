from abc import ABC, abstractmethod
from ..entities import MetricaRendimiento


class IMetricaRendimientoRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: int) -> MetricaRendimiento | None:
        ...

    @abstractmethod
    async def find_by_proceso_id(self, proceso_id: int) -> list[MetricaRendimiento]:
        ...

    @abstractmethod
    async def find_all(self) -> list[MetricaRendimiento]:
        ...

    @abstractmethod
    async def save(self, metrica: MetricaRendimiento) -> int:
        ...

    @abstractmethod
    async def get_promedio_tiempo_respuesta(self) -> float:
        ...

    @abstractmethod
    async def get_total_bytes_transferidos(self) -> int:
        ...
