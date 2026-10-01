import { BAY } from './floehelmData.js';

/* Floehelm's frozen bay.

   A real moment from the game (floehelmData.js, generated from FloehelmRN by
   scripts/floehelm-art.mjs): bay 7, Quiet Reach III — channels the icebreaker
   carved, stone islands, boats waiting with their beacons, one sailing home
   along its dotted route, a crosswind band, and the harbor's lanterns. Drawn
   with the same colours and boat hull as FloehelmRN/src/game/Scene.tsx, and
   cropped to the rows between the top islands and the harbor. At micro size it
   is the app icon (tools/assets.py's geometry, in its own 1024 units). */

const HULL = 'M 0 -14 C 7 -9 9 -4 8 10 L -8 10 C -9 -4 -7 -9 0 -14 Z';
const BOATS = ['#E8DDBD', '#ADBFB6', '#B8BDD4'];

function Boat({ x, y, deg, color, scale }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${deg}) scale(${scale})`}>
      <path d={HULL} fill="#0A1C28" opacity=".44" transform="translate(2 4)" />
      <path d={HULL} fill={color} />
      <rect x="-6" y="4" width="12" height="5" rx="1" fill="#192F3B" />
      <rect x="-5" y="-3" width="10" height="8" rx="2" fill="#F2EBDD" />
      <rect x="-3" y="-1" width="6" height="3" rx="1" fill="#294B59" />
      <circle cx="-4" cy="-7" r="1.2" fill="#FFE8AC" />
      <circle cx="4" cy="-7" r="1.2" fill="#FFE8AC" />
      <line x1="0" y1="-5" x2="0" y2="-12" stroke="#EEDBC2" strokeWidth="1" />
    </g>
  );
}

function Mark({ size, label }) {
  const pts = (a) => a.map((p) => p.join(',')).join(' ');
  return (
    <svg className="fh" viewBox="0 0 1024 1024" role="img"
         aria-label={label ?? 'An orange icebreaker cutting a dark channel between two sheets of ice.'}
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}>
      <defs>
        <clipPath id="fh-icon"><rect width="1024" height="1024" rx="230" /></clipPath>
      </defs>
      <g clipPath="url(#fh-icon)">
        <rect width="1024" height="1024" fill="#102635" />
        <polygon points={pts([[0, 0], [670, 0], [650, 180], [520, 300], [490, 475], [330, 630], [300, 800], [0, 910]])} fill="#DCEBED" />
        <polygon points={pts([[1024, 90], [835, 130], [720, 320], [750, 470], [570, 620], [620, 810], [430, 1024], [1024, 1024]])} fill="#B1CCD4" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx="512" cy={680 + i * 40} r={16 + i * 6} fill="#648692" />
        ))}
        <polygon points={pts([[515, 266], [594, 368], [600, 643], [428, 643], [432, 368]])} fill="#102330" />
        <polygon points={pts([[512, 245], [582, 358], [582, 620], [442, 620], [442, 358]])} fill="#EFA14C" />
        <rect x="466" y="402" width="92" height="124" rx="14" fill="#F1ECDB" />
        <rect x="478" y="417" width="69" height="38" rx="7" fill="#274858" />
        <rect x="452" y="550" width="120" height="46" fill="#26414C" />
        <rect x="501" y="509" width="22" height="81" fill="#8BA0A5" />
        <line x1="512" y1="284" x2="512" y2="382" stroke="#F8D89D" strokeWidth="7" />
      </g>
    </svg>
  );
}

export default function FloehelmBay({ size = 260, label, mark = false }) {
  if (mark) return <Mark size={size} label={label} />;
  const { cell, harbor: h, crosswind: w } = BAY;
  return (
    <svg
      className="fh"
      viewBox="0 56 360 420"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%', borderRadius: 22 }}
      role="img"
      aria-label={
        label ??
        `A frozen bay from the game, ${BAY.name}: dark channels carved through pale ice between stone islands, boats waiting with beacons, one sailing home along a dotted route, a rose crosswind band, and an orange icebreaker near the top.`
      }
    >
      <rect x="0" y="0" width={BAY.cols * cell} height={BAY.rows * cell} fill={BAY.water} />
      <path d={BAY.paths.lip} fill={BAY.edge} />
      <path d={BAY.paths.ice} fill={BAY.ice} />
      <path d={BAY.paths.cracks} fill="none" stroke={BAY.edge} strokeWidth="1.25" />
      <path d={BAY.paths.marks} fill="none" stroke="#FFFFFF" strokeOpacity=".56" strokeWidth="1" />
      <path d={BAY.paths.rim} fill="none" stroke="#F8FFFF" strokeWidth="1.3" />
      {BAY.stone.map(([x, y]) => (
        <g key={`${x},${y}`}>
          <rect x={x * cell} y={y * cell} width={cell} height={cell} fill="#183140" />
          <rect x={x * cell + 1} y={y * cell + 1} width={cell - 2} height={cell - 4} rx="2" fill="#49616A" />
        </g>
      ))}
      {BAY.routes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#F7D990" fillOpacity=".63" />
      ))}

      {/* the harbor: its glow, quay and two lanterns */}
      <circle cx={h.x} cy={h.y} r="34" fill="#F6DDA5" fillOpacity=".09" />
      <rect x={h.x - 37} y={h.y + 17} width="74" height="9" rx="2" fill="#1A303B" />
      <rect x={h.x - 37} y={h.y + 15} width="74" height="5" rx="1" fill="#819B9F" />
      {[h.x - 31, h.x + 28].map((x) => (
        <g key={x}>
          <rect x={x} y={h.y - 15} width="5" height="36" rx="1" fill="#9AB0AF" />
          <rect x={x - 5} y={h.y - 29} width="15" height="15" rx="2" fill="#1A3442" />
          <rect x={x - 2} y={h.y - 26} width="9" height="7" rx="1" fill="#F5D890" />
          <circle cx={x + 2} cy={h.y - 22} r="11" fill="#F5D890" fillOpacity=".13" />
        </g>
      ))}

      {w && (
        <g>
          <rect x={w.x - w.half} y="10" width={w.half * 2} height="380" fill="#D64D67" fillOpacity={w.active ? 0.38 : 0.12} />
          <line x1={w.x - w.half} y1="10" x2={w.x - w.half} y2="390" stroke="#D97783" strokeWidth="1" />
          <line x1={w.x + w.half} y1="10" x2={w.x + w.half} y2="390" stroke="#D97783" strokeWidth="1" />
        </g>
      )}

      {BAY.boats.map((b, i) => (
        <g key={i}>
          {b.state === 'waiting' && (
            <g>
              <circle cx={b.x} cy={b.y} r="15" fill="#E3C881" fillOpacity=".16" />
              <circle cx={b.x} cy={b.y - 21} r="7" fill="#162E3D" />
              <rect x={b.x - 1} y={b.y - 25} width="2" height="5" rx="1" fill="#F5D890" />
              <circle cx={b.x} cy={b.y - 18} r="1" fill="#F5D890" />
            </g>
          )}
          <Boat x={b.x} y={b.y} deg={b.deg} color={BOATS[b.kind]} scale={0.75} />
        </g>
      ))}
      <Boat x={BAY.ship.x} y={BAY.ship.y} deg={BAY.ship.deg} color="#F0A34C" scale={1} />
    </svg>
  );
}
