# SEO de YouTube Shorts — título, descrição e hashtags

Pesquisa feita em 2026-10-21 (blogs de SEO + regra oficial de hashtags do YouTube). São rules of thumb da
comunidade, não documentação oficial — o que decide mesmo é a retenção do clip (trabalho da curadoria). Os
metadados aqui ajudam a **busca** e a **intenção de clique**.

## Como a distribuição funciona (os 2 sistemas)
- **Feed (For You / Shorts):** puxado por **comportamento do espectador** — retenção, loop rate, like/view,
  compartilhamento. É o que mais importa para viralizar, e depende do CLIP e do gancho (curadoria), não do texto.
- **Busca / hashtag shelves:** puxada pelos **metadados** — título, descrição e hashtags indexados. É aqui que
  título e descrição ajudam: aparecer em buscas ("funny minecraft memes") e em páginas de hashtag.
Ou seja: a descrição não faz o vídeo viralizar sozinha, mas **amplia o alcance de busca** e melhora o clique.

## Título
- **Keyword na frente.** O padrão do canal (`TOP 5 [ADJ] [GAME] MEMES/MOMENTS`) já faz isso ("TOP 5", nome do jogo).
- **Tamanho:** mantenha curto (~**60–70 caracteres**) para aparecer inteiro na busca do celular.
- **Hashtags no título:** o YouTube mostra **até 3 hashtags clicáveis ACIMA do título** no player. O canal já usa
  3 no título (`#minecraft #memes #shorts`) — mantenha esse padrão (essas 3 são as que aparecem em cima).
- Entregue **1 título principal + 2 alternativas**, variando o adjetivo (banco em `data/adjetivos.md`), **sem
  repetir** os adjetivos recentes (`node scripts/titulos.js recentes <jogo>`).

## Descrição
- **Os primeiros ~125–150 caracteres são o que mais conta** (ficam acima do "...mais"). Ponha a **keyword
  principal na 1ª frase** ("top 5 funniest Minecraft memes...").
- A descrição **é indexada para busca**, então vale **detalhar os clips de verdade** (usando o SETUP→VIRADA da
  curadoria): citar 2–3 momentos específicos vira keyword natural e aumenta a vontade de assistir.
- **Natural, sem keyword stuffing** (repetição exagerada pode ser penalizada).
- Estrutura (espelha o estilo vidIQ que o usuário aprovou, só que mais rica):
  1. **Gancho** com a keyword (1 frase).
  2. **Corpo:** o que o vídeo tem, citando **2–3 clips específicos** do lote + a variedade de humor.
  3. **Valor/para quem é:** por que vale assistir, de forma natural.
  4. **Créditos** em lista `(5)…(1)` com os @ (ver seção Créditos da SKILL).
  5. **CTA:** pedir subscribe + comentar o clip favorito (casual: "which one was your favorite?").
  6. **Linha de hashtags** (3–6).
- Tudo em **inglês** (público dos EUA).
- **Tom humano, sem tom de IA (regra do usuário, 2026-10-21):** escreva como um criador real, casual e direto.
  Evite frases de marketeiro/IA ("Check out…", "Perfect if you need a quick laugh", "these clips capture…",
  "the kind of … you can't unsee"). **Não use travessão "—"** (vírgula ou ponto). Minúsculas e gíria leve
  ("ngl", "fr", "stick around for the #1") são bem-vindas.

## Hashtags
- **Regra oficial do YouTube (lançamento de 2018):** mais de **15 hashtags no vídeo → o YouTube ignora TODAS**, e
  "over-tagging" pode tirar o vídeo da busca. Fique **bem abaixo de 15** (título 3 + descrição 3–6 = ~6–9, ok).
- **Nicho > genérico:** `#minecraftmemes` rende mais que `#viral` (comédia é ~76% dos Shorts, concorrência enorme).
- **Sempre em minúsculas** (regra do usuário): `#shorts`, `#minecraftmemes` — nunca `#Shorts`/`#MinecraftMemes`.
- **Sempre incluir `#shorts`.** Hashtag multi-palavra **sem espaço** (`#minecraftmemes`, não `#minecraft memes`).
- Nada de hashtag irrelevante (risco de spam) nem de conteúdo sensível.

### Banco de hashtags (escolha 3–6, começando pelas de nicho; tudo minúsculo)
| Grupo | Hashtags |
|---|---|
| Essencial | `#shorts` |
| Minecraft (nicho) | `#minecraft` `#minecraftmemes` `#minecraftshorts` `#minecraftmoments` `#minecraftfunny` |
| Meme/comédia | `#memes` `#memesdaily` `#funny` `#relatableshorts` `#gaming` `#gamingshorts` `#gamingmemes` |
| Outros jogos | troque a parte de Minecraft por `#fortnite`/`#fortnitememes`, `#clashroyale`, `#roblox`/`#robloxmemes`, `#gta` |
- Sugestão padrão (Minecraft memes): `#shorts #minecraft #minecraftmemes #memes #gaming` (5). Ajuste ao conteúdo.
- Evite repetir no título e na descrição exatamente as mesmas 3; o título já cobre `#jogo #memes #shorts`.

## Fontes consultadas (2026-10-21)
- hashtagtools.io — [limites 2026](https://hashtagtools.io/blog/youtube-shorts-character-limits-title-description-hashtags-2026), [título vs descrição](https://hashtagtools.io/blog/youtube-shorts-hashtags-title-vs-description-2026)
- Hollyland — [Shorts SEO best practices](https://www.hollyland.com/blog/topics/youtube-shorts-seo-best-practices)
- influenceflow.io — [títulos e descrições 2026](https://influenceflow.io/resources/optimized-video-titles-and-descriptions-the-complete-2026-youtube-seo-guide/)
- subscribr.ai — [hashtags e viralização 2025](https://subscribr.ai/youtube-strategy/youtube-shorts-hashtags-virality)
- AIR Media-Tech — [hashtags de gaming](https://air.io/trending/viral-hashtags-for-youtube-shorts-gaming)
- Tubefilter — [regra das 15 hashtags / acima do título](https://tubefilter.com/2018/07/18/youtube-hashtags-above-titles/)
- RouteNote — [over-tagging / remoção da busca](https://routenote.com/blog/youtube-follows-twitter-with-new-clickable-hashtags-above-video-titles/)
