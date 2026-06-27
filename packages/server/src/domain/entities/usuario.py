from __future__ import annotations
from typing import Literal
from ..value_objects import UserId, PasswordHash

UsuarioRole = Literal["Administrador", "Operador", "Auditor"]


class Usuario:
    def __init__(
        self,
        id: UserId,
        nombre: str,
        password_hash: PasswordHash,
        rol: UsuarioRole,
    ):
        self._id = id
        self._nombre = nombre
        self._password_hash = password_hash
        self._rol = rol

    @property
    def id(self) -> UserId:
        return self._id

    @property
    def nombre(self) -> str:
        return self._nombre

    @property
    def password_hash(self) -> PasswordHash:
        return self._password_hash

    @property
    def rol(self) -> UsuarioRole:
        return self._rol

    def cambiar_rol(self, nuevo_rol: UsuarioRole) -> None:
        self._rol = nuevo_rol

    def actualizar_nombre(self, nombre: str) -> None:
        self._nombre = nombre

    def actualizar_password(self, hash_value: PasswordHash) -> None:
        self._password_hash = hash_value
