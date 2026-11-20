@echo off
title SW Dashboard LAN Server
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0lan_server.ps1"
if %errorlevel% neq 0 pause
