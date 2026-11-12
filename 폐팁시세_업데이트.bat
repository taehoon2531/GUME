@echo off
chcp 65001 > nul
title [올메탈] 폐초경 및 폐팁 시세 최신 동기화
cd /d "%~dp0"

echo ========================================================
echo   (주)에스앤더블류 구매부 - 올메탈 폐팁 시세 자동 업데이트
echo ========================================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0update_scrap.ps1"

echo.
echo 작업을 완료했습니다.
echo 대시보드(웹브라우저)를 새로고침(F5)하시면 최신 시세가 반영됩니다.
echo.
pause
