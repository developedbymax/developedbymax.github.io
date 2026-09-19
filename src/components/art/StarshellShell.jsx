import { StarMark, colourOf } from './StarMark.jsx';

/* Starshell's bench and its answer.

   The shell is the one in the first store screenshot, top row first, and the
   numbers are what the game printed for it: every row shows what that star will
   actually score where it stands, and together they are 174, a perfect shell for
   that bench. The wiring in the gutter is the game's own — Willow multiplies the
   star above it, and Crossette makes Willow fire twice.

   The rows light bottom to top, because that is the firing order, and the burst
   above is the result. With reduced motion it simply rests, burst open. */

const ROWS = [
  { star: 'emberdrift', name: 'Emberdrift', v: 68, lifted: true },
  { star: 'willow', name: 'Willow', v: 36, lifted: true },
  { star: 'crossette', name: 'Crossette', v: 8 },
  { star: 'pearl', name: 'Pearl', v: 24 },
  { star: 'bombette', name: 'Bombette', v: 38, lifted: true },
];

/* mulberry32 — the same generator the game seeds its benches with — so the
   burst is identical on the server and in the browser, and hydration agrees. */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (v) => Math.round(v * 100) / 100;

/* Each spark is drawn three times down its own past, dimmer and smaller each
   time. That is how the game's burst gets its trails, and without them a burst
   reads as a dotted circle. Throw distance varies so some sparks barely leave
   the shell and others outrun it. The colours are the five stars in the shell. */
function sparks(cx, cy, radius, count, seed, palette) {
  const rnd = mulberry32(seed);
  const out = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rnd() - 0.5) * 0.24;
    const d = radius * (0.52 + rnd() * 0.48);
    const c = palette[Math.floor(rnd() * palette.length)];
    [[1, 1, 1], [0.86, 0.72, 0.45], [0.73, 0.5, 0.2]].forEach(([f, s, o], j) => {
      out.push({ key: `${i}-${j}`, x: r2(cx + Math.cos(a) * d * f), y: r2(cy + Math.sin(a) * d * f), s, o, c });
    });
  }
  return out;
}

function core(cx, cy, radius, count, seed) {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const a = rnd() * Math.PI * 2;
    const d = radius * Math.sqrt(rnd());
    return { key: i, x: r2(cx + Math.cos(a) * d), y: r2(cy + Math.sin(a) * d), r: r2(0.9 + rnd() * 0.8), o: r2(0.45 + rnd() * 0.45) };
  });
}

const PALETTE = ['#FFD166', '#FFD166', '#FFD166', '#FFE3A0', '#FF8F5E', '#6EE7A0', '#9FB4FF'];
const BX = 100, BY = 68, BR = 50;
const BURST = sparks(BX, BY, BR, 36, 174, PALETTE);
const CORE = core(BX, BY, BR * 0.4, 26, 5);

/* somebody else's fireworks, further off, the way the game's town has them */
const FAR = [[36, 34, 11, 10, '#8B8FB5', 0.4], [168, 106, 8, 8, '#8B8FB5', 0.28]];
const SKY = [[18, 70], [56, 102], [150, 22], [184, 58], [128, 110], [74, 16], [26, 118], [186, 14]];

const ROW = { x: 24, w: 154, h: 19, gap: 4, top: 128 };
const rowY = (i) => ROW.top + i * (ROW.h + ROW.gap);
const midY = (i) => rowY(i) + ROW.h / 2;

function Mark({ size, label }) {
  const S = sparks(32, 28, 17, 22, 174, ['#FFD166', '#FFD166', '#FFE3A0']);
  return (
    <svg className="ss ss-mark" viewBox="0 0 64 64"
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
         role="img" aria-label={label ?? 'A gold firework bursting above its rising fuse.'}>
      <defs>
        <linearGradient id="ss-sky-m" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0B20" />
          <stop offset="100%" stopColor="#261B40" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#ss-sky-m)" />
      {S.map((p) => <circle key={p.key} cx={p.x} cy={p.y} r={r2(1.35 * p.s)} fill={p.c} opacity={p.o} />)}
      <circle cx="32" cy="28" r="5" fill="#FFD166" opacity=".28" />
      <line x1="32" y1="57" x2="32" y2="48" stroke="#FF8F5E" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function StarshellShell({ size = 260, label, mark = false }) {
  if (mark) return <Mark size={size} label={label} />;
  const fired = ROWS.length - 1;   // bottom row fires first

  return (
    <svg
      className="ss"
      viewBox="0 0 200 250"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'A firework shell packed with five stars, bottom to top: Bombette, Pearl, Crossette, Willow and Emberdrift, scoring 174 between them, with the burst they make opening above.'
      }
    >
      <defs>
        <linearGradient id="ss-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0B20" />
          <stop offset="58%" stopColor="#141230" />
          <stop offset="100%" stopColor="#261B40" />
        </linearGradient>
        <radialGradient id="ss-glow">
          <stop offset="0%" stopColor="#FFD166" stopOpacity=".34" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ss-fuse" gradientUnits="userSpaceOnUse" x1="0" y1="122" x2="0" y2="94">
          <stop offset="0%" stopColor="#FF8F5E" />
          <stop offset="100%" stopColor="#FF8F5E" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="200" height="250" rx="24" fill="url(#ss-sky)" />

      {SKY.map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".8" fill="#EEF0FF" opacity=".35" />)}
      {FAR.map(([x, y, r, n, c, o], i) => (
        <g key={i} opacity={o}>
          {Array.from({ length: n }, (_, j) => {
            const a = (j / n) * Math.PI * 2;
            return <circle key={j} cx={r2(x + Math.cos(a) * r)} cy={r2(y + Math.sin(a) * r)} r=".9" fill={c} />;
          })}
          <circle cx={x} cy={y} r="1.1" fill={c} />
        </g>
      ))}

      {/* the answer */}
      <line className="ss-fuse" x1={BX} y1="122" x2={BX} y2="96" stroke="url(#ss-fuse)"
            strokeWidth="1.8" strokeLinecap="round" strokeDasharray="26" />
      <g className="ss-burst" style={{ transformOrigin: `${BX}px ${BY}px` }}>
        <circle cx={BX} cy={BY} r={BR * 0.78} fill="url(#ss-glow)" />
        {CORE.map((p) => <circle key={p.key} cx={p.x} cy={p.y} r={p.r} fill="#FFD166" opacity={p.o} />)}
        {BURST.map((p) => <circle key={p.key} cx={p.x} cy={p.y} r={r2(2.1 * p.s)} fill={p.c} opacity={p.o} />)}
      </g>

      <text x="178" y="104" textAnchor="end" fontSize="4.6" fontWeight="800" letterSpacing=".9" fill="#8B8FB5">BRIGHTNESS</text>
      <text x="178" y="120" textAnchor="end" fontSize="15" fontWeight="900" letterSpacing="-.3" fill="#FFD166">174</text>

      {/* the wiring down the gutter: Willow lifts the star above it, and
          Crossette makes Willow fire twice */}
      <g strokeLinecap="round">
        <line x1="15" y1={midY(0)} x2="15" y2={midY(1)} stroke="#FFD166" strokeWidth="1.3" opacity=".85" />
        <circle cx="15" cy={midY(0)} r="2" fill="#FFD166" />
        <line x1="10" y1={midY(1)} x2="10" y2={midY(2)} stroke="#6EE7A0" strokeWidth="1.3" opacity=".85" />
        <circle cx="10" cy={midY(1)} r="2" fill="#6EE7A0" />
      </g>

      {/* the shell, top row first on screen; it fires from the bottom */}
      {ROWS.map((r, i) => {
        const c = colourOf(r.star);
        const y = rowY(i);
        return (
          <g key={r.star} className="ss-row" style={{ '--f': fired - i }}>
            <rect x={ROW.x} y={y} width={ROW.w} height={ROW.h} rx="5" fill="#14142A" stroke="#2B2B4D" strokeWidth=".8" />
            <rect className="ss-lit" x={ROW.x} y={y} width={ROW.w} height={ROW.h} rx="5"
                  fill={c} fillOpacity=".16" stroke={c} strokeWidth="1" />
            <StarMark star={r.star} x={37} y={midY(i)} size={13} />
            <text x="50" y={r2(midY(i) + 2.9)} fontSize="8" fontWeight="700" fill="#EEF0FF">{r.name}</text>
            <text x="170" y={r2(midY(i) + 3.3)} textAnchor="end" fontSize="9.5" fontWeight="800"
                  fill={r.lifted ? '#FFD166' : '#EEF0FF'}>{r.v}</text>
          </g>
        );
      })}
    </svg>
  );
}
