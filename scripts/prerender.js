/* Turns the SPA into a folder of real HTML files.

   GitHub Pages has no SPA rewrite: a request for /outrush is a request for a
   file, and if there is no file it is a 404 — including for the crawlers that
   read a store listing's privacy URL. So every route is rendered ahead of time
   and written where the URL says it should be, with its own <head>. The bundle
   still hydrates on top, so client-side navigation stays instant.

   dist/404.html is the safety net underneath that, for any address that was not
   prerendered. */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

const { render } = await import(join(dist, '..', 'dist-ssr', 'entry-server.js'));
const { meta, ALIASES, ROUTES, SITE } = await import(join(root, 'src', 'meta.js'));

const template = await readFile(join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(html, m, url) {
  const canonical = SITE + (url === '/' ? '/' : url);
  const tail = url === '/404'
    /* a 404 is not a page, so it gets neither a canonical nor an index */
    ? '<meta name="robots" content="noindex">\n</head>'
    : `<link rel="canonical" href="${esc(canonical)}">\n<meta property="og:url" content="${esc(canonical)}">\n</head>`;
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[\s\S]*?(">)/, `$1${esc(m.description)}$2`)
    .replace(/(<meta property="og:title" content=")[\s\S]*?(">)/, `$1${esc(m.title)}$2`)
    .replace(/(<meta property="og:description" content=")[\s\S]*?(">)/, `$1${esc(m.description)}$2`)
    .replace(/(<meta name="theme-color" content=")[\s\S]*?(">)/, `$1${esc(m.themeColor)}$2`)
    .replace(/(<link rel="icon" href=")[\s\S]*?(")/, `$1${esc(m.favicon)}$2`)
    .replace(/(<link rel="apple-touch-icon" href=")[\s\S]*?(")/, `$1${esc(m.favicon)}$2`)
    .replace('</head>', tail);
}

async function emit(file, html) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, 'utf8');
}

const pages = new Map();     // url -> html, so an alias reuses the render

for (const url of ROUTES) {
  const m = meta[url];
  if (!m) throw new Error(`No <head> defined in src/meta.js for ${url}`);
  const html = head(template, m, url).replace('<!--app-html-->', render(url));
  pages.set(url, html);
  await emit(join(dist, url === '/' ? 'index.html' : `${url.slice(1)}/index.html`), html);
  console.log(`  ${url.padEnd(22)} ->  ${url === '/' ? 'index.html' : `${url.slice(1)}/index.html`}`);
}

/* the old per-game addresses, as real files at the exact path they used */
for (const [alias, target] of Object.entries(ALIASES)) {
  const html = pages.get(target);
  if (!html) throw new Error(`Alias ${alias} points at ${target}, which was not rendered`);
  await emit(join(dist, alias.slice(1)), html);
  console.log(`  ${alias.padEnd(22)} ->  ${alias.slice(1)}  (kept for existing links)`);
}

/* GitHub Pages serves this for anything that is not a file */
await emit(join(dist, '404.html'),
  head(template, meta['/404'], '/404').replace('<!--app-html-->', render('/__not-found__')));
console.log('  404 fallback           ->  404.html');

const today = new Date().toISOString().slice(0, 10);
await emit(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ROUTES.map((u) =>
    `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod>` +
    `<priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
console.log('  sitemap                ->  sitemap.xml');

console.log(`\nPrerendered ${ROUTES.length} routes + ${Object.keys(ALIASES).length} aliases.`);
