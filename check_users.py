import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def list_users():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['portfolio_cms']
    users = await db.users.find().to_list(None)
    for user in users:
        print(f"Username: {user['username']}, Hashed Password: {user['hashed_password']}")

if __name__ == '__main__':
    asyncio.run(list_users())
