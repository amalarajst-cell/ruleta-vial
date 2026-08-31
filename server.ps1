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

        # --- API ENDPOINTS FOR EXCEL / CSV LOGGING & SYNC ---
        if ($request.HttpMethod -eq "POST" -and $path -eq "/api/log-login") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $jsonStr = $reader.ReadToEnd()
            $data = ConvertFrom-Json $jsonStr

            $logFile = Join-Path $root "registros_ingresos.csv"
            if (-not (Test-Path $logFile)) {
                [System.IO.File]::WriteAllText($logFile, "`"Fecha y Hora`";`"Nombre`";`"Email`"`r`n", [System.Text.Encoding]::UTF8)
            }
            $nClean = ($data.name -replace '"', '""')
            $eClean = ($data.email -replace '"', '""')
            $line = "`"$($data.timestamp)`";`"$nClean`";`"$eClean`"`r`n"
            [System.IO.File]::AppendAllText($logFile, $line, [System.Text.Encoding]::UTF8)

            $response.ContentType = "application/json; charset=utf-8"
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
            $nClean = ($data.name -replace '"', '""')
            $eClean = ($data.email -replace '"', '""')
            $catClean = ($data.category -replace '"', '""')
            $qClean = ($data.question -replace '"', '""')
            $aClean = ($data.selectedAnswer -replace '"', '""')
            $cClean = ($data.correctAnswer -replace '"', '""')
            $resClean = ($data.isCorrect -replace '"', '""')
            $line = "`"$($data.timestamp)`";`"$nClean`";`"$eClean`";`"$catClean`";`"$qClean`";`"$aClean`";`"$cClean`";`"$resClean`";`"$($data.timeSeconds)`";`"$($data.pointsGained)`"`r`n"
            [System.IO.File]::AppendAllText($logFile, $line, [System.Text.Encoding]::UTF8)

            $response.ContentType = "application/json; charset=utf-8"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok"}')
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        if ($request.HttpMethod -eq "POST" -and $path -eq "/api/save-leaderboard-entry") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $jsonStr = $reader.ReadToEnd()
            $entry = ConvertFrom-Json $jsonStr

            $dataFile = Join-Path $root "data.json"
            $db = @{ lastReset = 0; leaderboard = @(); logins = @(); completed = @(); questions = @() }
            if (Test-Path $dataFile) {
                try {
                    $raw = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
                    $parsed = ConvertFrom-Json $raw
                    if ($parsed.lastReset)   { $db.lastReset = [long]$parsed.lastReset }
                    if ($parsed.leaderboard) { $db.leaderboard = @($parsed.leaderboard) }
                    if ($parsed.logins)      { $db.logins = @($parsed.logins) }
                    if ($parsed.completed)   { $db.completed = @($parsed.completed) }
                    if ($parsed.questions)   { $db.questions = @($parsed.questions) }
                } catch {}
            }

            # Upsert into data.json leaderboard
            $key = if ($entry.email) { $entry.email.ToLower().Trim() } else { $entry.name.ToLower().Trim() }
            $found = $false
            for ($i = 0; $i -lt $db.leaderboard.Count; $i++) {
                $eKey = if ($db.leaderboard[$i].email) { $db.leaderboard[$i].email.ToLower().Trim() } else { $db.leaderboard[$i].name.ToLower().Trim() }
                if ($eKey -eq $key) {
                    $db.leaderboard[$i] = $entry
                    $found = $true
                    break
                }
            }
            if (-not $found) {
                $db.leaderboard += $entry
            }

            # Also add to completed list
            if ($key -and ($db.completed -notcontains $key)) {
                $db.completed += $key
            }

            # Sort and save
            $db.leaderboard = @($db.leaderboard | Sort-Object -Property @{Expression={[int]$_.score}; Descending=$true}, @{Expression={[double]$_.time}; Descending=$false})
            $saveJson = ConvertTo-Json $db -Depth 10
            [System.IO.File]::WriteAllText($dataFile, $saveJson, [System.Text.Encoding]::UTF8)

            $response.ContentType = "application/json; charset=utf-8"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok"}')
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        if ($request.HttpMethod -eq "GET" -and $path -eq "/api/leaderboard") {
            $sortedList = @()
            
            # Read directly from data.json (single source of truth for active leaderboard)
            $dataFile = Join-Path $root "data.json"
            if (Test-Path $dataFile) {
                try {
                    $raw = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
                    $parsed = ConvertFrom-Json $raw
                    if ($parsed.leaderboard -and $parsed.leaderboard.Count -gt 0) {
                        $sortedList = @($parsed.leaderboard | Sort-Object -Property @{Expression={[int]$_.score}; Descending=$true}, @{Expression={[double]$_.time}; Descending=$false})
                    }
                } catch {}
            }

            # Guaranteed JSON Array output
            $jsonOut = "[]"
            if ($sortedList.Count -eq 1) {
                $singleJson = ConvertTo-Json $sortedList[0] -Compress
                $jsonOut = "[$singleJson]"
            } elseif ($sortedList.Count -gt 1) {
                $jsonOut = ConvertTo-Json $sortedList -Depth 5 -Compress
            }

            $response.ContentType = "application/json; charset=utf-8"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($jsonOut)
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        if ($request.HttpMethod -eq "GET" -and $path -eq "/api/check-completed") {
            $email = $request.QueryString["email"]
            $completed = $false
            if ($email) {
                $clean = $email.ToLower().Trim()
                $dataFile = Join-Path $root "data.json"
                if (Test-Path $dataFile) {
                    try {
                        $raw = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
                        $parsed = ConvertFrom-Json $raw
                        if ($parsed.completed -and ($parsed.completed -contains $clean)) {
                            $completed = $true
                        }
                    } catch {}
                }
            }
            $response.ContentType = "application/json; charset=utf-8"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("{`"completed`":$($completed.ToString().ToLower())}")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            continue
        }

        if ($request.HttpMethod -eq "POST" -and $path -eq "/api/reset-all") {
            $resetTimestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $jsonStr = $reader.ReadToEnd()
                if ($jsonStr) {
                    $bodyObj = ConvertFrom-Json $jsonStr
                    if ($bodyObj.lastReset) { $resetTimestamp = [long]$bodyObj.lastReset }
                }
            } catch {}

            $dataFile = Join-Path $root "data.json"
            if (Test-Path $dataFile) {
                try {
                    $raw = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
                    $parsed = ConvertFrom-Json $raw
                    $parsed.lastReset = $resetTimestamp
                    $parsed.leaderboard = @()
                    $parsed.logins = @()
                    $parsed.completed = @()
                    $saveJson = ConvertTo-Json $parsed -Depth 10
                    [System.IO.File]::WriteAllText($dataFile, $saveJson, [System.Text.Encoding]::UTF8)
                } catch {}
            }
            $logFile1 = Join-Path $root "registros_respuestas.csv"
            $logFile2 = Join-Path $root "registros_ingresos.csv"
            [System.IO.File]::WriteAllText($logFile1, "`"Fecha y Hora`";`"Nombre`";`"Email`";`"Categoria`";`"Pregunta`";`"Respuesta Elegida`";`"Respuesta Correcta`";`"Resultado`";`"Tiempo (s)`";`"Puntos`"`r`n", [System.Text.Encoding]::UTF8)
            [System.IO.File]::WriteAllText($logFile2, "`"Fecha y Hora`";`"Nombre`";`"Email`"`r`n", [System.Text.Encoding]::UTF8)

            $response.ContentType = "application/json; charset=utf-8"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok","lastReset":' + $resetTimestamp + '}')
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
