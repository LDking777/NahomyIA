import { LogAuditoria } from '../entities/LogAuditoria'

export interface ILogAuditoriaRepository {
  findById(id: number): Promise<LogAuditoria | null>
  findAll(limit?: number, offset?: number): Promise<LogAuditoria[]>
  findByProcesoId(procesoId: number): Promise<LogAuditoria[]>
  findByUsuarioId(usuarioId: string): Promise<LogAuditoria[]>
  save(log: LogAuditoria): Promise<number>
}
