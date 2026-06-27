from dataclasses import dataclass
from .domain_event import DomainEvent


@dataclass
class CommandExecutedEvent(DomainEvent):
    proceso_id: int = 0
    funcion_id: int = 0
    comando: str = ""
    resultado: str = ""
    orden_ejecucion: int = 0

    @property
    def event_name(self) -> str:
        return "c2.command.executed"
