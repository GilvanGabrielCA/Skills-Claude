// Helpers compartilhados (id do clip a partir de qualquer link, resolução de link curto,
// @ do criador) + o registro anti-repetição em data/videos_usados.md.
//
// O registro é um .md simples, uma linha por clip no formato:  criador -- link -- jogo
// A deduplicação compara pelo id normalizado (plataforma:id) extraído do link, então o
// mesmo clip em formatos de link diferentes ainda é reconhecido.
//
// CLI (rode pelo Bash, na raiz do repo ou em qualquer lugar):
//   node scripts/registro.js pull                      -> git pull --rebase (INÍCIO de todo pedido)
//   node scripts/registro.js check <url...>            -> NEW / ALREADY USED / UNKNOWN por link
//   node scripts/registro.js add <arquivo.json>        -> acrescenta clips [{creator,url,game}] (dedup)
//   node scripts/registro.js list [jogo]               -> lista os clips do registro
//   node scripts/registro.js handles [jogo]            -> criadores distintos (para variar as fontes)
//   node scripts/registro.js push "<mensagem>"         -> commit do registro + pull --rebase + push (FIM)
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const SKILL = path.resolve(__dirname, '..');            // .../curadoria-clips-top5
const MD = path.join(SKILL, 'data', 'videos_usados.md');

const RULES = [
  ['instagram', /instagram\.com\/(?:[^/?#]+\/)?(?:p|reels?|tv)\/([A-Za-z0-9_-]+)/i],
  ['tiktok', /tiktok\.com\/@[^/?#]+\/(?:video|photo)\/(\d+)/i],
  ['tiktok', /tiktok\.com\/(?:v|embed)\/(\d+)/i],
  ['x', /(?:x|twitter)\.com\/[^/?#]+\/status\/(\d+)/i],
  ['facebook', /(?:facebook\.com|fb\.watch)\/(?:reel|watch|[^/?#]+\/videos)\/?\??v?=?(\d{6,})/i],
  ['reddit', /reddit\.com\/r\/[^/?#]+\/comments\/([a-z0-9]+)/i],
  ['youtube', /(?:youtube\.com\/(?:shorts\/|live\/|watch\?(?:.*&)?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/i],
  ['twitch', /(?:clips\.twitch\.tv\/|twitch\.tv\/[^/?#]+\/clip\/)([A-Za-z0-9_-]+)/i],
];

// -> { platform, cid, id: "platform:cid", file: "platform_cid" } ou null
function parse(url) {
  const u = String(url).trim();
  for (const [platform, re] of RULES) {
    const m = u.match(re);
    if (m) return { platform, cid: m[1], id: `${platform}:${m[1]}`, file: `${platform}_${m[1]}` };
  }
  return null;
}

// Links curtos/de compartilhamento -> url final
const SHORT = /(?:vm|vt)\.tiktok\.com\/|tiktok\.com\/t\/|\/\/t\.co\/|instagram\.com\/share\/|fb\.watch\//i;
async function resolve(url) {
  if (!SHORT.test(url)) return url;
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    return r.url || url;
  } catch { return url; }
}

// O @ mostrado nos créditos, a partir do info.json do yt-dlp (cada plataforma usa um campo)
function handleFrom(platform, info) {
  const pick = {
    instagram: [info.channel, info.uploader_id],
    tiktok: [info.uploader, info.channel],
    x: [info.uploader_id],
    youtube: [info.uploader_id, info.channel_handle],
    twitch: [info.uploader_id, info.uploader],
    facebook: [info.uploader, info.channel],
    reddit: [info.uploader],
  }[platform] || [info.uploader_id, info.uploader, info.channel];
  const h = pick.find((v) => v && !/^\d+$/.test(v) && !/\s/.test(v) && !/^UC[\w-]{22}$/.test(v));
  return h ? String(h).replace(/^@/, '') : null;
}

// Lê o registro .md -> [{ creator, url, game, id }]
function readUsados() {
  if (!fs.existsSync(MD)) return [];
  const out = [];
  for (const raw of fs.readFileSync(MD, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split('--').map((s) => s.trim());
    if (parts.length < 2) continue;
    const [creator, url, game] = [parts[0], parts[1], parts[2] || '?'];
    if (!url) continue;
    const p = parse(url);
    out.push({ creator, url, game, id: p ? p.id : url });
  }
  return out;
}
// alias usado pelo analisar.js
const readCsv = readUsados;

function appendUsados(items) {
  const have = new Set(readUsados().map((it) => it.id));
  const lines = [];
  let added = 0, dup = 0;
  for (const it of items) {
    const url = String(it.url || '').trim();
    if (!url) continue;
    const p = parse(url);
    const id = p ? p.id : url;
    if (have.has(id)) { dup++; continue; }
    have.add(id);
    const creator = String(it.creator || '?').trim() || '?';
    const game = String(it.game || '?').trim().toLowerCase() || '?';
    lines.push(`${creator} -- ${url} -- ${game}`);
    added++;
  }
  if (lines.length) {
    const sep = fs.existsSync(MD) && fs.readFileSync(MD, 'utf8').endsWith('\n') ? '' : '\n';
    fs.appendFileSync(MD, sep + lines.join('\n') + '\n');
  }
  return { added, dup };
}

function git(args) {
  const r = spawnSync('git', args, { cwd: SKILL, encoding: 'utf8' });
  process.stdout.write((r.stdout || '') + (r.stderr || ''));
  return r.status === 0;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === 'pull') {
    if (!git(['pull', '--rebase'])) console.log('AVISO: pull falhou — siga com o registro local e avise o usuário.');
    return;
  }
  if (cmd === 'check') {
    const have = new Map(readUsados().map((it) => [it.id, it]));
    for (const raw of args) {
      const url = await resolve(raw);
      const p = parse(url);
      if (!p) { console.log(`UNKNOWN  ${raw}  (abra no navegador para pegar o link completo)`); continue; }
      const hit = have.get(p.id);
      console.log(hit ? `ALREADY USED  ${p.id}  (@${hit.creator}, ${hit.game})  ${raw}` : `NEW  ${p.id}  ${raw}`);
    }
    return;
  }
  if (cmd === 'add') {
    const file = args[0];
    if (!file || !fs.existsSync(file)) throw new Error('uso: add <arquivo.json com [{creator,url,game}]>');
    const items = JSON.parse(fs.readFileSync(file, 'utf8'));
    const { added, dup } = appendUsados(Array.isArray(items) ? items : [items]);
    console.log(`registrados ${added} novos, ${dup} já existiam`);
    return;
  }
  if (cmd === 'list') {
    const game = (args[0] || '').toLowerCase();
    for (const it of readUsados()) if (!game || it.game === game) console.log(`${it.game.padEnd(14)} @${(it.creator + '').padEnd(20)} ${it.url}`);
    return;
  }
  if (cmd === 'handles') {
    const game = (args[0] || '').toLowerCase();
    const count = new Map();
    for (const it of readUsados()) if (!game || it.game === game) count.set(it.creator, (count.get(it.creator) || 0) + 1);
    for (const [c, n] of [...count.entries()].sort((a, b) => a[1] - b[1])) console.log(`${String(n).padStart(3)}  @${c}`);
    return;
  }
  if (cmd === 'push') {
    const msg = args[0] || `registro ${new Date().toISOString().slice(0, 10)}`;
    git(['add', 'data/videos_usados.md', 'data/fontes.md', 'data/adjetivos.md']);
    git(['commit', '-m', msg]);     // ok falhar se nada mudou
    git(['pull', '--rebase']);
    if (!git(['push'])) console.log('AVISO: push falhou — o registro local continua valendo; avise o usuário.');
    return;
  }
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(4, 16).join('\n'));
}

if (require.main === module) main().catch((e) => { console.error('ERRO:', e.message); process.exit(1); });
module.exports = { SKILL, MD, parse, resolve, handleFrom, readUsados, readCsv, appendUsados };
