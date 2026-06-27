from pydantic import BaseModel


class EjecutarComandoDTO(BaseModel):
    proceso_id: int
    funcion_id: int
    orden_ejecucion: int
