# Full-Stack Portfolio Website

A modern, dynamic portfolio website with a FastAPI backend and a React/Vite frontend.

## Features
- **Dynamic Content**: Manage your projects, skills, and about section through an admin panel.
- **3D Background**: Luxury 3D backgrounds using `@react-three/fiber`.
- **Animations**: Premium animations using `framer-motion` and `GSAP`.
- **Secure Admin**: JWT-based authentication for the admin dashboard.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS (v4), Framer Motion, Lucide Icons.
- **Backend**: Python (FastAPI), MongoDB (Motor), Pydantic.
- **Deployment**: Docker, Vercel (Frontend), Docker Compose (Local Dev).

## Locally Running the Project

### Using Docker Compose (Recommended)
1. Make sure you have Docker and Docker Compose installed.
2. Run `docker-compose up --build`.
3. The frontend will be at `http://localhost:5173` and the backend at `http://localhost:8008`.

### Manual Setup

#### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Create a `.env` file based on `.env.example`.
4. Run `uvicorn main:app --port 8008 --reload`.

#### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env` file based on `.env.example`.
4. Run `npm run dev`.

## Deployment

### Backend (Docker)
Use the provided `Dockerfile.backend` to deploy your backend to any service that supports Docker (Render, Railway, DigitalOcean, etc.).

### Frontend (Vercel)
The project is configured for Vercel using `vercel.json`. It will automatically proxy `/api` requests to your hosted backend.
1. Connect your repo to Vercel.
2. Set `YOUR_BACKEND_URL` in `vercel.json` (or use environment variable overrides).
3. Deploy!

## License
MIT
