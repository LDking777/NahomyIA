from abc import ABC, abstractmethod
from ...domain.events import DomainEvent


class IMessageBus(ABC):
    @abstractmethod
    async def publish(self, event: DomainEvent) -> None:
        ...

    @abstractmethod
    async def publish_many(self, events: list[DomainEvent]) -> None:
        ...

    @abstractmethod
    def subscribe(self, event_name: str, handler) -> None:
        ...

    @abstractmethod
    async def connect(self) -> None:
        ...

    @abstractmethod
    async def disconnect(self) -> None:
        ...
