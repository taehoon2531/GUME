@echo off
chcp 65001 > nul
title 소모품 대시보드 ➔ 깃허브(GitHub) 푸시 동기화
echo ========================================================
echo   (주)에스앤더블류 소모품 대시보드 - GitHub 푸시 (업로드)
echo   원격 저장소: https://github.com/taehoon2531/GUME
echo ========================================================
echo.

set "GIT_CMD=C:\Users\user\AppData\Local\Programs\Git\cmd\git.exe"

cd /d "%~dp0"

echo [1/3] 변경 사항 검사 및 자동 커밋 중...
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "update: 소모품 대시보드 데이터 및 소스코드 갱신" 2>nul

echo.
echo [2/3] 깃허브(GitHub)로 전송(Push) 중...
echo * 깃허브 로그인 창이나 Personal Access Token(PAT) 입력 요청이 있을 수 있습니다.
echo.
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  [성공] 깃허브(https://github.com/taehoon2531/GUME)에
    echo         성공적으로 업로드(Push)되었습니다!
    echo ========================================================
) else (
    echo.
    echo --------------------------------------------------------
    echo  [안내] 푸시 중 인증이 필요하거나 저장소 설정이 필요합니다.
    echo  - 깃허브 Personal Access Token(PAT)을 발급받아 비밀번호 자리에 입력하시거나,
    echo  - 저장소(Repository)가 비공개(Private)인 경우 계정 권한을 확인해주세요.
    echo --------------------------------------------------------
)

echo.
echo 창을 닫으려면 아무 키나 누르세요...
pause > nul
