// Histórico de títulos do canal, para não repetir o mesmo adjetivo em seguida.
// Arquivo: data/titulos.csv  (data,jogo,adjetivo,titulo) — versionado no GitHub.
//
// CLI (rode pelo Bash):
//   node scripts/titulos.js pull                               -> git pull --rebase (INÍCIO)
//   node scripts/titulos.js list [n]                           -> últimos n títulos (padrão 8)
//   node scripts/titulos.js recentes [jogo] [n]                -> só os adjetivos recentes (para NÃO repetir)
//   node scripts/titulos.js add "<jogo>" "<ADJ>" "<titulo>"    -> registra o título escolhido
//   node scripts/titulos.js push "<mensagem>"                  -> commit + pull --rebase + push (FIM)
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const SKILL = path.resolve(__dirname, '..');
const CSV = path.join(SKILL, 'data', 'titulos.csv');
const HEADER = 'data,jogo,adjetivo,titulo';

function rows() {
  if (!fs.existsSync(CSV)) return [];
  return fs.readFileSync(CSV, 'utf8').split('\n').slice(1)
    .map((l) => l.trim()).filter(Boolean)
    .map((l) => { const [data, jogo, adjetivo, ...t] = l.split(','); return { data, jogo, adjetivo, titulo: t.join(',') }; });
}

function git(args) {
  const r = spawnSync('git', args, { cwd: SKILL, encoding: 'utf8' });
  process.stdout.write((r.stdout || '') + (r.stderr || ''));
  return r.status === 0;
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'pull') {
  if (!git(['pull', '--rebase'])) console.log('AVISO: pull falhou — siga com o histórico local e avise o usuário.');
} else if (cmd === 'list') {
  const n = Number(args[0]) || 8;
  for (const r of rows().slice(-n)) console.log(`${r.data}  ${r.jogo.padEnd(12)} ${r.adjetivo.padEnd(12)} ${r.titulo}`);
} else if (cmd === 'recentes') {
  const jogo = (args[0] || '').toLowerCase();
  const n = Number(args[1]) || 8;
  const adj = rows().filter((r) => !jogo || r.jogo.toLowerCase() === jogo).slice(-n).map((r) => r.adjetivo);
  console.log('NÃO repita estes adjetivos recentes: ' + (adj.join(', ') || '(nenhum)'));
} else if (cmd === 'add') {
  const [jogo, adj, titulo] = args;
  if (!jogo || !adj || !titulo) throw new Error('uso: add "<jogo>" "<ADJETIVO>" "<titulo>"');
  if (!fs.existsSync(CSV)) fs.writeFileSync(CSV, HEADER + '\n');
  const line = [new Date().toISOString().slice(0, 10), jogo.toLowerCase(), adj.toUpperCase(), titulo].join(',');
  const sep = fs.readFileSync(CSV, 'utf8').endsWith('\n') ? '' : '\n';
  fs.appendFileSync(CSV, sep + line + '\n');
  console.log('registrado: ' + line);
} else if (cmd === 'push') {
  git(['add', 'data/titulos.csv']);
  git(['commit', '-m', args[0] || `titulo ${new Date().toISOString().slice(0, 10)}`]);
  git(['pull', '--rebase']);
  if (!git(['push'])) console.log('AVISO: push falhou — o histórico local continua valendo; avise o usuário.');
} else {
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(3, 9).join('\n'));
}
