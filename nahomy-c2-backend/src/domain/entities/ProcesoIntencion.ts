import { EstadoProceso, EstadoProcesoValue } from '../value-objects/EstadoProceso'

export class ProcesoIntencion {
  constructor(
    private readonly _id: number,
    private _agenteId: number,
    private _intencion: string,
    private _estado: EstadoProcesoValue,
    private readonly _fechaCreacion: Date,
    private _fechaCierre: Date | null,
  ) {}

  get id(): number {
    return this._id
  }

  get agenteId(): number {
    return this._agenteId
  }

  get intencion(): string {
    return this._intencion
  }

  get estado(): EstadoProcesoValue {
    return this._estado
  }

  get fechaCreacion(): Date {
    return this._fechaCreacion
  }

  get fechaCierre(): Date | null {
    return this._fechaCierre
  }

  cambiarEstado(nuevoEstado: EstadoProceso): void {
    if (!this._estado.canTransitionTo(nuevoEstado)) {
      throw new Error(
        `Cannot transition from ${this._estado.getValue()} to ${nuevoEstado}`,
      )
    }
    this._estado = new EstadoProcesoValue(nuevoEstado)
    if (this._estado.isTerminal()) {
      this._fechaCierre = new Date()
    }
  }

  asignarAgente(agenteId: number): void {
    this._agenteId = agenteId
  }

  actualizarIntencion(intencion: string): void {
    this._intencion = intencion
  }
}
