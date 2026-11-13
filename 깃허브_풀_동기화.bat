@echo off
title GitHub Sync - Pull
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0pull_from_github.ps1"
echo.
pause
