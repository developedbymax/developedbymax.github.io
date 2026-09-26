/* Pearlbound's reef.

   A chamber as the game draws it: rose coral, the ivory seals with their gold
   cores, a gold shell vault, a blue bumper over the current, the red line the
   growth must not cross, and the pearl resting in its shell with the dotted
   preview of a bank shot. Colours are the ones PearlboundRN/src/game/Scene.tsx
   paints with. At micro size it is the pearl in its shell on its own, which is
   also the app icon. */

const SEAL = 'M 0 -18 Q 7 -8 18 0 Q 7 9 0 18 Q -9 7 -18 0 Q -7 -10 0 -18 Z';
const SHELL =
  'M -18 8 Q -29 -8 -16 -18 Q -8 -24 0 -20 Q 9 -25 18 -17 Q 30 -7 18 8 L 6 21 L -6 21 Z';

/* [x, y, kind, extra hits] on a 200-unit board */
const TARGETS = [
  [32, 50, 'coral', 0], [66, 50, 'vault', 0], [100, 50, 'coral', 1], [168, 50, 'coral', 0],
  [38, 82, 'seal', 1], [106, 82, 'seal', 1], [140, 82, 'coral', 0], [174, 82, 'seal', 1],
  [32, 114, 'coral', 1], [100, 114, 'vault', 0], [134, 114, 'coral', 0], [168, 114, 'coral', 1],
];

/* the preview: up and left, off the wall, into the first seal */
const TRAIL = [
  [96, 164], [91, 155], [86, 146], [81, 137], [76, 128], [71, 119], [66, 110], [61, 101],
  [56, 92], [51, 86],
];

function Target({ x, y, kind, extra }) {
  const fill = kind === 'vault' ? '#F2BD63' : kind === 'seal' ? '#FFF1D6' : '#D9879A';
  return (
    <g transform={`translate(${x} ${y}) scale(.56)`}>
      <circle cx="0" cy="7" r="21" fill="#100E20" opacity=".5" />
      <path d={kind === 'vault' ? SHELL : SEAL} fill={fill} />
      <path d={kind === 'vault' ? SHELL : SEAL} fill="none" stroke="#FFF1D6" strokeWidth="1" opacity=".35" />
      <path d="M -10 -5 Q 0 -13 9 -5" fill="none" stroke="#FFF1D6" strokeWidth="1.5" opacity=".5" />
      {kind === 'seal' && (
        <>
          <circle r="7" fill="#211D35" />
          <circle r="3" fill="#F2BD63" />
        </>
      )}
      {extra > 0 && <circle cx="-4" cy="10" r="2" fill="#211D35" />}
    </g>
  );
}

function Mark({ size, label }) {
  return (
    <svg className="pb" viewBox="0 0 64 64" role="img" aria-label={label ?? 'A pearl resting in an open shell.'}
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}>
      <rect width="64" height="64" rx="15" fill="#211D35" />
      <circle cx="32" cy="32" r="19" fill="none" stroke="#715474" strokeWidth=".8" />
      <path d="M 16 38 A 16 13 0 0 0 48 38 Z" fill="#D9879A" />
      <path d="M 19 38 L 32 50 M 25 38 L 32 50 M 32 38 L 32 50 M 39 38 L 32 50 M 45 38 L 32 50"
            stroke="#754B6A" strokeWidth="1.2" />
      <circle cx="32" cy="29" r="10.5" fill="#FFF1D6" />
      <circle cx="28.5" cy="25.5" r="2.6" fill="#FFFFFF" />
      <path d="M 47 17 L 48 20 L 51 21 L 48 22 L 47 25 L 46 22 L 43 21 L 46 20 Z" fill="#F2BD63" />
    </svg>
  );
}

export default function PearlboundReef({ size = 260, label, mark = false }) {
  if (mark) return <Mark size={size} label={label} />;
  return (
    <svg
      className="pb"
      viewBox="0 0 200 200"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'A reef chamber: rose coral, ivory seals and gold shell vaults above a red line, and a pearl in its shell with a dotted path aimed off the wall.'
      }
    >
      <defs>
        <linearGradient id="pb-bg" x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0%" stopColor="#332B49" />
          <stop offset="55%" stopColor="#211D35" />
          <stop offset="100%" stopColor="#171829" />
        </linearGradient>
        <radialGradient id="pb-pearl" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FFF1D6" />
          <stop offset="100%" stopColor="#D6B8C7" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" rx="26" fill="url(#pb-bg)" />
      {/* light falling through the water */}
      <path d="M 26 0 L 58 0 L 150 200 L 112 200 Z" fill="#BCB0E1" opacity=".03" />
      <path d="M 118 0 L 138 0 L 196 200 L 176 200 Z" fill="#BCB0E1" opacity=".04" />

      {/* the chamber wall and its gold corners */}
      <rect x="8" y="10" width="184" height="182" rx="18" fill="none" stroke="#B8A6CC" strokeWidth=".9" opacity=".18" />
      <path d="M 16 36 L 16 24 Q 16 18 22 18 L 36 18 M 164 18 L 178 18 Q 184 18 184 24 L 184 36"
            fill="none" stroke="#F2BD63" strokeWidth=".9" opacity=".45" />

      {TARGETS.map(([x, y, kind, extra], i) => (
        <Target key={i} x={x} y={y} kind={kind} extra={extra} />
      ))}

      {/* the bumper, over a current flowing right */}
      <rect x="18" y="140" width="164" height="16" rx="8" fill="#A8B5F4" opacity=".07" />
      {[50, 100, 150].map((x) => (
        <path key={x} d={`M ${x - 3} 144 L ${x + 2} 148 L ${x - 3} 152`} fill="none" stroke="#A8B5F4"
              strokeWidth="1.1" opacity=".6" />
      ))}
      <g transform="translate(66 134) scale(.5)">
        <circle cx="0" cy="7" r="21" fill="#100E20" opacity=".5" />
        <path d={SEAL} fill="#A8B5F4" />
        <circle r="12" fill="#211D35" />
        <circle r="8" fill="none" stroke="#A8B5F4" strokeWidth="2" />
      </g>

      {/* the red line */}
      <line x1="16" y1="166" x2="184" y2="166" stroke="#F16958" strokeWidth=".8" opacity=".35" />

      {/* the preview, and the pearl in its shell */}
      <g className="pb-trail">
        {TRAIL.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i < 3 ? 1.3 : 1} fill="#FFF1D6" opacity={0.85 - i * 0.05} />
        ))}
      </g>
      <g transform="translate(100 183)">
        <path d="M -17 -5 Q -19 9 -7 14 L 7 14 Q 19 9 17 -5 Q 12 -13 6 -9 Q 0 -15 -6 -9 Q -12 -13 -17 -5 Z" fill="#55435F" />
        <path d="M -14 -3 L -4 12 M -7 -7 L -2 12 M 0 -10 L 0 13 M 7 -7 L 2 12 M 14 -3 L 4 12"
              stroke="#D9879A" strokeWidth=".7" opacity=".65" fill="none" />
      </g>
      <circle className="pb-glow" cx="100" cy="173" r="10" fill="#FFF1D6" opacity=".08" />
      <circle cx="100" cy="173" r="5.5" fill="url(#pb-pearl)" />
    </svg>
  );
}
