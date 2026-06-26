import amqp, { type Connection, type Channel, type ConsumeMessage } from 'amqplib'
import type { IMessageBus } from '../../application/ports/IMessageBus'
import type { IDomainEvent } from '../../domain/events/IDomainEvent'
import { RabbitMQConfig } from '../config/RabbitMQConfig'

interface HandlerEntry {
  eventName: string
  handler: (event: IDomainEvent) => Promise<void>
}

export class RabbitMQAdapter implements IMessageBus {
  private connection: Connection | null = null
  private channel: Channel | null = null
  private readonly handlers: HandlerEntry[] = []
  private readonly config: RabbitMQConfig

  constructor(config: RabbitMQConfig) {
    this.config = config
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.config.url)
    this.channel = await this.connection.createChannel()

    await this.channel.assertExchange(this.config.exchangeName, 'topic', {
      durable: true,
    })

    await this.channel.assertQueue(this.config.intentionQueue, { durable: true })
    await this.channel.assertQueue(this.config.auditQueue, { durable: true })
    await this.channel.assertQueue(this.config.metricsQueue, { durable: true })

    await this.channel.bindQueue(
      this.config.intentionQueue,
      this.config.exchangeName,
      'c2.intention.*',
    )
    await this.channel.bindQueue(
      this.config.auditQueue,
      this.config.exchangeName,
      'c2.audit.*',
    )
    await this.channel.bindQueue(
      this.config.metricsQueue,
      this.config.exchangeName,
      'c2.metrics.*',
    )

    await this.channel.bindQueue(
      this.config.intentionQueue,
      this.config.exchangeName,
      'c2.command.*',
    )

    this.startConsuming(this.config.intentionQueue)
    this.startConsuming(this.config.auditQueue)
    this.startConsuming(this.config.metricsQueue)

    console.log('[RabbitMQ] Conectado y bindeado a exchanges/queues')
  }

  async disconnect(): Promise<void> {
    await this.channel?.close()
    await this.connection?.close()
    console.log('[RabbitMQ] Desconectado')
  }

  async publish(event: IDomainEvent): Promise<void> {
    if (!this.channel) throw new Error('RabbitMQ no conectado')
    const buffer = Buffer.from(JSON.stringify(event))
    this.channel.publish(this.config.exchangeName, event.eventName, buffer, {
      persistent: true,
      contentType: 'application/json',
    })
    console.log(`[RabbitMQ] Publicado: ${event.eventName} | ID: ${event.eventId}`)
  }

  async publishMany(events: IDomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event)
    }
  }

  subscribe(eventName: string, handler: (event: IDomainEvent) => Promise<void>): void {
    this.handlers.push({ eventName, handler })
  }

  private async startConsuming(queue: string): Promise<void> {
    if (!this.channel) return
    await this.channel.consume(
      queue,
      async (msg: ConsumeMessage | null) => {
        if (!msg) return
        try {
          const event: IDomainEvent = JSON.parse(msg.content.toString())
          for (const entry of this.handlers) {
            if (event.eventName.startsWith(entry.eventName.replace('*', ''))) {
              await entry.handler(event)
            }
          }
          this.channel!.ack(msg)
        } catch (error) {
          console.error('[RabbitMQ] Error procesando mensaje:', error)
          this.channel!.nack(msg, false, true)
        }
      },
      { noAck: false },
    )
  }
}
