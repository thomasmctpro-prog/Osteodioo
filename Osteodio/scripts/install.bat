@echo off
echo ============================================
echo Installation Osteodio
echo ============================================

cd /d "%~dp0.."

echo.
echo [1/3] Installation des dependances npm...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Installation des dependances echouee
    pause
    exit /b 1
)

echo.
echo [2/3] Construction de l'application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: Build echoue
    pause
    exit /b 1
)

echo.
echo [3/3] Synchronisation Android avec Capacitor...
call npx cap sync android

echo.
echo ============================================
echo Installation terminee !
echo ============================================
echo.
echo Pour generer l'APK:
echo   1. Ouvrez Android Studio
echo   2. File > Open > Selectionnez le dossier "android"
echo   3. Build > Build APK
echo.
pause
