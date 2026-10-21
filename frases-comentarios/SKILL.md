---
name: frases-comentarios
description: Escreve as FRASES (o título curto de cada item da lista do ranking) e os COMENTÁRIOS engraçados (a piada que entra na tela, embaixo do clip) em inglês americano para os Shorts "TOP 5 ... [GAME] MEMES/MOMENTS" do canal BoosterFace. Analisa cada clip QUADRO A QUADRO (4 fps), lê a descrição e os comentários do post original para entender o contexto, e entrega só os textos (não gera vídeo). Recebe os 5 clips escolhidos pela curadoria. Use SEMPRE que o usuário pedir "frases", "comentários", "escreve as frases do top 5", "textos do vídeo", ou mandar os 5 clips pedindo os textos.
---

# Frases e comentários para o TOP 5 (BoosterFace)

`SK` = o diretório desta skill (`frases-comentarios`), dentro do repo público `GilvanGabrielCA/Skills-Claude`.
**Fale com o usuário em português; os textos do vídeo (frases e comentários) são em inglês americano.**

## Escopo
**Única função: escrever os textos.** O usuário monta o vídeo sozinho — **não** renderize, corte ou gere arquivos.
Não busca clips (isso é da `curadoria-clips-top5`) nem escreve título/descrição (isso é da `titulos-descricao`).
Por clip, entrega dois textos que vão **na tela do vídeo**:
- **Frase:** o título curto do item na lista do ranking (ex.: `what did you do for new years?`, `bro tf??`).
- **Comentário:** a piada que aparece **embaixo do clip** (ex.: `The Warden heard him / from 3 biomes away`).

## Entrada (vem da curadoria)
A curadoria já baixou os 5 clips em `C:\Rotina\top5_clips\<lote>\<plataforma>_<id>.mp4` e salvou a descrição do
post em `<plataforma>_<id>.meta.json`. Use esses arquivos + a ordem (#5…#1), os @ e os links da entrega da curadoria.
Se o usuário pedir frases sem ter rodado a curadoria, peça o lote (ou rode a curadoria antes) — você **precisa dos
arquivos** para ler quadro a quadro.

## Entender o clip ANTES de escrever (obrigatório — a regra mais importante)
O usuário já reclamou de textos **desconexos** do que acontece no clip. Para **cada** clip, antes de escrever:
1. **Quadro a quadro, 4 fps:** `node SK/scripts/frames.js "<...>/<plataforma>_<id>.mp4"`. Leia a folha inteira.
   Na virada, gere uma folha mais fina do trecho: `FROM=<s> TO=<s> FPS=8 node SK/scripts/frames.js <clip.mp4>`.
2. **Dê zoom nos textos pequenos:** a legenda do criador na tela (o "POV: …"), o chat, as mensagens do jogo
   ("You Died! fell from a high place", "monsters nearby"), nome do item na mão, placas, o meme do final.
3. **Leia o contexto do post:** a **descrição** salva pela curadoria (campo `description` em
   `<plataforma>_<id>.meta.json`, ou em `<plataforma>_<id>.json`) e os **comentários mais curtidos** do post
   original (abra o link no Chrome — carregue `anthropic-skills:chrome-browser`; feche a aba no fim). Os comentários
   costumam revelar a piada e do que o público riu. **Não copie** comentário de outra pessoa; use só como contexto.
   **O TikTok costuma travar a página individual** ("Please wait"/CAPTCHA): **não resolva CAPTCHA** nem insista — se
   os comentários não abrirem, siga só com os frames + a descrição (que a curadoria já salvou no `.json`).
4. **Escreva para si, em 1 linha cada:** **SETUP** (o que está sendo preparado), **VIRADA** (o que acontece de
   inesperado, com o segundo exato) e **PUNCHLINE** (por que é engraçado).
5. A **frase e o comentário precisam citar algo visível na VIRADA** (objeto, mob, ação, mensagem do jogo).
   **Proibido** texto genérico que caberia em qualquer clip.
6. **Se a piada depende do áudio** (você não ouve) ou você **não achou a virada**, **não invente**: diga
   "não identifiquei a piada visualmente; o que se ouve?" e deixe aquele texto em aberto.

## Como escrever
### Frase (título do item na lista)
- **Curta** — de poucas palavras a uma frase curta de meme, no estilo dos vídeos campeões:
  `what did you do for new years?`, `POV: you live in End Rod civilization`, `bro tf??`, `Money hungry`,
  `Skinwalker dog`, `the xp farm: / bro: the xp farm is done` (expectativa × realidade).
- Inglês americano, casual, e **reconhecível** (descreve o que o clip mostra). Formatos que funcionam: `POV:`,
  `Bro…`, `Me when…`, pergunta relatable, "expectativa × realidade", `… IRL`, `Why does this … ??`.
- **Emoji:** os campeões usam (😭 😏 🤑 👀). Pode usar 1 com moderação **se** o editor do usuário desenhar emoji na
  fonte; se não desenhar, ele avisa e você tira. Na dúvida, entregue a frase que funcione **sem** emoji também.

### Comentário (piada embaixo do clip)
- Inglês americano, tom de meme/Gen-Z (`bro`, `lowkey`, `no way`, `dawg`, `any%`…). **Comente a virada**, não
  descreva o que se vê. Até **2 linhas curtas** (~24 caracteres cada), com a quebra marcada por `/`.
- Prefira piada que **qualquer** jogador entenda; referência mais nichada (ex.: `any%` de speedrun) → explique em
  1 linha em português na entrega.
- Sem símbolos especiais que a fonte do comentário não desenhe (confirme o caso dos emoji como na frase).

**Humor:** humor pesado e piada com tragédia são liberados. **Proibido** contexto ou duplo sentido sexual.

## Entrega (em português; os textos em inglês, fáceis de copiar)
1. Uma linha por clip, em português, com o **SETUP → VIRADA** que você entendeu (para o usuário conferir se você
   pegou a piada certa).
2. Tabela, na ordem do vídeo:

   | # | Frase | Comentário |
   |---|---|---|
   | #5 | what did you do for new years? | bro really celebrated / alone in a cave |

3. Ofereça **2 alternativas** de frase/comentário só para os clips em que a piada ficou fraca ou nichada.
4. Avisos curtos: piada que depende do áudio, meme repetido, conteúdo sensível.
5. Em 1 linha: o título e a descrição são da skill `titulos-descricao` (ofereça, sem gerar sem pedido).

## Instalação / mudanças na skill
Mesmo repo das outras skills; o `setup.ps1` da `curadoria-clips-top5` cria a junction de todas (ver `README.md`).
Alterou `SKILL.md`/`scripts/`? Commit e push na raiz do repo (`git -C ~/.claude/skills/skills-claude ...`).
Exemplos e banco de estilo (formatos de frase, tom dos comentários): `references/estilo-frases.md`.
