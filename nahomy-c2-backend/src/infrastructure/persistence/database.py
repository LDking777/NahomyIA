from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from ..config.database_config import get_database_url

engine = create_async_engine(get_database_url(), echo=False, pool_size=10)
async_session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_session() -> AsyncSession:
    async with async_session_factory() as session:
        yield session
