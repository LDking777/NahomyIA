from datetime import datetime


class MetricaRendimiento:
    def __init__(
        self,
        id: int,
        proceso_id: int,
        tiempo_ejecucion_ms: int,
        bytes_transferidos: int,
        resultado_exitoso: bool,
        fecha_metrica: datetime,
    ):
        self._id = id
        self._proceso_id = proceso_id
        self._tiempo_ejecucion_ms = tiempo_ejecucion_ms
        self._bytes_transferidos = bytes_transferidos
        self._resultado_exitoso = resultado_exitoso
        self._fecha_metrica = fecha_metrica

    @property
    def id(self) -> int:
        return self._id

    @property
    def proceso_id(self) -> int:
        return self._proceso_id

    @property
    def tiempo_ejecucion_ms(self) -> int:
        return self._tiempo_ejecucion_ms

    @property
    def bytes_transferidos(self) -> int:
        return self._bytes_transferidos

    @property
    def resultado_exitoso(self) -> bool:
        return self._resultado_exitoso

    @property
    def fecha_metrica(self) -> datetime:
        return self._fecha_metrica

    def registrar_resultado(self, exitoso: bool, tiempo_ms: int, bytes_: int) -> None:
        self._resultado_exitoso = exitoso
        self._tiempo_ejecucion_ms = tiempo_ms
        self._bytes_transferidos = bytes_
