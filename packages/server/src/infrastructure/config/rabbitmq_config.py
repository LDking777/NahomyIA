import os


def get_rabbitmq_url() -> str:
    return os.getenv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672")


RABBITMQ_EXCHANGE = os.getenv("RABBITMQ_EXCHANGE", "c2.events")
INTENTION_QUEUE = "c2.intention.queue"
AUDIT_QUEUE = "c2.audit.queue"
METRICS_QUEUE = "c2.metrics.queue"
