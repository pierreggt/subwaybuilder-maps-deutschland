@echo off
set SCRIPT_DIR=%~dp0
set TARGET=%SCRIPT_DIR%..\..\cities\data\MUC
set VERSION=1.30.0
echo [München Mod] Copying data files to cities\data\MUC...
if not exist "%TARGET%" mkdir "%TARGET%"
copy /Y "%SCRIPT_DIR%data\MUC\*" "%TARGET%\" >nul
echo [München Mod] Data files copied successfully.
if not exist "%SCRIPT_DIR%pmtiles.exe" (
    echo [München Mod] Downloading pmtiles.exe...
    curl -L -f -o "%SCRIPT_DIR%pmtiles.zip" "https://github.com/protomaps/go-pmtiles/releases/download/v%VERSION%/go-pmtiles-%VERSION%_Windows_x86_64.zip"
    tar -xf "%SCRIPT_DIR%pmtiles.zip" -C "%SCRIPT_DIR%"
    del "%SCRIPT_DIR%pmtiles.zip"
)
echo [München Mod] Starting tile server on port 8080...
"%SCRIPT_DIR%pmtiles.exe" serve "%SCRIPT_DIR%" --port 8080 --cors=*
