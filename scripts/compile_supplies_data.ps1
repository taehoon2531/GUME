# 소모품 텍스트(raw_data/소모품.txt) → data/data.js 변환 및 중복 제거 스크립트
# - 2026-11-01 이후 신규 데이터는 [입고일자|업체명|품명|규격|수량|단가|공급가액|비고] 기준 자동 중복 제거(1건만 유지)
# - 2026-10-20 이전 기존 데이터(45,922건)는 원형 보존

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
if (-not (Test-Path (Join-Path $projectRoot "index.html"))) { $projectRoot = $scriptDir }
Set-Location $projectRoot

$txtPath = Join-Path $projectRoot "raw_data\소모품.txt"
$outPath = Join-Path $projectRoot "data\data.js"

function Escape-JsString([string]$s) {
    if ($null -eq $s) { return "" }
    return $s.Replace("\", "\\").Replace('"', '\"').Replace("`r", "").Replace("`n", " ")
}

function Format-Num([string]$raw) {
    $clean = ($raw -replace '[,\s"]', '')
    if ([string]::IsNullOrWhiteSpace($clean)) { return "0" }
    $val = 0.0
    if ([double]::TryParse($clean, [System.Globalization.NumberStyles]::Any, [System.Globalization.CultureInfo]::InvariantCulture, [ref]$val)) {
        if ($val -eq [Math]::Floor($val)) {
            return ([long]$val).ToString()
        } else {
            return $val.ToString([System.Globalization.CultureInfo]::InvariantCulture)
        }
    }
    return "0"
}

$lines = [System.IO.File]::ReadAllLines($txtPath, [System.Text.Encoding]::UTF8)
Write-Host "Reading $txtPath ($($lines.Count) lines)..."

$novRows = New-Object System.Collections.Generic.List[object]
$oldLines = New-Object System.Collections.Generic.List[string]
$seenNov = [System.Collections.Generic.HashSet[string]]::new()
$novDupCount = 0
$skippedCount = 0
$maxDate = ""

for ($i = 1; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $f = $line.Split("`t")
    if ($f.Count -lt 7) {
        $skippedCount++
        continue
    }

    $d = $f[0].Trim().Trim('"')
    if ($d -notmatch '^\d{4}-\d{2}-\d{2}$') {
        $skippedCount++
        continue
    }

    $v = $f[1].Trim()
    $p = $f[2].Trim()
    $s = $f[3].Trim()
    $q = Format-Num $f[4]
    $u = Format-Num $f[5]
    $a = Format-Num $f[6]
    $r = if ($f.Count -ge 8) { $f[7].Trim() } else { "" }

    if ($d -gt $maxDate) { $maxDate = $d }

    $jsLine = "  [`"$(Escape-JsString $d)`",`"$(Escape-JsString $v)`",`"$(Escape-JsString $p)`",`"$(Escape-JsString $s)`",$q,$u,$a,`"$(Escape-JsString $r)`"],"

    if ($d -ge "2026-11-01") {
        $key = "$d|$v|$p|$s|$q|$u|$a|$r"
        if (-not $seenNov.Add($key)) {
            $novDupCount++
            continue
        }
        $novRows.Add([PSCustomObject]@{ Date = $d; Line = $jsLine })
    } else {
        $oldLines.Add($jsLine)
    }
}

# Sort Nov+ rows descending by date (preserve relative order for same date)
$sortedNov = $novRows | Sort-Object -Property Date -Descending

$sb = [System.Text.StringBuilder]::new(5000000)
[void]$sb.AppendLine("// Pre-compiled Purchasing Data")
[void]$sb.AppendLine("window.INITIAL_SUPPLIES_DATA = [")
foreach ($row in $sortedNov) {
    [void]$sb.AppendLine($row.Line)
}
foreach ($line in $oldLines) {
    [void]$sb.AppendLine($line)
}
[void]$sb.Append("];")

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($outPath, $sb.ToString(), $utf8NoBom)

$totalCount = $novRows.Count + $oldLines.Count
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Compiled successfully -> $outPath" -ForegroundColor Green
Write-Host "  New (2026-11+) unique rows: $($novRows.Count)"
Write-Host "  New duplicates filtered:    $novDupCount"
Write-Host "  Historical (<=2026-10) rows:$($oldLines.Count)"
Write-Host "  Total rows:                 $totalCount"
Write-Host "  Max date:                   $maxDate"
Write-Host "==========================================================" -ForegroundColor Cyan
