import asyncio
from backend.database import get_database, settings

async def test_connection():
    print(f"Testing connection with MONGODB_URL: {settings.MONGODB_URL}")
    db = await get_database()
    if db is None:
        print("Database object is None!")
        return
    try:
        await db.command("ping")
        print("Database ping successful!")
    except Exception as e:
        print(f"Database ping failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
