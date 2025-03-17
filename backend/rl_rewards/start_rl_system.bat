@echo off
echo Starting WasteWise RL Rewards System...
echo.
echo Step 1: Setting up environment
cd %~dp0
echo Current directory: %CD%
echo.

echo Step 2: Training initial model (if needed)
if not exist "data\rl_model.pkl" (
  echo No existing model found. Training initial model...
  python train_model.py
) else (
  echo Existing model found in data\rl_model.pkl
)
echo.

echo Step 3: Starting Flask server
echo Opening new command prompt to run server...
start cmd /k "cd %~dp0\server && python app.py"
echo.

echo Step 4: Testing API endpoints
echo Waiting for server to start...
timeout /t 5 /nobreak
echo Running API tests...
python test_api.py
echo.

echo Step 5: All systems are running!
echo.
echo => Backend API running at: http://localhost:5000
echo => Admin Dashboard available at: http://localhost:3000/rewards-admin
echo => API test page: Open browser_test.html in your browser
echo.
echo To stop the system, close the server command prompt window.

pause