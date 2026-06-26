from dataclasses import dataclass
from .domain_event import DomainEvent


@dataclass
class IntentionStartedEvent(DomainEvent):
    usuario_id: str = ""
    agente_id: int = 0
    intencion: str = ""
    proceso_id: int = 0

    @property
    def event_name(self) -> str:
        return "c2.intention.started"
