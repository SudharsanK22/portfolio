from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
import uuid
import logging
from backend.database import settings, get_database, has_dns
from backend.routes import auth, content
from backend.auth import get_current_user

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Dynamic Portfolio CMS API")

# Always allow the production Render origin and local dev origin
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
allowed_origins = [origin.strip() for origin in raw_origins if origin.strip()]

# Add specific Render and Vercel domains for safety during deployment
production_domains = [
    "https://portfolio-zar3.vercel.app",
    "https://portfolio-1-5ucy.onrender.com"
]
for domain in production_domains:
    if domain not in allowed_origins:
        allowed_origins.append(domain)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"},
        headers={
            "Access-Control-Allow-Origin": request.headers.get("Origin", "*"),
            "Access-Control-Allow-Credentials": "true",
        }
    )

@app.on_event("startup")
async def startup_event():
    logger.info(f"API starting up. ALLOWED_ORIGINS={allowed_origins}")
    if os.getenv("RENDER"):
        logger.info("Running on Render")

# Static files for uploads
UPLOAD_DIR = "backend/uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(auth.router, prefix="")
app.include_router(content.router, prefix="")

@app.post("/upload")
async def upload_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    file_ext = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"url": f"/uploads/{file_name}"}

@app.get("/health")
async def health_check():
    try:
        db = await get_database()
        await db.command("ping")
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "error", 
                "database": str(e),
                "has_dns_package": has_dns,
                "mongodb_url_type": "srv" if "mongodb+srv" in settings.MONGODB_URL else "standard"
            }
        )
