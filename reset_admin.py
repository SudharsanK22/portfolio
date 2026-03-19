import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def reset_admin():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['portfolio_cms']
    
    new_password = "admin123"
    hashed = pwd_context.hash(new_password)
    
    result = await db.users.update_one(
        {"username": "admin"},
        {"$set": {"hashed_password": hashed}},
        upsert=True
    )
    
    print(f"Admin password reset to: {new_password}")
    print(f"New hash: {hashed}")
    print(f"Modified: {result.modified_count}, Upserted: {result.upserted_id}")
    
    # Also verify immediately
    user = await db.users.find_one({"username": "admin"})
    if user and pwd_context.verify(new_password, user["hashed_password"]):
        print("✅ Verification passed - login should work now!")
    else:
        print("❌ Verification failed!")

if __name__ == '__main__':
    asyncio.run(reset_admin())
