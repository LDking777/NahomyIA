import { Repository } from 'typeorm'
import type { ILogAuditoriaRepository } from '../../../../domain/repositories/ILogAuditoriaRepository'
import { LogAuditoria } from '../../../../domain/entities/LogAuditoria'
import { LogAuditoriaEntity } from '../entities/LogAuditoriaEntity'

export class TypeORMLogAuditoriaRepository implements ILogAuditoriaRepository {
  constructor(private readonly repo: Repository<LogAuditoriaEntity>) {}

  async findById(id: number): Promise<LogAuditoria | null> {
    const entity = await this.repo.findOne({ where: { id } })
    return entity ? this.toDomain(entity) : null
  }

  async findAll(limit = 50, offset = 0): Promise<LogAuditoria[]> {
    const entities = await this.repo.find({
      order: { fechaRegistro: 'DESC' },
      take: limit,
      skip: offset,
    })
    return entities.map(this.toDomain)
  }

  async findByProcesoId(procesoId: number): Promise<LogAuditoria[]> {
    const entities = await this.repo.find({
      where: { procesoId },
      order: { fechaRegistro: 'DESC' },
    })
    return entities.map(this.toDomain)
  }

  async findByUsuarioId(usuarioId: string): Promise<LogAuditoria[]> {
    const entities = await this.repo.find({
      where: { usuarioId },
      order: { fechaRegistro: 'DESC' },
    })
    return entities.map(this.toDomain)
  }

  async save(log: LogAuditoria): Promise<number> {
    const entity = this.toEntity(log)
    const result = await this.repo.save(entity)
    return result.id
  }

  private toDomain(entity: LogAuditoriaEntity): LogAuditoria {
    return new LogAuditoria(
      entity.id,
      entity.usuarioId,
      entity.procesoId,
      entity.accion,
      entity.tablaAfectada,
      entity.detalles,
      entity.fechaRegistro,
    )
  }

  private toEntity(domain: LogAuditoria): Partial<LogAuditoriaEntity> {
    return {
      usuarioId: domain.usuarioId,
      procesoId: domain.procesoId,
      accion: domain.accion,
      tablaAfectada: domain.tablaAfectada,
      detalles: domain.detalles,
    }
  }
}
