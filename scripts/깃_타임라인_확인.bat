@echo off
chcp 65001 > nul
cls
cd /d "%~dp0.."
echo ========================================================
echo               [ 소모품 대시보드 깃 타임라인 ]
echo ========================================================
echo.
git log --graph --pretty=format:"%%C(yellow)%%h%%Creset -%%C(auto)%%d%%Creset %%s %%Cgreen(%%cr)%%Creset %%C(bold blue)<%%an>%%Creset" -n 25
echo.
echo ========================================================
pause
