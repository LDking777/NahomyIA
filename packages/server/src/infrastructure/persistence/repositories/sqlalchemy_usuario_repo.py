from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ....domain.entities import Usuario
from ....domain.value_objects import UserId, PasswordHash
from ....domain.repositories import IUsuarioRepository
from ..models import UsuarioModel
from typing import Literal

UsuarioRole = Literal["Administrador", "Operador", "Auditor"]


class SQLAlchemyUsuarioRepository(IUsuarioRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def find_by_id(self, id: UserId) -> Usuario | None:
        model = await self._session.get(UsuarioModel, id.value)
        return self._to_domain(model) if model else None

    async def find_by_nombre(self, nombre: str) -> Usuario | None:
        result = await self._session.execute(
            select(UsuarioModel).where(UsuarioModel.nombre == nombre)
        )
        model = result.scalar_one_or_none()
        return self._to_domain(model) if model else None

    async def find_all(self) -> list[Usuario]:
        result = await self._session.execute(select(UsuarioModel))
        return [self._to_domain(m) for m in result.scalars().all()]

    async def save(self, usuario: Usuario) -> None:
        model = UsuarioModel(
            id=usuario.id.value,
            nombre=usuario.nombre,
            password_hash=usuario.password_hash.value,
            rol=usuario.rol,
        )
        self._session.add(model)
        await self._session.flush()

    async def update(self, usuario: Usuario) -> None:
        model = await self._session.get(UsuarioModel, usuario.id.value)
        if model:
            model.nombre = usuario.nombre
            model.password_hash = usuario.password_hash.value
            model.rol = usuario.rol

    async def delete(self, id: UserId) -> None:
        model = await self._session.get(UsuarioModel, id.value)
        if model:
            await self._session.delete(model)

    def _to_domain(self, model: UsuarioModel) -> Usuario:
        return Usuario(
            id=UserId(model.id),
            nombre=model.nombre,
            password_hash=PasswordHash(model.password_hash),
            rol=model.rol,  # type: ignore
        )
