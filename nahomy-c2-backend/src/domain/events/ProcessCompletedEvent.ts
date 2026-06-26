import { v4 as uuid } from 'uuid'
import type { IDomainEvent } from './IDomainEvent'

export class ProcessCompletedEvent implements IDomainEvent {
  readonly eventId: string
  readonly eventName = 'c2.process.completed'
  readonly occurredOn: Date

  constructor(
    readonly aggregateId: string,
    readonly payload: {
      procesoId: number
      estado: string
      fechaCierre: Date
    },
  ) {
    this.eventId = uuid()
    this.occurredOn = new Date()
  }
}
