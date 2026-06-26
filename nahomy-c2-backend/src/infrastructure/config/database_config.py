import os


def get_database_url() -> str:
    user = os.getenv("DB_USER", "nahomy")
    password = os.getenv("DB_PASSWORD", "nahomy_secret")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "5432")
    name = os.getenv("DB_NAME", "nahomy_c2")
    return f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{name}"
