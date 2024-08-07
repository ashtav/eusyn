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

REM Function to capitalize the first letter using JScript
for /f "delims=" %%I in ('cscript /nologo /e:JScript "%~f0" "%storeName%"') do set "storeNameCapitalized=%%~I"

REM Clear the contents of the file
type nul > "%filePath%"

REM Write the content to the file
echo import { defineStore } from 'pinia'; > "%filePath%"
echo.>> "%filePath%"
echo export const use%storeName%Store = defineStore('%storeName%', {>> "%filePath%"
echo   state: () =^> {>> "%filePath%"
echo     return {>> "%filePath%"
echo.>> "%filePath%"
echo     }>> "%filePath%"
echo   },>> "%filePath%"
echo   actions: {>> "%filePath%"
echo.>> "%filePath%"
echo   }>> "%filePath%"
echo })>> "%filePath%"


echo File "%fileName%" created at "%rootDir%"
goto :eof

@end // end Batch / begin JScript hybrid
var input = WSH.Arguments(0);
WSH.Echo(input.charAt(0).toUpperCase() + input.slice(1));
