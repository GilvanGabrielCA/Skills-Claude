# Skills-Claude

Coleção de skills do Claude Code do **BoosterFace** (canal de Shorts de ranking de games) e de estudo, num
repositório **público** para usar em qualquer desktop com um `git clone` só.

## Skills
| Pasta | O que faz | Status |
|---|---|---|
| [`curadoria-clips-top5`](curadoria-clips-top5/) | Busca e curadoria de 5 clips para o "TOP 5 [ADJ] [GAME] MOMENTS/MEMES" (download + frames + transcrição, ranking, cortes) e registro anti-repetição no GitHub | ✅ pronta |
| [`titulos-descricao`](titulos-descricao/) | Título (padrão + hashtags) e descrição otimizada pra SEO do Shorts (estilo vidIQ, créditos (5)→(1), CTA e hashtags de nicho); usa a saída da curadoria | ✅ pronta |
| [`frases-comentarios`](frases-comentarios/) | Frases da lista + comentários engraçados (inglês dos EUA); analisa cada clip 4 fps quadro a quadro e lê os comentários/descrição do post; usa os clips baixados pela curadoria | ✅ pronta |
| [`tutor-arquitetura-redes`](tutor-arquitetura-redes/) | Tutor do curso "Arquitetura de Redes" (Gabriel Torres, Udemy): explica termos e dúvidas de aula, aplicações reais, questões do nível 1 ao 5, revisão espaçada, cartões para o Anki e mini-labs no Packet Tracer | ✅ pronta |

O progresso de estudo do tutor (`tutor-arquitetura-redes/estado/`) fica só no PC e não é versionado; num PC novo a
skill recria a pasta a partir de `modelos/`.

## Instalar em um desktop novo (Windows)
```powershell
winget install Git.Git; winget install GitHub.cli
# abra um PowerShell NOVO
gh auth login
gh auth setup-git
gh repo clone GilvanGabrielCA/Skills-Claude "$env:USERPROFILE\.claude\skills\skills-claude"
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.claude\skills\skills-claude\curadoria-clips-top5\scripts\setup.ps1"
```
O `setup.ps1` cria uma **junction** de cada skill do repo direto em `~/.claude/skills/` (o Claude Code descobre
skills pessoais como pastas-filhas diretas), então basta clonar e rodar o setup. Depois, confira as ferramentas
externas com `node curadoria-clips-top5/scripts/tools.js`
(ffmpeg, ffprobe, yt-dlp, whisper-cli + modelo `ggml-base.bin` em `%LOCALAPPDATA%\whisper.cpp`).

## Registro anti-repetição
`curadoria-clips-top5/data/videos_usados.md` guarda todos os clips já usados (`criador -- link -- jogo`) e é
versionado aqui para valer em todos os PCs. Gerencie só pelo script (`scripts/registro.js`), nunca editando o .md na mão.
Os vídeos baixados ficam **fora** do repo (`C:\Rotina\top5_clips\`) e nunca são enviados.
