import type { IDomainEvent } from '../../domain/events/IDomainEvent'

export interface IMessageBus {
  publish(event: IDomainEvent): Promise<void>
  publishMany(events: IDomainEvent[]): Promise<void>
  subscribe(eventName: string, handler: (event: IDomainEvent) => Promise<void>): void
  connect(): Promise<void>
  disconnect(): Promise<void>
}
