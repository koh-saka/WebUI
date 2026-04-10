:: start_http_server.bat
@echo off
if "%1"=="start" (
    powershell -ExecutionPolicy Bypass -File .\Tools\start_http_server.ps1
) else if "%1"=="stop" (
    powershell -ExecutionPolicy Bypass -File .\Tools\stop_http_server.ps1
)
