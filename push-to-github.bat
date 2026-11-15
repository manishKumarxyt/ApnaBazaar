@echo off
title Push SabkaBazar to GitHub
echo ========================================================
echo   Pushing SabkaBazar to https://github.com/manishKumarxyt/ApnaBazaar.git
echo ========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0push-to-github.ps1"
echo.
pause
