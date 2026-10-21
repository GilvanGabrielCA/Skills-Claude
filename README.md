# Skills-Claude

Coleção de skills do Claude Code do **BoosterFace** (canal de Shorts de ranking de games), num repositório
**público** para usar em qualquer desktop com um `git clone` só.

## Skills
| Pasta | O que faz | Status |
|---|---|---|
| [`curadoria-clips-top5`](curadoria-clips-top5/) | Busca e curadoria de 5 clips para o "TOP 5 [ADJ] [GAME] MOMENTS/MEMES" (download + frames + transcrição, ranking, cortes, título, créditos) e registro anti-repetição no GitHub | ✅ pronta |
| `titulos-descricao` | Títulos e descrição do vídeo | 🔜 planejada |
| `frases-comentarios` | Frases da lista e comentários engraçados (inglês dos EUA) | 🔜 planejada |

## Instalar em um desktop novo (Windows)
```powershell
winget install Git.Git; winget install GitHub.cli
# abra um PowerShell NOVO
gh auth login
gh auth setup-git
gh repo clone GilvanGabrielCA/Skills-Claude "$env:USERPROFILE\.claude\skills\skills-claude"
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.claude\skills\skills-claude\curadoria-clips-top5\scripts\setup.ps1"
```
As skills são descobertas automaticamente pelo Claude Code dentro de `~/.claude/skills/skills-claude/`.
Confira as ferramentas externas com `node curadoria-clips-top5/scripts/tools.js`
(ffmpeg, ffprobe, yt-dlp, whisper-cli + modelo `ggml-base.bin` em `%LOCALAPPDATA%\whisper.cpp`).

## Registro anti-repetição
`curadoria-clips-top5/data/videos_usados.md` guarda todos os clips já usados (`criador -- link -- jogo`) e é
versionado aqui para valer em todos os PCs. Gerencie só pelo script (`scripts/registro.js`), nunca editando o .md na mão.
Os vídeos baixados ficam **fora** do repo (`C:\Rotina\top5_clips\`) e nunca são enviados.
