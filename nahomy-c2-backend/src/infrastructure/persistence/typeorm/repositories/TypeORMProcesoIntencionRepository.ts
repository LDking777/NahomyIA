import { Repository } from 'typeorm'
import type { IProcesoIntencionRepository } from '../../../../domain/repositories/IProcesoIntencionRepository'
import { ProcesoIntencion } from '../../../../domain/entities/ProcesoIntencion'
import { EstadoProceso, EstadoProcesoValue } from '../../../../domain/value-objects/EstadoProceso'
import { ProcesoIntencionEntity } from '../entities/ProcesoIntencionEntity'

export class TypeORMProcesoIntencionRepository implements IProcesoIntencionRepository {
  constructor(private readonly repo: Repository<ProcesoIntencionEntity>) {}

  async findById(id: number): Promise<ProcesoIntencion | null> {
    const entity = await this.repo.findOne({ where: { id } })
    return entity ? this.toDomain(entity) : null
  }

  async findAll(): Promise<ProcesoIntencion[]> {
    const entities = await this.repo.find({ order: { fechaCreacion: 'DESC' } })
    return entities.map(this.toDomain)
  }

  async findActivos(): Promise<ProcesoIntencion[]> {
    const entities = await this.repo.find({
      where: { fechaCierre: null },
      order: { fechaCreacion: 'DESC' },
    })
    return entities.map(this.toDomain)
  }

  async findByAgenteId(agenteId: number): Promise<ProcesoIntencion[]> {
    const entities = await this.repo.find({
      where: { agenteId },
      order: { fechaCreacion: 'DESC' },
    })
    return entities.map(this.toDomain)
  }

  async save(proceso: ProcesoIntencion): Promise<number> {
    const entity = this.toEntity(proceso)
    const result = await this.repo.save(entity)
    return result.id
  }

  async update(proceso: ProcesoIntencion): Promise<void> {
    await this.repo.update(proceso.id, {
      estado: proceso.estado.getValue(),
      fechaCierre: proceso.fechaCierre,
    })
  }

  private toDomain(entity: ProcesoIntencionEntity): ProcesoIntencion {
    return new ProcesoIntencion(
      entity.id,
      entity.agenteId,
      entity.intencion,
      new EstadoProcesoValue(entity.estado as EstadoProceso),
      entity.fechaCreacion,
      entity.fechaCierre,
    )
  }

  private toEntity(domain: ProcesoIntencion): Partial<ProcesoIntencionEntity> {
    return {
      agenteId: domain.agenteId,
      intencion: domain.intencion,
      estado: domain.estado.getValue(),
      fechaCreacion: domain.fechaCreacion,
      fechaCierre: domain.fechaCierre,
    }
  }
}
