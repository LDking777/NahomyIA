import type { ILogAuditoriaRepository } from '../../domain/repositories/ILogAuditoriaRepository'
import type { LogAuditoriaResponseDTO } from '../dto/LogAuditoriaResponseDTO'

export class ObtenerLogsAuditoriaUseCase {
  constructor(private readonly logRepo: ILogAuditoriaRepository) {}

  async execute(limit = 50, offset = 0): Promise<LogAuditoriaResponseDTO> {
    const logs = await this.logRepo.findAll(limit, offset)
    return {
      total: logs.length,
      logs: logs.map((log) => ({
        id: log.id,
        usuarioId: log.usuarioId,
        procesoId: log.procesoId,
        accion: log.accion,
        tablaAfectada: log.tablaAfectada,
        detalles: log.detalles,
        fechaRegistro: log.fechaRegistro,
      })),
    }
  }
}
