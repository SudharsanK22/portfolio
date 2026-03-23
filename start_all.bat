@echo off
echo Starting Portfolio CMS (Backend + Frontend)...

:: Start Backend in a new window
start "Backend Server" cmd /c "cd /d %~dp0 && start_backend.bat"

:: Start Frontend in a new window
start "Frontend Dev Server" cmd /c "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are starting up...
echo Backend: http://localhost:8008
echo Frontend: http://localhost:5173
echo.
pause
