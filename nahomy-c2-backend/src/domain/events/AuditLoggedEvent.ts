import { v4 as uuid } from 'uuid'
import type { IDomainEvent } from './IDomainEvent'

export class AuditLoggedEvent implements IDomainEvent {
  readonly eventId: string
  readonly eventName = 'c2.audit.logged'
  readonly occurredOn: Date

  constructor(
    readonly aggregateId: string,
    readonly payload: {
      usuarioId: string | null
      procesoId: number | null
      accion: string
      tablaAfectada: string
      detalles: string
    },
  ) {
    this.eventId = uuid()
    this.occurredOn = new Date()
  }
}
