from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from bson import ObjectId
from pydantic_core import core_schema

class PyObjectId(str):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            )
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

class MongoBaseModel(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id", serialization_alias="_id")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )

# Web Content Models
class HomeContent(MongoBaseModel):
    title: str = "Welcome to My Portfolio"
    subtitle: str = "I build amazing things"
    hero_image: Optional[str] = None
    welcome_text: str = "Hi, I'm Sudharsan"
    view_work_label: str = "View My Work"
    about_me_label: str = "About Me"

class AboutContent(MongoBaseModel):
    description: str = "Tell us about yourself..."
    profile_image: Optional[str] = None
    section_title: str = "My Profile"

class Skill(MongoBaseModel):
    name: str
    level: int = 80 # 0-100
    category: str = "General"

class Project(MongoBaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    link: Optional[str] = None

class ContactInfo(MongoBaseModel):
    email: EmailStr
    phone: Optional[str] = None
    social_links: List[dict] = [] # e.g. [{"platform": "LinkedIn", "url": "..."}]
    section_title: str = "Get In Touch"
    subtitle: str = "Let's work together on your next project"

class SiteSettings(MongoBaseModel):
    brand_name: str = "Portfolio."
    skills_section_title: str = "Technical Skills"
    projects_section_title: str = "Recent Work"

# Auth Models
class User(MongoBaseModel):
    username: str
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
