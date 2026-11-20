[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
if (-not (Test-Path (Join-Path $projectRoot "index.html"))) { $projectRoot = $scriptDir }
Set-Location $projectRoot

$gitExe = "C:\Users\user\AppData\Local\Programs\Git\cmd\git.exe"
if (-not (Test-Path $gitExe)) {
    $gitExe = "git"
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  (주)에스앤더블류 소모품 대시보드 - GitHub 푸시 업로드" -ForegroundColor Yellow
Write-Host "  원격 저장소: https://github.com/taehoon2531/GUME" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] 변경 사항 확인 및 자동 커밋 중..." -ForegroundColor Gray
& $gitExe add .
& $gitExe commit -m "update: 소모품 대시보드 최신 버전 갱신" 2>$null | Out-Null

Write-Host ""
Write-Host "[2/2] GitHub로 전송 중..." -ForegroundColor Green
Write-Host "GitHub 로그인 창이나 Personal Access Token 입력 요청이 나타날 수 있습니다." -ForegroundColor DarkYellow
Write-Host ""

& $gitExe push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " [성공] GitHub에 성공적으로 업로드되었습니다!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "----------------------------------------------------------" -ForegroundColor Red
    Write-Host " [안내] GitHub 전송 중 인증이 필요하거나 실패했습니다." -ForegroundColor Red
    Write-Host " - 깃허브 사용자명: taehoon2531" -ForegroundColor Yellow
    Write-Host " - 비밀번호: 발급받은 Personal Access Token 입력" -ForegroundColor Yellow
    Write-Host "----------------------------------------------------------" -ForegroundColor Red
}