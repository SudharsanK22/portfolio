import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# Categorization mapping
MAPPING = {
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "Swift", "Ruby", "PHP"],
    "Frontend": ["React", "Vue", "Angular", "Next.js", "TailwindCSS", "HTML", "CSS", "Sass", "Redux", "Framer Motion", "Three.js"],
    "Backend": ["FastAPI", "Node.js", "Django", "Spring Boot", "Express", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    "Tools": ["Docker", "Kubernetes", "Git", "GitHub", "Vercel", "AWS", "Google Cloud", "Netlify", "Postman", "Linux"]
}

async def run():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["portfolio_cms"]
    skills_col = db["skills"]
    
    cursor = skills_col.find({"category": "General"})
    count = 0
    async for skill in cursor:
        name = skill.get("name", "")
        new_cat = "General"
        for cat, names in MAPPING.items():
            if any(n.lower() in name.lower() for n in names):
                new_cat = cat
                break
        
        await skills_col.update_one({"_id": skill["_id"]}, {"$set": {"category": new_cat}})
        print(f"Updated {name} to {new_cat}")
        count += 1
    
    print(f"Total skills updated: {count}")

if __name__ == "__main__":
    asyncio.run(run())
