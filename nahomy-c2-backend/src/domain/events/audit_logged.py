from dataclasses import dataclass
from .domain_event import DomainEvent


@dataclass
class AuditLoggedEvent(DomainEvent):
    usuario_id: str | None = None
    proceso_id: int | None = None
    accion: str = ""
    tabla_afectada: str = ""
    detalles: str = ""

    @property
    def event_name(self) -> str:
        return "c2.audit.logged"
