$files = Get-ChildItem -LiteralPath "c:\Users\user\Desktop\소모품 대시보드\통장사본"
$vendors = @{}

function Process-File($path) {
    if (-not (Test-Path $path)) { return }
    $lines = Get-Content -Path $path -Encoding UTF8
    foreach ($line in $lines) {
        # Match ["date", "vendor" or ['date', 'vendor'
        if ($line -match '^\s*\[\s*["''](?:\d{4}-\d{2}-\d{2})?["'']\s*,\s*["'']([^"'']+)["'']') {
            $raw = $Matches[1].Trim()
            $norm = $raw -replace '\(주\)|주식회사|㈜|\(유\)|유한회사|\(합\)|합자회사', '' -replace '\([^)]*\)', '' -replace '(부산|경남|창원|울산|양산|김해|대구|서울|경기|인천|포항|영천|진례|한국)?\s*(지점|지사|공장|2공장|영업소|사무소|사업소|직매소)', '' -replace '^[_\s\.\-]+|[_\s\.\-]+$', '' -replace '\s+', ''
            if (-not $norm) { $norm = $raw }
            if (-not $vendors.ContainsKey($norm)) {
                $vendors[$norm] = @{ Norm = $norm; RawList = [System.Collections.Generic.List[string]]::new(); Count = 0 }
            }
            $vendors[$norm].Count++
            if (-not $vendors[$norm].RawList.Contains($raw)) {
                $vendors[$norm].RawList.Add($raw)
            }
        }
    }
}

Process-File "c:\Users\user\Desktop\소모품 대시보드\data.js"
Process-File "c:\Users\user\Desktop\소모품 대시보드\sub_data.js"
Process-File "c:\Users\user\Desktop\소모품 대시보드\raw_data.js"

Write-Host "Total unique normalized vendors in DB: $($vendors.Count)"

$results = [System.Collections.Generic.List[object]]::new()

foreach ($f in $files) {
    $base = $f.BaseName
    # strip typical bankbook annotations
    $clean = $base -replace '통장사본|기업은행|통장', '' -replace '\(주\)|주식회사|㈜', '' -replace '[\s\-_,]', ''
    $match = $null
    
    if ($vendors.ContainsKey($clean)) {
        $match = $vendors[$clean]
    } else {
        foreach ($k in $vendors.Keys) {
            if ($k.Length -ge 2 -and ($clean.Contains($k) -or $k.Contains($clean))) {
                $match = $vendors[$k]
                break
            }
        }
    }
    
    $results.Add([pscustomobject]@{
        FileName = $f.Name
        Ext = $f.Extension
        SizeKB = [math]::Round($f.Length/1KB, 1)
        MatchedVendor = if ($match) { $match.Norm } else { "(미매칭: $clean)" }
        DBCount = if ($match) { $match.Count } else { 0 }
        RawVendors = if ($match) { ($match.RawList -join ', ') } else { "-" }
    })
}

$results | Format-Table -AutoSize
