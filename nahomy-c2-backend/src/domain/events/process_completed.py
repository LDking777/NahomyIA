from dataclasses import dataclass, field
from datetime import datetime
from .domain_event import DomainEvent


@dataclass
class ProcessCompletedEvent(DomainEvent):
    proceso_id: int = 0
    estado: str = ""
    fecha_cierre: datetime = field(default_factory=datetime.now)

    @property
    def event_name(self) -> str:
        return "c2.process.completed"
