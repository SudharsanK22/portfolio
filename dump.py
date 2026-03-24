import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import json
import os

url = "mongodb://localhost:27017"

async def dump():
    print(f"Connecting to {url}")
    client = AsyncIOMotorClient(url, serverSelectionTimeoutMS=5000)
    db = client["portfolio_cms"]
    
    skills = await db.skills.find({}).to_list(None)
    projects = await db.projects.find({}).to_list(None)
    content = await db.content.find({}).to_list(None)
    
    for s in skills: s['_id'] = str(s['_id'])
    for p in projects: p['_id'] = str(p['_id'])
    for c in content: c['_id'] = str(c['_id'])
    
    with open('dumped_data.json', 'w') as f:
        json.dump({'skills': skills, 'projects': projects, 'content': content}, f, indent=2)
    print("Dumped to dumped_data.json")

asyncio.run(dump())
