export class MetricaRendimiento {
  constructor(
    private readonly _id: number,
    private readonly _procesoId: number,
    private _tiempoEjecucionMs: number,
    private _bytesTransferidos: number,
    private _resultadoExitoso: boolean,
    private readonly _fechaMetrica: Date,
  ) {}

  get id(): number {
    return this._id
  }

  get procesoId(): number {
    return this._procesoId
  }

  get tiempoEjecucionMs(): number {
    return this._tiempoEjecucionMs
  }

  get bytesTransferidos(): number {
    return this._bytesTransferidos
  }

  get resultadoExitoso(): boolean {
    return this._resultadoExitoso
  }

  get fechaMetrica(): Date {
    return this._fechaMetrica
  }

  registrarResultado(exitoso: boolean, tiempoMs: number, bytes: number): void {
    this._resultadoExitoso = exitoso
    this._tiempoEjecucionMs = tiempoMs
    this._bytesTransferidos = bytes
  }
}
