import { Repository } from 'typeorm'
import type { IMetricaRendimientoRepository } from '../../../../domain/repositories/IMetricaRendimientoRepository'
import { MetricaRendimiento } from '../../../../domain/entities/MetricaRendimiento'
import { MetricaRendimientoEntity } from '../entities/MetricaRendimientoEntity'

export class TypeORMMetricaRendimientoRepository implements IMetricaRendimientoRepository {
  constructor(private readonly repo: Repository<MetricaRendimientoEntity>) {}

  async findById(id: number): Promise<MetricaRendimiento | null> {
    const entity = await this.repo.findOne({ where: { id } })
    return entity ? this.toDomain(entity) : null
  }

  async findByProcesoId(procesoId: number): Promise<MetricaRendimiento[]> {
    const entities = await this.repo.find({ where: { procesoId } })
    return entities.map(this.toDomain)
  }

  async findAll(): Promise<MetricaRendimiento[]> {
    const entities = await this.repo.find({
      order: { fechaMetrica: 'DESC' },
      take: 100,
    })
    return entities.map(this.toDomain)
  }

  async save(metrica: MetricaRendimiento): Promise<number> {
    const entity = this.toEntity(metrica)
    const result = await this.repo.save(entity)
    return result.id
  }

  async getPromedioTiempoRespuesta(): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('m')
      .select('AVG(m.tiempoEjecucionMs)', 'avg')
      .getRawOne()
    return Number(result?.avg) || 0
  }

  async getTotalBytesTransferidos(): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('m')
      .select('SUM(m.bytesTransferidos)', 'sum')
      .getRawOne()
    return Number(result?.sum) || 0
  }

  private toDomain(entity: MetricaRendimientoEntity): MetricaRendimiento {
    return new MetricaRendimiento(
      entity.id,
      entity.procesoId,
      entity.tiempoEjecucionMs,
      entity.bytesTransferidos,
      entity.resultadoExitoso,
      entity.fechaMetrica,
    )
  }

  private toEntity(domain: MetricaRendimiento): Partial<MetricaRendimientoEntity> {
    return {
      procesoId: domain.procesoId,
      tiempoEjecucionMs: domain.tiempoEjecucionMs,
      bytesTransferidos: domain.bytesTransferidos,
      resultadoExitoso: domain.resultadoExitoso,
    }
  }
}
