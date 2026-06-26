from enum import Enum


class EstadoProceso(str, Enum):
    INICIADO = "Iniciado"
    EN_EJECUCION = "En Ejecucion"
    FINALIZADO = "Finalizado"
    FALLIDO = "Fallido"
    CANCELADO = "Cancelado"


_TERMINAL = {EstadoProceso.FINALIZADO, EstadoProceso.FALLIDO, EstadoProceso.CANCELADO}


class EstadoProcesoValue:
    def __init__(self, value: EstadoProceso):
        self._value = value

    @property
    def value(self) -> EstadoProceso:
        return self._value

    def is_terminal(self) -> bool:
        return self._value in _TERMINAL

    def can_transition_to(self, new_state: EstadoProceso) -> bool:
        if self.is_terminal():
            return False
        return True
