@echo off
echo Setting up Shared Wishlist App...

echo Checking dependencies...

REM Backend
echo Setting up backend...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    npm install
)

echo Building backend...
npm run build

REM Frontend
echo Setting up frontend...
cd ..\frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)

echo Setup complete!
echo.
echo To start the application:
echo 1. Start MongoDB if not running
echo 2. Backend: cd backend ^&^& npm run dev
echo 3. Frontend: cd frontend ^&^& npm start
echo.
echo The app will be available at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000

pause
