# 부자재 CSV → sub_data.js 변환 스크립트
# 열 매핑:
#   입고일(0) → 입고일자
#   품목명(3) → 품명
#   재질(4) + 규격(5) → 규격 (재질이 있으면 "재질 규격", 없으면 규격만)
#   입고량(8) → 수량
#   단가(10) → 단가
#   입고금액(11) → 공급가액
#   공급처명(17) → 업체명
#   품목(1) → 비고 (품목코드)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$csvPath = Join-Path $PSScriptRoot "부자재_raw.csv"
$outPath = Join-Path $PSScriptRoot "sub_data.js"

Write-Host "Reading CSV: $csvPath"
$lines = [System.IO.File]::ReadAllLines($csvPath, [System.Text.Encoding]::Default)
Write-Host "Total lines (including header): $($lines.Count)"

# Simple CSV parser that handles quoted fields with commas
function Parse-CsvLine($line) {
    $fields = [System.Collections.ArrayList]::new()
    $current = ""
    $inQuotes = $false
    for ($i = 0; $i -lt $line.Length; $i++) {
        $ch = $line[$i]
        if ($ch -eq '"') {
            $inQuotes = !$inQuotes
        } elseif ($ch -eq ',' -and !$inQuotes) {
            [void]$fields.Add($current)
            $current = ""
        } else {
            $current += $ch
        }
    }
    [void]$fields.Add($current)
    return $fields.ToArray()
}

$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine("// 부자재 입고 데이터 (ERP 원본 기준)")
[void]$sb.AppendLine("// 자동 생성: $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
[void]$sb.AppendLine("window.INITIAL_SUB_MATERIALS_DATA = [")

$count = 0
$skipHeader = $true
foreach ($line in $lines) {
    if ($skipHeader) { $skipHeader = $false; continue }
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    
    $f = Parse-CsvLine $line
    if ($f.Count -lt 18) { continue }
    
    # 입고일 (index 0)
    $date = $f[0].Trim()
    if ([string]::IsNullOrWhiteSpace($date)) { continue }
    
    # 업체명 (index 17)
    $vendor = $f[17].Trim().Replace('\', '\\').Replace("'", "\'")
    
    # 품명 (index 3)
    $itemName = $f[3].Trim().Replace('\', '\\').Replace("'", "\'")
    
    # 규격: 재질(4) + 규격(5)
    $material = $f[4].Trim()
    $spec = $f[5].Trim()
    if ($material -and $spec) {
        $fullSpec = "$material $spec"
    } elseif ($material) {
        $fullSpec = $material
    } elseif ($spec) {
        $fullSpec = $spec
    } else {
        $fullSpec = ""
    }
    $fullSpec = $fullSpec.Replace('\', '\\').Replace("'", "\'")
    
    # 입고량 (index 8) → 수량
    $qtyStr = $f[8].Trim().Replace(",", "")
    $qty = 0
    [int]::TryParse($qtyStr, [ref]$qty) | Out-Null
    
    # 단가 (index 10)
    $priceStr = $f[10].Trim().Replace(",", "")
    $price = 0
    [double]::TryParse($priceStr, [ref]$price) | Out-Null
    $priceInt = [Math]::Round($price)
    
    # 입고금액 (index 11) → 공급가액
    $amountStr = $f[11].Trim().Replace(",", "")
    $amount = 0
    [long]::TryParse($amountStr, [ref]$amount) | Out-Null
    
    # 비고: 품목코드(1) + 단위(6)
    $itemCode = $f[1].Trim().Replace('\', '\\').Replace("'", "\'")
    $unit = $f[6].Trim()
    $remark = if ($itemCode -and $unit) { "$itemCode ($unit)" } elseif ($itemCode) { $itemCode } else { $unit }
    
    [void]$sb.AppendLine("['$date','$vendor','$itemName','$fullSpec',$qty,$priceInt,$amount,'$remark'],")
    $count++
}

[void]$sb.AppendLine("];")

[System.IO.File]::WriteAllText($outPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Done! $count rows written to $outPath"
Write-Host "File size: $((Get-Item $outPath).Length) bytes"
