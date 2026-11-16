# 부자재 텍스트(부자재.txt) → sub_data.js 변환 스크립트
# 열 매핑:
#   입고일(0) → 입고일자 (row[0])
#   공급처명(17) → 업체명 (row[1])
#   품목명(3) → 품명 (row[2])
#   규격(5) → 규격 (row[3])
#   입고량(8) → 수량 (row[4])
#   단가(10) → 단가 (row[5])
#   입고금액(11) → 공급가액 (row[6])
#   품목(1) + 단위(6) → 비고 (row[7])
#   재질(4) → 재질 (row[8])

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$txtPath = Join-Path $PSScriptRoot "부자재.txt"
if (-not (Test-Path $txtPath)) {
    $txtPath = Join-Path $PSScriptRoot "부자재_raw.csv"
}
$outPath = Join-Path $PSScriptRoot "sub_data.js"

Write-Host "Reading source file: $txtPath"
$lines = [System.IO.File]::ReadAllLines($txtPath, [System.Text.Encoding]::UTF8)
Write-Host "Total lines (including header): $($lines.Count)"

$sb = [System.Text.StringBuilder]::new(5000000)
[void]$sb.AppendLine("// 부자재 입고 데이터 (ERP 원본 기준)")
[void]$sb.AppendLine("// [구조]: [입고일(0), 업체명(1), 품명(2), 규격(3), 수량(4), 단가(5), 공급가액(6), 비고(7), 재질(8)]")
[void]$sb.AppendLine("// 자동 생성: $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
[void]$sb.AppendLine("window.INITIAL_SUB_MATERIALS_DATA = [")

$count = 0
$dupCount = 0
$seen = [System.Collections.Generic.HashSet[string]]::new()

for ($i = 1; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    
    $f = if ($line.Contains("`t")) { $line.Split("`t") } else { $line.Split(",") }
    if ($f.Count -lt 18) { continue }
    
    $date = $f[0].Trim()
    if (-not $date) { continue }
    
    $vendor = $f[17].Trim().Replace('\', '\\').Replace("'", "\'")
    $itemName = $f[3].Trim().Replace('\', '\\').Replace("'", "\'")
    $mat = $f[4].Trim().Replace('\', '\\').Replace("'", "\'")
    $sp = $f[5].Trim().Replace('\', '\\').Replace("'", "\'")
    
    $qtyStr = $f[8].Trim().Replace(",", "")
    $qty = 0
    [double]::TryParse($qtyStr, [ref]$qty) | Out-Null
    $qtyInt = [Math]::Round($qty)
    
    $priceStr = $f[10].Trim().Replace(",", "")
    $price = 0
    [double]::TryParse($priceStr, [ref]$price) | Out-Null
    $priceInt = [Math]::Round($price)
    
    $amountStr = $f[11].Trim().Replace(",", "")
    $amount = 0
    [long]::TryParse($amountStr, [ref]$amount) | Out-Null
    
    $itemCode = $f[1].Trim().Replace('\', '\\').Replace("'", "\'")
    $unit = $f[6].Trim()
    $remark = if ($itemCode -and $unit) { "$itemCode ($unit)" } elseif ($itemCode) { $itemCode } else { $unit }
    
    # 1번 원칙: 일자 + 업체 + 품명 + 규격 + 수량 + 단가 + 재질 동일 시 중복 제외
    $sig = "$date|$vendor|$itemName|$sp|$qtyInt|$priceInt|$mat"
    if ($seen.Contains($sig)) {
        $dupCount++
        continue
    }
    $seen.Add($sig) | Out-Null
    
    [void]$sb.AppendLine("['$date','$vendor','$itemName','$sp',$qtyInt,$priceInt,$amount,'$remark','$mat'],")
    $count++
}

[void]$sb.AppendLine("];")
[System.IO.File]::WriteAllText($outPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "완료! 총 $count 건 반영 (중복 $dupCount 건 자동 제외) -> sub_data.js 저장 완료"
