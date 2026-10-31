@echo off
rem Rebuild Study.exe with the C# compiler that ships with Windows (.NET Framework 4).
setlocal
set CSC=%WINDIR%\Microsoft.NET\Framework64\v4.0.30319\csc.exe
if not exist "%CSC%" set CSC=%WINDIR%\Microsoft.NET\Framework\v4.0.30319\csc.exe
cd /d "%~dp0"
"%CSC%" /nologo /target:winexe /optimize+ /win32icon:study.ico /reference:System.Windows.Forms.dll /out:..\Study.exe Study.cs
if errorlevel 1 (echo Build gagal & exit /b 1)
echo Study.exe dibuat di %~dp0..
