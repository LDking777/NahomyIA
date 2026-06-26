export type EstadoEjecucion = 'Pendiente' | 'En Progreso' | 'Exitoso' | 'Fallido'

export class EjecucionAutomatizada {
  constructor(
    private readonly _id: number,
    private readonly _procesoId: number,
    private readonly _funcionId: number,
    private _ordenEjecucion: number,
    private _resultadoRaw: string | null,
    private _estado: EstadoEjecucion,
  ) {}

  get id(): number {
    return this._id
  }

  get procesoId(): number {
    return this._procesoId
  }

  get funcionId(): number {
    return this._funcionId
  }

  get ordenEjecucion(): number {
    return this._ordenEjecucion
  }

  get resultadoRaw(): string | null {
    return this._resultadoRaw
  }

  get estado(): EstadoEjecucion {
    return this._estado
  }

  ejecutar(resultado: string): void {
    this._resultadoRaw = resultado
    this._estado = 'Exitoso'
  }

  marcarFallido(error: string): void {
    this._resultadoRaw = error
    this._estado = 'Fallido'
  }

  reordenar(nuevoOrden: number): void {
    this._ordenEjecucion = nuevoOrden
  }
}
