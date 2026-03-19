import os
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "portfolio_cms"
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_CHANGE_THIS"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    model_config = {
        "env_file": "backend/.env",
        "env_file_encoding": "utf-8"
    }

settings = Settings()

client = AsyncIOMotorClient(settings.MONGODB_URL)
db = client[settings.DATABASE_NAME]

async def get_database():
    return db
