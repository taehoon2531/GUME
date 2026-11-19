# ========================================================================
#   (주)에스앤더블류 구매부 통합 대시보드 - 사내 LAN 고성능 웹 서버
#   무설치(Zero-Dependency) C# 비동기 멀티스레드 정적 HTTP 서버
# ========================================================================

param(
    [int]$DefaultPort = 8080
)

$Host.UI.RawUI.WindowTitle = "사내 LAN 대시보드 공유 서버 [실행중]"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 1. 사내 IPv4 주소 자동 탐지 함수
function Get-LanIPAddress {
    try {
        $ip = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { 
            $_.InterfaceAlias -notmatch 'Loopback|vEthernet|Virtual' -and 
            $_.IPAddress -notmatch '^169\.254\.' -and 
            $_.IPAddress -ne '127.0.0.1' 
        } | Select-Object -ExpandProperty IPAddress -First 1)
        if ($ip) { return $ip }
    } catch {}

    try {
        $lines = ipconfig
        foreach ($line in $lines) {
            if ($line -match 'IPv4[^\:]*\:\s*([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)') {
                $cand = $matches[1].Trim()
                if ($cand -notmatch '^169\.254\.' -and $cand -ne '127.0.0.1') {
                    return $cand
                }
            }
        }
    } catch {}

    try {
        $hostName = [System.Net.Dns]::GetHostName()
        $ips = [System.Net.Dns]::GetHostAddresses($hostName)
        foreach ($item in $ips) {
            if ($item.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork) {
                $s = $item.ToString()
                if ($s -notmatch '^169\.254\.' -and $s -ne '127.0.0.1') {
                    return $s
                }
            }
        }
    } catch {}

    return "127.0.0.1"
}

# 2. C# 기반 초고속 비동기 정적 파일 서버 코드
$csharpServer = @"
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Collections.Generic;

public class LanDashboardServer {
    private TcpListener _listener;
    private bool _running;
    private string _rootDir;
    private int _port;

    private static readonly Dictionary<string, string> MimeTypes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
        { ".html", "text/html; charset=utf-8" },
        { ".htm",  "text/html; charset=utf-8" },
        { ".js",   "application/javascript; charset=utf-8" },
        { ".css",  "text/css; charset=utf-8" },
        { ".json", "application/json; charset=utf-8" },
        { ".png",  "image/png" },
        { ".jpg",  "image/jpeg" },
        { ".jpeg", "image/jpeg" },
        { ".gif",  "image/gif" },
        { ".svg",  "image/svg+xml" },
        { ".ico",  "image/x-icon" },
        { ".csv",  "text/csv; charset=utf-8" },
        { ".txt",  "text/plain; charset=utf-8" },
        { ".woff", "font/woff" },
        { ".woff2","font/woff2" },
        { ".ttf",  "font/ttf" },
        { ".pdf",  "application/pdf" }
    };

    public bool Start(string rootDir, int port) {
        try {
            _rootDir = Path.GetFullPath(rootDir);
            _port = port;
            _listener = new TcpListener(IPAddress.Any, port);
            _listener.Start(200);
            _running = true;
            _listener.BeginAcceptTcpClient(OnAccept, null);
            return true;
        } catch {
            return false;
        }
    }

    private void OnAccept(IAsyncResult ar) {
        try {
            if (!_running) return;
            TcpClient client = _listener.EndAcceptTcpClient(ar);
            _listener.BeginAcceptTcpClient(OnAccept, null);
            ThreadPool.QueueUserWorkItem(HandleClient, client);
        } catch { }
    }

    private void HandleClient(object state) {
        TcpClient client = (TcpClient)state;
        string clientIp = "Unknown";
        try {
            IPEndPoint remoteIp = client.Client.RemoteEndPoint as IPEndPoint;
            if (remoteIp != null) clientIp = remoteIp.Address.ToString();

            client.ReceiveTimeout = 7000;
            client.SendTimeout = 20000;

            using (NetworkStream stream = client.GetStream())
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8)) {
                string requestLine = reader.ReadLine();
                if (string.IsNullOrEmpty(requestLine)) return;

                string[] tokens = requestLine.Split(' ');
                if (tokens.Length < 2) return;
                string method = tokens[0].ToUpperInvariant();
                string rawUrl = tokens[1];

                // Drain headers
                string h;
                while (!string.IsNullOrEmpty(h = reader.ReadLine())) { }

                if (method != "GET" && method != "HEAD") {
                    SendResponse(stream, 405, "Method Not Allowed", "text/plain", Encoding.UTF8.GetBytes("Method Not Allowed"), method == "HEAD");
                    LogAccess(clientIp, method, rawUrl, 405);
                    return;
                }

                string urlPath = rawUrl.Split('?')[0];
                urlPath = Uri.UnescapeDataString(urlPath);
                if (urlPath == "/" || string.IsNullOrEmpty(urlPath)) {
                    urlPath = "/index.html";
                }

                string safeRelPath = urlPath.TrimStart('/', '\\').Replace('/', Path.DirectorySeparatorChar);
                string fullPath = Path.GetFullPath(Path.Combine(_rootDir, safeRelPath));

                // Path Traversal Security Check
                if (!fullPath.StartsWith(_rootDir, StringComparison.OrdinalIgnoreCase)) {
                    SendResponse(stream, 403, "Forbidden", "text/plain", Encoding.UTF8.GetBytes("403 Forbidden"), method == "HEAD");
                    LogAccess(clientIp, method, urlPath, 403);
                    return;
                }

                if (!File.Exists(fullPath)) {
                    SendResponse(stream, 404, "Not Found", "text/plain", Encoding.UTF8.GetBytes("404 Not Found"), method == "HEAD");
                    LogAccess(clientIp, method, urlPath, 404);
                    return;
                }

                string ext = Path.GetExtension(fullPath);
                string mime;
                if (!MimeTypes.TryGetValue(ext, out mime)) {
                    mime = "application/octet-stream";
                }

                long fileLen = new FileInfo(fullPath).Length;
                string header = string.Format(
                    "HTTP/1.1 200 OK\r\n" +
                    "Content-Type: {0}\r\n" +
                    "Content-Length: {1}\r\n" +
                    "Connection: close\r\n" +
                    "Access-Control-Allow-Origin: *\r\n" +
                    "Cache-Control: no-cache, no-store, must-revalidate\r\n\r\n",
                    mime, fileLen
                );
                byte[] headerBytes = Encoding.ASCII.GetBytes(header);
                stream.Write(headerBytes, 0, headerBytes.Length);

                if (method != "HEAD") {
                    using (FileStream fs = File.OpenRead(fullPath)) {
                        byte[] buffer = new byte[65536];
                        int read;
                        while ((read = fs.Read(buffer, 0, buffer.Length)) > 0) {
                            stream.Write(buffer, 0, read);
                        }
                    }
                }
                stream.Flush();
                LogAccess(clientIp, method, urlPath, 200);
            }
        } catch { }
        finally {
            try { client.Close(); } catch { }
        }
    }

    private void SendResponse(Stream stream, int code, string status, string mime, byte[] body, bool headOnly) {
        string header = string.Format(
            "HTTP/1.1 {0} {1}\r\n" +
            "Content-Type: {2}\r\n" +
            "Content-Length: {3}\r\n" +
            "Connection: close\r\n" +
            "Access-Control-Allow-Origin: *\r\n\r\n",
            code, status, mime, body != null ? body.Length : 0
        );
        byte[] headerBytes = Encoding.ASCII.GetBytes(header);
        stream.Write(headerBytes, 0, headerBytes.Length);
        if (!headOnly && body != null && body.Length > 0) {
            stream.Write(body, 0, body.Length);
        }
        stream.Flush();
    }

    private void LogAccess(string ip, string method, string path, int code) {
        if (path.EndsWith(".js") || path.EndsWith(".html") || path == "/index.html") {
            string time = DateTime.Now.ToString("HH:mm:ss");
            Console.ForegroundColor = code == 200 ? ConsoleColor.DarkGreen : ConsoleColor.DarkYellow;
            Console.WriteLine(string.Format(" [{0}] {1,-15} {2} {3,-24} -> {4}", time, ip, method, path, code));
            Console.ResetColor();
        }
    }

    public void Stop() {
        _running = false;
        try { _listener.Stop(); } catch { }
    }
}
"@

Add-Type -TypeDefinition $csharpServer

$rootDir = $PSScriptRoot
if ([string]::IsNullOrEmpty($rootDir)) {
    $rootDir = (Get-Location).Path
}

# 3. 포트 사용 가능 여부 확인 및 자동 포트 지정
$portCandidates = @($DefaultPort, 8000, 8088, 8090, 8888, 5000)
$server = New-Object LanDashboardServer
$actualPort = 0

foreach ($p in $portCandidates) {
    if ($server.Start($rootDir, $p)) {
        $actualPort = $p
        break
    }
}

if ($actualPort -eq 0) {
    Write-Host "❌ 오류: 사용 가능한 네트워크 포트를 찾을 수 없습니다." -ForegroundColor Red
    pause
    exit 1
}

$lanIP = Get-LanIPAddress

# 4. 콘솔 대시보드 안내 배너 출력
Clear-Host
Write-Host ""
Write-Host " ========================================================================" -ForegroundColor Cyan
Write-Host "   🏢 (주)에스앤더블류 구매부 통합 대시보드 - 사내 LAN 공유 서버" -ForegroundColor Yellow -NoNewline
Write-Host " [ON]" -ForegroundColor Green
Write-Host " ========================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   [✔] 사내 네트워크에서 누구나 접속할 수 있도록 서버가 가동되었습니다!" -ForegroundColor Green
Write-Host ""
Write-Host "   🌐 회사 동료 접속 주소: " -ForegroundColor White -NoNewline
Write-Host " http://${lanIP}:${actualPort} " -ForegroundColor Black -BackgroundColor Yellow
Write-Host ""
Write-Host "   💻 내 PC 접속 바로가기: " -ForegroundColor White -NoNewline
Write-Host " http://localhost:${actualPort} " -ForegroundColor Cyan
Write-Host ""
Write-Host " ------------------------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "   📌 [사용 방법]" -ForegroundColor White
Write-Host "   1. 사내 동료들에게 위의 " -NoNewline
Write-Host "http://${lanIP}:${actualPort}" -ForegroundColor Yellow -NoNewline
Write-Host " 주소를 복사해 보내주세요."
Write-Host "   2. 사내 Wi-Fi 또는 유선랜에 연결된 PC, 태블릿, 모바일에서 바로 열립니다."
Write-Host "   3. 동료가 접속하면 아래에 실시간 접속 기록(IP 및 품목 조회)이 표시됩니다."
Write-Host "   4. 서버를 종료하려면 이 검은색 창을 닫거나 " -NoNewline
Write-Host "[Ctrl + C]" -ForegroundColor Red -NoNewline
Write-Host "를 누르세요."
Write-Host " ------------------------------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""
Write-Host " [📡 실시간 접속 로그]" -ForegroundColor DarkCyan

# 5. 내 PC에서 자동으로 브라우저 띄우기
try {
    Start-Process "http://localhost:${actualPort}"
} catch {}

# 6. 서버 유지 (Ctrl+C 또는 창 닫기 시 안전하게 대기)
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    $server.Stop()
    Write-Host "`n서버가 정상적으로 종료되었습니다." -ForegroundColor Yellow
}
