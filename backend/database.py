import os
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URL: str = "mongodb://127.0.0.1:27017"
    DATABASE_NAME: str = "portfolio_cms"
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_CHANGE_THIS"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    model_config = {
        "env_file": "backend/.env",
        "env_file_encoding": "utf-8"
    }

try:
    settings = Settings()
    print(f"Settings loaded: MONGODB_URL={settings.MONGODB_URL[:20]}...")
except Exception as e:
    print(f"Error loading settings: {e}")
    # Fallback for critical settings if env fails
    class FallbackSettings:
        MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://127.0.0.1:27017")
        DATABASE_NAME = os.getenv("DATABASE_NAME", "portfolio_cms")
    settings = FallbackSettings()

try:
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.DATABASE_NAME]
    print("AsyncIOMotorClient initialized")
except Exception as e:
    print(f"Error initializing AsyncIOMotorClient: {e}")
    db = None

async def get_database():
    return db
