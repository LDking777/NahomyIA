import { Repository } from 'typeorm'
import type { IFeedbackReporteRepository } from '../../../../domain/repositories/IFeedbackReporteRepository'
import { FeedbackReporte } from '../../../../domain/entities/FeedbackReporte'
import { NivelAlerta, NivelAlertaValue } from '../../../../domain/value-objects/NivelAlerta'
import { FeedbackReporteEntity } from '../entities/FeedbackReporteEntity'

export class TypeORMFeedbackReporteRepository implements IFeedbackReporteRepository {
  constructor(private readonly repo: Repository<FeedbackReporteEntity>) {}

  async findById(id: number): Promise<FeedbackReporte | null> {
    const entity = await this.repo.findOne({ where: { id } })
    return entity ? this.toDomain(entity) : null
  }

  async findByProcesoId(procesoId: number): Promise<FeedbackReporte | null> {
    const entity = await this.repo.findOne({ where: { procesoId } })
    return entity ? this.toDomain(entity) : null
  }

  async save(feedback: FeedbackReporte): Promise<number> {
    const entity = this.toEntity(feedback)
    const result = await this.repo.save(entity)
    return result.id
  }

  async update(feedback: FeedbackReporte): Promise<void> {
    await this.repo.update(feedback.id, {
      resumenIa: feedback.resumenIa,
      nivelAlerta: feedback.nivelAlerta?.getValue() ?? null,
    })
  }

  private toDomain(entity: FeedbackReporteEntity): FeedbackReporte {
    return new FeedbackReporte(
      entity.id,
      entity.procesoId,
      entity.resumenIa,
      entity.nivelAlerta ? new NivelAlertaValue(entity.nivelAlerta as NivelAlerta) : null,
    )
  }

  private toEntity(domain: FeedbackReporte): Partial<FeedbackReporteEntity> {
    return {
      procesoId: domain.procesoId,
      resumenIa: domain.resumenIa,
      nivelAlerta: domain.nivelAlerta?.getValue() ?? null,
    }
  }
}
