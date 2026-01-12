@echo off
echo Installing root dependencies...
call npm install

echo Installing backend dependencies...
cd backend-robot
call npm install
cd ..

echo Installing frontend dependencies...
cd mr-robot
call npm install
cd ..

echo Building backend...
cd backend-robot
call npm run build
cd ..

echo Building frontend...
cd mr-robot
call npm run build
cd ..

echo Build complete!
