export enum NivelAlerta {
  BAJO = 'Bajo',
  MEDIO = 'Medio',
  ALTO = 'Alto',
  CRITICO = 'Critico',
}

export class NivelAlertaValue {
  constructor(private readonly value: NivelAlerta) {}

  getValue(): NivelAlerta {
    return this.value
  }
}
