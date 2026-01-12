# PostgreSQL Setup Script for Windows
# Run this as administrator or with postgres superuser credentials

# Change to the backend-robot directory
$scriptPath = "D:\Workflow\React-App\backend-robot\setup-db.sql"

# Execute the SQL file
# Make sure PostgreSQL is in your PATH or use the full path
Write-Host "Executing database setup script..."
Write-Host "Make sure PostgreSQL is running and the postgres user password is ready."
Write-Host ""
Write-Host "Run this command in PowerShell (you may need admin rights):"
Write-Host ""
Write-Host "psql -U postgres -d robot_db -f `"$scriptPath`""
Write-Host ""
Write-Host "If psql is not in PATH, try the full path:"
Write-Host "C:\Program Files\PostgreSQL\16\bin\psql -U postgres -d robot_db -f `"$scriptPath`""
