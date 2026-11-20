@echo off
title Firewall Port Opener
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0open_firewall.ps1"
