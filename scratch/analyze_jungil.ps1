$dataJs = Get-Content -LiteralPath 'data.js' -Raw -Encoding UTF8
$lines = $dataJs -split "`r?`n" | Where-Object { $_ -match '중일상사' }

$entries = @()
foreach ($l in $lines) {
    if ($l -match '^\s*\["([^"]*)","([^"]*)","([^"]*)","([^"]*)",([0-9.]+),([0-9.]+),([0-9.]+),"(.*)"\]') {
        $entries += [PSCustomObject]@{
            Date = $matches[1]
            Vendor = $matches[2]
            Item = $matches[3]
            Spec = $matches[4]
            Qty = [double]$matches[5]
            Price = [double]$matches[6]
            Amount = [double]$matches[7]
            Remark = $matches[8]
        }
    }
}

Write-Host "Total parsed entries for 중일상사: $($entries.Count)"

# Sort by Date
$sorted = $entries | Sort-Object Date

$minDate = ($sorted | Select-Object -First 1).Date
$maxDate = ($sorted | Select-Object -Last 1).Date
Write-Host "Date range: $minDate ~ $maxDate"

# Distinct items & first seen date for each item
$itemHistory = @{}
foreach ($e in $sorted) {
    $key = "$($e.Item)|$($e.Spec)"
    if (-not $itemHistory.ContainsKey($key)) {
        $itemHistory[$key] = [PSCustomObject]@{
            Item = $e.Item
            Spec = $e.Spec
            FirstDate = $e.Date
            LastDate = $e.Date
            Count = 1
            TotalAmount = $e.Amount
            LastPrice = $e.Price
            FirstRemark = $e.Remark
            LastRemark = $e.Remark
        }
    } else {
        $itemHistory[$key].LastDate = $e.Date
        $itemHistory[$key].Count++
        $itemHistory[$key].TotalAmount += $e.Amount
        $itemHistory[$key].LastPrice = $e.Price
        $itemHistory[$key].LastRemark = $e.Remark
    }
}

Write-Host "Total distinct 품목+규격: $($itemHistory.Count)"

# Top 10 most recent entries (최신 입고 품목)
Write-Host "`n=== [중일상사] 가장 최근 입고된 품목 내역 TOP 10 ==="
$sorted | Select-Object -Last 10 | ForEach-Object {
    Write-Host ("{0} | {1} | {2} | {3}개 | {4:N0}원 | {5}" -f $_.Date, $_.Item, $_.Spec, $_.Qty, $_.Price, $_.Remark)
}

# Items first introduced recently (e.g. in 2026 or 2025)
Write-Host "`n=== [중일상사] 2025~2026년에 '사상 최초로 신규 입고'된 품목들 (MSDS 신규 접수 대상!) ==="
$newItems = $itemHistory.Values | Where-Object { $_.FirstDate -ge '2025-01-01' } | Sort-Object FirstDate -Descending
foreach ($ni in $newItems) {
    Write-Host ("최초입고: {0} (최근: {1}, 총 {2}회) | {3} | {4} | {5:N0}원 | {6}" -f $ni.FirstDate, $ni.LastDate, $ni.Count, $ni.Item, $ni.Spec, $ni.LastPrice, $ni.LastRemark)
}

# Total amount
$totalSum = ($entries | Measure-Object -Property Amount -Sum).Sum
Write-Host "`n총 누적 매입액: $($totalSum.ToString('N0'))원"
