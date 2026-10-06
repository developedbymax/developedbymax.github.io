/* Starshell's sky: a lit world, the one orbit its small white ship lives on,
   golden starlight ahead and orange meteors falling in.

   Colours and proportions are the game's own — src/orbit/OrbitScene.js in
   StarshellRN: the orbit at 0.66 of the scene's scale, the planet at 0.29, the
   rings at 0.44 / 0.88 / 1.1, Blue hour's palette. The ship circles clockwise
   with its trail behind it; with reduced motion it rests where the app icon
   shows it. */

const C = {
  night: '#0A121D', ink: '#F2F0E9', accent: '#8DE8D5', planet: '#193E48',
  glow: '#347D7C', gold: '#FFDE9D', orange: '#FFA17C',
};
const CX = 100, CY = 100, S = 86;          // the scene's scale, in viewBox units
const ORBIT = 0.66 * S;
const r2 = (v) => Math.round(v * 100) / 100;
const at = (a, r) => [r2(CX + Math.cos(a) * r), r2(CY + Math.sin(a) * r)];
const arc = (r, a0, a1) => {
  const [x0, y0] = at(a0, r), [x1, y1] = at(a1, r);
  return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`;
};

/* The game's starfield formula, so the scatter is the same one. */
const STARS = Array.from({ length: 34 }, (_, i) => ({
  x: r2(((i * 137.508) % 997) / 997 * 200),
  y: r2(((i * i * 31.17 + 7) % 991) / 991 * 200),
  r: i % 11 === 0 ? 0.9 : 0.45,
  o: i % 3 === 0 ? 0.5 : 0.2,
}));
const TICKS = Array.from({ length: 48 }, (_, i) => {
  const a = (i / 48) * Math.PI * 2;
  return { a, p1: at(a, S * 0.88), p2: at(a, S * (i % 4 === 0 ? 0.915 : 0.894)), major: i % 4 === 0 };
});
/* starlight a little way ahead of where the ship starts, and two meteors */
const MOTES = [0.62, 0.81, 1.0].map((a) => at(a, ORBIT));
const diamond = ([x, y]) => `M${x} ${r2(y - 3.4)}L${r2(x + 2.4)} ${y}L${x} ${r2(y + 3.4)}L${r2(x - 2.4)} ${y}Z`;
const hex = ([x, y], r, a0) => Array.from({ length: 6 }, (_, i) => {
  const a = a0 + (i / 6) * Math.PI * 2;
  return `${r2(x + Math.cos(a) * r)} ${r2(y + Math.sin(a) * r)}`;
}).join(' ');
const METEOR = { a: 2.45, at: at(2.45, S * 0.98), tail: at(2.45, S * 1.14) };
const WARNING = at(-2.3, S * 1.025);

function Scene({ id, mark }) {
  return (
    <>
      <defs>
        {/* On the page the sky fades into the site's own night; as the icon
            it fills its tile. */}
        <radialGradient id={`${id}-sky`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.planet} />
          <stop offset="0.72" stopColor={C.night} stopOpacity={mark ? 1 : 0.85} />
          <stop offset="1" stopColor={C.night} stopOpacity={mark ? 1 : 0} />
        </radialGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.glow} stopOpacity="0.45" />
          <stop offset="1" stopColor={C.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-world`} cx="24%" cy="16%" r="100%">
          <stop offset="0" stopColor={C.glow} />
          <stop offset="0.5" stopColor={C.planet} />
          <stop offset="1" stopColor="#101C29" />
        </radialGradient>
        <radialGradient id={`${id}-gold`}>
          <stop offset="0" stopColor="#FFD994" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFD994" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-ship`}>
          <stop offset="0" stopColor={C.accent} stopOpacity="0.32" />
          <stop offset="1" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {mark && <rect width="200" height="200" rx="44" fill={C.night} />}
      <circle cx={CX} cy={CY} r="100" fill={`url(#${id}-sky)`} />
      {!mark && STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={C.ink} opacity={s.o * Math.max(0, 1 - Math.hypot(s.x - CX, s.y - CY) / 110)} />)}
      {!mark && [0.44, 0.88, 1.1].map((r) => (
        <circle key={r} cx={CX} cy={CY} r={r2(S * r)} fill="none" stroke={C.accent} strokeWidth="0.5" opacity="0.1" />
      ))}
      {!mark && TICKS.map((t, i) => (
        <line key={i} x1={t.p1[0]} y1={t.p1[1]} x2={t.p2[0]} y2={t.p2[1]} stroke={C.accent} strokeWidth="0.6" opacity={t.major ? 0.25 : 0.1} />
      ))}
      <circle cx={CX} cy={CY} r={r2(S * 0.47)} fill={`url(#${id}-halo)`} />
      <circle cx={CX} cy={CY} r={r2(ORBIT)} fill="none" stroke={C.accent} strokeWidth={mark ? 2 : 1.1} opacity={mark ? 0.4 : 0.26} />
      <circle cx={CX} cy={CY} r={r2(S * 0.29)} fill={`url(#${id}-world)`} />
      <circle cx={CX} cy={CY} r={r2(S * 0.295)} fill="none" stroke={C.accent} strokeWidth="0.7" opacity="0.35" />
      {!mark && [-0.14, -0.04, 0.07, 0.18].map((o, i) => (
        <path key={o} d={arc(r2(S * (0.24 + i * 0.027)), -0.6, 0.75)} transform={`translate(${r2(-S * 0.26)} ${r2(o * S)})`}
              fill="none" stroke={C.accent} strokeWidth="0.6" opacity="0.1" />
      ))}

      {MOTES.map((p, i) => (
        <g key={i} className="so-mote" style={{ '--i': i }}>
          <circle cx={p[0]} cy={p[1]} r="8" fill={`url(#${id}-gold)`} />
          <path d={diamond(p)} fill={C.gold} />
        </g>
      ))}

      <g className="so-meteor">
        <line x1={METEOR.at[0]} y1={METEOR.at[1]} x2={METEOR.tail[0]} y2={METEOR.tail[1]} stroke={C.orange} strokeWidth="2.4" strokeLinecap="round" opacity="0.25" />
        <polygon points={hex(METEOR.at, 4.4, METEOR.a)} fill={C.orange} />
      </g>
      {!mark && (
        <g className="so-warn">
          <circle cx={WARNING[0]} cy={WARNING[1]} r="4.6" fill="none" stroke={C.orange} strokeWidth="1" />
          <circle cx={WARNING[0]} cy={WARNING[1]} r="1.3" fill={C.orange} />
        </g>
      )}

      {/* The ship and its trail turn together about the world's centre. At
          angle 0 it sits on the right of the orbit heading down: clockwise. */}
      <g className="so-ship" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <g transform={`rotate(-35 ${CX} ${CY})`}>
          <path d={arc(r2(ORBIT), -0.85, 0)} fill="none" stroke={C.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.25" />
          <path d={arc(r2(ORBIT), -0.3, 0)} fill="none" stroke={C.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
          <circle cx={r2(CX + ORBIT)} cy={CY} r="15" fill={`url(#${id}-ship)`} />
          <path d="M0 -7.2L4.8 5.4L0 3L-4.8 5.4Z" fill={C.ink}
                transform={`translate(${r2(CX + ORBIT)} ${CY}) rotate(180)`} />
        </g>
      </g>
    </>
  );
}

export default function StarshellOrbit({ size = 300, mark = false, label = 'A small white ship circling a lit blue world, with golden starlight ahead of it and an orange meteor falling in' }) {
  const id = mark ? 'so-m' : 'so';
  return (
    <svg className={`so${mark ? ' so-mark' : ''}`} viewBox="0 0 200 200" role="img" aria-label={label}
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}>
      <Scene id={id} mark={mark} />
    </svg>
  );
}
