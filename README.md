# developedbymax.github.io

The studio site: one landing page listing every game, and a full page for each
game that exists. React, prerendered to static HTML, hosted on GitHub Pages at
<https://developedbymax.github.io>.

It replaces the separate per-game sites. Those repositories can be deleted once
this one is live — see [Retiring the old sites](#retiring-the-old-sites), which
explains the one thing that must not break when they go.

## What is here

```
/                     the landing page — hero, one featured card, a 3 x 3 grid
/outrush              Outrush: Block Escape
/outrush/privacy      its own privacy policy and terms, on one page
/huecomb              Huecomb: Hexa Stack Sort
/huecomb/privacy      its own privacy policy and terms
/scrapglow            Scrapglow
/scrapglow/privacy    its own privacy policy and terms
```

### Legal documents are per game, on purpose

Each game is a separate app with a separate store listing and a separate
AppLovin application, and each of those wants a privacy policy URL for *that*
app. So every game gets its own document at its own URL, and nothing on this
site presents one game's policy as though it covered the others.

They are not near-copies with the name swapped, either — the differences are
real, and getting them wrong is the kind of thing a store reviewer catches:

| | Outrush | Huecomb | Scrapglow |
| --- | --- | --- | --- |
| Optional purchases | 3 | 3 | **1** |
| In-game currency | stars | stars | **none** |
| After buying Remove Ads | ad SDK never starts | ad SDK never starts | **still runs** — the rewarded rescue stays |
| Crash reporting | Sentry, if enabled in the build | Sentry, if enabled in the build | **none, ever** |

That third row is the one that matters most. Scrapglow's purchase is *Remove
break ads*: it stops the ads between runs and deliberately keeps the rescue ad
you choose to watch, so its advertising code is still initialised afterwards.
Reusing Outrush's "the ad SDK is never started at all" wording would have been a
false statement in a legal document.

### The URLs to give the stores and AppLovin

```
https://developedbymax.github.io/outrush/privacy.html
https://developedbymax.github.io/outrush/privacy.html#terms

https://developedbymax.github.io/huecomb/privacy.html
https://developedbymax.github.io/huecomb/privacy.html#terms

https://developedbymax.github.io/scrapglow/privacy.html
https://developedbymax.github.io/scrapglow/privacy.html#terms
```

Each is also reachable without the extension (`/outrush/privacy`), which is the
canonical form the pages declare. The `.html` spelling is the one to paste into
store consoles and into each game's `EXPO_PUBLIC_PRIVACY_POLICY_URL` /
`EXPO_PUBLIC_TERMS_URL`, because it is what Outrush already ships with and
keeping all three the same shape avoids a future mismatch.

The grid below the featured card has nine cells for the nine games that are not
featured. Two hold real games; the other seven are numbered, empty and say so.
They are deliberately not filled with invented titles — a visitor spots that in
about a second, and it costs all the credit the real games just earned.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # client bundle, then SSR bundle, then prerender -> dist/
npm run serve        # serve dist/ the way GitHub Pages would
```

`npm run build` is three steps and all three matter:

1. `vite build` — the browser bundle and `dist/index.html`, which is the template.
2. `vite build --ssr` — the same app compiled for Node.
3. `scripts/prerender.js` — renders every route in `src/meta.js` and writes it to
   the path its URL implies, with that route's own `<title>`, description,
   canonical and favicon.

**Step 3 is not an optimisation.** GitHub Pages has no SPA rewrite: a request for
`/outrush` is a request for a file, and without a file it is a 404 — including
for the crawler that reads a store listing's privacy URL. `dist/404.html` is the
safety net under anything that was not prerendered.

## Adding a game

Almost all of it is one object.

1. Add an entry to `src/data/games.js`. The `theme` block re-colours every
   component on that game's page; nothing in the stylesheets hard-codes a game's
   colour.
2. Add its artwork to `src/components/art/` and a case to `GameArt.jsx`.
3. Add the page under `src/pages/`, a route in `src/App.jsx`, and its `<head>` to
   `src/meta.js` — including the path in `ROUTES`, or it will not be prerendered.
4. Drop a `public/favicon-<slug>.svg` in.
5. Write that game its **own** privacy policy and terms — `src/pages/<Name>Legal.jsx`,
   `hasLegal: true` on its entry, a `/<slug>/privacy` route and `<head>`, and a
   `/<slug>/privacy.html` entry in `ALIASES`. Write it against what that game
   actually does rather than copying another one; see the table above for how far
   apart three games by the same person already are. The footer's privacy column
   then lists it automatically.

The landing page picks up the rest: the featured card is the first game with
`featured: true`, and the grid fills from the remaining entries before padding
with numbered slots.

## A note on the artwork

None of the three game illustrations is a drawing of a game. Each is built from
the same numbers the app renders with, so the site and the games cannot drift
apart:

- **Outrush** — 6 x 6 board, 20pt wall, 4pt gutters and gate notches at 46% of a
  cell, from `OutrushRN/src/ui/Board.js`; block radius and bevel from `Block.js`.
- **Huecomb** — seven pointy-top rows alternating 4 and 5, from
  `HuecombRN/src/core/config.js`; the hex is √3·R wide and 2·R tall and rows step
  1.5·R, from `hex.js`. The palettes on the page are the real ones from
  `core/meta.js`, names and star costs included.
- **Scrapglow** — the halo, recycler and debris colours from
  `ScrapglowRN/src/game/Scene.js`.

No webfont is loaded anywhere, and that is deliberate rather than an omission:
all three games render with the platform system font at weights 700–900 with
tight negative tracking, so a webfont here would make the site look *less* like
the things it is selling.

Every animation is inside `@media (prefers-reduced-motion: no-preference)`, and
every resting state is the correct, visible one.

## Retiring the old sites

Outrush's privacy URL is baked into the shipped app (`EXPO_PUBLIC_TERMS_URL`,
`EXPO_PUBLIC_PRIVACY_POLICY_URL`) and into two store listings:

```
https://developedbymax.github.io/outrush/privacy.html
https://developedbymax.github.io/outrush/privacy.html#terms
```

That address is served by the separate `outrush` repository today. This site is
the *user* site for the same account, so it is what answers `/outrush/…` once
that repository is gone — and the build writes a real `outrush/privacy.html`, at
exactly that path, for precisely this reason. `huecomb/privacy.html` is kept the
same way.

So: **check `https://developedbymax.github.io/outrush/privacy.html` loads from
this site before deleting the old repositories**, and do not remove those two
aliases from `ALIASES` in `src/meta.js` while any shipped build still points at
them.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes
`dist/`. The repository's **Settings → Pages → Source** must be set to
**GitHub Actions**; a "Deploy from a branch" source would publish the React
source instead of the built site.
