@echo off
title 소모품 대시보드 - GitHub 풀 동기화
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0pull_from_github.ps1"
echo.
pause
