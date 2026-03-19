import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

SAMPLE_SKILLS = [
    {"name": "Java", "level": 90, "category": "Languages"},
    {"name": "Python", "level": 85, "category": "Languages"},
    {"name": "JavaScript", "level": 95, "category": "Languages"},
    {"name": "React", "level": 92, "category": "Frontend"},
    {"name": "TailwindCSS", "level": 88, "category": "Frontend"},
    {"name": "Framer Motion", "level": 80, "category": "Frontend"},
    {"name": "FastAPI", "level": 85, "category": "Backend"},
    {"name": "MongoDB", "level": 82, "category": "Backend"},
    {"name": "Docker", "level": 75, "category": "Tools"},
    {"name": "Git", "level": 90, "category": "Tools"}
]

async def run():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["portfolio_cms"]
    skills_col = db["skills"]
    
    # Optional: Clear existing skills to show the new ones clearly
    # await skills_col.delete_many({})
    
    for skill in SAMPLE_SKILLS:
        result = await skills_col.update_one(
            {"name": skill["name"]}, 
            {"$set": skill}, 
            upsert=True
        )
        print(f"Upserted {skill['name']} in {skill['category']}")

if __name__ == "__main__":
    asyncio.run(run())
