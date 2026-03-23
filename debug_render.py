import os
import asyncio
from backend.database import settings, get_database
from backend.models import HomeContent
from bson import ObjectId

async def debug_render_issue():
    print("Simulating Render environment...")
    os.environ["RENDER"] = "true"
    # Even if MONGODB_URL is not set, it should fall back to local (which will fail on Render, but let's see if it crashes)
    
    print(f"Settings MONGODB_URL: {settings.MONGODB_URL}")
    
    try:
        # Test a model instantiation that happens in routes
        doc = {"_id": ObjectId(), "type": "home", "title": "Test"}
        home = HomeContent(**doc)
        print("HomeContent instantiation: OK")
        
        dump = home.model_dump(by_alias=True)
        print(f"model_dump: {dump}")
        
    except Exception as e:
        print(f"Model error: {e}")

    try:
        db = await get_database()
        print("Database connection object retrieved")
        # On Render, if MONGODB_URL is wrong, this might ping fail
        # But here we just want to see if it even gets this far
    except Exception as e:
        print(f"Database error: {e}")

if __name__ == "__main__":
    asyncio.run(debug_render_issue())
