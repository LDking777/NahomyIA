import { Repository } from 'typeorm'
import type { IEjecucionAutomatizadaRepository } from '../../../../domain/repositories/IEjecucionAutomatizadaRepository'
import { EjecucionAutomatizada } from '../../../../domain/entities/EjecucionAutomatizada'
import { EjecucionAutomatizadaEntity } from '../entities/EjecucionAutomatizadaEntity'
import type { EstadoEjecucion } from '../../../../domain/entities/EjecucionAutomatizada'

export class TypeORMEjecucionAutomatizadaRepository implements IEjecucionAutomatizadaRepository {
  constructor(private readonly repo: Repository<EjecucionAutomatizadaEntity>) {}

  async findById(id: number): Promise<EjecucionAutomatizada | null> {
    const entity = await this.repo.findOne({ where: { id } })
    return entity ? this.toDomain(entity) : null
  }

  async findByProcesoId(procesoId: number): Promise<EjecucionAutomatizada[]> {
    const entities = await this.repo.find({
      where: { procesoId },
      order: { ordenEjecucion: 'ASC' },
    })
    return entities.map(this.toDomain)
  }

  async save(ejecucion: EjecucionAutomatizada): Promise<number> {
    const entity = this.toEntity(ejecucion)
    const result = await this.repo.save(entity)
    return result.id
  }

  async update(ejecucion: EjecucionAutomatizada): Promise<void> {
    await this.repo.update(ejecucion.id, {
      resultadoRaw: ejecucion.resultadoRaw,
      estado: ejecucion.estado,
    })
  }

  private toDomain(entity: EjecucionAutomatizadaEntity): EjecucionAutomatizada {
    return new EjecucionAutomatizada(
      entity.id,
      entity.procesoId,
      entity.funcionId,
      entity.ordenEjecucion,
      entity.resultadoRaw,
      entity.estado as EstadoEjecucion,
    )
  }

  private toEntity(domain: EjecucionAutomatizada): Partial<EjecucionAutomatizadaEntity> {
    return {
      procesoId: domain.procesoId,
      funcionId: domain.funcionId,
      ordenEjecucion: domain.ordenEjecucion,
      resultadoRaw: domain.resultadoRaw,
      estado: domain.estado,
    }
  }
}
