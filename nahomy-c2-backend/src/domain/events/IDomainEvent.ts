export interface IDomainEvent {
  eventId: string
  eventName: string
  aggregateId: string
  occurredOn: Date
  payload: Record<string, unknown>
}
