Add-Type -AssemblyName System.Drawing

function Create-PwaIcon {
    param(
        [int]$Size,
        [string]$OutPath
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # 1. Background Gradient
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
    $cTop = [System.Drawing.Color]::FromArgb(255, 30, 58, 138)    # #1e3a8a
    $cBottom = [System.Drawing.Color]::FromArgb(255, 37, 99, 235)  # #2563eb
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $cTop, $cBottom, 45.0)
    
    # Rounded Rect Path
    $radius = [int]($Size * 0.22)
    $diameter = $radius * 2
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, $diameter, $diameter, 180, 90)
    $path.AddArc($Size - $diameter, 0, $diameter, $diameter, 270, 90)
    $path.AddArc($Size - $diameter, $Size - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc(0, $Size - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    $g.FillPath($brush, $path)

    # Inner Border
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(45, 255, 255, 255), [Math]::Max(1.5, $Size * 0.015))
    $innerPad = [int]($Size * 0.025)
    $innerSize = $Size - ($innerPad * 2)
    $inRadius = [int]($innerSize * 0.20)
    $inDiameter = $inRadius * 2
    $inPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $inPath.AddArc($innerPad, $innerPad, $inDiameter, $inDiameter, 180, 90)
    $inPath.AddArc($innerPad + $innerSize - $inDiameter, $innerPad, $inDiameter, $inDiameter, 270, 90)
    $inPath.AddArc($innerPad + $innerSize - $inDiameter, $innerPad + $innerSize - $inDiameter, $inDiameter, $inDiameter, 0, 90)
    $inPath.AddArc($innerPad, $innerPad + $innerSize - $inDiameter, $inDiameter, $inDiameter, 90, 90)
    $inPath.CloseFigure()
    $g.DrawPath($pen, $inPath)

    # 2. Isometric 3D Box
    $scale = $Size / 512.0
    $cx = $Size / 2.0
    $cy = ($Size * 0.44)

    # Top Polygon
    $topPts = @(
        [System.Drawing.PointF]::new($cx, $cy - (64 * $scale)),
        [System.Drawing.PointF]::new($cx + (120 * $scale), $cy),
        [System.Drawing.PointF]::new($cx, $cy + (64 * $scale)),
        [System.Drawing.PointF]::new($cx - (120 * $scale), $cy)
    )
    $topBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36)) # #fbbf24
    $g.FillPolygon($topBrush, $topPts)

    # Left Polygon
    $leftPts = @(
        [System.Drawing.PointF]::new($cx - (120 * $scale), $cy),
        [System.Drawing.PointF]::new($cx, $cy + (64 * $scale)),
        [System.Drawing.PointF]::new($cx, $cy + (192 * $scale)),
        [System.Drawing.PointF]::new($cx - (120 * $scale), $cy + (128 * $scale))
    )
    $leftBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 217, 119, 6)) # #d97706
    $g.FillPolygon($leftBrush, $leftPts)

    # Right Polygon
    $rightPts = @(
        [System.Drawing.PointF]::new($cx, $cy + (64 * $scale)),
        [System.Drawing.PointF]::new($cx + (120 * $scale), $cy),
        [System.Drawing.PointF]::new($cx + (120 * $scale), $cy + (128 * $scale)),
        [System.Drawing.PointF]::new($cx, $cy + (192 * $scale))
    )
    $rightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 180, 83, 9)) # #b45309
    $g.FillPolygon($rightBrush, $rightPts)

    # Box Line Accents
    $linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 255, 255, 255), [Math]::Max(1.0, 2 * $scale))
    $g.DrawLine($linePen, [System.Drawing.PointF]::new($cx, $cy - (64 * $scale)), [System.Drawing.PointF]::new($cx, $cy + (64 * $scale)))
    $g.DrawLine($linePen, [System.Drawing.PointF]::new($cx - (120 * $scale), $cy), [System.Drawing.PointF]::new($cx + (120 * $scale), $cy))

    # 3. Text "S&W 구매"
    $fontTitleSize = [Math]::Max(9, [int]($Size * 0.088))
    $fontTitle = New-Object System.Drawing.Font("Arial", $fontTitleSize, [System.Drawing.FontStyle]::Bold)
    $strFormat = New-Object System.Drawing.StringFormat
    $strFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $strFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $titleRect = New-Object System.Drawing.RectangleF(0, ($Size * 0.81), $Size, ($Size * 0.12))
    $g.DrawString("S&W 구매", $fontTitle, $whiteBrush, $titleRect, $strFormat)

    # Save Bitmap
    $dir = [System.IO.Path]::GetDirectoryName($OutPath)
    if (-not (Test-Path $dir)) { [System.IO.Directory]::CreateDirectory($dir) | Out-Null }
    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created: $OutPath ($Size x $Size)"
}

Create-PwaIcon -Size 192 -OutPath "c:\Users\user\Desktop\소모품 대시보드\icons\icon-192.png"
Create-PwaIcon -Size 512 -OutPath "c:\Users\user\Desktop\소모품 대시보드\icons\icon-512.png"
Create-PwaIcon -Size 180 -OutPath "c:\Users\user\Desktop\소모품 대시보드\icons\apple-touch-icon.png"
