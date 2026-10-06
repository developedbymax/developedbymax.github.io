/* Sirocco Courier's airfield poster.

   A straight port of Poster in SiroccoCourierRN/src/game/Scene.tsx — the
   illustration on the game's home screen: a pale sun with its survey ticks, a
   coral sun-disc, five dune bands and the Tern glider banking over them with its
   trail. Same 400 × 280 units, same colours (Skia's #RRGGBBAA is SVG's too),
   same wing geometry at scale 2.25 and -21°. The game draws it on its paper
   ground, so the paper is drawn here as a postcard. At micro size it is the app
   icon instead (tools/assets.py's geometry, in its own 1024 units). */

const DUNES = ['#CDB799', '#DFC8A4', '#B89277', '#D9BA8E', '#EBD8B8'];

/* The glider, exactly as wing() draws it, before transforms. */
function Wing({ color = '#BC573D' }) {
  return (
    <g>
      <polygon points="-31,12 0,-23 31,12 8,6 0,23 -8,6" fill="#F8EBD5" />
      <polygon points="0,-23 31,12 8,6 0,23" fill={color} />
      <polygon points="-31,12 0,-23 -8,6" fill="#E1BA8A" />
      <line x1="0" y1="-20" x2="0" y2="22" stroke="#4B3B48" strokeWidth="1.4" />
      <line x1="-27" y1="11" x2="0" y2="0" stroke="#FDF2DF" strokeWidth="0.8" />
      <line x1="27" y1="11" x2="0" y2="0" stroke="#FDF2DF" strokeWidth="0.8" />
      <circle cx="0" cy="5" r="2.4" fill="#493441" />
    </g>
  );
}

function Mark({ size, label }) {
  return (
    <svg className="sc" viewBox="0 0 1024 1024" role="img"
         aria-label={label ?? 'A cream, coral and sand paper glider on a dark plum circle.'}
         style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}>
      <defs>
        <clipPath id="sc-icon"><rect width="1024" height="1024" rx="230" /></clipPath>
      </defs>
      <g clipPath="url(#sc-icon)">
        <rect width="1024" height="1024" fill="#382D40" />
        <circle cx="510" cy="480" r="345" fill="#49394B" />
        <polygon points="175,580 500,175 840,580 565,495 500,710 425,495" fill="#F6E5C0" />
        <polygon points="500,175 500,710 565,495 840,580" fill="#C86546" />
        <polygon points="425,495 500,175 500,710" fill="#E8B577" />
      </g>
    </svg>
  );
}

export default function SiroccoPoster({ size = 260, label, mark = false, color }) {
  if (mark) return <Mark size={size} label={label} />;
  return (
    <svg
      className="sc"
      viewBox="0 0 400 280"
      style={{ width: typeof size === 'number' ? `${size}px` : size, maxWidth: '100%' }}
      role="img"
      aria-label={
        label ??
        'The game’s airfield poster: a coral glider banking over five bands of desert dunes beneath a pale sun.'
      }
    >
      <defs>
        <clipPath id="sc-card"><rect width="400" height="280" rx="22" /></clipPath>
      </defs>
      <g clipPath="url(#sc-card)">
        <rect width="400" height="280" fill="#F5EBDC" />
        <circle cx="230" cy="112" r="103" fill="#E8D8BF" />
        <circle cx="230" cy="112" r="78" fill="#F0E3CC" />
        <circle cx="295" cy="66" r="25" fill="#C26849" />
        {DUNES.map((fill, i) => {
          const y = 140 + i * 27;
          return (
            <path key={fill} fill={fill}
                  d={`M -20 ${y} C 100 ${y - 110} 230 ${y + 85} 430 ${y - 52} L 430 300 L -20 300 Z`} />
          );
        })}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={83 + i * 22} y1="42" x2={92 + i * 22} y2="42" stroke="#7D6B5C50" strokeWidth="1" />
        ))}
        <line x1="230" y1="8" x2="230" y2="22" stroke="#7D6B5C70" strokeWidth="1" />
        <line x1="122" y1="112" x2="136" y2="112" stroke="#7D6B5C70" strokeWidth="1" />
        <line x1="325" y1="112" x2="339" y2="112" stroke="#7D6B5C70" strokeWidth="1" />
        <polygon points="207,212 244,175 278,213 245,240" fill="#6C4C4B25" />
        <g transform="translate(212 123) rotate(-21) scale(2.25)">
          <Wing color={color} />
        </g>
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx={220 + i * 5} cy={192 + i * 8} r={2 - i * 0.18} fill="#F7EFDE" />
        ))}
      </g>
    </svg>
  );
}
