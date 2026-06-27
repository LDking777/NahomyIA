from ..dto.log_auditoria_response import LogAuditoriaResponseDTO, LogAuditoriaItemDTO
from ...domain.repositories import ILogAuditoriaRepository


class ObtenerLogsAuditoriaUseCase:
    def __init__(self, log_repo: ILogAuditoriaRepository):
        self._log_repo = log_repo

    async def execute(self, limit: int = 50, offset: int = 0) -> LogAuditoriaResponseDTO:
        logs = await self._log_repo.find_all(limit, offset)
        return LogAuditoriaResponseDTO(
            total=len(logs),
            logs=[
                LogAuditoriaItemDTO(
                    id=log.id,
                    usuario_id=log.usuario_id,
                    proceso_id=log.proceso_id,
                    accion=log.accion,
                    tabla_afectada=log.tabla_afectada,
                    detalles=log.detalles,
                    fecha_registro=log.fecha_registro,
                )
                for log in logs
            ],
        )
