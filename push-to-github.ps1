# Push project to GitHub repository
param(
    [string]$Token = ""
)

$ErrorActionPreference = "Stop"

$gitExe = "$env:LOCALAPPDATA\MinGit\cmd\git.exe"
if (-not (Test-Path $gitExe)) {
    $gitCmd = Get-Command git -ErrorAction SilentlyContinue
    if ($gitCmd) {
        $gitExe = $gitCmd.Source
    } else {
        throw "Git is not installed."
    }
}

Write-Host "Using Git at: $gitExe" -ForegroundColor Cyan

# 1. Initialize repository if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Cyan
    & $gitExe init
}

# 2. Configure user details for commit if not set
& $gitExe config user.name "manishKumarxyt"
& $gitExe config user.email "manishKumarxyt@users.noreply.github.com"

# 3. Create .gitignore if not present
$gitignoreContent = @"
# Local temp and logs
*.log
.system_generated/
"@

if (-not (Test-Path ".gitignore")) {
    Set-Content -Path ".gitignore" -Value $gitignoreContent
}

# 4. Check/Set remote origin
$repoUrl = "https://github.com/manishKumarxyt/ApnaBazaar.git"
$remotes = & $gitExe remote

if ($remotes -contains "origin") {
    Write-Host "Updating remote origin to $repoUrl..." -ForegroundColor Cyan
    & $gitExe remote set-url origin $repoUrl
} else {
    Write-Host "Adding remote origin $repoUrl..." -ForegroundColor Cyan
    & $gitExe remote add origin $repoUrl
}

# 5. Set branch to main
& $gitExe branch -M main

# 6. Stage and commit files
Write-Host "Staging all project files..." -ForegroundColor Cyan
& $gitExe add .

Write-Host "Committing files..." -ForegroundColor Cyan
try {
    & $gitExe commit -m "SabkaBazar - Har dukaan apke paas! Hyperlocal quick-commerce web application"
} catch {
    Write-Host "Commit status: Working tree up to date."
}

# 7. Push to GitHub
if ($Token) {
    Write-Host "Authenticating with provided GitHub Token..." -ForegroundColor Green
    $authedUrl = "https://$($Token)@github.com/manishKumarxyt/ApnaBazaar.git"
    & $gitExe push -u $authedUrl main
} else {
    Write-Host "Pushing to $repoUrl (main branch)..." -ForegroundColor Green
    & $gitExe push -u origin main
}

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  Successfully pushed to GitHub: $repoUrl" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
