export class LogAuditoria {
  constructor(
    private readonly _id: number,
    private readonly _usuarioId: string | null,
    private readonly _procesoId: number | null,
    private readonly _accion: string,
    private readonly _tablaAfectada: string,
    private readonly _detalles: string | null,
    private readonly _fechaRegistro: Date,
  ) {}

  get id(): number {
    return this._id
  }

  get usuarioId(): string | null {
    return this._usuarioId
  }

  get procesoId(): number | null {
    return this._procesoId
  }

  get accion(): string {
    return this._accion
  }

  get tablaAfectada(): string {
    return this._tablaAfectada
  }

  get detalles(): string | null {
    return this._detalles
  }

  get fechaRegistro(): Date {
    return this._fechaRegistro
  }
}
