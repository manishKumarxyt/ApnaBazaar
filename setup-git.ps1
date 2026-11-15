# Setup MinGit portable and push to GitHub repository
$ErrorActionPreference = "Stop"

$destDir = "$env:LOCALAPPDATA\MinGit"
$gitExe = "$destDir\cmd\git.exe"

if (-not (Test-Path $gitExe)) {
    Write-Host "MinGit not found. Downloading..." -ForegroundColor Cyan
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    $zipPath = "$env:TEMP\mingit_package.zip"
    $url = "https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip"

    Write-Host "Downloading MinGit from $url..." -ForegroundColor Cyan
    curl.exe -L $url -o $zipPath

    Write-Host "Extracting MinGit to $destDir..." -ForegroundColor Cyan
    tar.exe -xf $zipPath -C $destDir

    Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
}

Write-Host "Verifying git installation..." -ForegroundColor Green
& $gitExe --version

Write-Host "Git is ready!" -ForegroundColor Green
