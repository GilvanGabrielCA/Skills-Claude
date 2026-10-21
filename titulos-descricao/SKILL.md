---
name: titulos-descricao
description: Escreve o TÍTULO (padrão "TOP 5 [ADJETIVO] [GAME] MEMES/MOMENTS" + hashtags) e a DESCRIÇÃO otimizada para SEO/algoritmo do YouTube Shorts (estilo vidIQ, mas mais rica: gancho com keyword, detalhes reais dos clips, créditos (5)→(1), CTA e hashtags de nicho) para os vídeos de ranking do canal BoosterFace. Recebe a saída da skill de curadoria (os 5 clips, @ e o que cada um mostra). Use SEMPRE que o usuário pedir "monta o título e a descrição", "escreve a descrição", "título do vídeo", "SEO do vídeo", "hashtags do vídeo", ou logo depois de uma curadoria de clips.
---

# Título e descrição para os Shorts (BoosterFace)

`SK` = o diretório desta skill (`titulos-descricao`), dentro do repo público `GilvanGabrielCA/Skills-Claude`.
Scripts em Node puro, rodados no Bash: `node SK/scripts/<script>.js`. **Fale com o usuário em português**;
**todo texto que vai pro YouTube (título, descrição, hashtags) é em inglês** (público dos EUA).

## Escopo
Esta skill escreve **só o título e a descrição** (com os créditos dentro da descrição). Ela **não** busca/baixa
clips (isso é da skill `curadoria-clips-top5`) nem escreve as frases da lista / comentários (isso é da skill de
frases/comentários). O porquê de cada regra de SEO está em **`references/seo-shorts.md`** — leia antes de montar.

## Entrada (vem da curadoria)
Use a saída da skill de curadoria: para cada um dos 5 clips, o **@ do criador**, o **jogo**, o **tipo** e o que o
clip mostra (**SETUP → VIRADA**), além da ordem (#5…#1). Se o usuário só pedir "monta título e descrição" sem esses
dados, **rode antes a curadoria** ou peça a tabela dela — a descrição precisa dos detalhes reais dos clips para
ficar boa e com SEO (não escreva genérico se der pra citar os clips).

## Fluxo
1. `node SK/scripts/titulos.js pull` (sincroniza o histórico de títulos).
2. Veja os adjetivos recentes para não repetir: `node SK/scripts/titulos.js recentes <jogo>`.
3. Escolha o **tom do lote** pelo #5 e pela mistura de tipos, e monte **título** + **descrição** (seções abaixo).
4. Registre o título principal: `node SK/scripts/titulos.js add "<jogo>" "<ADJETIVO>" "<titulo sem hashtags>"`,
   depois `node SK/scripts/titulos.js push "Titulo <jogo> <data>"`.
5. Entregue no formato da seção "Entrega".

## Título
Padrão fixo, **CAIXA ALTA**: **`TOP 5 [ADJETIVO] [GAME] MEMES`** (edições/memes de texto) **ou `MOMENTS`**
(clips de gameplay). O nome do jogo também em caixa alta (`MINECRAFT`, `FORTNITE`, `CLASH ROYALE`).
- Adjetivo: escolha em `data/adjetivos.md` combinando com o tom do #5; **não repita** os adjetivos de
  `titulos.js recentes`. Mantenha o título curto (~60–70 caracteres) para aparecer inteiro no celular.
- **Hashtags do título (3):** acrescente no fim `#[jogo] #[memes|moments] #shorts` — ex.: `#minecraft #memes #shorts`.
  São as 3 que o YouTube mostra acima do título no player (padrão que o canal já usa).
- Entregue **1 título principal + 2 alternativas** (adjetivos diferentes).

## Descrição (inglês, estilo vidIQ + SEO)
A descrição é **indexada para busca** e os **primeiros ~150 caracteres** são os que mais contam (ficam acima do
"...more"). Comece com a **keyword na 1ª frase** e **detalhe os clips de verdade** (use o SETUP→VIRADA da curadoria).
Monte nesta ordem:
1. **Gancho** (1 frase) com a keyword: `Check out the top 5 [adj] [Game] [memes/moments] ...`.
2. **Corpo** (2–4 frases): a variedade do vídeo **citando 2–3 clips específicos** do lote (o que acontece em cada
   um), de forma natural. Sem keyword stuffing.
3. **Valor / para quem é** (1–2 frases): "perfect for a quick laugh", momentos bizarros de server, etc.
4. **Créditos** (ver abaixo).
5. **CTA** (1 frase): pedir subscribe + comentar o clip favorito.
6. **Linha de hashtags** (3–6, de nicho primeiro).

### Créditos (dentro da descrição)
Bloco em lista vertical, na ordem do vídeo, com os @ da curadoria:
```
(5) @criador
(4) @criador
(3) @criador
(2) @criador
(1) @criador
```
Clip de streamer repostado: credite quem postou e o streamer — `(3) @perfil / Streamer`.

### Hashtags
- **Nunca passe de 15 no vídeo todo** (o YouTube ignora todas se passar). Com 3 no título + 3–6 na descrição você
  fica seguro. **Nicho > genérico** (`#MinecraftMemes` > `#viral`), sempre com `#Shorts`, multi-palavra sem espaço.
- Banco e sugestão padrão em `references/seo-shorts.md` (ex. Minecraft memes: `#Shorts #Minecraft #MinecraftMemes #Memes #Gaming`).

## Entrega (em português; os textos em inglês dentro de blocos de código, prontos pra copiar)
1. **Título:** principal + 2 alternativas, cada um já com as 3 hashtags.
2. **Descrição:** o texto completo (gancho → corpo → valor → créditos → CTA → hashtags) num bloco de código único,
   pronto pra colar no YouTube. Diga quantos caracteres tem a 1ª linha (lembre que o ideal é a keyword nos ~150 primeiros).
3. Em 1 linha: ofereça as frases da lista e os comentários (skill de frases/comentários), sem escrever sem pedido.

## Exemplo (Minecraft memes)
Título: `TOP 5 CURSED MINECRAFT MEMES #minecraft #memes #shorts`
Descrição:
```
Check out the top 5 cursed Minecraft memes — the funniest, most chaotic clips the community made this week.

From a lonely player setting off fireworks at midnight on New Year's, to a world so glitched the walls start
bending, to a wind charge that launches you straight off the planet and into Saturn's rings — these are the
kind of unhinged Minecraft moments you can't unsee. Expect cursed builds, jumpscares and reactions you'll want
to send to the group chat.

Perfect if you need a quick laugh or just love the weird side of Minecraft servers.

(5) @bweeyt
(4) @kakogohuyas
(3) @mahomagic21
(2) @enderduckk
(1) @scliffmc

Subscribe for a new Top 5 every week, and tell us which clip was your favorite in the comments!

#Shorts #Minecraft #MinecraftMemes #Memes #Gaming
```

## Mudanças na própria skill / instalação
Commit e push de tudo na raiz do repo: `git -C ~/.claude/skills/skills-claude add -A && ... commit ... && ... push`
(o `titulos.js push` só envia `data/titulos.csv`). Instalação em outro PC: o repo é o mesmo da curadoria; o
`setup.ps1` da `curadoria-clips-top5` já cria a junction de **todas** as skills do repo (ver `README.md`).
