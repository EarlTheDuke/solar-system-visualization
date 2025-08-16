param(
    [string]$CommitMessage = "Auto-commit: Update project files"
)

Write-Host "Starting git operations..." -ForegroundColor Green

try {
    Write-Host "Adding files..." -ForegroundColor Yellow
    git add .
    
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m $CommitMessage
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "Error occurred: $_" -ForegroundColor Red
}
