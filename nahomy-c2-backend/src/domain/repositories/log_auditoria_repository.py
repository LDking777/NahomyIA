from abc import ABC, abstractmethod
from ..entities import LogAuditoria


class ILogAuditoriaRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: int) -> LogAuditoria | None:
        ...

    @abstractmethod
    async def find_all(self, limit: int = 50, offset: int = 0) -> list[LogAuditoria]:
        ...

    @abstractmethod
    async def find_by_proceso_id(self, proceso_id: int) -> list[LogAuditoria]:
        ...

    @abstractmethod
    async def find_by_usuario_id(self, usuario_id: str) -> list[LogAuditoria]:
        ...

    @abstractmethod
    async def save(self, log: LogAuditoria) -> int:
        ...
