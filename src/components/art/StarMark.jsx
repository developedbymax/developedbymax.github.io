/* One mark per star, copied from StarshellRN/src/ui/glyphs.js — the same data,
   so a star on this site is drawn from the same numbers as the star in the game.

   The vocabulary, as the game states it:
     rays pointing UP     it does something to what is above it
     rays pointing DOWN   it reads what is already below it
     a solid slab         it stops something
     a doubled mark       it repeats something

   Every number is in points at a 22pt mark. Angles are screen degrees, so -90
   is straight up. */
export const GLYPHS = {
  peony: { core: 4, ring: 9 },
  willow: { core: 3, rays: [{ a: -60, len: 8 }, { a: -120, len: 8 }] },
  lantern: { core: 3, rays: [{ a: -50, len: 9 }, { a: -90, len: 10 }, { a: -130, len: 9 }], pips: [{ dx: 0, dy: -9 }] },
  emberdrift: { core: 3, rays: [{ a: 60, len: 8 }, { a: 120, len: 8 }] },
  mine: { core: 2.5, bar: { y: 6, w: 13 }, rays: [{ a: -65, len: 7 }, { a: -115, len: 7 }] },
  crossette: { core: 3, twin: { dx: 5, dy: -5 }, rays: [{ a: -90, len: 7 }] },
  relay: { core: 3, twin: { dx: 5, dy: 5 }, rays: [{ a: 90, len: 7 }] },
  comet: { core: 3, tail: { len: 10, a: 90 } },
  ghost: { bar: { y: 6, w: 14 }, rays: [{ a: -55, len: 7 }, { a: -90, len: 8 }, { a: -125, len: 7 }] },
  chrysanth: { core: 2.5, rays: [0, 45, 90, 135].flatMap((a) => [{ a, len: 8 }, { a: a + 180, len: 8 }]) },
  brocade: { core: 4, cap: true },
  salute: { slab: true },
  pearl: { core: 8 },
  bombette: { core: 4, foot: true },
  ringlet: { core: 3, rays: [{ a: -90, len: 13 }], pips: [{ dx: 0, dy: -7 }] },
  palm: { core: 4.5, lid: true },
  horsetail: { core: 2.5, foot: true, pips: [{ dx: 0, dy: -6 }, { dx: 0, dy: -10 }] },
  quill: { core: 2.5, rays: [{ a: -68, len: 11 }] },
  nautilus: { core: 2.5, pips: [{ dx: 5, dy: 2 }, { dx: 4, dy: -5 }, { dx: -2, dy: -6 }] },
  kamuro: { core: 3, rays: [{ a: -90, len: 7 }], bar: { y: 4, w: 11 } },
  wick: { core: 2, rays: [{ a: -78, len: 9 }, { a: -102, len: 9 }], pips: [{ dx: 0, dy: 6 }] },
  fountain: { core: 2.5, rays: [{ a: -70, len: 8 }, { a: -110, len: 8 }, { a: 70, len: 8 }, { a: 110, len: 8 }] },
};

/* Colour says what a star DOES; the mark says which one it is. The eight
   families and their colours are StarshellRN/src/ui/theme.js. */
export const FAMILIES = [
  { key: 'plain', colour: '#9FB4FF', name: 'Just brightness', stars: ['peony', 'pearl'] },
  { key: 'multiply', colour: '#FFD166', name: 'Multiplies a neighbour', stars: ['willow', 'lantern', 'ringlet', 'palm'] },
  { key: 'total', colour: '#FF8AE2', name: 'Multiplies the whole burst', stars: ['chrysanth'] },
  { key: 'repeat', colour: '#6EE7A0', name: 'Makes something happen again', stars: ['crossette', 'relay', 'wick'] },
  { key: 'copy', colour: '#5AC8FA', name: 'Borrows from a neighbour', stars: ['comet', 'horsetail'] },
  { key: 'read', colour: '#FF8F5E', name: 'Scores off the state of the shell', stars: ['emberdrift', 'mine', 'quill', 'nautilus', 'fountain', 'brocade', 'bombette'] },
  { key: 'give', colour: '#B98CFF', name: 'Hands a neighbour a bonus', stars: ['ghost', 'kamuro'] },
  { key: 'stop', colour: '#FF6B81', name: 'Ends something', stars: ['salute'] },
];

export const colourOf = (star) => FAMILIES.find((f) => f.stars.includes(star))?.colour ?? '#EEF0FF';

const r2 = (v) => Math.round(v * 100) / 100;

/* Draws one mark centred on (x, y), `size` points across (22 is the game's own
   size). SVG rather than the game's stacked views, so every stroke scales. */
export function StarMark({ star, x = 11, y = 11, size = 22, colour }) {
  const g = GLYPHS[star] || GLYPHS.peony;
  const c = colour || colourOf(star);
  const k = size / 22;
  const bar = (w, h, top, rx = 1) => (
    <rect x={r2(x - (w * k) / 2)} y={r2(top)} width={r2(w * k)} height={r2(h * k)} rx={r2(rx * k)} fill={c} />
  );
  const ray = (a, len, from, width, opacity, key) => {
    const rad = (a * Math.PI) / 180;
    const [dx, dy] = [Math.cos(rad), Math.sin(rad)];
    return (
      <line key={key}
        x1={r2(x + dx * from * k)} y1={r2(y + dy * from * k)}
        x2={r2(x + dx * (from + len) * k)} y2={r2(y + dy * (from + len) * k)}
        stroke={c} strokeWidth={r2(width * k)} strokeLinecap="round" opacity={opacity} />
    );
  };

  return (
    <g>
      {g.slab && <rect x={r2(x - 7 * k)} y={r2(y - 4.5 * k)} width={r2(14 * k)} height={r2(9 * k)} rx={r2(2 * k)} fill={c} />}
      {g.bar && bar(g.bar.w, 1.8, y + g.bar.y * k)}
      {(g.rays || []).map((r, i) => ray(r.a, r.len, 2.5, 1.7, 1, i))}
      {g.tail && ray(g.tail.a, g.tail.len, 2, 1.5, 0.55, 'tail')}
      {g.ring && <circle cx={x} cy={y} r={r2(g.ring * k)} fill="none" stroke={c} strokeWidth={r2(1.5 * k)} opacity=".55" />}
      {g.foot && bar(11, 1.8, y + 7 * k)}
      {g.lid && bar(15, 2.4, y - 8 * k, 1.2)}
      {(g.pips || []).map((d, i) => (
        <circle key={`p${i}`} cx={r2(x + d.dx * k)} cy={r2(y + d.dy * k)} r={r2(1.5 * k)} fill={c} opacity=".8" />
      ))}
      {g.cap && bar(11, 1.8, y - 9 * k)}
      {g.twin && <circle cx={r2(x + g.twin.dx * k)} cy={r2(y + g.twin.dy * k)} r={r2(g.core * k)} fill={c} opacity=".6" />}
      {g.core && <circle cx={x} cy={y} r={r2(g.core * k)} fill={c} />}
    </g>
  );
}
