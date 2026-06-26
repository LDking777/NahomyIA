export class FuncionPrealmacenada {
  constructor(
    private readonly _id: number,
    private _nombreFuncion: string,
    private _comandoSistema: string,
  ) {}

  get id(): number {
    return this._id
  }

  get nombreFuncion(): string {
    return this._nombreFuncion
  }

  get comandoSistema(): string {
    return this._comandoSistema
  }

  actualizarComando(comando: string): void {
    this._comandoSistema = comando
  }
}
