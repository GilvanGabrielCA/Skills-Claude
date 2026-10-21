// Technical score for clip candidates.
// Usage: node score.js <candidates.json>
// Each candidate: { id, platform, creator, url, views, posted (YYYY-MM-DD), mult?, likes?, comments?, shares?,
//                   engPct? (TikTok %, from vidIQ extension), duration_s?, risks?: [..], notes? }
//
// Signals (all log/rate based so big and small creators compare fairly):
//   velocity   views per day since posting           -> is it still growing / viral now
//   shareRate  shares / views                        -> strongest "send to a friend" humor signal
//   likeRate   likes / views (IG) or engPct (TikTok) -> how much viewers liked it
//   mult       views vs creator's median (vidIQ)      -> broke out of its own audience = content, not the account
//   reach      total views                           -> proven at scale
// Penalties: duration > 25s (needs heavy cutting), risks (music, sensitive, duplicate theme, sponsored...).
const fs = require('fs');

const items = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const today = new Date(process.env.TODAY || Date.now());
const RISK_PENALTY = { music: 0.15, sensitive: 0.35, duplicate_theme: 0.15, sponsored: 0.05, long: 0, unverified: 0.10, foreign_text: 0.03 };

const lg = (x) => Math.log10(Math.max(x, 1));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

for (const c of items) {
  const age = Math.max(1, (today - new Date(c.posted)) / 864e5);
  c.age = age;
  c.velocity = c.views / age;
  // Sub-scores scaled to roughly 0..1 using ranges seen in Minecraft meme reels.
  const sVel = clamp((lg(c.velocity) - 4) / 2.5, 0, 1);               // 10k/day -> 0, ~3M/day -> 1
  const sReach = clamp((lg(c.views) - 5) / 2, 0, 1);                   // 100k -> 0, 10M -> 1
  const sMult = c.mult != null ? clamp(lg(c.mult * 10) / 3, 0, 1) : null; // 1x -> .33, 10x -> .67, 100x -> 1
  let sLike = null, sShare = null;
  if (c.likes != null) sLike = clamp((c.likes / c.views) / 0.12, 0, 1);  // 12% like rate = max
  if (c.shares != null) sShare = clamp((c.shares / c.views) / 0.012, 0, 1); // 1.2% share rate = max
  if (c.engPct != null) sLike = clamp(c.engPct / 25, 0, 1);              // TikTok engagement %, 25% = max

  const parts = [[sVel, 0.30], [sShare, 0.25], [sLike, 0.20], [sMult, 0.15], [sReach, 0.10]].filter(([v]) => v != null);
  const wsum = parts.reduce((a, [, w]) => a + w, 0);
  let score = parts.reduce((a, [v, w]) => a + v * w, 0) / wsum;
  // Missing data (TikTok has no shares/likes visible) is uncertainty, not a perfect score.
  if (sShare == null) score *= 0.95;

  let pen = 0;
  if ((c.duration_s || 0) > 25) pen += 0.10;
  for (const r of c.risks || []) pen += RISK_PENALTY[r] ?? 0.05;
  c.score = Math.round(100 * score * (1 - Math.min(pen, 0.8)));
  c.detail = { vel: sVel.toFixed(2), share: sShare?.toFixed(2) ?? '-', like: sLike?.toFixed(2) ?? '-', mult: sMult?.toFixed(2) ?? '-', reach: sReach.toFixed(2), pen: pen.toFixed(2) };
}

items.sort((a, b) => b.score - a.score);
const k = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(n);
console.log('score | creator | views | age | views/day | like% | share% | mult | risks');
for (const c of items) {
  const likeP = c.likes != null ? (100 * c.likes / c.views).toFixed(1) + '%' : c.engPct != null ? c.engPct + '%(tt)' : '-';
  const shareP = c.shares != null ? (100 * c.shares / c.views).toFixed(2) + '%' : '-';
  console.log(`${String(c.score).padStart(3)} | ${c.platform === 'tiktok' ? 'TT' : 'IG'} @${c.creator} | ${k(c.views)} | ${Math.round(c.age)}d | ${k(Math.round(c.velocity))}/d | ${likeP} | ${shareP} | ${c.mult ?? '-'}x | ${(c.risks || []).join(',') || '-'}  ${c.id}`);
}
