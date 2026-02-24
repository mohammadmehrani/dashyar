$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot\..\backend"

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Host "Python is not installed or not in PATH." -ForegroundColor Red
  Write-Host "Install Python 3.12+ and rerun this script." -ForegroundColor Yellow
  exit 1
}

if (-not (Test-Path ".venv")) {
  python -m venv .venv
}

$pythonExe = ".\.venv\Scripts\python.exe"
if (-not (Test-Path $pythonExe)) {
  Write-Host "Virtual environment was not created correctly." -ForegroundColor Red
  exit 1
}

& $pythonExe -m pip install --upgrade pip
& $pythonExe -m pip install -r requirements.txt

& $pythonExe manage.py migrate
& $pythonExe manage.py create_admin_user
& $pythonExe manage.py seed_initial_content

Write-Host ""
Write-Host "Backend bootstrap completed." -ForegroundColor Green
Write-Host "Run backend server with:" -ForegroundColor Cyan
Write-Host "  .\.venv\Scripts\python.exe manage.py runserver"
