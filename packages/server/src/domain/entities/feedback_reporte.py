from ..value_objects import NivelAlertaValue


class FeedbackReporte:
    def __init__(
        self,
        id: int,
        proceso_id: int,
        resumen_ia: str,
        nivel_alerta: NivelAlertaValue | None,
    ):
        self._id = id
        self._proceso_id = proceso_id
        self._resumen_ia = resumen_ia
        self._nivel_alerta = nivel_alerta

    @property
    def id(self) -> int:
        return self._id

    @property
    def proceso_id(self) -> int:
        return self._proceso_id

    @property
    def resumen_ia(self) -> str:
        return self._resumen_ia

    @property
    def nivel_alerta(self) -> NivelAlertaValue | None:
        return self._nivel_alerta

    def actualizar_resumen(self, resumen: str) -> None:
        self._resumen_ia = resumen

    def asignar_alerta(self, alerta: NivelAlertaValue) -> None:
        self._nivel_alerta = alerta
