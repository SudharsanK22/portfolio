import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def inspect():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["portfolio_cms"]
    
    colls = await db.list_collection_names()
    print(f"Collections: {colls}")
    
    for coll_name in colls:
        count = await db[coll_name].count_documents({})
        print(f"\nCollection: {coll_name} (Count: {count})")
        docs = await db[coll_name].find().to_list(10)
        for doc in docs:
            print(doc)

if __name__ == "__main__":
    asyncio.run(inspect())
