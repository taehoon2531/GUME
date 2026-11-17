# ========================================================================
#   사내 LAN 대시보드 방화벽 포트(8080) 개방 도구
# ========================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "사내 LAN 대시보드 방화벽(8080) 포트 개방"

Clear-Host
Write-Host ""
Write-Host " ========================================================" -ForegroundColor Cyan
Write-Host "   사내 LAN 대시보드 방화벽 포트(8080) 개방 도구" -ForegroundColor Yellow
Write-Host " ========================================================" -ForegroundColor Cyan
Write-Host ""

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    Write-Host " [✔ 관리자 권한 확인됨]" -ForegroundColor Green
    Write-Host " Windows 방화벽 인바운드 규칙(8080 포트)을 등록합니다..." -ForegroundColor White
    
    try {
        netsh advfirewall firewall delete rule name="SW_Dashboard_LAN" 2>$null | Out-Null
        netsh advfirewall firewall add rule name="SW_Dashboard_LAN" dir=in action=allow protocol=TCP localport=8080 profile=private,domain,public | Out-Null
        Write-Host ""
        Write-Host " ========================================================" -ForegroundColor Green
        Write-Host "   [성공] 8080 포트가 정상적으로 개방되었습니다!" -ForegroundColor Green
        Write-Host "   이제 사내 동료들이 정상적으로 대시보드에 접속할 수 있습니다." -ForegroundColor White
        Write-Host " ========================================================" -ForegroundColor Green
    } catch {
        Write-Host " 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host " ========================================================" -ForegroundColor Yellow
    Write-Host "   [안내] 방화벽 포트를 개방하려면 관리자 권한이 필요합니다." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   📌 해결 방법:" -ForegroundColor White
    Write-Host "   1. 이 창을 닫습니다." -ForegroundColor White
    Write-Host "   2. [사내_방화벽_포트열기_8080.bat] 파일을 마우스 우클릭합니다." -ForegroundColor White
    Write-Host "   3. ▶ '관리자 권한으로 실행'을 클릭하세요!" -ForegroundColor Yellow
    Write-Host " ========================================================" -ForegroundColor Yellow
}

Write-Host ""
pause
