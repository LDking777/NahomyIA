class FuncionPrealmacenada:
    def __init__(self, id: int, nombre_funcion: str, comando_sistema: str):
        self._id = id
        self._nombre_funcion = nombre_funcion
        self._comando_sistema = comando_sistema

    @property
    def id(self) -> int:
        return self._id

    @property
    def nombre_funcion(self) -> str:
        return self._nombre_funcion

    @property
    def comando_sistema(self) -> str:
        return self._comando_sistema

    def actualizar_comando(self, comando: str) -> None:
        self._comando_sistema = comando
