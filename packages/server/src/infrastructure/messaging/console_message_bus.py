from ...domain.events import DomainEvent
from ...application.ports import IMessageBus


class ConsoleMessageBus(IMessageBus):
    def __init__(self):
        self._handlers: dict[str, callable] = {}

    async def connect(self) -> None:
        print("[ConsoleMessageBus] Modo local — sin RabbitMQ")

    async def disconnect(self) -> None:
        print("[ConsoleMessageBus] Recursos liberados")

    async def publish(self, event: DomainEvent) -> None:
        print(f"[ConsoleMessageBus] Evento: {event.event_name}")

    async def publish_many(self, events: list[DomainEvent]) -> None:
        for event in events:
            await self.publish(event)

    def subscribe(self, event_name: str, handler) -> None:
        self._handlers[event_name] = handler
