import type { IFeedbackReporteRepository } from '../../domain/repositories/IFeedbackReporteRepository'
import type { IMetricaRendimientoRepository } from '../../domain/repositories/IMetricaRendimientoRepository'
import type { IMessageBus } from '../ports/IMessageBus'
import { FeedbackReporte } from '../../domain/entities/FeedbackReporte'
import { NivelAlerta, NivelAlertaValue } from '../../domain/value-objects/NivelAlerta'
import { v4 as uuid } from 'uuid'

export class GenerarFeedbackUseCase {
  constructor(
    private readonly feedbackRepo: IFeedbackReporteRepository,
    private readonly metricaRepo: IMetricaRendimientoRepository,
    private readonly messageBus: IMessageBus,
  ) {}

  async execute(procesoId: number): Promise<{ feedbackId: number }> {
    const metricas = await this.metricaRepo.findByProcesoId(procesoId)
    const promedioTiempo = metricas.reduce((sum, m) => sum + m.tiempoEjecucionMs, 0) / metricas.length
    const totalBytes = metricas.reduce((sum, m) => sum + m.bytesTransferidos, 0)

    const alerta = promedioTiempo > 5000 || totalBytes > 1_000_000
      ? new NivelAlertaValue(NivelAlerta.ALTO)
      : new NivelAlertaValue(NivelAlerta.BAJO)

    const resumen = [
      `Proceso #${procesoId} analizado.`,
      `Tiempo promedio: ${promedioTiempo.toFixed(2)}ms.`,
      `Bytes transferidos: ${(totalBytes / 1024).toFixed(2)} KB.`,
      `Nivel de alerta: ${alerta.getValue()}.`,
    ].join(' ')

    const feedback = new FeedbackReporte(0, procesoId, resumen, alerta)
    const feedbackId = await this.feedbackRepo.save(feedback)

    return { feedbackId }
  }
}
