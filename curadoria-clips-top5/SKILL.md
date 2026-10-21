---
name: curadoria-clips-top5
description: Busca e faz a curadoria de 5 clips de memes/momentos engraçados de games (Minecraft por padrão, ou o jogo pedido — Fortnite, Clash Royale, Roblox, GTA...) para os Shorts de ranking "TOP 5 [ADJETIVO] [GAME] MOMENTS/MEMES" do canal BoosterFace, com foco no público dos EUA. Baixa e analisa os candidatos (frames + transcrição da fala), escolhe 5, define a ordem do ranking (#5 abre, #1 fecha), sugere cortes de até 15s (apontando os pontos mortos) e registra os links no GitHub para nunca repetir. NÃO gera título nem créditos (isso é de outra skill). Use SEMPRE que o usuário pedir "busque por 5 vídeos do tema memes <jogo>", "busca clips", "próximo top 5", "acha vídeos de <jogo>", pedir para substituir um clip ou avisar que publicou um top 5.
---

# Curadoria de clips para o TOP 5 (BoosterFace)

`SK` = o diretório desta skill (`curadoria-clips-top5`), que fica **dentro** do repositório git público
`GilvanGabrielCA/Skills-Claude`, clonado em `~/.claude/skills/skills-claude/`.
Scripts em Node puro (sem dependências), rodados no Bash: `node SK/scripts/<script>.js`.
**Responda ao usuário em português**, com os textos do vídeo (frases/créditos/título) em inglês.

## Por que esses critérios
O canal vive do público dos **EUA**: ~12% das views do ano, mas ~52% da receita (uma view americana
vale ~8x uma brasileira; a russa/indonésia paga quase nada). Clip mudo e piada só visual viaja pro mundo
todo e paga pouco. O que puxa os EUA (confirmado na análise dos 6 vídeos campeões do canal, 15–39M views —
ver `references/criterios-eua.md`):
- **Formato de ranking rígido:** vertical 9:16, cabeçalho fixo "TOP 5 [ADJ] [GAME] MOMENTS/MEMES" e a lista
  1–5 revelada aos poucos (do #5 ao #1). Isso é o que prende até o fim — a curadoria tem que alimentar esse formato.
- **#5 abre e é o clip mais forte**, com gancho nos 2 primeiros segundos. Clips curtos (ideal 8–12s).
- **Variedade de TIPOS no mesmo vídeo:** gameplay fail/clutch + "expectativa vs realidade" + reação de
  streamer com facecam (fala inglês) + meme "IRL" (vídeo real sincronizado com o jogo).
- **Fala em inglês com legenda** e reação exagerada ("NOOO", "oh hell naw") rendem muito nos EUA.
Referências de criadores: midmysticx/midmystdox, scliffmc, AlexPlay16, Gratencya, lelitolokito, hiangeel, Nazzyy.

## Registro anti-repetição (`SK/data/videos_usados.md`)
Todo clip já sugerido ou usado fica nele, no formato **`criador -- link -- jogo`**, um por linha, para **nunca**
voltar. É versionado no GitHub para valer em qualquer PC. A deduplicação é pelo id normalizado do link, então
o mesmo clip em link diferente ainda é reconhecido. Gerencie **só** pelo script (não edite o .md na mão):
`node SK/scripts/registro.js <comando>`

| Comando | Para quê |
|---|---|
| `pull` | baixa o registro atualizado — **início de todo pedido** |
| `check <url...>` | imprime `NEW` / `ALREADY USED` / `UNKNOWN` por link (resolve links curtos vm.tiktok, t.co, fb.watch) |
| `add <arquivo.json>` | registra clips de um JSON `[{creator, url, game}]` (ignora os que já existem) |
| `list [jogo]`, `handles [jogo]` | consulta: clips e criadores (@) já usados, do mais raro ao mais usado |
| `push "<mensagem>"` | commit do registro + pull --rebase + push — **fim de todo pedido** |

## Fluxo de cada pedido
1. **Sincronizar:** `node SK/scripts/registro.js pull`. Se falhar por login: `gh auth login` + `gh auth setup-git`.
   Sem internet, siga com o registro local e avise (clips registrados em outro PC podem faltar).
2. **Entender o pedido:** jogo (padrão `minecraft`), quantidade (padrão 5) e tema. Na dúvida, pergunte.
3. **Buscar candidatos** (seção "Fontes"): junte ~15–25 links. Rode `registro.js check` em todos e **descarte
   todo `ALREADY USED`**, sem exceção. Abra os `UNKNOWN` no navegador para pegar o link completo.
4. **Pré-filtro sem baixar:** engajamento, tema, formato vertical e conteúdo proibido (seção "Regras").
   Confira a duração antes de baixar: `yt-dlp --skip-download --print "%(duration)s|%(like_count)s" <urls>`.
   Fique com 8–10 finalistas.
5. **Baixar e analisar os finalistas:**
   `node SK/scripts/analisar.js "C:/Rotina/top5_clips/<AAAA-MM-DD>_<jogo>" <urls...>`
   (a pasta fica **fora** do repo; vídeo nunca vai pro GitHub). Para cada clip ele salva `<plataforma>_<id>.mp4`,
   `_sheet.png` (frames com o tempo), `_fala.txt` (transcrição) e `.json`, e imprime 1 linha com duração, formato,
   fala, views/likes e @. Se o clip já estiver no registro, ele avisa.
   - **Leia toda sheet e toda transcrição.** Escreva para si **SETUP → VIRADA (segundo exato) → PUNCHLINE** de
     cada clip. Se não achar a virada, descarte ou pergunte. Trecho de perto:
     `FROM=<s> TO=<s> FPS=4 node SK/scripts/analisar.js <pasta> <pasta>/<nome>.mp4`.
   - `FAILED` (link sem vídeo/privado/apagado) → descarte. Se o link estiver ok, `winget upgrade yt-dlp.yt-dlp` e tente de novo.
6. **Escolher os 5, ordenar, definir cortes e título** (seções abaixo).
7. **Registrar e enviar, sem perguntar:** monte o JSON dos 5 (`[{creator, url, game}]`) em
   `C:/Rotina/top5_clips/<pasta>/registro.json`, rode `registro.js add` e por fim `registro.js push "Curadoria <jogo> <data>"`.
   Se o push falhar, avise na entrega (o registro local continua valendo).
8. **Entregar** no formato da seção "Entrega".

### Substituição e publicação
- **Usuário recusou um clip:** ele já está no registro (nunca volta). Busque outro para a mesma posição, siga
  os passos 3–7 só para ele, registre o novo, e reentregue a tabela da posição trocada **e os créditos completos** atualizados.
- **Usuário trouxe clips próprios** (fora da busca): registre-os aqui como usados também, para não voltarem numa busca.

## Fontes
**Primeiro o navegador (grátis).** Carregue a skill `anthropic-skills:chrome-browser` e, num único ToolSearch, as
ferramentas do Chrome (incluindo `javascript_tool`, `find`, `get_page_text`). O Chrome do usuário tem login no
Instagram e a extensão do vidIQ (mostra views e multiplicador nas grades). **Prioridade TikTok e Instagram (Reels)**;
X/YouTube/Facebook como reforço para fala em inglês. **Nunca** use `vidiq_watch_shortform_content` (caro; o
`analisar.js` faz de graça). vidIQ search só como último recurso, no máx. 1/dia. Reddit é bloqueado.
Perfis de referência por jogo, termos de hashtag e como varrer cada plataforma: **`references/fontes-e-busca.md`**.
Perfis novos que renderem bons clips: anote em `SK/data/fontes.md` (o `push` envia junto).

## Regras de seleção
- **Duração (regra do usuário):** no máximo **15s**, ideal **8–12s**, para o vídeo final ficar em **40–55s**.
  O clip tem que funcionar **inteiro**. Se o clip for mais longo que 15s mas valer a pena, **aponte os pontos
  mortos** a cortar (ex.: "corte 0:00–0:04 de introdução parada; use 0:04–0:14") — mas **nunca emende dois
  trechos** separados (`0:02-0:09 + 0:14-0:19`): o usuário testou e o vídeo fica desconexo. No máximo apare o
  começo ou o fim, e só se continuar fazendo sentido.
- **Fala em inglês: é um BÔNUS, não uma exigência** (decisão do usuário em 2026-10-21). A maioria dos memes que
  viralizam — inclusive os campeões do canal — é texto + música, sem fala. Priorize o que é mais **engraçado e com
  mais engajamento**. Quando aparecer um bom clip com fala/facecam de streamer americano, melhor ainda (ajuda a
  receita dos EUA), mas não force nem descarte um clip ótimo só porque é mudo. **Legenda/texto em inglês na tela**
  (relatable, "POV:", "bro tf??") também ajuda o público dos EUA a entender.
- **Formato:** prefira vertical (9:16) ou ação centralizada recortável. Stream 16:9 com chat dos lados lê mal no celular.
- **Data não é critério:** clip bom e antigo entra. O que importa é engajamento, duração curta e não estar no registro.
- **Variedade:** no máx. 2 clips do mesmo perfil por lote e nada de 2 clips com a mesma piada. Misture os TIPOS
  (gameplay, expectativa vs realidade, facecam, IRL). O mesmo clip circula em vários perfis com links diferentes
  (o `check` não pega): compare o que acontece antes de sugerir.
- **Pode:** humor pesado e piadas com tragédias. **Não pode:** contexto/duplo sentido sexual, formas fálicas em
  construções (olhe a sheet inteira), nudez, gore real, ódio, e música famosa alta (Content ID). **Dúvida → pergunte.**

## Ordem do ranking
- **#5 abre o vídeo e é o MELHOR do lote:** gancho nos 2 primeiros segundos (ação/texto/fala já começando) e o
  maior engajamento. É ele que segura a audiência até o fim (métrica de engajamento).
- **#1 fecha:** o segundo mais forte, para recompensar quem ficou e incentivar o replay.
- **#4, #3, #2:** os demais; alterne o tipo de piada e espalhe os clips com fala.
- Explique em 1 linha por que cada clip ficou naquela posição.

## Escopo desta skill
Esta skill faz **só a curadoria**: busca, escolha dos 5, ordem do ranking, cortes e registro anti-repetição.
**NÃO gere título** (nem opções de adjetivo) **nem créditos** — isso é de **outra skill** (títulos/descrição e
frases/comentários). Entregue o @ de cada criador na tabela só como identificação do clip, não monte o bloco de créditos.

## Entrega (em português; textos do vídeo em inglês)
1. **Tabela:** `| # | Clip (link) | @ | Duração → corte | Tipo | Views/curtidas | SETUP → VIRADA |`
   (Tipo = gameplay fail / relatable / expectativa×realidade / facecam / cursed / horror / IRL — ajuda a garantir
   variedade). Abaixo, 1 linha por clip com o motivo da posição, e a duração total estimada do vídeo.
2. Diga a pasta dos vídeos baixados (`C:\Rotina\top5_clips\<data>_<jogo>\`).
3. O **título** e os **créditos** são de outra skill; as **frases da lista** e os **comentários** também.
   Ofereça em 1 linha ("quando quiser, chamo a skill de títulos/descrição e a de frases/comentários"), sem gerar nada disso sem pedido.

## Mudanças na própria skill
Se alterar `SKILL.md` ou `scripts/`, faça commit e push de tudo na raiz do repo:
`git -C ~/.claude/skills/skills-claude add -A && git -C ~/.claude/skills/skills-claude commit -m "<o que mudou>" && git -C ~/.claude/skills/skills-claude push`
(o `registro.js push` só envia a pasta `data/`).

## Instalação em outro PC (Windows)
No PowerShell: `winget install Git.Git; winget install GitHub.cli`, abra um PowerShell novo, `gh auth login` +
`gh auth setup-git`, depois
`gh repo clone GilvanGabrielCA/Skills-Claude "$env:USERPROFILE\.claude\skills\skills-claude"` e
`powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.claude\skills\skills-claude\curadoria-clips-top5\scripts\setup.ps1"`.
Confira com `node SK/scripts/tools.js` (ffmpeg, ffprobe, yt-dlp, whisper-cli e o modelo `ggml-base.bin`). Detalhes: `README.md`.
