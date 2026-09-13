/* Scrapglow's arena.

   The ship at the centre of its own magnetic field, the halo of collected scrap
   turning with it, coral debris drifting in the dark, and the gold recycler
   waiting to be flown into. Colours are the ones Scene.js paints with. */

const HALO = [
  [0, 26], [48, 24], [96, 27], [140, 23], [188, 26], [232, 25], [276, 24], [320, 27],
];

const LOOSE = [
  [34, 38, 3.2], [160, 44, 2.6], [52, 156, 2.9], [172, 142, 3.4], [104, 24, 2.4],
];

const DEBRIS = [
  { x: 30, y: 108, r: 7.5, cls: '' },
  { x: 168, y: 74, r: 6, cls: 'b' },
  { x: 118, y: 170, r: 8.5, cls: 'c' },
];

export default function ScrapglowArena({ size = 260, label }) {
  return (
    <svg
      className="sg"
      viewBox="0 0 200 200"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'A salvage ship inside a ring of collected scrap, drifting near a glowing gold recycler while coral debris floats past.'
      }
    >
      <defs>
        <radialGradient id="sg-bg" cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#14304A" />
          <stop offset="62%" stopColor="#0C1D2C" />
          <stop offset="100%" stopColor="#071722" />
        </radialGradient>
        <radialGradient id="sg-rec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF0BC" />
          <stop offset="52%" stopColor="#F8CA70" />
          <stop offset="100%" stopColor="#997844" />
        </radialGradient>
        <radialGradient id="sg-ship" cx="42%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#C0FFDC" />
          <stop offset="70%" stopColor="#61DAC8" />
          <stop offset="100%" stopColor="#184C49" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" rx="26" fill="url(#sg-bg)" />

      {/* the arena edge, and the faint rings the game draws on the floor */}
      <g stroke="#8BA8B9" fill="none" opacity=".16">
        <rect x="6" y="6" width="188" height="188" rx="22" strokeWidth="1.2" strokeDasharray="7 6" />
        <circle cx="100" cy="100" r="74" strokeWidth=".9" />
        <circle cx="100" cy="100" r="46" strokeWidth=".9" />
      </g>

      {/* loose scrap, not yet collected */}
      {LOOSE.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#61DAC8" opacity=".55" />
      ))}

      {/* the recycler */}
      <g>
        <circle className="sg-pulse" cx="149" cy="52" r="25" fill="#F8CA70" opacity=".32" />
        <circle cx="149" cy="52" r="14" fill="url(#sg-rec)" />
        <circle cx="149" cy="52" r="14" fill="none" stroke="#FFE5A1" strokeWidth="1.6" opacity=".85" />
        <circle cx="149" cy="52" r="6" fill="none" stroke="#071722" strokeWidth="2" opacity=".45" />
      </g>

      {/* coral debris */}
      {DEBRIS.map((d, i) => (
        <g key={i} className={`sg-deb ${d.cls}`}>
          <circle cx={d.x} cy={d.y} r={d.r + 4} fill="#FB9C89" opacity=".13" />
          <circle cx={d.x} cy={d.y} r={d.r} fill="#F19582" />
          <circle cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.35} r={d.r * 0.34} fill="#FFD1AE" opacity=".7" />
        </g>
      ))}

      {/* the ship, and the cargo turning around it */}
      <g className="sg-ship" style={{ transformOrigin: '86px 118px' }}>
        <circle cx="86" cy="118" r="30" fill="#61DAC8" opacity=".07" />
        <circle cx="86" cy="118" r="30" fill="none" stroke="#61DAC8" strokeWidth=".9" opacity=".3" strokeDasharray="3 5" />
        <g className="sg-halo" style={{ transformOrigin: '86px 118px' }}>
          {HALO.map(([deg, rad], i) => {
            const a = (deg * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={(86 + Math.cos(a) * rad).toFixed(2)}
                cy={(118 + Math.sin(a) * rad).toFixed(2)}
                r={i % 3 === 0 ? 3.6 : 2.8}
                fill="#72DAB9"
                stroke="#C0FFDC"
                strokeWidth=".7"
              />
            );
          })}
        </g>
        <path d="M86 106 L95 124 L86 119.5 L77 124 Z" fill="url(#sg-ship)" stroke="#C0FFDC" strokeWidth="1.1" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
