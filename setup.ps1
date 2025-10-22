# FitCoach AI - Quick Setup Script
# Run this script to set up your project

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  FitCoach AI - Quick Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if .env file exists
Write-Host "Checking environment file..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Red
    if (Test-Path ".env.example") {
        Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" ".env"
        Write-Host "✓ .env file created. Please edit it with your API keys!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Required API Keys:" -ForegroundColor Cyan
        Write-Host "  1. Google OAuth Client ID: https://console.cloud.google.com/apis/credentials" -ForegroundColor White
        Write-Host "  2. Gemini API Key: https://aistudio.google.com/app/apikey" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "✗ .env.example not found either!" -ForegroundColor Red
    }
}

Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Edit .env file with your API keys" -ForegroundColor White
Write-Host "  2. Run: npm start" -ForegroundColor White
Write-Host "  3. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  - SETUP_COMPLETE.md - Complete setup guide" -ForegroundColor White
Write-Host "  - API_KEY_SETUP.md - API key instructions" -ForegroundColor White
Write-Host "  - GOOGLE_OAUTH_SETUP.md - OAuth setup" -ForegroundColor White
Write-Host ""
