import json
import asyncio
import aio_pika
from ...domain.events import DomainEvent
from ...application.ports import IMessageBus


class RabbitMQAdapter(IMessageBus):
    def __init__(self, url: str, exchange_name: str = "c2.events"):
        self._url = url
        self._exchange_name = exchange_name
        self._connection: aio_pika.RobustConnection | None = None
        self._channel: aio_pika.Channel | None = None
        self._exchange: aio_pika.Exchange | None = None
        self._handlers: dict[str, callable] = {}

    async def connect(self) -> None:
        self._connection = await aio_pika.connect_robust(self._url)
        self._channel = await self._connection.channel()
        self._exchange = await self._channel.declare_exchange(
            self._exchange_name, aio_pika.ExchangeType.TOPIC, durable=True
        )

        queues = {
            "c2.intention.queue": ["c2.intention.*", "c2.command.*"],
            "c2.audit.queue": ["c2.audit.*"],
            "c2.metrics.queue": ["c2.metrics.*"],
        }

        for queue_name, routing_keys in queues.items():
            queue = await self._channel.declare_queue(queue_name, durable=True)
            for key in routing_keys:
                await queue.bind(self._exchange, key)
            await queue.consume(self._on_message)

        print("[RabbitMQ] Conectado y bindeado")

    async def disconnect(self) -> None:
        if self._connection:
            await self._connection.close()
            print("[RabbitMQ] Desconectado")

    async def publish(self, event: DomainEvent) -> None:
        if not self._exchange:
            raise RuntimeError("RabbitMQ no conectado")
        payload = {
            "event_id": event.event_id,
            "event_name": event.event_name,
            "occurred_on": event.occurred_on.isoformat(),
            "payload": {k: v for k, v in event.__dict__.items() if k not in ("event_id", "occurred_on")},
        }
        message = aio_pika.Message(
            body=json.dumps(payload, default=str).encode(),
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT,
            content_type="application/json",
        )
        await self._exchange.send(
            routing_key=event.event_name,
            message=message,
        )
        print(f"[RabbitMQ] Publicado: {event.event_name}")

    async def publish_many(self, events: list[DomainEvent]) -> None:
        for event in events:
            await self.publish(event)

    def subscribe(self, event_name: str, handler) -> None:
        self._handlers[event_name] = handler

    async def _on_message(self, message: aio_pika.IncomingMessage) -> None:
        async with message.process():
            try:
                data = json.loads(message.body)
                event_name = data.get("event_name", "")
                for pattern, handler in self._handlers.items():
                    if event_name.startswith(pattern.replace("*", "")):
                        await handler(data)
            except Exception as e:
                print(f"[RabbitMQ] Error procesando: {e}")
