// Finds the external tools the skill uses: ffmpeg/ffprobe, yt-dlp and whisper.cpp (+ model).
// Order: env var -> known install folder -> PATH. Run `node tools.js` to check a PC.
// Missing anything? Run scripts/setup.ps1 (installs everything for the current user).
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const LAD = process.env.LOCALAPPDATA || '';
// per-user and machine-wide winget package folders
const WINGET_DIRS = [path.join(LAD, 'Microsoft', 'WinGet', 'Packages'),
  path.join(process.env.ProgramFiles || 'C:\\Program Files', 'WinGet', 'Packages')];
const WHISPER_DIR = process.env.WHISPER_DIR || path.join(LAD, 'whisper.cpp');

function onPath(name) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name]);
  return r.status === 0 ? r.stdout.toString().split(/\r?\n/)[0].trim() : null;
}

function inWinget(prefix, exe) {
  for (const root of WINGET_DIRS.filter((d) => fs.existsSync(d))) {
    const hit = searchIn(root, prefix, exe);
    if (hit) return hit;
  }
  return null;
}

function searchIn(root, prefix, exe) {
  for (const d of fs.readdirSync(root).filter((d) => d.startsWith(prefix)).sort().reverse()) {
    const stack = [path.join(root, d)];
    while (stack.length) {
      const dir = stack.pop();
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) stack.push(p);
        else if (e.name.toLowerCase() === exe) return p;
      }
    }
  }
  return null;
}

const tools = {
  ffmpeg: process.env.FFMPEG || inWinget('Gyan.FFmpeg', 'ffmpeg.exe') || onPath('ffmpeg'),
  ffprobe: process.env.FFPROBE || inWinget('Gyan.FFmpeg', 'ffprobe.exe') || onPath('ffprobe'),
  ytdlp: process.env.YTDLP || inWinget('yt-dlp.yt-dlp', 'yt-dlp.exe') || onPath('yt-dlp'),
  whisper: process.env.WHISPER || [path.join(WHISPER_DIR, 'bin', 'Release', 'whisper-cli.exe'),
    path.join(WHISPER_DIR, 'bin', 'whisper-cli.exe')].find((p) => fs.existsSync(p)) || onPath('whisper-cli'),
  model: process.env.WHISPER_MODEL || [path.join(WHISPER_DIR, 'ggml-base.bin')].find((p) => fs.existsSync(p)) || null,
};

function need(...names) {
  const missing = names.filter((n) => !tools[n]);
  if (missing.length) {
    console.error(`Missing: ${missing.join(', ')}. Run: powershell -ExecutionPolicy Bypass -File "${path.join(__dirname, 'setup.ps1')}"`);
    process.exit(1);
  }
  return tools;
}

module.exports = { tools, need };

if (require.main === module) {
  for (const [k, v] of Object.entries(tools)) console.log(`${k.padEnd(8)} ${v || 'MISSING'}`);
}
