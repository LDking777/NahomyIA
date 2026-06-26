import { MetricaRendimiento } from '../entities/MetricaRendimiento'

export interface IMetricaRendimientoRepository {
  findById(id: number): Promise<MetricaRendimiento | null>
  findByProcesoId(procesoId: number): Promise<MetricaRendimiento[]>
  findAll(): Promise<MetricaRendimiento[]>
  save(metrica: MetricaRendimiento): Promise<number>
  getPromedioTiempoRespuesta(): Promise<number>
  getTotalBytesTransferidos(): Promise<number>
}
