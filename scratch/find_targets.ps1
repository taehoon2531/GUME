$targets = @('에이엠티', '동광', '삼봉', '중산')
foreach ($t in $targets) {
    $matches1 = Select-String -Path 'sub_data.js', 'data.js' -Pattern $t -Encoding UTF8 | Select-Object -First 2
    foreach ($m in $matches1) {
        Write-Host "$t -> $($m.Path) : $($m.Line)"
    }
}
