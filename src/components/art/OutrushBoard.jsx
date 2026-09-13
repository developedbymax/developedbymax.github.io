/* Outrush's own board, not a drawing of it.

   Six by six, a 20pt wall, 4pt gutters and green gate notches at 46% of a cell —
   the geometry in OutrushRN/src/ui/Board.js. The four blocks on the middle row
   point right and leave as one chain, because the chain is what the game is. */

const STATIC = [
  { r: 0, c: 1, col: '#FF6B5B', g: '▼' },
  { r: 0, c: 4, col: '#B57BFF', g: '◀', ink: 'rgba(255,255,255,.94)' },
  { r: 1, c: 2, col: '#4ADE9B', g: '▲', w: 2 },
  { r: 1, c: 5, col: '#4CC9F0', g: '▲' },
  { r: 3, c: 1, col: '#FF6B5B', g: '▼', badge: '◉' },
  { r: 3, c: 4, col: '#4ADE9B', g: '▲' },
  { r: 4, c: 0, col: '#8C85BE', g: '🔒', ink: 'rgba(255,255,255,.94)' },
  { r: 4, c: 3, col: '#4CC9F0', g: '▼' },
  { r: 5, c: 2, col: '#FFC44D', g: '▲' },
  { r: 5, c: 5, col: '#B57BFF', g: '◀', ink: 'rgba(255,255,255,.94)' },
];

const CHAIN = [
  { r: 2, c: 5, col: '#FF6B5B', cls: 'c1' },
  { r: 2, c: 4, col: '#4CC9F0', cls: 'c2' },
  { r: 2, c: 3, col: '#FFD34D', cls: 'c3', badge: '✦' },
  { r: 2, c: 2, col: '#B57BFF', cls: 'c4', ink: 'rgba(255,255,255,.94)' },
];

const GATES = [
  ['r', 2], ['t', 1], ['t', 4], ['b', 2], ['l', 4], ['r', 0],
];

function Block({ b, chain }) {
  const style = { '--r': b.r, '--c': b.c, '--col': b.col };
  if (b.w) style['--w'] = b.w;
  if (b.ink) style['--glyph'] = b.ink;
  return (
    <div className={chain ? `ob-blk ob-chain ${b.cls}` : 'ob-blk'} style={style}>
      {b.g ?? '▶'}
      {b.badge && <span className="bdg">{b.badge}</span>}
    </div>
  );
}

export default function OutrushBoard({ cell = 46, pop = '+2,400 ×4', label }) {
  return (
    <div
      className="ob"
      style={{ '--cell': typeof cell === 'number' ? `${cell}px` : cell }}
      role="img"
      aria-label={
        label ??
        'A six by six puzzle board. Four blocks on the middle row point right and clear in a single chain through a gap in the wall.'
      }
    >
      <div className="ob-pit">
        <div className="ob-cells" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => <i key={i} />)}
        </div>
        {STATIC.map((b, i) => <Block key={`s${i}`} b={b} />)}
        {CHAIN.map((b, i) => <Block key={`c${i}`} b={b} chain />)}
      </div>

      {GATES.map(([side, i], k) => (
        <span key={k} className={`ob-gate ${side}`} style={{ '--i': i }} />
      ))}

      {pop && <span className="ob-pop" aria-hidden="true">{pop}</span>}
    </div>
  );
}
