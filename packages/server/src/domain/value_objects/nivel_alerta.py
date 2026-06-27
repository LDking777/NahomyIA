from enum import Enum


class NivelAlerta(str, Enum):
    BAJO = "Bajo"
    MEDIO = "Medio"
    ALTO = "Alto"
    CRITICO = "Critico"


class NivelAlertaValue:
    def __init__(self, value: NivelAlerta):
        self._value = value

    @property
    def value(self) -> NivelAlerta:
        return self._value
