$RootDir = "C:\Users\E392903\Project\UE160\work\AutoFraming\Debug\mps-local"
$PidFile = $RootDir+"\Tools\server.pid"

if (!(Test-Path $PidFile)) {s
    Write-Host "PidFile does not exist."
    exit
}

$http_pid = Get-Content $PidFile

$proc = Get-Process -Id $http_pid -ErrorAction SilentlyContinue

if ($proc) {
    Stop-Process -Id $http_pid -Force
    Write-Host "HTTP Server stopped(PID=$http_pid)"
} else {
    Write-Host "The process no longer exists."
}

Remove-Item $PidFile