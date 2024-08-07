@if (@CodeSection == @Batch) @then
@echo off & setlocal enabledelayedexpansion

REM Check if parameter is provided
if "%~1"=="" (
    echo Please provide a file name.
    echo Usage: generate_store.bat filename
    goto :eof
)

REM Set the directory where the file will be created
set "rootDir=stores"

REM Check if the directory exists, if not create it
if not exist "%rootDir%" (
    mkdir "%rootDir%"
)

REM Define the file name from the input parameter
set "storeName=%~1"
set "fileName=%storeName%.ts"

REM Define the full file path
set "filePath=%rootDir%\%fileName%"

REM Debugging output to check if the file exists or not
echo Checking if file "%filePath%" exists...
if exist "%filePath%" (
    echo File "%fileName%" already exists.
    echo Are you sure you want to overwrite it? (Y/N)
    set /p userInput=Enter choice:

    REM Check if the user input is 'Y' or 'y'
    if /i not "%userInput%"=="Y" (
        echo Operation canceled.
        goto :eof
    )
) else (
    echo File "%fileName%" does not exist. Creating a new one.
)

REM Function to capitalize first letter using JScript
for /f "delims=" %%I in ('cscript /nologo /e:JScript "%~f0" "%storeName%"') do set "storeNameCapitalized=%%~I"

REM Debugging output
echo Store Name Capitalized: %storeNameCapitalized%

REM Clear the contents of the file or create it if it does not exist
type nul > "%filePath%"

REM Write the content to the file
echo import { defineStore } from 'pinia'; > "%filePath%"
echo.>> "%filePath%"
echo export const use%storeNameCapitalized%Store = defineStore('%storeName%', {>> "%filePath%"
echo   state: () =^> {>> "%filePath%"
echo     return {>> "%filePath%"
echo.>> "%filePath%"
echo     }>> "%filePath%"
echo   },>> "%filePath%"
echo.>> "%filePath%"
echo   actions: {>> "%filePath%"
echo.>> "%filePath%"
echo   }>> "%filePath%"
echo })>> "%filePath%"

echo File "%fileName%" created at "%rootDir%"
pause

@end // end Batch / begin JScript hybrid
var input = WSH.Arguments(0);
WSH.Echo(input.charAt(0).toUpperCase() + input.slice(1));
