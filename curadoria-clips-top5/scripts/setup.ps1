# Installs everything the skill needs on a new Windows PC (no admin needed).
# Usage: powershell -ExecutionPolicy Bypass -File setup.ps1
$ProgressPreference = 'SilentlyContinue'   # Invoke-WebRequest is very slow with the progress bar on PS 5
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Install-Pkg($id) {
    Write-Host "== $id"
    winget list --id $id -e --accept-source-agreements *> $null
    if ($LASTEXITCODE -eq 0) { Write-Host '   já instalado'; return }
    winget install --id $id -e --scope user --silent --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -ne 0) {   # some packages have no per-user installer
        winget install --id $id -e --silent --accept-source-agreements --accept-package-agreements
    }
}
foreach ($id in 'Git.Git', 'GitHub.cli', 'OpenJS.NodeJS.LTS', 'Gyan.FFmpeg', 'yt-dlp.yt-dlp') { Install-Pkg $id }

# whisper.cpp (CPU build) + multilingual base model (~148 MB) -> %LOCALAPPDATA%\whisper.cpp
$dir = Join-Path $env:LOCALAPPDATA 'whisper.cpp'
New-Item -ItemType Directory -Force $dir | Out-Null
if (-not (Test-Path (Join-Path $dir 'bin\Release\whisper-cli.exe'))) {
    Write-Host '== whisper.cpp'
    $zip = Join-Path $dir 'whisper-bin-x64.zip'
    Invoke-WebRequest 'https://github.com/ggml-org/whisper.cpp/releases/download/b5130/whisper-bin-x64.zip' -OutFile $zip -UseBasicParsing
    Expand-Archive $zip -DestinationPath (Join-Path $dir 'bin') -Force
    Remove-Item $zip
}
$model = Join-Path $dir 'ggml-base.bin'
if (-not (Test-Path $model) -or (Get-Item $model).Length -lt 100MB) {
    Write-Host '== whisper model ggml-base.bin'
    Invoke-WebRequest 'https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin' -OutFile $model -UseBasicParsing
}

Write-Host "`nPronto. Abra um terminal NOVO (para o PATH atualizar) e confira com: node `"$PSScriptRoot\tools.js`""
Write-Host 'Primeira vez neste PC? Rode também: gh auth login   e depois   gh auth setup-git'
