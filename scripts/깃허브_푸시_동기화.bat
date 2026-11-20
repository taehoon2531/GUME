@echo off
title GitHub Sync - Push
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0push_to_github.ps1"
echo.
pause
