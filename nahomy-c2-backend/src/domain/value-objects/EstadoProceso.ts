export enum EstadoProceso {
  INICIADO = 'Iniciado',
  EN_EJECUCION = 'En Ejecucion',
  FINALIZADO = 'Finalizado',
  FALLIDO = 'Fallido',
  CANCELADO = 'Cancelado',
}

export class EstadoProcesoValue {
  constructor(private readonly value: EstadoProceso) {}

  getValue(): EstadoProceso {
    return this.value
  }

  isTerminal(): boolean {
    return [
      EstadoProceso.FINALIZADO,
      EstadoProceso.FALLIDO,
      EstadoProceso.CANCELADO,
    ].includes(this.value)
  }

  canTransitionTo(newState: EstadoProceso): boolean {
    if (this.isTerminal()) return false
    return true
  }
}
