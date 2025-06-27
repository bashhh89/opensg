@echo off
echo 🔌 Starting Backend Server with Python 3.11...
echo.
cd backend
py -3.11 -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --reload
pause 