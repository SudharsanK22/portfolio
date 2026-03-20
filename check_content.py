import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import json

async def check():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["portfolio_cms"]
    
    types = ["home", "about", "contact", "settings"]
    for t in types:
        count = await db.content.count_documents({"type": t})
        print(f"Type '{t}': {count}")
        if count > 0:
            docs = await db.content.find({"type": t}).to_list(None)
            for doc in docs:
                print(f"  ID: {doc.get('_id')}, Content: {list(doc.keys())}")

if __name__ == "__main__":
    asyncio.run(check())
