# Deployment Guide: Vercel & Render

Follow these steps to deploy your full-stack application.

## 1. Backend (Render)

Render is great for hosting your FastAPI server.

### Prerequisites
- Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a free cluster.
- Get your **MongoDB Connection String** (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/...`).

### Steps
1. Push your code to a **GitHub repository**.
2. Go to [Render](https://render.com) and create a **New Web Service**.
3. Connect your repository.
4. Configure the service:
   - **Root Directory**: Leave this **EMPTY**.
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port 10000`
5. Add **Environment Variables** in Render's dashboard:
   - `MONGODB_URL`: Your MongoDB Atlas string.
   - `DATABASE_NAME`: `portfolio_cms`
   - `SECRET_KEY`: A long, random string.

---

## 2. Frontend (Vercel)

Vercel is perfect for your React/Vite frontend.

### Steps
1. Go to [Vercel](https://vercel.com) and create a **New Project**.
2. Connect your repository.
3. **IMPORTANT: Project Settings**:
   - **Root Directory**: Set this to `frontend`.
   - **Framework Preset**: Should auto-detect as `Vite`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables**:
   - `VITE_API_BASE_URL`: The URL of your Render backend (e.g., `https://your-backend.onrender.com/api`).

---

## 3. Important Notes
- **CORS Setup**: In `backend/main.py`, update `allow_origins` to include your Vercel deployment URL (once you have it).
- **Public URL**: Remember to use the Render backend URL in the frontend environment variables.
