from ...domain.entities import EjecucionAutomatizada
from ...domain.events import CommandExecutedEvent
from ...domain.repositories import IProcesoIntencionRepository, IEjecucionAutomatizadaRepository
from ..ports import IMessageBus


class EjecutarComandoUseCase:
    def __init__(
        self,
        proceso_repo: IProcesoIntencionRepository,
        ejecucion_repo: IEjecucionAutomatizadaRepository,
        message_bus: IMessageBus,
    ):
        self._proceso_repo = proceso_repo
        self._ejecucion_repo = ejecucion_repo
        self._message_bus = message_bus

    async def execute(
        self, proceso_id: int, funcion_id: int, orden_ejecucion: int
    ) -> dict:
        proceso = await self._proceso_repo.find_by_id(proceso_id)
        if not proceso:
            raise ValueError(f"Proceso {proceso_id} no encontrado")

        ejecucion = EjecucionAutomatizada(
            id=0,
            proceso_id=proceso_id,
            funcion_id=funcion_id,
            orden_ejecucion=orden_ejecucion,
            resultado_raw=None,
            estado="Pendiente",
        )

        ejecucion_id = await self._ejecucion_repo.save(ejecucion)

        event = CommandExecutedEvent(
            proceso_id=proceso_id,
            funcion_id=funcion_id,
            comando="",
            resultado="Pendiente",
            orden_ejecucion=orden_ejecucion,
        )
        await self._message_bus.publish(event)

        return {"ejecucion_id": ejecucion_id}
