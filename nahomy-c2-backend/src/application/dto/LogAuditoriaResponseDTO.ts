export interface LogAuditoriaItemDTO {
  id: number
  usuarioId: string | null
  procesoId: number | null
  accion: string
  tablaAfectada: string
  detalles: string | null
  fechaRegistro: Date
}

export interface LogAuditoriaResponseDTO {
  total: number
  logs: LogAuditoriaItemDTO[]
}
