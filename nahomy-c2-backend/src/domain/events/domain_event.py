from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4


@dataclass
class DomainEvent:
    event_id: str = field(default_factory=lambda: str(uuid4()))
    occurred_on: datetime = field(default_factory=datetime.now)

    @property
    def event_name(self) -> str:
        raise NotImplementedError
