# Fontes e como varrer cada plataforma

Leia quando for buscar candidatos (passo 3 do fluxo). Prioridade: **TikTok e Instagram (Reels)**;
X/YouTube/Facebook reforçam a fala em inglês.

## Minecraft — perfis de referência do usuário
- **Instagram** (`https://www.instagram.com/<perfil>/reels/`): mc_bigness, midmysticx, enzo_gamingv1, mqvie1,
  itsangrybossss, blaziexdd, zacassmc, lordendox, nomis180_, ajtheboldinsta, hiangeel_, dreamwastaken,
  gorillacrafter, lianeu, toikumc, creativeee69, drdonutclipped, groxmc, crazygamer55261, lifesteal.smp,
  magmasolo, gratencya, bweeyt, kingfox.yt, danygdxx, lanvexplayz, scliffmc, krizzitgames, creamzzz_dayo,
  lianeu_mc, rswomc.
- **TikTok** (`https://www.tiktok.com/@<perfil>`): n0face_mc, zynngMC, Grox, LookOut3D, lif, Daquavis.
- Varie os perfis a cada busca: comece pelos que aparecem pouco em `registro.js handles minecraft`.
- Notas: @alexplay16yt, @hiangeel_ e @danygdxx falam **espanhol** (não contam como fala em inglês).
  @scliffmc e @midmysticx têm fala em inglês e muito engajamento. **Evite @hardcore.mc** (anime sexualizado).
  @boudq.yt não existe mais. No TikTok, n0face_mc e zynngMC estão parados desde maio/2026.

## Outros jogos (sem perfis fixos) — busque por termo/hashtag
| Jogo | Termos / hashtags |
|---|---|
| Fortnite | fortnitememes, fortnitefunny, "fortnite funny moments", "fortnite voice chat funny" (fala EN) |
| Clash Royale | clashroyalememes, "clash royale irl", "clash royale rage" — repare: os hits são **memes IRL que sincronizam com as cartas** ("The Log IRL", "Battle Ram IRL"), não gameplay |
| Roblox | robloxmemes, robloxfunny, "roblox rage" |
| GTA | gtamemes, gtafunny, gta5funny |
| Outros | `<jogo>memes`, `<jogo>funny`, `<jogo> funny moments`, `<jogo> rage`, `<jogo> irl` |

Perfis novos que renderem bons clips: anote em `data/fontes.md` (vira referência fixa; o `push` envia junto).

## Como varrer cada plataforma
- **Instagram** (perfil ou `/explore/tags/<tag>/`): navegue, espere ~4s, **role com `computer scroll`**
  (`window.scrollBy` não carrega a grade), espere 3s e extraia os links de reel/post:
  ```js
  [...document.querySelectorAll('a[href]')]
    .filter(a=>/\/(reel|p)\/[A-Za-z0-9_-]{8,}/.test(a.getAttribute('href')))
    .map(a=>a.getAttribute('href').match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)[1]+'='+(a.innerText||'').replace(/\s+/g,' ').trim())
    .join(' | ')
  ```
  Data sem abrir o post: `node scripts/igdate.js <codigos...> --days 30`. Curtidas/legenda em lote:
  `fetch('/p/<id>/')` e leia o `og:description`.
- **TikTok** (`/@perfil`, `/tag/<tag>`, `/search/video?q=`): role 2x, extraia os links `/video/` e o texto do
  card (views e %). A página individual costuma travar em "Please wait": não insista e **nunca resolva CAPTCHA**
  (o `analisar.js` baixa mesmo assim).
- **X** (boa fonte de fala em inglês, com streamers): `https://x.com/search?q=<jogo>%20funny%20filter%3Avideos%20min_faves%3A1000%20lang%3Aen&f=top`.
  De cada `article`, pegue o link `/status/`, a data e o texto; as respostas costumam citar a fala.
- **YouTube:** `https://www.youtube.com/results?search_query=<jogo>+funny+moments+shorts`. **Não** use clip de
  canal que faz o mesmo formato Top 5 (concorrente direto).
- Se um site pedir login ou pop-up, peça para o usuário resolver no Chrome dele. **Não faça login.**

## Pontuação técnica (opcional)
Monte um JSON com os candidatos (campos no topo de `score.js`: `id, platform, creator, url, views, posted,
mult, likes, comments, shares, engPct, duration_s, risks`) e rode `TODAY=<AAAA-MM-DD> node scripts/score.js <arquivo.json>`.
Desconfie de muitas views com poucas curtidas (<3%): costuma ser repost ou alcance comprado.
