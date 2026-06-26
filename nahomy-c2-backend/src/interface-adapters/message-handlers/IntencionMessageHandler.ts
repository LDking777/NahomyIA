import type { IDomainEvent } from '../../domain/events/IDomainEvent'
import type { IEventPublisher } from '../../application/ports/IEventPublisher'

export class IntencionMessageHandler {
  constructor(private readonly eventPublisher: IEventPublisher) {}

  async handleIntencionIniciada(event: IDomainEvent): Promise<void> {
    console.log(`[Handler] Intención iniciada: ${event.payload.intencion}`)
    await this.eventPublisher.publish(event)
  }

  async handleComandoEjecutado(event: IDomainEvent): Promise<void> {
    console.log(`[Handler] Comando ejecutado para proceso #${event.payload.procesoId}`)
    await this.eventPublisher.publish(event)
  }
}
