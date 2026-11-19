# Print all vendors in data.js sorted by count and name
$lines = Get-Content -Path "data.js" -Encoding UTF8
$vendors = @{}
foreach ($line in $lines) {
    if ($line -match '^\s*\["[^"]*",\s*"([^"]*)"') {
        $v = $matches[1].Trim()
        if ($v) {
            $vendors[$v] = ($vendors[$v] + 1)
        }
    }
}
$vendors.GetEnumerator() | Sort-Object Name | ForEach-Object {
    Write-Host "$($_.Name) -> $($_.Value)건"
}
