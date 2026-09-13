/* Huecomb's honeycomb, on the game's own geometry.

   HuecombRN/src/core/config.js sets the board to seven pointy-top rows
   alternating 4 and 5 — thirty-one cells — and hex.js keeps horizontal positions
   in HALF-cell units so a short row sits half a cell in. The same two numbers do
   the work here: a pointy-top hex is √3·R wide and 2·R tall, and rows step 1.5·R,
   which is 0.866 and 1.1547 of a cell width.

   Stacks are drawn the way Tiles.js draws them: each tile a hex offset upward
   from the one below, a darker band across its lower third for the side face, and
   a pale cap on the one showing. */

const W_TO_H = 2 / Math.sqrt(3);      // hex height ÷ hex width  = 1.1547
const ROW_STEP = Math.sqrt(3) / 2;    // row pitch  ÷ hex width  = 0.8660

const C = {
  r: '#FF4D6D', s: '#3A86FF', c: '#FFD23F',
  e: '#2ED47A', a: '#A66CFF', m: '#FF8C42', o: '#FF6FD8',
};

/* One hand-set mid-game board — rows of 4 and 5, `null` for an empty socket, and
   a stack read bottom-to-top. Fixed rather than generated so the picture is
   composed, and so the server and the browser draw the same thing. */
const ROWS = [
  [[C.e], null, [C.s, C.s], [C.a]],
  [[C.r, C.r], [C.c], [C.e, C.e, C.e], null, [C.a]],
  [[C.s], [C.a, C.a], [C.c, C.c], [C.r]],
  [[C.e], null, [C.o, C.o], [C.s, C.s, C.s], [C.c]],
  [[C.m, C.m], [C.r], [C.e], null],
  [[C.c, C.c], [C.s], [C.m], [C.o], [C.e, C.e]],
  [null, [C.r, C.r], [C.c], [C.s]],
];

const WIDE = 5;
const LIFT = [3, 3];                  // the stack that is clearing

function Stack({ stack, lifting }) {
  if (!stack) return <span className="hx socket" />;
  return (
    <>
      <span className="hx socket" />
      {stack.map((col, i) => (
        <span
          key={i}
          className={`hx tile${lifting ? ` hc-lift d${Math.min(i + 1, 3)}` : ''}`}
          style={{ '--tc': col, top: `${-16 * i}%` }}
        />
      ))}
      <span
        className={`hx cap${lifting ? ' hc-lift d3' : ''}`}
        style={{ top: `${-16 * (stack.length - 1) - 4}%` }}
      />
    </>
  );
}

export default function HuecombComb({ u = 44, tray = true, label }) {
  const unit = typeof u === 'number' ? `${u}px` : u;
  const boardH = W_TO_H + (ROWS.length - 1) * ROW_STEP;   // in cell widths

  return (
    <div
      className="hc-wrap"
      style={{ '--u': unit }}
      role="img"
      aria-label={
        label ??
        'A seven-row honeycomb of hexagonal sockets holding stacks of coloured tiles. One stack is lifting off the board.'
      }
    >
      <div
        className="hc"
        style={{
          width: `calc(var(--u) * ${WIDE})`,
          height: `calc(var(--u) * ${boardH.toFixed(4)})`,
        }}
      >
        {ROWS.map((row, r) => {
          const inset = WIDE - row.length;                 // in half-cells
          return row.map((stack, c) => {
            const x2 = inset + 2 * c + 1;                  // half-cell centre
            return (
              <div
                key={`${r}-${c}`}
                className="hc-cell"
                style={{
                  left: `calc(var(--u) * ${(x2 / 2 - 0.5).toFixed(4)})`,
                  top: `calc(var(--u) * ${(r * ROW_STEP).toFixed(4)})`,
                }}
              >
                <Stack stack={stack} lifting={r === LIFT[0] && c === LIFT[1]} />
              </div>
            );
          });
        })}
      </div>

      {/* the three stacks waiting under the board */}
      {tray && (
        <div className="hc-tray" aria-hidden="true">
          {[[C.o, C.o], [C.s], [C.c, C.e, C.c]].map((st, i) => (
            <div className="hc-cell" key={i}><Stack stack={st} /></div>
          ))}
        </div>
      )}
    </div>
  );
}
