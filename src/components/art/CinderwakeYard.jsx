/* Cinderwake's demolition yard.

   A district as the game draws it: rows of ivory ceramic blocks and grey
   reinforced ones, three brass blocks with glowing cores, the upper gate, a
   red blast circle filling up, loose ember salvage, and the lavender skiff
   swinging its ember ball on a brass tether through the second row. Colours
   are the ones CinderwakeRN/src/game/Scene.js paints with. At micro size it is
   the app icon's skiff and ball on their own. */

const HEX = 'M 0 -12 L 10 -6 L 10 6 L 0 12 L -10 6 L -10 -6 Z';
const HULL = 'M 0 -16 L 10 -4 L 11 10 L 5 13 L -5 13 L -11 10 L -10 -4 Z';

/* [x, y, kind] on a 200-unit board: 0 ceramic, 1 core, 2 reinforced, -1 broken */
const BLOCKS = [
  [40, 58, 2], [72, 58, 0], [128, 58, 0], [160, 58, 0],
  [40, 86, 1], [72, 86, -1], [128, 86, 0], [160, 86, 2],
  [40, 114, 0], [72, 114, 0], [128, 114, 2], [160, 114, 1],
  [40, 142, 2], [72, 142, 1], [128, 142, 0], [160, 142, 0],
];

const SALVAGE = [[64, 94], [78, 98], [70, 104], [88, 90], [118, 170], [148, 176]];

function Block({ x, y, kind }) {
  if (kind < 0) return null;
  const top = kind === 1 ? '#B99A61' : kind === 2 ? '#A297A9' : '#E8DCC6';
  return (
    <g transform={`translate(${x} ${y}) scale(.6)`}>
      <rect x="-17" y="-11" width="36" height="38" rx="6" fill="#090910" opacity=".55" />
      <rect x="-17" y="-12" width="34" height="32" rx="4" fill="#625365" />
      <rect x="-17" y="-18" width="34" height="31" rx="4" fill={top} />
      <path d="M -12 -14 L 11 -14 L 14 -10" fill="none" stroke="#FFF8E3" strokeWidth="1" opacity=".55" />
      {kind === 1 && (
        <>
          <circle cy="-2" r="11" fill="#3A2D3C" />
          <circle cy="-2" r="7" fill="#FF9B54" />
          <path d="M 0 -7 L 4 -2 L 0 3 L -4 -2 Z" fill="#FFF1C9" />
        </>
      )}
      {kind === 2 && (
        <path d="M -5 -17 L 1 -5 L -5 0 L 4 12 M 1 -5 L 13 -8" fill="none" stroke="#544252" strokeWidth="1.5" opacity=".7" />
      )}
    </g>
  );
}

function Mark({ size, label }) {
  return (
    <svg className="cw" viewBox="0 0 64 64" role="img" aria-label={label ?? 'A lavender skiff swinging an ember ball on a brass tether.'}
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}>
      <rect width="64" height="64" rx="15" fill="#191522" />
      <circle cx="32" cy="32" r="26" fill="#2A2233" />
      <path d="M 12 38 A 21 21 0 0 1 44 12" fill="none" stroke="#B99A61" strokeWidth="1.2" opacity=".8" />
      <line x1="25" y1="40" x2="38" y2="24" stroke="#0D0B14" strokeWidth="3" />
      <line x1="25" y1="40" x2="38" y2="24" stroke="#B99A61" strokeWidth="1.6" />
      <g transform="translate(38 24) scale(.62)"><path d={HEX} fill="#FF9B54" /><path d="M 0 -12 L 10 -6 L 0 0 L -10 -6 Z" fill="#FFD3A0" /><circle r="3.4" fill="#534052" /></g>
      <g transform="translate(25 42) scale(.62)"><path d={HULL} fill="#9AA7FF" /><path d="M 0 -13 L 8 -3 L 0 0 L -8 -3 Z" fill="#DDE2FF" /><rect x="-4" y="-3" width="8" height="9" rx="3" fill="#28253D" /></g>
    </svg>
  );
}

export default function CinderwakeYard({ size = 260, label, mark = false }) {
  if (mark) return <Mark size={size} label={label} />;
  return (
    <svg
      className="cw"
      viewBox="0 0 200 200"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'A demolition yard: rows of ivory ceramic blocks and three brass cores, a red blast circle filling up, and a lavender skiff swinging an ember ball on a brass tether through a broken block.'
      }
    >
      <defs>
        <linearGradient id="cw-bg" x1="0" y1="0" x2=".64" y2="1">
          <stop offset="0%" stopColor="#28212E" />
          <stop offset="100%" stopColor="#181720" />
        </linearGradient>
      </defs>

      <rect width="200" height="200" rx="26" fill="url(#cw-bg)" />
      <circle cx="100" cy="104" r="96" fill="#6B4957" opacity=".07" />
      {[25, 50, 75, 100, 125, 150, 175].map((x) => (
        <line key={`v${x}`} x1={x} y1="30" x2={x} y2="190" stroke="#6D5969" strokeWidth=".5" opacity=".2" />
      ))}
      {[40, 65, 90, 115, 140, 165].map((y) => (
        <line key={`h${y}`} x1="10" y1={y} x2="190" y2={y} stroke="#6D5969" strokeWidth=".5" opacity=".2" />
      ))}

      {/* the district's wall, its brass corners and the upper gate */}
      <rect x="8" y="30" width="184" height="162" rx="12" fill="none" stroke="#53434E" strokeWidth=".8" />
      <path d="M 15 44 L 15 37 L 24 37 M 176 37 L 185 37 L 185 44 M 15 178 L 15 185 L 24 185 M 176 185 L 185 185 L 185 178"
            fill="none" stroke="#B99A61" strokeWidth="1.1" opacity=".5" />
      <rect x="82" y="31" width="36" height="20" rx="6" fill="#302635" />
      <rect x="82" y="31" width="36" height="20" rx="6" fill="none" stroke="#FF9B54" strokeWidth=".9" />
      <path d="M 95 44 L 100 39 L 105 44 M 96 47 L 100 43 L 104 47" fill="none" stroke="#FF9B54" strokeWidth="1.1" />

      {BLOCKS.map(([x, y, kind], i) => (
        <Block key={i} x={x} y={y} kind={kind} />
      ))}

      {/* the block the ball just went through: debris and salvage */}
      {[[68, 82, 1.4], [79, 80, 1], [63, 90, 1.1], [83, 88, .8], [75, 76, .9]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#FF9B54" opacity=".8" />
      ))}
      {SALVAGE.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="#FF9B54" opacity=".12" />
          <path d={`M ${x} ${y - 2.2} L ${x + 2.2} ${y} L ${x} ${y + 2.2} L ${x - 2.2} ${y} Z`} fill="#FF9B54" />
        </g>
      ))}

      {/* a blast filling up, marked before it goes off */}
      <g transform="translate(150 150)">
        <circle r="17" fill="#E34B67" opacity=".08" />
        <circle r="17" fill="none" stroke="#E34B67" strokeWidth=".9" />
        <circle className="cw-blast" r="17" fill="none" stroke="#E34B67" strokeWidth=".6" opacity=".65" />
        <path d="M -2 -2 L 2 2 M 2 -2 L -2 2" stroke="#FFBDC8" strokeWidth="1.1" />
      </g>

      {/* the swing: its wake, the tether, the ball and the skiff */}
      <g className="cw-wake">
        {[[92, 100, 5], [96, 110, 4.4], [98, 120, 3.8], [98, 130, 3.2]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#FF9B54" opacity={0.18 - i * 0.03} />
        ))}
      </g>
      <line x1="100" y1="160" x2="84" y2="95" stroke="#0D0B14" strokeWidth="3" />
      <line x1="100" y1="160" x2="84" y2="95" stroke="#B99A61" strokeWidth="1.3" />
      <line x1="100" y1="160" x2="84" y2="95" stroke="#EAD1A2" strokeWidth=".35" />
      <g transform="translate(84 95) scale(.62)">
        <circle className="cw-glow" r="24" fill="#FF9B54" opacity=".16" />
        <path d={HEX} fill="none" stroke="#67505E" strokeWidth="5" />
        <path d={HEX} fill="#FF9B54" />
        <path d="M 0 -10 L 8 -5 L 0 -1 L -8 -5 Z" fill="#FFD3A0" />
        <path d="M 0 -1 L 8 -5 L 8 5 L 0 10 Z" fill="#C47949" />
        <circle r="3.5" fill="#4B3343" />
      </g>
      <g transform="translate(100 162) rotate(-14) scale(.62)">
        <circle cx="2" cy="7" r="15" fill="#090910" opacity=".5" />
        <path d="M -6 11 L 0 25 L 6 11 Z" fill="#FF9B54" opacity=".7" />
        <path d={HULL} fill="none" stroke="#5D638E" strokeWidth="3" />
        <path d={HULL} fill="#9AA7FF" />
        <path d="M 0 -13 L 8 -3 L 0 0 L -8 -3 Z" fill="#D9DEFF" />
        <rect x="-4" y="-3" width="8" height="9" rx="3" fill="#27273F" />
      </g>
    </svg>
  );
}
