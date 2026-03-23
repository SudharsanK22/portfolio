import os
import logging
import certifi
try:
    import dns.resolver
    has_dns = True
except ImportError:
    has_dns = False
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings, SettingsConfigDict

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    # Try to get from environment first, then .env, then default
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://mongo:xZIvHpgqEJPXiqBHVgEueEjgxBNsMvMp@centerbeam.proxy.rlwy.net:49839")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "portfolio_cms")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "YOUR_SUPER_SECRET_KEY_CHANGE_THIS")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 1 day
    
    # Modern Pydantic V2 Settings config
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

try:
    settings = Settings()
    # Check if we are on Render and warn if using localhost
    if os.getenv("RENDER"):
        if "127.0.0.1" in settings.MONGODB_URL:
            logger.warning("RUNNING ON RENDER BUT MONGODB_URL IS SET TO LOCALHOST! Check your environment variables.")
        else:
            logger.info("Running on Render with external MONGODB_URL.")
            if not has_dns and "mongodb+srv" in settings.MONGODB_URL:
                logger.error("mongodb+srv URL detected but dnspython is NOT installed! SRV resolution will fail.")
    
    logger.info(f"Database settings loaded. DATABASE_NAME={settings.DATABASE_NAME}, has_dns={has_dns}")
except Exception as e:
    logger.error(f"Error initializing settings: {e}")
    class FallbackSettings:
        MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://mongo:xZIvHpgqEJPXiqBHVgEueEjgxBNsMvMp@centerbeam.proxy.rlwy.net:49839")
        DATABASE_NAME = os.getenv("DATABASE_NAME", "portfolio_cms")
        SECRET_KEY = os.getenv("SECRET_KEY", "YOUR_SUPER_SECRET_KEY_CHANGE_THIS")
    settings = FallbackSettings()

# More robust client initialization
try:
    is_srv = "mongodb+srv" in settings.MONGODB_URL
    if is_srv:
        logger.info("Initializing AsyncIOMotorClient with TLS (SRV/Atlas URL detected)...")
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=5000,
        )
    else:
        logger.info("Initializing AsyncIOMotorClient without TLS (standard URL, e.g. Railway)...")
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
        )
    db = client[settings.DATABASE_NAME]
    logger.info(f"Database object initialized for database: {settings.DATABASE_NAME}")
except Exception as e:
    logger.critical(f"Failed to initialize AsyncIOMotorClient: {e}")
    client = None
    db = None

async def get_database():
    if db is None:
        raise Exception("Database connection not initialized. Check server logs for AsyncIOMotorClient errors.")
    return db
