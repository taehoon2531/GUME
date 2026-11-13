# 올메탈(AllMetal) 폐초경 및 폐팁 시세 자동 업데이트 스크립트
# 작성일: 2026-11-13
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

$jsonPath = Join-Path $scriptDir "scrap_prices.json"
$jsPath = Join-Path $scriptDir "scrap_data.js"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  올메탈(AllMetal) 폐초경/폐팁 시세 동기화 스크립트" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. 기존 데이터 로드
$existingData = @()
$maxId = 173

if (Test-Path $jsonPath) {
    try {
        $raw = Get-Content $jsonPath -Raw -Encoding UTF8
        $existingData = $raw | ConvertFrom-Json
        if ($existingData.Count -gt 0) {
            $maxId = ($existingData | Measure-Object -Property id -Maximum).Maximum
        }
    } catch {
        Write-Warning "기존 데이터 로드 실패: $_"
    }
}

Write-Host "현재 저장된 최신 공지 번호(wr_id): $maxId" -ForegroundColor Green
Write-Host "새로운 공지 확인을 시작합니다... (ID: $($maxId + 1) 부터 탐색)" -ForegroundColor Gray

# 2. 신규 공지 확인 루프
$wc = New-Object System.Net.WebClient
$wc.Encoding = [System.Text.Encoding]::UTF8
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

$checkId = $maxId + 1
$consecutiveFails = 0
$newEntries = @()

while ($consecutiveFails -lt 4 -and $checkId -le ($maxId + 40)) {
    $url = "https://allmetal.co.kr/bbs/board.php?bo_table=price&wr_id=$checkId"
    try {
        $html = $wc.DownloadString($url)
        if ($html -match '작성일\s*([0-9]{2}-[0-9]{2}-[0-9]{2})') {
            $date = "20" + $matches[1]
            $title = ""
            if ($html -match '<h1 id="bo_v_title">[\s\S]*?<span class="bo_v_tit">([^<]+)</span>') {
                $title = $matches[1].Trim()
            } elseif ($html -match '<title>([^<]+)</title>') {
                $title = $matches[1].Trim()
            }

            $endmill = 0
            if ($html -match '폐초경\(엔드밀\)[\s\S]*?<td[^>]*>([0-9,]+)') {
                $endmill = [int]($matches[1] -replace ',', '')
            }

            $tip = 0
            if ($html -match '폐초경\(팁\)[\s\S]*?<td[^>]*>([0-9,]+)') {
                $tip = [int]($matches[1] -replace ',', '')
            }

            $lump = 0
            if ($html -match '초경\(덩어리\)[\s\S]*?<td[^>]*>([0-9,~]+)') {
                $valStr = $matches[1] -replace ',', ''
                if ($valStr -match '([0-9]+)~([0-9]+)') {
                    $lump = [int](([double]$matches[1] + [double]$matches[2]) / 2)
                } else {
                    $lump = [int]($valStr -replace '[^0-9]', '')
                }
                if ($lump -gt 200000) { $lump = 57500 }
            }

            $hss = 0
            if ($html -match 'HSS\(하이스\)[\s\S]*?<td[^>]*>([0-9,]+)') {
                $hss = [int]($matches[1] -replace ',', '')
            }

            if ($tip -gt 0 -or $endmill -gt 0) {
                Write-Host "[발견] wr_id=$checkId ($date): 폐팁 $($tip.ToString('N0'))원, 엔드밀 $($endmill.ToString('N0'))원" -ForegroundColor Green
                $newEntries += [PSCustomObject]@{
                    id = $checkId
                    date = $date
                    title = $title
                    tip = $tip
                    endmill = $endmill
                    lump = $lump
                    hss = $hss
                }
                $consecutiveFails = 0
            } else {
                $consecutiveFails++
            }
        } else {
            $consecutiveFails++
        }
    } catch {
        $consecutiveFails++
    }
    $checkId++
}

# 3. 신규 데이터 병합 및 저장
if ($newEntries.Count -gt 0) {
    Write-Host "`n새로운 공지 $($newEntries.Count)건을 성공적으로 수집했습니다!" -ForegroundColor Yellow
    $allList = @($existingData) + @($newEntries)
    
    # JSON 파일 갱신
    $jsonContent = $allList | ConvertTo-Json -Depth 5
    [System.IO.File]::WriteAllText($jsonPath, $jsonContent, [System.Text.Encoding]::UTF8)

    # scrap_data.js 갱신
    $jsContent = "// Scrap Metal Price History from allmetal.co.kr`nwindow.SCRAP_PRICES_DATA = " + $jsonContent + ";`n"
    [System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)

    Write-Host "[완료] scrap_prices.json 및 scrap_data.js 가 최신 시세로 업데이트되었습니다." -ForegroundColor Cyan
} else {
    Write-Host "`n[안내] 현재 최신 시세(wr_id=$maxId) 상태입니다. 새로운 공지가 아직 없습니다." -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
