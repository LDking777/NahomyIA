from abc import ABC, abstractmethod
from ..entities import Usuario
from ..value_objects import UserId


class IUsuarioRepository(ABC):
    @abstractmethod
    async def find_by_id(self, id: UserId) -> Usuario | None:
        ...

    @abstractmethod
    async def find_by_nombre(self, nombre: str) -> Usuario | None:
        ...

    @abstractmethod
    async def find_all(self) -> list[Usuario]:
        ...

    @abstractmethod
    async def save(self, usuario: Usuario) -> None:
        ...

    @abstractmethod
    async def update(self, usuario: Usuario) -> None:
        ...

    @abstractmethod
    async def delete(self, id: UserId) -> None:
        ...
