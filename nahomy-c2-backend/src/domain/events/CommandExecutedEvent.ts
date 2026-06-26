import { v4 as uuid } from 'uuid'
import type { IDomainEvent } from './IDomainEvent'

export class CommandExecutedEvent implements IDomainEvent {
  readonly eventId: string
  readonly eventName = 'c2.command.executed'
  readonly occurredOn: Date

  constructor(
    readonly aggregateId: string,
    readonly payload: {
      procesoId: number
      funcionId: number
      comando: string
      resultado: string
      ordenEjecucion: number
    },
  ) {
    this.eventId = uuid()
    this.occurredOn = new Date()
  }
}
