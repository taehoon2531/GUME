@echo off
title 소모품 대시보드 - GitHub 푸시 동기화
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0push_to_github.ps1"
echo.
pause
