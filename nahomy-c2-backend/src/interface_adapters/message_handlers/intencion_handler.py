from ...domain.events import DomainEvent
from ...application.ports import IEventPublisher


class IntencionMessageHandler:
    def __init__(self, publisher: IEventPublisher):
        self._publisher = publisher

    async def handle_intencion_iniciada(self, event: DomainEvent) -> None:
        print(f"[Handler] Intención iniciada: {getattr(event, 'intencion', '?')}")
        await self._publisher.publish(event)

    async def handle_comando_ejecutado(self, event: DomainEvent) -> None:
        print(f"[Handler] Comando ejecutado para proceso #{getattr(event, 'proceso_id', '?')}")
        await self._publisher.publish(event)
