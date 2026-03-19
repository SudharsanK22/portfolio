from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from bson import ObjectId
from backend.auth import get_current_user
from backend.database import get_database
from backend.models import HomeContent, AboutContent, Skill, Project, ContactInfo, SiteSettings

router = APIRouter(prefix="/content", tags=["content"])

# --- Home ---
@router.get("/home", response_model=HomeContent)
async def get_home():
    db = await get_database()
    home = await db.content.find_one({"type": "home"})
    if not home:
        return HomeContent()
    return home

@router.put("/home")
async def update_home(content: HomeContent, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    data = content.dict(by_alias=True)
    if "_id" in data:
        del data["_id"]
    await db.content.update_one(
        {"type": "home"},
        {"$set": {**data, "type": "home"}},
        upsert=True
    )
    return {"message": "Home content updated"}

# --- About ---
@router.get("/about", response_model=AboutContent)
async def get_about():
    db = await get_database()
    about = await db.content.find_one({"type": "about"})
    if not about:
        return AboutContent()
    return about

@router.put("/about")
async def update_about(content: AboutContent, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    data = content.dict(by_alias=True)
    if "_id" in data:
        del data["_id"]
    await db.content.update_one(
        {"type": "about"},
        {"$set": {**data, "type": "about"}},
        upsert=True
    )
    return {"message": "About content updated"}

# --- Skills ---
@router.get("/skills", response_model=List[Skill])
async def get_skills():
    db = await get_database()
    skills = await db.skills.find().to_list(100)
    return skills

@router.post("/skills")
async def add_skill(skill: Skill, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    data = skill.dict(by_alias=True)
    if "_id" in data:
        del data["_id"]
    await db.skills.insert_one(data)
    return {"message": "Skill added"}

@router.delete("/skills/{skill_id}")
async def delete_skill(skill_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID format")
    result = await db.skills.delete_one({"_id": ObjectId(skill_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted"}

# --- Projects ---
@router.get("/projects", response_model=List[Project])
async def get_projects():
    db = await get_database()
    projects = await db.projects.find().to_list(100)
    return projects

@router.post("/projects")
async def add_project(project: Project, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    data = project.dict(by_alias=True)
    if "_id" in data:
        del data["_id"]
    await db.projects.insert_one(data)
    return {"message": "Project added"}

@router.delete("/projects/{project_id}")
async def delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID format")
    result = await db.projects.delete_one({"_id": ObjectId(project_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}

@router.put("/projects/{project_id}")
async def update_project(project_id: str, project: Project, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    # Remove _id from dict to avoid update errors
    project_data = project.dict(by_alias=True)
    if "_id" in project_data:
        del project_data["_id"]
        
    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": project_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project updated"}

# --- Contact ---
@router.get("/contact", response_model=ContactInfo)
async def get_contact():
    db = await get_database()
    contact = await db.content.find_one({"type": "contact"})
    if not contact:
        return ContactInfo(email="demo@example.com")
    return contact
@router.put("/contact")
async def update_contact(content: ContactInfo, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    data = content.dict(by_alias=True)
    if "_id" in data:
        del data["_id"]
    await db.content.update_one(
        {"type": "contact"},
        {"$set": {**data, "type": "contact"}},
        upsert=True
    )
    return {"message": "Contact info updated"}

# --- Site Settings ---
@router.get("/settings", response_model=SiteSettings)
async def get_settings():
    db = await get_database()
    settings = await db.content.find_one({"type": "settings"})
    if not settings:
        return SiteSettings()
    return settings

@router.put("/settings")
async def update_settings(content: SiteSettings, current_user: dict = Depends(get_current_user)):
    db = await get_database()
    data = content.dict(by_alias=True)
    if "_id" in data:
        del data["_id"]
    await db.content.update_one(
        {"type": "settings"},
        {"$set": {**data, "type": "settings"}},
        upsert=True
    )
    return {"message": "Site settings updated"}
