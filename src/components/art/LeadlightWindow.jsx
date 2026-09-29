import { ICON, PALETTES, SCENE, SPARK, WORLD } from './leadlightData.js';

/* Leadlight's pane, mid-run, in the order the game's own Scene.js lays it down:
   the frame, the dim clear glass, the coloured shards, light from behind, the
   lead, the sparks, and the molten line.

   One cycle: the sparks keep moving in the half they are in, a cut starts in
   the open, both arms grow at the same speed until each reaches an edge, and
   the line sets into lead. The half with no spark in it floods with colour,
   which takes the pane past three quarters, so the window lights. Every shape
   is from the game (see leadlightData.js). With reduced motion it rests on the
   finished cut: line set, half flooded. */

const P = PALETTES[0];                        // Cathedral, the glass a player starts with
const r1 = (v) => Math.round(v * 10) / 10;

/// palette.js's shade(), so every colour here is one the game computes.
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = amount >= 0 ? c + (255 - c) * amount : c * (1 + amount);
    return Math.max(0, Math.min(255, Math.round(v)));
  });
  return `#${ch.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

const d = (pts) => {
  let s = `M${pts[0]} ${pts[1]}`;
  for (let i = 2; i < pts.length; i += 2) s += `L${pts[i]} ${pts[i + 1]}`;
  return `${s}Z`;
};

/// The pane's outline: the hull of every corner, as WindowArt.hullOf() does it.
function hull(shards) {
  const pts = [];
  for (const s of shards) for (let i = 0; i < s.length; i += 2) pts.push([s[i], s[i + 1]]);
  pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list) => {
    const out = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 1e-9) out.pop();
      out.push(p);
    }
    return out;
  };
  const lower = half(pts);
  const upper = half([...pts].reverse());
  return [...lower.slice(0, -1), ...upper.slice(0, -1)].flat();
}

const glassFill = (colour, tone) => shade(P.glass[colour], tone ? 0.1 : -0.06);

/* The two arms of the cut, drawn from the start point out to the LONGER arm's
   length and clipped to the clear piece: both grow at the same speed, the
   short one stops at its edge first, and the line sets when the long one lands
   — which is the rule, not a dramatisation of it. */
function arm(o, end, len) {
  const dx = end[0] - o[0];
  const dy = end[1] - o[1];
  const k = len / Math.hypot(dx, dy);
  return [o[0], o[1], r1(o[0] + dx * k), r1(o[1] + dy * k)];
}

const PANE = hull([...SCENE.glass.map((s) => s.pts), SCENE.clear, SCENE.flood.pts]);
/// The clear piece before the cut: its two halves are convex and so is their union.
const CUT = d(hull([SCENE.clear, SCENE.flood.pts]));
const ARMS = [arm(SCENE.line.o, SCENE.line.a, SCENE.line.len), arm(SCENE.line.o, SCENE.line.b, SCENE.line.len)];
const ICON_PANE = hull(ICON.shards.map((s) => s.pts));

/* A spark drifts on a small loop inside the half it is in. `drift` is how far
   it can go and still clear every edge, the new line included, so no frame of
   the loop ever shows a spark where the rule says it cannot be. */
function Spark({ kind, x, y, r, drift, i }) {
  const g = SPARK[kind].glow;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`ll-spark s${i}`} style={{ '--dr': `${drift}px` }}>
        <circle r={r * 2.4} fill={`url(#ll-halo-${kind})`} />
        <circle r={r} fill={g} />
        <circle r={r * 0.5} fill={SPARK[kind].core} />
      </g>
    </g>
  );
}

/// The app icon's window: the same demo window, one spark loose in its last
/// clear shard. Used where the live pane would be too small to read.
function Mark({ size, label }) {
  const s = ICON.spark;
  return (
    <svg className="ll ll-mark" viewBox={`0 0 ${WORLD.width} ${WORLD.height}`}
         style={{ height: typeof size === 'number' ? `${size}px` : size, width: 'auto', maxWidth: '100%' }}
         role="img" aria-label={label ?? 'A stained-glass lancet window with one spark still loose in its last clear piece.'}>
      <defs>
        <radialGradient id="ll-m-halo">
          <stop offset="0%" stopColor={SPARK.ember.glow} stopOpacity=".7" />
          <stop offset="100%" stopColor={SPARK.ember.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={d(ICON_PANE)} fill="none" stroke={P.frame} strokeWidth="22" strokeLinejoin="round" />
      <path d={d(ICON_PANE)} fill="#0c0d12" />
      {ICON.shards.map((sh, i) => (
        <path key={i} d={d(sh.pts)} fill={sh.colour < 0 ? shade(P.clear, -0.15) : shade(P.glass[sh.colour], sh.tone ? 0.12 : -0.04)} />
      ))}
      {ICON.shards.map((sh, i) => (
        <path key={`l${i}`} d={d(sh.pts)} fill="none" stroke={P.lead} strokeWidth="9" strokeLinejoin="round" />
      ))}
      <circle cx={s[0]} cy={s[1]} r="40" fill="url(#ll-m-halo)" />
      <circle cx={s[0]} cy={s[1]} r="13" fill={SPARK.ember.glow} />
      <circle cx={s[0]} cy={s[1]} r="6.5" fill="#ffffff" />
    </svg>
  );
}

export default function LeadlightWindow({ size = 300, label, mark = false }) {
  if (mark) return <Mark size={size} label={label} />;
  const [o, a, b] = [SCENE.line.o, SCENE.line.a, SCENE.line.b];
  const chord = `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`;

  return (
    <svg
      className="ll"
      viewBox={`0 0 ${WORLD.width} ${WORLD.height}`}
      style={{ height: typeof size === 'number' ? `${size}px` : size, width: 'auto', maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'A stained-glass lancet window, mostly coloured. Three sparks bounce in the last clear piece while a lead line is cut across it, and the half with no spark in it floods with colour.'
      }
    >
      <defs>
        <radialGradient id="ll-light" cx="50%" cy="18%" r="85%">
          <stop offset="0%" stopColor={P.light} stopOpacity=".55" />
          <stop offset="100%" stopColor={P.light} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ll-behind" cx="50%" cy="18%" r="90%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ll-clear" x1="0" y1="0" x2={WORLD.width} y2={WORLD.height} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={shade(P.clear, 0.2)} />
          <stop offset="50%" stopColor={P.clear} />
          <stop offset="100%" stopColor={shade(P.clear, -0.35)} />
        </linearGradient>
        {Object.entries(SPARK).map(([k, v]) => (
          <radialGradient key={k} id={`ll-halo-${k}`}>
            <stop offset="0%" stopColor={v.glow} stopOpacity=".6" />
            <stop offset="100%" stopColor={v.glow} stopOpacity="0" />
          </radialGradient>
        ))}
        <clipPath id="ll-cut"><path d={CUT} /></clipPath>
      </defs>

      {/* the frame: lead run right round the window, outside the glass */}
      <path d={d(PANE)} fill="none" stroke={P.frame} strokeWidth="16" strokeLinejoin="round" />
      <path d={d(PANE)} fill="none" stroke={shade(P.frame, 0.25)} strokeWidth="1" strokeLinejoin="round" opacity=".6" />

      {/* clear glass: dim and cool, the way the game draws it before it is lit */}
      <path d={d(PANE)} fill="#0c0d12" />
      <path d={CUT} fill="url(#ll-clear)" opacity=".16" />

      {SCENE.glass.map((s, i) => <path key={i} d={d(s.pts)} fill={glassFill(s.colour, s.tone)} />)}

      {/* the half the cut seals, and the white of glass that has only just set */}
      <path className="ll-flood" d={d(SCENE.flood.pts)} fill={glassFill(SCENE.flood.colour, SCENE.flood.tone)} />
      <path className="ll-fresh" d={d(SCENE.flood.pts)} fill="#ffffff" />

      {/* light from behind the window, strongest near the top: soft light, as
          Scene.js blends it, so it lifts the colour without greying the clear */}
      <path d={d(PANE)} fill="url(#ll-behind)" opacity=".9" style={{ mixBlendMode: 'soft-light' }} />

      {/* lead: every piece's outline, dark, with a soft sheen along it. The new
          cut joins it only once both of its ends have landed. */}
      <g fill="none" strokeLinejoin="round">
        {SCENE.glass.map((s, i) => <path key={i} d={d(s.pts)} stroke={P.lead} strokeWidth="3.4" />)}
        <path d={CUT} stroke={P.lead} strokeWidth="3.4" />
        {SCENE.glass.map((s, i) => <path key={`h${i}`} d={d(s.pts)} stroke={P.leadHi} strokeWidth=".8" strokeOpacity=".7" />)}
        <path d={CUT} stroke={P.leadHi} strokeWidth=".8" strokeOpacity=".7" />
        <g className="ll-set">
          <path d={chord} stroke={P.lead} strokeWidth="3.4" />
          <path d={chord} stroke={P.leadHi} strokeWidth=".8" strokeOpacity=".7" />
        </g>
      </g>

      {/* the window lighting up as it passes three quarters */}
      <path className="ll-lit" d={d(PANE)} fill="url(#ll-light)" />

      {SCENE.sparks.map((s, i) => <Spark key={s.kind} i={i} {...s} />)}

      {/* the cut: molten while it grows, lead once both ends have landed */}
      <g className="ll-line" clipPath="url(#ll-cut)" strokeLinecap="round">
        {ARMS.map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            <line className="ll-arm" x1={x1} y1={y1} x2={x2} y2={y2} pathLength="100"
                  stroke="#ffc45a" strokeWidth="9" strokeOpacity=".35" />
            <line className="ll-arm" x1={x1} y1={y1} x2={x2} y2={y2} pathLength="100"
                  stroke="#fff0c4" strokeWidth="2.6" />
          </g>
        ))}
        <circle className="ll-origin" cx={o[0]} cy={o[1]} r="3.4" fill="#ffffff" />
      </g>
    </svg>
  );
}
