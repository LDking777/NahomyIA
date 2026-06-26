export class RabbitMQConfig {
  constructor(
    readonly url: string = process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    readonly exchangeName: string = process.env.RABBITMQ_EXCHANGE || 'c2.events',
    readonly intentionQueue: string = 'c2.intention.queue',
    readonly auditQueue: string = 'c2.audit.queue',
    readonly metricsQueue: string = 'c2.metrics.queue',
  ) {}
}
