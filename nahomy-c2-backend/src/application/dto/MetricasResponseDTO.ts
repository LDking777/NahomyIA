export interface MetricaItemDTO {
  id: number
  procesoId: number
  tiempoEjecucionMs: number
  bytesTransferidos: number
  resultadoExitoso: boolean
  fechaMetrica: Date
}

export interface MetricasResponseDTO {
  promedioTiempoRespuesta: number
  totalBytesTransferidos: number
  metricas: MetricaItemDTO[]
}
