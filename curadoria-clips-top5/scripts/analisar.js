// Downloads candidate clips and "watches/listens" to them for Claude (which can't hear audio).
// Usage: node analisar.js <outDir> <url|file> [url|file...]
//   env FPS=4 forces the sheet fps; env FROM=s TO=s limits the sheet to a time window (detail of one stretch)
// Per clip it writes into <outDir> (name = platform_id, e.g. instagram_DeKVZZUTY54):
//   <name>.mp4            the clip (urls only, via yt-dlp; Instagram/TikTok/X/YouTube work without login)
//   <name>_sheet.png      contact sheet with timestamps (2 fps up to 30s, 1 fps up to 160s, then sparser)
//   <name>_fala.txt       whisper transcript with timestamps
//   <name>.json           summary: platform metadata + duration, size, language, speech verdict
// and prints one summary line per clip. Speech verdict: en (English speech found), other, none.
// Warns when a link is already in the registry (data/videos_usados.md).
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { need } = require('./tools');
const { parse, resolve, handleFrom, readCsv } = require('./registro');

const T = need('ffmpeg', 'ffprobe', 'ytdlp', 'whisper', 'model');
const FONT = "fontfile='C\\:/Windows/Fonts/arial.ttf'";
const MAX_FRAMES = 160;

function run(bin, args) {
  const r = spawnSync(bin, args, { maxBuffer: 1 << 28, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${path.basename(bin)} failed: ${(r.stderr || '').trim().split('\n').slice(-3).join(' | ')}`);
  return r.stdout;
}

// Strip whisper's non-speech tags: *music*, [Music], (laughs), ♪ ...
const speechWords = (text) => text.replace(/\*[^*]*\*|\[[^\]]*\]|\([^)]*\)|♪/g, ' ').match(/[\p{L}']+/gu) || [];

async function analyze(outDir, input, used) {
  const isUrl = /^https?:\/\//i.test(input);
  let url = input, p = null, name, file, meta = {};
  if (isUrl) {
    url = await resolve(input);
    p = parse(url);
    name = p ? p.file : 'clip_' + Date.now();
    if (p && used.has(p.id)) console.log(`AVISO ${p.id} já está no registro (@${used.get(p.id).creator}) — não sugira`);
    file = path.join(outDir, `${name}.mp4`);
    const metaFile = path.join(outDir, `${name}.meta.json`);
    if (!fs.existsSync(file)) {
      try {
        run(T.ytdlp, ['-q', '--no-warnings', '--no-playlist', '-f', 'bv*[height<=1920]+ba/b', '--merge-output-format', 'mp4',
          '--remux-video', 'mp4', '--write-info-json', '-o', path.join(outDir, `${name}.%(ext)s`), url]);
      } catch (e) {
        throw new Error(`${e.message}\n  -> post sem vídeo, privado ou apagado; se o link estiver ok, atualize o yt-dlp (winget upgrade yt-dlp.yt-dlp) ou peça o arquivo ao usuário`);
      }
    }
    const infoFile = path.join(outDir, `${name}.info.json`);
    if (fs.existsSync(infoFile)) {
      const i = JSON.parse(fs.readFileSync(infoFile, 'utf8'));
      meta = { platform: p && p.platform, handle: handleFrom(p ? p.platform : '', i), uploader: i.uploader || i.channel,
        views: i.view_count, likes: i.like_count, comments: i.comment_count, shares: i.repost_count,
        upload_date: i.upload_date, description: (i.description || i.title || '').slice(0, 300) };
      fs.writeFileSync(metaFile, JSON.stringify(meta));
      fs.unlinkSync(infoFile); // big file, keep only what matters
    } else if (fs.existsSync(metaFile)) {
      meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    }
    if (!fs.existsSync(file)) throw new Error('download terminou sem gerar o .mp4');
  } else {
    file = input;
    name = path.basename(input, path.extname(input));
    const metaFile = path.join(path.dirname(input), `${name}.meta.json`);
    if (fs.existsSync(metaFile)) meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  }
  const detail = Boolean(process.env.FROM || process.env.TO); // detail sheet only: keep summary/transcript as they are

  const probe = JSON.parse(run(T.ffprobe, ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,width,height,duration', '-of', 'json', file]));
  const v = probe.streams.find((s) => s.codec_type === 'video');
  if (!v) throw new Error('arquivo sem vídeo');
  const hasAudio = probe.streams.some((s) => s.codec_type === 'audio');
  const dur = parseFloat(probe.format.duration) || parseFloat(v.duration) || 0;

  // contact sheet (whole clip, or FROM..TO)
  const from = Number(process.env.FROM) || 0;
  const to = Math.min(Number(process.env.TO) || dur, dur);
  const span = Math.max(to - from, 0.5);
  const fps = Number(process.env.FPS) || Math.min(span <= 30 ? 2 : 1, MAX_FRAMES / span);
  const frames = Math.ceil(span * fps) + 1;
  const sheet = path.join(outDir, `${name}_sheet${detail ? `_${from}-${+to.toFixed(1)}` : ''}.png`);
  run(T.ffmpeg, ['-v', 'error', '-y', '-ss', String(from), '-t', String(span), '-i', file, '-vf',
    `fps=${fps},scale=160:-2,drawtext=${FONT}:text='%{eif\\:t+${from}\\:d}.%{eif\\:mod((t+${from})*10\\,10)\\:d}s':x=3:y=3:fontsize=16:fontcolor=yellow:box=1:boxcolor=black,tile=8x${Math.ceil(frames / 8)}`,
    '-frames:v', '1', sheet]);
  if (detail) {
    console.log(`${name}  trecho ${from}-${+to.toFixed(1)}s a ${fps} fps -> ${sheet}`);
    return;
  }

  let language = null, transcript = '', words = 0;
  if (hasAudio) {
    const wav = path.join(outDir, `${name}.wav`);
    const base = path.join(outDir, `${name}_whisper`);
    try {
      run(T.ffmpeg, ['-v', 'error', '-y', '-i', file, '-ar', '16000', '-ac', '1', wav]);
      run(T.whisper, ['-m', T.model, '-l', 'auto', '-f', wav, '-np', '-oj', '-of', base]);
      const w = JSON.parse(fs.readFileSync(base + '.json', 'utf8'));
      language = w.result && w.result.language;
      const segs = w.transcription || [];
      transcript = segs.map((s) => `[${s.timestamps.from.slice(3, 8)}-${s.timestamps.to.slice(3, 8)}] ${s.text.trim()}`).join('\n');
      // over music whisper repeats one made-up line; count each distinct line once
      // lines whisper marks with ♪ are song lyrics, not speech
      const lines = [...new Set(segs.filter((s) => !s.text.includes('♪')).map((s) => s.text.trim().toLowerCase()))];
      words = speechWords(lines.join(' ')).length;
      fs.writeFileSync(path.join(outDir, `${name}_fala.txt`), transcript + '\n');
    } finally {
      for (const f of [wav, base + '.json']) if (fs.existsSync(f)) fs.unlinkSync(f);
    }
  }
  // whisper invents words over music: require a few real words before calling it speech
  const speech = words >= 4 ? (language === 'en' ? 'en' : 'other') : 'none';

  const summary = { input, url, id: p && p.id, name, file, duration_s: +dur.toFixed(1), size: `${v.width}x${v.height}`,
    vertical: v.height > v.width, sheet, sheet_fps: +fps.toFixed(2), language, speech, speech_words: words, ...meta };
  fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify({ ...summary, transcript }, null, 2));
  console.log(`${name}  ${summary.duration_s}s  ${summary.size}${summary.vertical ? ' vertical' : ''}  speech=${speech}(${language || '-'}, ${words}w)  views=${meta.views ?? '?'} likes=${meta.likes ?? '?'}  @${meta.handle || '?'}`);
}

async function main() {
  const [outDir, ...inputs] = process.argv.slice(2);
  if (!outDir || !inputs.length) {
    console.error('Usage: node analisar.js <outDir> <url|file> [...]');
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });
  const used = new Map(readCsv().map((it) => [it.id, it]));
  for (const input of inputs) {
    try {
      await analyze(outDir, input, used);
    } catch (e) {
      console.log(`FAILED ${input}: ${e.message}`);
    }
  }
}

main();
