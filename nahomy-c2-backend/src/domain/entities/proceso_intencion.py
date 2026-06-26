from datetime import datetime
from ..value_objects import EstadoProceso, EstadoProcesoValue


class ProcesoIntencion:
    def __init__(
        self,
        id: int,
        agente_id: int,
        intencion: str,
        estado: EstadoProcesoValue,
        fecha_creacion: datetime,
        fecha_cierre: datetime | None,
    ):
        self._id = id
        self._agente_id = agente_id
        self._intencion = intencion
        self._estado = estado
        self._fecha_creacion = fecha_creacion
        self._fecha_cierre = fecha_cierre

    @property
    def id(self) -> int:
        return self._id

    @property
    def agente_id(self) -> int:
        return self._agente_id

    @property
    def intencion(self) -> str:
        return self._intencion

    @property
    def estado(self) -> EstadoProcesoValue:
        return self._estado

    @property
    def fecha_creacion(self) -> datetime:
        return self._fecha_creacion

    @property
    def fecha_cierre(self) -> datetime | None:
        return self._fecha_cierre

    def cambiar_estado(self, nuevo: EstadoProceso) -> None:
        if not self._estado.can_transition_to(nuevo):
            raise ValueError(
                f"Cannot transition from {self._estado.value} to {nuevo}"
            )
        self._estado = EstadoProcesoValue(nuevo)
        if self._estado.is_terminal():
            self._fecha_cierre = datetime.now()

    def asignar_agente(self, agente_id: int) -> None:
        self._agente_id = agente_id

    def actualizar_intencion(self, intencion: str) -> None:
        self._intencion = intencion
