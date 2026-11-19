# Analyze vendor names in data.js, sub_data.js, raw_data.js
$ErrorActionPreference = "Stop"

function Extract-Vendors($filePath) {
    $lines = Get-Content -Path $filePath -Encoding UTF8
    $vendors = @{}
    foreach ($line in $lines) {
        if ($line -match '^\s*\["[^"]*",\s*"([^"]*)"') {
            $v = $matches[1].Trim()
            if ($v) {
                if (-not $vendors.ContainsKey($v)) {
                    $vendors[$v] = 0
                }
                $vendors[$v]++
            }
        }
    }
    return $vendors
}

function Normalize-Name($raw) {
    if (-not $raw) { return "" }
    $name = $raw.Trim()

    # S&W special case
    if ($name -match 'S&W') {
        return "S&W 진례공장"
    }

    # 1. Remove corporate legal forms: (주), 주식회사, ㈜, (유), 유한회사, (합), 합자회사
    $name = [regex]::Replace($name, '\(주\)|주식회사|㈜|\(유\)|유한회사|\(합\)|합자회사', '')

    # 2. Remove parenthesized annotations: (폐업), (비철), (진례), (안전) etc.
    $name = [regex]::Replace($name, '\([^)]*\)', '')

    # 3. Remove regional branch/factory/office suffixes
    $name = [regex]::Replace($name, '(부산|경남|창원|울산|양산|김해|대구|서울|경기|인천|포항|영천|진례|한국)?\s*(지점|지사|공장|2공장|영업소|사무소|사업소|직매소)', '')

    # 4. Strip surrounding punctuation and whitespace
    $name = [regex]::Replace($name, '^[_\s\.\-]+|[_\s\.\-]+$', '')

    # 5. Collapse internal spaces
    $name = [regex]::Replace($name, '\s+', '')

    if (-not $name) { return $raw.Trim() }
    return $name
}

$suppliesVendors = Extract-Vendors "data.js"
Write-Host "Total unique raw vendors in data.js: $($suppliesVendors.Count)"

# Group by normalized name
$grouped = @{}
foreach ($v in $suppliesVendors.Keys) {
    $norm = Normalize-Name $v
    if (-not $grouped.ContainsKey($norm)) {
        $grouped[$norm] = @()
    }
    $grouped[$norm] += [PSCustomObject]@{
        Raw = $v
        Count = $suppliesVendors[$v]
    }
}

Write-Host "`n=== Vendors in data.js with MULTIPLE variations ==="
$multiCount = 0
foreach ($norm in ($grouped.Keys | Sort-Object)) {
    if ($grouped[$norm].Count -gt 1) {
        $multiCount++
        $variants = ($grouped[$norm] | ForEach-Object { "$($_.Raw) ($($_.Count)건)" }) -join ", "
        Write-Host "Normalized: [$norm] -> Variations: $variants"
    }
}
Write-Host "`nTotal grouped multi-variation vendor clusters in data.js: $multiCount"
