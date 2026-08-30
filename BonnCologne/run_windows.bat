@echo off
set SCRIPT_DIR=%~dp0
set TARGET=%SCRIPT_DIR%..\..\cities\data\BNC
set VERSION=1.30.0
echo [Bonn-Cologne Mod] Copying data files to cities\data\BNC...
if not exist "%TARGET%" mkdir "%TARGET%"
copy /Y "%SCRIPT_DIR%data\BNC\*" "%TARGET%\" >nul
echo [Bonn-Cologne Mod] Data files copied successfully.
if not exist "%SCRIPT_DIR%pmtiles.exe" (
    echo [Bonn-Cologne Mod] Downloading pmtiles.exe...
    curl -L -f -o "%SCRIPT_DIR%pmtiles.zip" "https://github.com/protomaps/go-pmtiles/releases/download/v%VERSION%/go-pmtiles-%VERSION%_Windows_x86_64.zip"
    tar -xf "%SCRIPT_DIR%pmtiles.zip" -C "%SCRIPT_DIR%"
    del "%SCRIPT_DIR%pmtiles.zip"
)
echo [Bonn-Cologne Mod] Starting tile server on port 8088...
"%SCRIPT_DIR%pmtiles.exe" serve "%SCRIPT_DIR%" --port 8088 --cors=*
