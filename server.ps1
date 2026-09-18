$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8080/")
$listener.Start()
Write-Output "Server running at http://127.0.0.1:8080/"

$root = $PSScriptRoot
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
        $fullPath = Join-Path $root $path

        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($fullPath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($fullPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($fullPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($fullPath.EndsWith(".glb")) { $response.ContentType = "model/gltf-binary" }
            elseif ($fullPath.EndsWith(".json")) { $response.ContentType = "application/json" }
            elseif ($fullPath.EndsWith(".jpg") -or $fullPath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($fullPath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($fullPath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            $response.AddHeader("Pragma", "no-cache")
            $response.AddHeader("Expires", "0")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("File Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # ignore context errors on shutdown
    }
}
