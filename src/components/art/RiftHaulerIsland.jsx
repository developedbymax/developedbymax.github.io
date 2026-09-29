/* Rift Hauler's island.

   A corner of The Shatterfields as the game draws it from above: basalt tiles, shale
   rocks with mint crystal seams, the coral fault tiles along an edge that is about to
   fall, the gold extraction pad, and the rover drilling the channel it has cut back
   toward the pad. Colours are the ones RiftHaulerApp/src/render/scene.ts paints with.
   At micro size it is the crystal on its hexagon, which is also the app icon. */

const COLS = 9,
  ROWS = 9,
  CELL = 20;

/* One letter per tile: r rock, c rock with a crystal seam, g loose crystal, f coral
   fault tile, . open floor, p the pad, x fallen (empty). Row 0 is the far edge. */
const MAP = [
  'xffrcfrfx',
  'frcr.rcrf',
  'rcr.c.rcr',
  'crc.r.crc',
  'rr.g..rcr',
  'crc...rr.',
  'r.cr..crc',
  'rcr.p.rcr',
  'x.r...r.x',
];

function Tile({ x, y, kind }) {
  if (kind === 'x') return null;
  const px = 10 + x * CELL,
    py = 12 + y * CELL;
  const floor = kind === 'f' ? '#F29B79' : '#334B53';
  return (
    <g>
      <rect x={px} y={py + 3} width={CELL - 1.5} height={CELL - 1.5} rx="1.5" fill="#1B2A31" />
      <rect x={px} y={py} width={CELL - 1.5} height={CELL - 1.5} rx="1.5" fill={floor}
            opacity={kind === 'f' ? 0.92 : 1} />
      {(kind === 'r' || kind === 'c') && (
        <path
          d={`M ${px + 4} ${py + 15} L ${px + 3} ${py + 7} L ${px + 9} ${py + 2} L ${px + 15} ${py + 6} L ${px + 15} ${py + 15} Z`}
          fill="#53646C"
        />
      )}
      {(kind === 'r' || kind === 'c') && (
        <path d={`M ${px + 3} ${py + 7} L ${px + 9} ${py + 2} L ${px + 15} ${py + 6} L ${px + 9} ${py + 9} Z`}
              fill="#6B7D84" />
      )}
      {(kind === 'c' || kind === 'g') && (
        <g transform={`translate(${px + 9.25} ${py + (kind === 'c' ? 2 : 8)})`}>
          <path d="M 0 -6 L 4 0 L 0 7 L -4 0 Z" fill="#88EFD1" />
          <path d="M 0 -6 L 4 0 L 0 0 Z" fill="#E3FFED" />
          <path d="M 0 7 L 4 0 L 0 0 Z" fill="#4DBAA3" />
        </g>
      )}
    </g>
  );
}

function Mark({ size, label }) {
  return (
    <svg className="rh" viewBox="0 0 128 128" role="img" aria-label={label ?? 'A mint crystal on a dark hexagon above a gold bar.'}
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}>
      <rect width="128" height="128" rx="28" fill="#111A23" />
      <path d="m64 15 42 25v49l-42 25-42-25V40z" fill="#273D48" />
      <path d="m64 28 23 35-23 36-23-36z" fill="#A8F4D1" />
      <path d="m64 28 23 35H64z" fill="#E3FFED" />
      <path d="m64 99 23-36H64z" fill="#4DBAA3" />
      <path d="M31 99h66" stroke="#ECAF60" strokeWidth="5" />
    </svg>
  );
}

export default function RiftHaulerIsland({ size = 260, label, mark = false }) {
  if (mark) return <Mark size={size} label={label} />;
  const pad = { x: 10 + 4 * CELL + CELL / 2 - 0.75, y: 12 + 7 * CELL + CELL / 2 - 0.75 };
  const rover = { x: 10 + 4 * CELL + CELL / 2 - 0.75, y: 12 + 4 * CELL + 13 };
  return (
    <svg
      className="rh"
      viewBox="0 0 200 200"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'A mining island from above: rocks with mint crystal seams, a coral edge about to fall, a gold landing pad, and a small rover drilling a channel back toward it.'
      }
    >
      <defs>
        <linearGradient id="rh-bg" x1="0" y1="0" x2=".5" y2="1">
          <stop offset="0%" stopColor="#15242E" />
          <stop offset="100%" stopColor="#0D151D" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="26" fill="url(#rh-bg)" />
      {/* drifting shale in the rift */}
      <path d="M 186 30 L 194 36 L 188 44 L 180 38 Z" fill="#273944" />
      <path d="M 6 150 L 12 154 L 7 160 L 2 155 Z" fill="#273944" />

      {MAP.map((row, y) => [...row].map((kind, x) => <Tile key={`${x}-${y}`} x={x} y={y} kind={kind} />))}

      {/* the gold pad and its landing lights */}
      <g transform={`translate(${pad.x} ${pad.y})`}>
        <path d="M 0 -11 L 10 -5.5 L 10 5.5 L 0 11 L -10 5.5 L -10 -5.5 Z" fill="#273944" />
        <path className="rh-ring" d="M 0 -8 L 7 -4 L 7 4 L 0 8 L -7 4 L -7 -4 Z" fill="none" stroke="#E9B56B" strokeWidth="1.6" />
        <rect x="-11.5" y="5" width="1.8" height="5" fill="#E9B56B" />
        <rect x="9.7" y="5" width="1.8" height="5" fill="#E9B56B" />
      </g>

      {/* the rover, facing up the channel it is cutting, drill turning into rock */}
      <g transform={`translate(${rover.x} ${rover.y})`}>
        <ellipse cx="0" cy="4" rx="7.5" ry="3" fill="#050B10" opacity=".45" />
        <rect x="-5.5" y="-4" width="11" height="11" rx="1.5" fill="#E6A568" />
        <rect x="-4.3" y="-3" width="8.6" height="5.6" rx="1" fill="#EFE6CC" />
        <rect x="-3.2" y="-3.6" width="6.4" height="1.4" fill="#6EE4CF" />
        <rect x="-6.8" y="-2.5" width="1.6" height="3.4" fill="#13252F" />
        <rect x="5.2" y="-2.5" width="1.6" height="3.4" fill="#13252F" />
        <rect x="-6.8" y="3" width="1.6" height="3.4" fill="#13252F" />
        <rect x="5.2" y="3" width="1.6" height="3.4" fill="#13252F" />
        <path className="rh-drill" d="M -2.6 -4 L 0 -10 L 2.6 -4 Z" fill="#EFE6CC" />
        <circle cx="-1.6" cy="4.6" r="1" fill="#88EFD1" />
        <circle cx="1.6" cy="4.6" r="1" fill="#88EFD1" />
      </g>
      {/* chips thrown by the break */}
      <g className="rh-chips">
        <rect x={rover.x - 7} y={rover.y - 16} width="2" height="2" fill="#88EFD1" transform={`rotate(20 ${rover.x - 6} ${rover.y - 15})`} />
        <rect x={rover.x + 6} y={rover.y - 14} width="2" height="2" fill="#E9B56B" transform={`rotate(40 ${rover.x + 7} ${rover.y - 13})`} />
        <rect x={rover.x - 1} y={rover.y - 20} width="1.6" height="1.6" fill="#88EFD1" />
      </g>
    </svg>
  );
}
