# Static web server in PowerShell allowing local and Wi-Fi mobile connections
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://172.16.10.13:$port/")

try {
    $listener.Start()
    Write-Host "Servidor corriendo en:"
    Write-Host "  - Local PC: http://localhost:$port/"
    Write-Host "  - Celular / Wi-Fi: http://172.16.10.13:$port/"
} catch {
    # Fallback to localhost if administrator binding fails
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

$root = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS Headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $path = $request.Url.LocalPath

        # --- API ENDPOINTS FOR EXCEL / CSV LOGGING ---
        if ($request.HttpMethod -eq "POST" -and $path -eq "/api/log-login") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $jsonStr = $reader.ReadToEnd()
            $data = ConvertFrom-Json $jsonStr

            $logFile = Join-Path $root "registros_ingresos.csv"
            if (-not (Test-Path $logFile)) {
                # UTF-8 with BOM for Excel compatibility
                [System.IO.File]::WriteAllText($logFile, "`"Fecha y Hora`";`"Nombre`";`"Email`"`r`n", [System.Text.Encoding]::UTF8)
            }
            $line = "`"$($data.timestamp)`";`"$($data.name)`";`"$($data.email)`"`r`n"
            [System.IO.File]::AppendAllText($logFile, $line, [System.Text.Encoding]::UTF8)

            $response.ContentType = "application/json"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok"}')
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        if ($request.HttpMethod -eq "POST" -and $path -eq "/api/log-answer") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $jsonStr = $reader.ReadToEnd()
            $data = ConvertFrom-Json $jsonStr

            $logFile = Join-Path $root "registros_respuestas.csv"
            if (-not (Test-Path $logFile)) {
                [System.IO.File]::WriteAllText($logFile, "`"Fecha y Hora`";`"Nombre`";`"Email`";`"Categoria`";`"Pregunta`";`"Respuesta Elegida`";`"Respuesta Correcta`";`"Resultado`";`"Tiempo (s)`";`"Puntos`"`r`n", [System.Text.Encoding]::UTF8)
            }
            # Clean quotes inside fields
            $qClean = ($data.question -replace '"', '""')
            $aClean = ($data.selectedAnswer -replace '"', '""')
            $cClean = ($data.correctAnswer -replace '"', '""')
            $line = "`"$($data.timestamp)`";`"$($data.name)`";`"$($data.email)`";`"$($data.category)`";`"$qClean`";`"$aClean`";`"$cClean`";`"$($data.isCorrect)`";`"$($data.timeSeconds)`";`"$($data.pointsGained)`"`r`n"
            [System.IO.File]::AppendAllText($logFile, $line, [System.Text.Encoding]::UTF8)

            $response.ContentType = "application/json"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok"}')
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        # --- STATIC FILE SERVING ---
        if ($path -eq "/") { $path = "/index.html" }
        $filePath = Join-Path $root $path.TrimStart('/')

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".json" { $response.ContentType = "application/json" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".csv"  { $response.ContentType = "text/csv; charset=utf-8" }
                default { $response.ContentType = "application/octet-stream" }
            }

            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # Catch connection aborts silently
    }
}
