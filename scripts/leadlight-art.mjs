/* Writes Leadlight's artwork data, and its favicon, from the game itself.

     node scripts/leadlight-art.mjs [path/to/LeadlightRN]

   Everything comes from LeadlightRN's own modules: the pane outlines and spark
   sizes (src/core/config.js), the palettes (src/ui/palette.js) and their unlock
   rules (src/core/profile.js), the icon's window (demoWindow in src/core/demo.js,
   with the arguments tools/make-icons.py uses), and a late-game board cut with the
   game's own split() and coloured by demo.js's rule. Nothing is placed by hand,
   so re-running this after the game changes keeps the site honest.

   Outputs src/components/art/leadlightData.js and public/favicon-leadlight.svg.
   The build does not run this: it needs a LeadlightRN checkout, which CI has not
   got, so the outputs are committed. */

import { writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const game = resolve(process.argv[2] ?? join(root, '..', 'Leadlight', 'LeadlightRN'));
const load = (rel) => import(pathToFileURL(join(game, rel)).href);

const { area, centroid, split, clearance } = await load('src/core/geometry.js');
const { PANES, PANE_ORDER, PANE_NAMES, KINDS, WORLD } = await load('src/core/config.js');
const { demoWindow } = await load('src/core/demo.js');
const { PALETTE, SPARK } = await load('src/ui/palette.js');
const { PALETTES } = await load('src/core/profile.js');

const r1 = (v) => Math.round(v * 10) / 10;
const pts1 = (pts) => pts.map(r1);

/// demo.js's generator, so a seed here means what it means there.
function lcg(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

const xsOf = (pts) => pts.filter((_, i) => i % 2 === 0);
const ysOf = (pts) => pts.filter((_, i) => i % 2 === 1);

/// How roomy a piece is: the largest distance from an interior point to its edge.
function roominess(pts) {
  const xs = xsOf(pts), ys = ysOf(pts);
  let best = 0;
  for (let x = Math.min(...xs); x <= Math.max(...xs); x += 4) {
    for (let y = Math.min(...ys); y <= Math.max(...ys); y += 4) best = Math.max(best, clearance(pts, x, y));
  }
  return best;
}

/// demo.js's colour choice: the least used colour, pushed away from its neighbours.
function chooseColour(pts, coloured, used, rand) {
  const c = centroid(pts);
  const cost = used.map((u) => u * 0.9 + rand() * 0.3);
  for (const o of coloured) {
    const d = Math.hypot(o.cx - c.x, o.cy - c.y);
    if (d < 170) cost[o.colour] += 2 - d / 100;
  }
  const colour = cost.indexOf(Math.min(...cost));
  used[colour] += 1;
  coloured.push({ colour, cx: c.x, cy: c.y });
  return colour;
}

/* A board late in a window: one cut across the pane leaves the piece the sparks
   are still in, and the rest is cut the way demo.js cuts — always the biggest
   piece, near its middle, at a lively angle — and coloured by its rule. */
function board(seed, cuts) {
  const rand = lcg(seed);
  const pane = PANES.lancet;
  const pc = centroid(pane);
  let clear = null;
  let rest = null;
  for (let k = 0; k < 200 && !clear; k += 1) {
    const angle = rand() * Math.PI;
    const { left, right } = split(pane, pc.x + (rand() - 0.5) * 260, pc.y + (rand() - 0.5) * 420, Math.cos(angle), Math.sin(angle));
    const share = area(left) / area(pane);
    if (share > 0.27 && share < 0.38) { clear = left; rest = right; }
    else if (share > 0.62 && share < 0.73) { clear = right; rest = left; }
  }
  if (!clear) return null;
  let shards = [rest];
  for (let k = 0; k < cuts; k += 1) {
    shards.sort((a, b) => area(b) - area(a));
    const big = shards.shift();
    const c = centroid(big);
    const angle = rand() * Math.PI;
    const { left, right } = split(big, c.x + (rand() - 0.5) * 30, c.y + (rand() - 0.5) * 30, Math.cos(angle), Math.sin(angle));
    shards.push(left, right);
  }
  const coloured = [];
  const used = [0, 0, 0, 0, 0, 0];
  const glass = shards.map((pts) => ({ pts, colour: chooseColour(pts, coloured, used, rand), tone: rand() >= 0.5 ? 1 : 0 }));
  return { clear, glass, coloured, used, rand };
}

/// Where a line through (ox, oy) along (dx, dy) leaves a convex piece.
function chord(pts, ox, oy, dx, dy) {
  let tMin = -Infinity;
  let tMax = Infinity;
  const n = pts.length / 2;
  for (let i = 0; i < n; i += 1) {
    const [ax, ay] = [pts[i * 2], pts[i * 2 + 1]];
    const [bx, by] = [pts[((i + 1) % n) * 2], pts[((i + 1) % n) * 2 + 1]];
    const [ex, ey] = [bx - ax, by - ay];
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const t = ((ax - ox) * ey - (ay - oy) * ex) / den;
    const u = ((ax - ox) * dy - (ay - oy) * dx) / den;
    if (u < -1e-9 || u > 1 + 1e-9) continue;
    if (t < 0) tMin = Math.max(tMin, t); else tMax = Math.min(tMax, t);
  }
  return { a: [ox + dx * tMin, oy + dy * tMin], b: [ox + dx * tMax, oy + dy * tMax], la: -tMin, lb: tMax };
}

/* The first seed whose board makes a good picture of the rule: a roomy clear
   piece, a diagonal cut through it (any angle is the point of the game), three
   sparks with room to move in the half that stays clear, and a fair half to
   flood. */
function scene() {
  for (let seed = 1; seed < 4000; seed += 1) {
    const made = board(seed, 8);
    if (!made) continue;
    const { clear, glass, coloured, used, rand } = made;
    if (roominess(clear) < 62) continue;
    const c = centroid(clear);
    for (let k = 0; k < 40; k += 1) {
      const ang = rand() * Math.PI;
      if (Math.abs(Math.sin(2 * ang)) < 0.6) continue;
      const [ox, oy] = [c.x + (rand() - 0.5) * 40, c.y + (rand() - 0.5) * 40];
      const [dx, dy] = [Math.cos(ang), Math.sin(ang)];
      const { left, right } = split(clear, ox, oy, dx, dy);
      const share = area(left) / area(clear);
      if (share < 0.38 || share > 0.62) continue;
      const [keep, flood] = area(left) > area(right) ? [left, right] : [right, left];
      if (roominess(keep) < 40 || roominess(flood) < 26) continue;
      const sparks = [];
      const [x0, x1, y0, y1] = [Math.min(...xsOf(keep)), Math.max(...xsOf(keep)), Math.min(...ysOf(keep)), Math.max(...ysOf(keep))];
      for (let tries = 0; tries < 400 && sparks.length < 3; tries += 1) {
        const x = x0 + rand() * (x1 - x0);
        const y = y0 + rand() * (y1 - y0);
        const kind = ['ember', 'flint', 'drifter'][sparks.length];
        const { r } = KINDS[kind];
        const room = clearance(keep, x, y);
        if (room < r + 20) continue;
        if (sparks.some((s) => Math.hypot(s.x - x, s.y - y) < 42)) continue;
        // how far it may drift and still never touch lead or the new line
        sparks.push({ kind, x: r1(x), y: r1(y), r, drift: r1(Math.min(18, room - r - 6)) });
      }
      if (sparks.length < 3) continue;
      const floodColour = chooseColour(flood, coloured, used, rand);
      const ch = chord(clear, ox, oy, dx, dy);
      if (Math.min(ch.la, ch.lb) < 25) continue;
      return {
        seed,
        glass: glass.map((g) => ({ pts: pts1(g.pts), colour: g.colour, tone: g.tone })),
        clear: pts1(keep),
        flood: { pts: pts1(flood), colour: floodColour, tone: 1 },
        line: { o: [r1(ox), r1(oy)], a: ch.a.map(r1), b: ch.b.map(r1), len: r1(Math.max(ch.la, ch.lb)) },
        sparks,
        fill: Math.round((1 - area(clear) / area(PANES.lancet)) * 1000) / 10,
      };
    }
  }
  throw new Error('No seed made a usable scene: loosen the conditions in scene().');
}

// ---- gather ----
const icon = demoWindow({ pane: 'lancet', cuts: 7, seed: 11, clear: 1 });
const iconClear = icon.shards.find((s) => s.colour < 0).pts;
const iconSpark = [r1(xsOf(iconClear).reduce((a, b) => a + b) / (iconClear.length / 2)),
  r1(ysOf(iconClear).reduce((a, b) => a + b) / (iconClear.length / 2))];
const S = scene();

// ---- write the data module ----
const arr = (a) => `[${a.map((v) => `${v}`).join(', ')}]`;
const L = [];
L.push(`/* Leadlight's glass, as data. GENERATED by scripts/leadlight-art.mjs from
   LeadlightRN itself — do not edit by hand; re-run the script instead.

   - PANES and PALETTES are the game's own: src/core/config.js (PANES, PANE_NAMES)
     and src/ui/palette.js, with the unlock rules from src/core/profile.js.
   - ICON is demoWindow({ pane: 'lancet', cuts: 7, seed: 11, clear: 1 }) from
     src/core/demo.js — the window tools/make-icons.py draws the app icon from —
     with its one spark at the clear shard's centre, as the icon has it.
   - SCENE is a late-game board cut with the game's own split() and coloured by
     demo.js's rule (seed ${S.seed}): one clear piece still holding three sparks, and
     a cut across it that seals the spark-free half. Every piece is convex, as
     every piece in the game is.

   Coordinates are the game's world, ${WORLD.width} x ${WORLD.height}. */
`);
L.push(`export const WORLD = { width: ${WORLD.width}, height: ${WORLD.height} };\n`);
L.push('export const PANES = [');
for (const id of PANE_ORDER) L.push(`  { id: '${id}', name: '${PANE_NAMES[id]}', pts: ${arr(pts1(PANES[id]))} },`);
L.push('];\n');
L.push('export const PALETTES = [');
for (const p of PALETTES) {
  const q = PALETTE[p.id];
  const need = p.need ? `{ ${Object.entries(p.need).map(([k, v]) => `${k}: ${v}`).join(', ')} }` : 'null';
  L.push(`  { id: '${p.id}', name: '${p.name}', need: ${need}, glass: [${q.glass.map((c) => `'${c}'`).join(', ')}],`);
  L.push(`    clear: '${q.clear}', lead: '${q.lead}', leadHi: '${q.leadHi}', frame: '${q.frame}', light: '${q.light}' },`);
}
L.push('];\n');
L.push('export const SPARK = {');
for (const [k, v] of Object.entries(SPARK)) L.push(`  ${k}: { core: '${v.core}', glow: '${v.glow}' },`);
L.push('};\n');
L.push('export const ICON = {');
L.push('  shards: [');
for (const s of icon.shards) L.push(`    { colour: ${s.colour}, tone: ${s.tone >= 0.5 ? 1 : 0}, pts: ${arr(s.pts)} },`);
L.push('  ],');
L.push(`  spark: ${arr(iconSpark)},`);
L.push('};\n');
L.push('export const SCENE = {');
L.push('  glass: [');
for (const s of S.glass) L.push(`    { colour: ${s.colour}, tone: ${s.tone}, pts: ${arr(s.pts)} },`);
L.push('  ],');
L.push('  // the half the sparks stay in, and the half the cut seals');
L.push(`  clear: ${arr(S.clear)},`);
L.push(`  flood: { colour: ${S.flood.colour}, tone: ${S.flood.tone}, pts: ${arr(S.flood.pts)} },`);
L.push("  // where the cut starts, where each arm lands, and the longer arm's length");
L.push(`  line: { o: ${arr(S.line.o)}, a: ${arr(S.line.a)}, b: ${arr(S.line.b)}, len: ${S.line.len} },`);
L.push('  sparks: [');
for (const s of S.sparks) L.push(`    { kind: '${s.kind}', x: ${s.x}, y: ${s.y}, r: ${s.r}, drift: ${s.drift} },`);
L.push('  ],');
L.push(`  fill: ${S.fill},   // per cent of the pane coloured before the cut`);
L.push('};');
await writeFile(join(root, 'src/components/art/leadlightData.js'), `${L.join('\n')}\n`);

// ---- write the favicon: the icon's window, in Cathedral glass ----
const P = PALETTE.cathedral;
const shade = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = a >= 0 ? c + (255 - c) * a : c * (1 + a);
    return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  }).join('')}`;
};
const k = 27 / (Math.max(...ysOf(PANES.lancet)) - Math.min(...ysOf(PANES.lancet)));   // 27 units tall
const ox = 16 - (WORLD.width / 2) * k;
const oy = 2.5 - Math.min(...ysOf(PANES.lancet)) * k;
const t = (x, y) => `${(ox + x * k).toFixed(2)} ${(oy + y * k).toFixed(2)}`;
const path = (pts) => {
  let s = `M${t(pts[0], pts[1])}`;
  for (let i = 2; i < pts.length; i += 2) s += `L${t(pts[i], pts[i + 1])}`;
  return `${s}Z`;
};
const [sx, sy] = t(...iconSpark).split(' ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="9" fill="#110e13"/>
${icon.shards.map((s) => `  <path d="${path(s.pts)}" fill="${s.colour < 0 ? shade(P.clear, -0.15) : shade(P.glass[s.colour], s.tone >= 0.5 ? 0.12 : -0.04)}"/>`).join('\n')}
  <path d="${icon.shards.map((s) => path(s.pts)).join('')}" fill="none" stroke="${P.lead}" stroke-width=".75" stroke-linejoin="round"/>
  <circle cx="${sx}" cy="${sy}" r="2.3" fill="${SPARK.ember.glow}" opacity=".35"/>
  <circle cx="${sx}" cy="${sy}" r="1.2" fill="${SPARK.ember.glow}"/>
  <circle cx="${sx}" cy="${sy}" r=".55" fill="#ffffff"/>
</svg>
`;
await writeFile(join(root, 'public/favicon-leadlight.svg'), svg);
console.log(`leadlight art: scene seed ${S.seed}, ${S.glass.length} glass pieces, ${S.fill}% coloured before the cut`);
