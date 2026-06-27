from datetime import datetime


class LogAuditoria:
    def __init__(
        self,
        id: int,
        usuario_id: str | None,
        proceso_id: int | None,
        accion: str,
        tabla_afectada: str,
        detalles: str | None,
        fecha_registro: datetime,
    ):
        self._id = id
        self._usuario_id = usuario_id
        self._proceso_id = proceso_id
        self._accion = accion
        self._tabla_afectada = tabla_afectada
        self._detalles = detalles
        self._fecha_registro = fecha_registro

    @property
    def id(self) -> int:
        return self._id

    @property
    def usuario_id(self) -> str | None:
        return self._usuario_id

    @property
    def proceso_id(self) -> int | None:
        return self._proceso_id

    @property
    def accion(self) -> str:
        return self._accion

    @property
    def tabla_afectada(self) -> str:
        return self._tabla_afectada

    @property
    def detalles(self) -> str | None:
        return self._detalles

    @property
    def fecha_registro(self) -> datetime:
        return self._fecha_registro
