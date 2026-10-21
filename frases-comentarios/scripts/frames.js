// Contact sheet FINA de um clip local, para ler quadro a quadro (4 fps por padrão).
// Uso:  node frames.js <clip.mp4> [saida.png]
//   env FROM=s TO=s FPS=6  -> limita a um trecho e/ou muda o fps (para a virada, use mais fps)
// Precisa de ffmpeg/ffprobe no PATH (winget install Gyan.FFmpeg). Os clips já foram baixados pela
// skill de curadoria em C:\Rotina\top5_clips\<lote>\<plataforma>_<id>.mp4 — aponte para eles.
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const clip = process.argv[2];
if (!clip || !fs.existsSync(clip)) {
  console.error('uso: node frames.js <clip.mp4> [saida.png]   (env FROM, TO, FPS)');
  process.exit(1);
}
for (const bin of ['ffmpeg', 'ffprobe']) {
  if (spawnSync(bin, ['-version'], { encoding: 'utf8' }).error) {
    console.error(`${bin} não encontrado no PATH. Rode o setup.ps1 da curadoria-clips-top5 (instala o ffmpeg) e abra um terminal novo.`);
    process.exit(1);
  }
}
const from = Number(process.env.FROM) || 0;
const toEnv = Number(process.env.TO) || 0;
const fps = Number(process.env.FPS) || 4;
const out = process.argv[3] || clip.replace(/\.[^.]+$/, '') + `_f${from || toEnv ? `_${from}-${toEnv || 'end'}` : ''}.png`;

const pr = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', clip], { encoding: 'utf8' });
const dur = parseFloat(pr.stdout) || 0;
const to = toEnv || dur || (from + 15);
const span = Math.max(to - from, 0.5);
const frames = Math.ceil(span * fps) + 1;
const cols = 8;
const FONT = "fontfile='C\\:/Windows/Fonts/arial.ttf'";
const vf = `fps=${fps},scale=220:-2,drawtext=${FONT}:text='%{eif\\:t+${from}\\:d}.%{eif\\:mod((t+${from})*10\\,10)\\:d}s':x=3:y=3:fontsize=18:fontcolor=yellow:box=1:boxcolor=black,tile=${cols}x${Math.ceil(frames / cols)}`;
const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(from), '-t', String(span), '-i', clip, '-vf', vf, '-frames:v', '1', out], { encoding: 'utf8' });
if (r.status !== 0) {
  console.error('ffmpeg falhou:', (r.stderr || '').trim().split('\n').slice(-3).join(' | '));
  process.exit(1);
}
console.log(`${path.basename(out)}  (${from}-${to.toFixed(1)}s @ ${fps}fps, ~${frames} quadros)`);
