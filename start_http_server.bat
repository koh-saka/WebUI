:: start_http_server.bat
@echo off
setlocal

set PORT=%1
if "%PORT%"=="" set PORT=8000

set ROOT_DIR=%2
if "%ROOT_DIR%"=="" set ROOT_DIR=.

where python >nul 2>nul
if errorlevel 1 (
    echo Error: python が見つかりません。
    exit /b 1
)

if not exist "%ROOT_DIR%" (
    echo Error: 指定ディレクトリが存在しません: %ROOT_DIR%
    exit /b 1
)

cd /d "%ROOT_DIR%"

echo Serving: %CD%
echo URL: http://localhost:%PORT%
python -m http.server %PORT%
