@echo off
set SCRIPT_DIR=%~dp0
set TARGET=%SCRIPT_DIR%..\..\cities\data\HLE
set VERSION=1.30.0
echo [Halle-Leipzig Mod] Copying data files to cities\data\HLE...
if not exist "%TARGET%" mkdir "%TARGET%"
copy /Y "%SCRIPT_DIR%data\HLE\*" "%TARGET%\" >nul
echo [Halle-Leipzig Mod] Data files copied successfully.
if not exist "%SCRIPT_DIR%pmtiles.exe" (
    echo [Halle-Leipzig Mod] Downloading pmtiles.exe...
    curl -L -f -o "%SCRIPT_DIR%pmtiles.zip" "https://github.com/protomaps/go-pmtiles/releases/download/v%VERSION%/go-pmtiles-%VERSION%_Windows_x86_64.zip"
    tar -xf "%SCRIPT_DIR%pmtiles.zip" -C "%SCRIPT_DIR%"
    del "%SCRIPT_DIR%pmtiles.zip"
)
echo [Halle-Leipzig Mod] Starting tile server on port 8089...
"%SCRIPT_DIR%pmtiles.exe" serve "%SCRIPT_DIR%" --port 8089 --cors=*
