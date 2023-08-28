<# : batch script
@echo off
setlocal

echo Turmalina Frontend Local Runner

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"

cd %~dp0
powershell -executionpolicy unrestricted -Command "Invoke-Expression $([System.IO.File]::ReadAllText('%~f0'))"
endlocal
goto:eof
#>
# here write your powershell commands...

function Update-Environment {
    $locations = 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment',
                 'HKCU:\Environment'

    $locations | ForEach-Object {
        $k = Get-Item $_
        $k.GetValueNames() | ForEach-Object {
            $name  = $_
            $value = $k.GetValue($_)

            if ($userLocation -and $name -ieq 'PATH') {
                $Env:Path += ";$value"
            } else {
                Set-Item -Path Env:$name -Value $value
            }
        }

        $userLocation = $true
    }
}

if ((Test-Path -Path $Env:APPDATA\nvm\nvm.exe -PathType Leaf) -eq $false) {
    Write-Output "Looks like you don't have NVM Installed, downloading..."
    Invoke-WebRequest -Uri 'https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe' -OutFile 'nvm-setup.exe'
    Write-Output "Setup NVM to continue."
    ./nvm-setup.exe | Out-Null
    Remove-Item nvm-setup.exe
    Write-Output "NVM Installed."
    Update-Environment
}

if ((Test-Path -Path $Env:APPDATA\nvm\v14.20.0) -eq $false) {
    nvm install 14.20.0
    Write-Output "Node.js v14.20 Installed."
    Update-Environment
}

nvm use 14.20.0

if ((Test-Path -Path $Env:APPDATA\nvm\v14.20.0\node_modules\@angular\cli) -eq $false) {
    npm install -g @angular/cli@14
}

cd webapp

if ((Test-Path -Path webapp\node_modules\) -eq $false) {
    npm install
}

npm run build
npm run ng serve

cd ..

pause