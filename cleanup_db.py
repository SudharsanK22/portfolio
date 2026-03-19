import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def cleanup():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["portfolio_cms"]
    
    # Delete docs with null _id if they exist
    res = await db.content.delete_many({"_id": None})
    print(f"Deleted {res.deleted_count} documents with null _id from content collection")
    
    # Check for other collections too just in case
    for coll_name in ["skills", "projects"]:
        res = await db[coll_name].delete_many({"_id": None})
        print(f"Deleted {res.deleted_count} documents with null _id from {coll_name} collection")

    # Ensure unique types in content
    types = ["home", "about", "contact"]
    for t in types:
        count = await db.content.count_documents({"type": t})
        if count > 1:
            print(f"Found {count} documents of type {t}, keeping only the first one")
            docs = await db.content.find({"type": t}).to_list(None)
            for i in range(1, len(docs)):
                await db.content.delete_one({"_id": docs[i]["_id"]})

if __name__ == "__main__":
    asyncio.run(cleanup())
