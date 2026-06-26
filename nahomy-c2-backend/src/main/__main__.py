import os
import asyncio
import uvicorn
from .container import Container

container = Container()


async def main():
    await container.initialize()
    port = int(os.getenv("PORT", "3000"))
    config = uvicorn.Config(
        container.app,
        host="0.0.0.0",
        port=port,
        log_level="info",
    )
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        asyncio.run(container.shutdown())
