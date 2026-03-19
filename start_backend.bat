@echo off
set "VENV_PATH=%~dp0venv"
"%VENV_PATH%\Scripts\python" -m uvicorn backend.main:app --host 0.0.0.0 --port 8008 --reload
