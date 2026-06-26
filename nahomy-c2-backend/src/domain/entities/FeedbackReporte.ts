import { NivelAlerta, NivelAlertaValue } from '../value-objects/NivelAlerta'

export class FeedbackReporte {
  constructor(
    private readonly _id: number,
    private readonly _procesoId: number,
    private _resumenIa: string,
    private _nivelAlerta: NivelAlertaValue | null,
  ) {}

  get id(): number {
    return this._id
  }

  get procesoId(): number {
    return this._procesoId
  }

  get resumenIa(): string {
    return this._resumenIa
  }

  get nivelAlerta(): NivelAlertaValue | null {
    return this._nivelAlerta
  }

  actualizarResumen(resumen: string): void {
    this._resumenIa = resumen
  }

  asignarAlerta(alerta: NivelAlertaValue): void {
    this._nivelAlerta = alerta
  }
}
