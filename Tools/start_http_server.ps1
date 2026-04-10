# =========================
# 設定
# =========================
$Port = 8000
$RootDir = "C:\Users\E392903\Project\UE160\work\AutoFraming\Debug\mps-local"
$PidFile = $RootDir+"\Tools\server.pid"

# =========================
# 既存プロセスチェック
# =========================
if (Test-Path $PidFile) {
    $oldPid = Get-Content $PidFile
    if (Get-Process -Id $oldPid -ErrorAction SilentlyContinue) {
        Write-Host "It is already running. (PID=$oldPid)"
        exit
    } else {
        Remove-Item $PidFile
    }
}

# =========================
# 起動
# =========================
$proc = Start-Process `
    -FilePath "python" `
    -ArgumentList "-m http.server $Port" `
    -WorkingDirectory $RootDir `
    -WindowStyle Hidden `
    -PassThru

# =========================
# PID保存
# =========================
$proc.Id | Out-File $PidFile

Write-Host "HTTP Server started"
Write-Host "PID: $($proc.Id)"
Write-Host "URL: http://localhost:$Port"