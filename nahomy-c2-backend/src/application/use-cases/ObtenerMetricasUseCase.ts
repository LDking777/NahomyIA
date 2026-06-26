import type { IMetricaRendimientoRepository } from '../../domain/repositories/IMetricaRendimientoRepository'
import type { MetricasResponseDTO } from '../dto/MetricasResponseDTO'

export class ObtenerMetricasUseCase {
  constructor(private readonly metricaRepo: IMetricaRendimientoRepository) {}

  async execute(): Promise<MetricasResponseDTO> {
    const [promedioTiempoRespuesta, totalBytesTransferidos, metricas] =
      await Promise.all([
        this.metricaRepo.getPromedioTiempoRespuesta(),
        this.metricaRepo.getTotalBytesTransferidos(),
        this.metricaRepo.findAll(),
      ])

    return {
      promedioTiempoRespuesta,
      totalBytesTransferidos,
      metricas: metricas.map((m) => ({
        id: m.id,
        procesoId: m.procesoId,
        tiempoEjecucionMs: m.tiempoEjecucionMs,
        bytesTransferidos: m.bytesTransferidos,
        resultadoExitoso: m.resultadoExitoso,
        fechaMetrica: m.fechaMetrica,
      })),
    }
  }
}
