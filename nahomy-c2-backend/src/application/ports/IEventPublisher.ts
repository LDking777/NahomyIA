import type { IDomainEvent } from '../../domain/events/IDomainEvent'

export interface IEventPublisher {
  publish(event: IDomainEvent): Promise<void>
}
