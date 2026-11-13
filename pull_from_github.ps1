[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

$gitExe = "C:\Users\user\AppData\Local\Programs\Git\cmd\git.exe"
if (-not (Test-Path $gitExe)) {
    $gitExe = "git"
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  (주)에스앤더블류 소모품 대시보드 - GitHub 풀 (내려받기)" -ForegroundColor Yellow
Write-Host "  원격 저장소: https://github.com/taehoon2531/GUME" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/1] GitHub 최신 변경 내역을 내려받는 중..." -ForegroundColor Green
& $gitExe pull origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " [성공] 깃허브 최신 코드를 성공적으로 반영(Pull)했습니다!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "----------------------------------------------------------" -ForegroundColor Red
    Write-Host " [안내] 깃허브 풀 중 오류가 발생했습니다." -ForegroundColor Red
    Write-Host " 네트워크 상태나 권한을 확인해주세요." -ForegroundColor Yellow
    Write-Host "----------------------------------------------------------" -ForegroundColor Red
}
