import asyncio
from backend.database import get_database
from backend.auth import get_password_hash
import sys

async def create_admin():
    if len(sys.argv) < 3:
        print("Usage: python create_admin_user.py <username> <password>")
        return

    username = sys.argv[1]
    password = sys.argv[2]
    
    db = await get_database()
    existing = await db.users.find_one({"username": username})
    if existing:
        print(f"User {username} already exists")
        return
    
    hashed_password = get_password_hash(password)
    await db.users.insert_one({"username": username, "hashed_password": hashed_password})
    print(f"Admin user {username} created successfully!")

if __name__ == "__main__":
    asyncio.run(create_admin())
