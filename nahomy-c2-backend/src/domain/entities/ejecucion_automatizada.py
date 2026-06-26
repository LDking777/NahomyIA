EstadoEjecucion = str


class EjecucionAutomatizada:
    def __init__(
        self,
        id: int,
        proceso_id: int,
        funcion_id: int,
        orden_ejecucion: int,
        resultado_raw: str | None,
        estado: EstadoEjecucion,
    ):
        self._id = id
        self._proceso_id = proceso_id
        self._funcion_id = funcion_id
        self._orden_ejecucion = orden_ejecucion
        self._resultado_raw = resultado_raw
        self._estado = estado

    @property
    def id(self) -> int:
        return self._id

    @property
    def proceso_id(self) -> int:
        return self._proceso_id

    @property
    def funcion_id(self) -> int:
        return self._funcion_id

    @property
    def orden_ejecucion(self) -> int:
        return self._orden_ejecucion

    @property
    def resultado_raw(self) -> str | None:
        return self._resultado_raw

    @property
    def estado(self) -> EstadoEjecucion:
        return self._estado

    def ejecutar(self, resultado: str) -> None:
        self._resultado_raw = resultado
        self._estado = "Exitoso"

    def marcar_fallido(self, error: str) -> None:
        self._resultado_raw = error
        self._estado = "Fallido"

    def reordenar(self, nuevo_orden: int) -> None:
        self._orden_ejecucion = nuevo_orden
