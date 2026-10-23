# Consultar o que o Gabriel disse em uma aula (legenda sob demanda)

Use quando a dúvida for sobre **uma aula específica** ("na aula 120 ele falou X e não entendi") ou quando for útil alinhar a explicação ao jeito que o curso apresenta o assunto.

**Regra:** a legenda é só para consulta na hora. **Não salvar cópia da transcrição em arquivo** (o conteúdo é do curso, com direitos autorais). Citar no máximo um trecho curto, com suas palavras no resto.

## Passo a passo (Claude in Chrome)

1. Carregar as ferramentas do Chrome numa única ToolSearch (ver skill `anthropic-skills:chrome-browser`): `tabs_context_mcp`, `navigate`, `javascript_tool`, `browser_batch`, `tabs_close_mcp`.
2. `navigate` (sem `tabId`) para `https://www.udemy.com/course/redes-modulo-1/learn/`. Ele já está logado no Chrome; a chamada cria a aba da sessão e devolve o `tabId`, que é obrigatório nas chamadas seguintes e dentro do `browser_batch`.
3. Pegar o `lecture id` em `mapa-curso.md`. Aula marcada `[sem legenda]` provavelmente continua sem legenda: tente uma vez (a Udemy pode ter adicionado) e, se vier vazia, explique pelo conhecimento geral e avise.
4. Rodar no `javascript_tool` (troque `ID` e o termo em `termo`; é busca de texto simples, então `TCP/IP` ou `802.11` funcionam):

```js
const ID=0, termo='TERMO';
const vtt2t=v=>v.replace(/^WEBVTT.*\n/,'').split('\n').filter(l=>l.trim()&&!/-->/.test(l)&&!/^\d+$/.test(l.trim())).join(' ').replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
const r=await fetch(`/api-2.0/users/me/subscribed-courses/907618/lectures/${ID}/?fields[lecture]=title,asset&fields[asset]=captions`);
let out=`erro ${r.status}: id não encontrado, atualizar o mapa (ver abaixo)`;
if(r.ok){
  const j=await r.json();const caps=j.asset?.captions||[];const c=caps.find(c=>c.locale_id==='pt_BR')||caps[0];
  window.__t=c?vtt2t(await (await fetch(c.url)).text()):'';
  const low=window.__t.toLowerCase(),q=termo.toLowerCase(),hits=[];let p=low.indexOf(q);
  while(p>=0&&hits.length<3){hits.push(window.__t.slice(Math.max(0,p-300),p+300));p=low.indexOf(q,p+300);}
  out={titulo:j.title,legenda:c?c.locale_id:'nenhuma',palavras:window.__t?window.__t.split(' ').length:0,trechos:hits.length?hits:'(termo não encontrado)'};
}
out
```

5. Para ler a aula inteira, devolver em pedaços: `window.__t.slice(0,950)`, `window.__t.slice(950,1900)`... num único `browser_batch`. O retorno de cada chamada é cortado em ~1000 caracteres. Uma aula de 10 min tem uns 8 a 10 pedaços.
6. Fechar a aba com `tabs_close_mcp` ao terminar.

## Se a grade do curso mudar

O Gabriel atualiza o curso (aulas novas mudam a numeração). Se um `lecture id` der erro, ou o número da aula que ele citar não bater com o título, regenerar o mapa com este script e reescrever as linhas de `mapa-curso.md` (mantendo as notas de cobertura):

```js
let url='/api-2.0/courses/907618/subscriber-curriculum-items/?page_size=200&fields[lecture]=title,object_index,asset&fields[chapter]=title&fields[quiz]=title&fields[asset]=time_estimation';
const items=[];while(url){const j=await (await fetch(url)).json();items.push(...j.results);url=j.next?j.next.replace(location.origin,''):null;}
let s=0;window.__map=items.map(i=>i._class==='chapter'?`\n## Seção ${++s}: ${i.title}`:i._class==='lecture'?`${i.object_index} | ${i.title} | ${Math.round((i.asset?.time_estimation||0)/60)} | ${i.id}`:'Teste da seção').join('\n');
Math.ceil(window.__map.length/950)+' pedaços'
```

Depois ler `window.__map` em pedaços de 950, como no passo 5.

## Pegadinhas já encontradas

- **Nunca devolver o JSON cru da API.** As URLs da legenda são assinadas e o retorno vem bloqueado (`[BLOCKED: Cookie/query string data]`). Devolva só o texto ou os campos que interessam.
- A legenda `pt_BR` é a "manual". Ainda assim tem erros de transcrição: corrigir o termo técnico ao explicar.
- A legenda não mostra slides nem diagramas. Se a dúvida for sobre um desenho da aula, pedir para ele descrever ou mandar print.
- Se o Chrome não estiver conectado, não insistir: explicar pelo conhecimento geral e dizer que não deu para conferir a aula.
