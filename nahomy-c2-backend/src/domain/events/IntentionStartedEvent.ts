import { v4 as uuid } from 'uuid'
import type { IDomainEvent } from './IDomainEvent'

export class IntentionStartedEvent implements IDomainEvent {
  readonly eventId: string
  readonly eventName = 'c2.intention.started'
  readonly occurredOn: Date

  constructor(
    readonly aggregateId: string,
    readonly payload: {
      usuarioId: string
      agenteId: number
      intencion: string
      procesoId: number
    },
  ) {
    this.eventId = uuid()
    this.occurredOn = new Date()
  }
}
