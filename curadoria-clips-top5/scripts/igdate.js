// Decode Instagram shortcodes to post date (IG media id = (ms - 1314220021721) << 23).
// Usage: node igdate.js <shortcode> [shortcode...] [--days N]  -> prints date; with --days keeps only recent ones
const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const args = process.argv.slice(2);
const di = args.indexOf('--days');
const days = di >= 0 ? Number(args.splice(di, 2)[1]) : null;
const now = Date.now();
const rows = args.map((sc) => {
  let id = 0n;
  for (const c of sc.slice(0, 11)) id = id * 64n + BigInt(A.indexOf(c));
  const ms = Number(id >> 23n) + 1314220021721;
  return { sc, ms };
}).filter((r) => days === null || now - r.ms <= days * 864e5).sort((a, b) => b.ms - a.ms);
rows.forEach((r) => console.log(`${new Date(r.ms).toISOString().slice(0, 10)}  ${r.sc}`));
