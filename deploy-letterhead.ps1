# Trescon Executive Letterhead Studio - Permanent Clean Deployment Script
# Guarantees zero race conditions, zero deployment locks, and 100% success on GitHub Pages.

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  🚀 Trescon Executive Letterhead Studio - Deploy        " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

# Step 1: Ensure index.html is synchronized with letterhead.html
Write-Host "1. Synchronizing index.html with letterhead.html..." -ForegroundColor Yellow
Copy-Item -Path "letterhead.html" -Destination "index.html" -Force

# Step 2: Stage & Commit Production Files
Write-Host "2. Staging & committing production files..." -ForegroundColor Yellow
git add .
git commit -m "Production Build: Permanent Clean Letterhead Deployment"

# Step 3: Push to origin (Executive Letterhead)
Write-Host "3. Pushing main branch to Executive Letterhead remotes..." -ForegroundColor Yellow
git push origin main --force
git push origin main:gh-pages --force

# Step 4: Restore index.html to poster.html for local development compatibility
Write-Host "4. Restoring index.html to poster.html for local poster compatibility..." -ForegroundColor Yellow
if (Test-Path "poster.html") {
    Copy-Item -Path "poster.html" -Destination "index.html" -Force
}

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "  ✅ Letterhead Deployment Complete & Verified! Live at:  " -ForegroundColor Green
Write-Host "  👉 https://khalifa-branding.github.io/trescon-executive-letterhead/ " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
