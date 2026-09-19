/* One <head> per route.

   The prerenderer writes these into the static HTML it emits for each path, and
   useMeta re-applies them after a client-side navigation, so a crawler and a
   visitor clicking through the site see exactly the same thing. */

import { spell, BUILT, TO_GO } from './data/games.js';

export const SITE = 'https://developedbymax.github.io';

const cap = (w) => w[0].toUpperCase() + w.slice(1);

export const meta = {
  '/': {
    title: 'developed by max — small mobile games, built by one person',
    description:
      `Tiny, tactile puzzle games for iPhone and Android. No accounts, no servers, no dark patterns. ${cap(spell(BUILT))} built, ${spell(TO_GO)} to go.`,
    themeColor: '#0A0912',
    favicon: '/favicon.svg',
  },

  '/outrush': {
    title: 'Outrush: Block Escape — a chain-reaction puzzle for iOS and Android',
    description:
      'Tap a block, it slides where its arrow points and leaves through a gate in the wall. Clearing one sets off everything waiting behind it. A free chain-reaction puzzle that plays offline, with no account.',
    themeColor: '#141227',
    favicon: '/favicon-outrush.svg',
  },
  '/outrush/privacy': {
    title: 'Privacy Policy & Terms of Use — Outrush: Block Escape',
    description:
      'What Outrush: Block Escape stores on your device, what its advertising partners collect, how to change your choices, and the terms you agree to when you play.',
    themeColor: '#141227',
    favicon: '/favicon-outrush.svg',
  },

  '/huecomb': {
    title: 'Huecomb — Hexa Stack Sort for iOS and Android',
    description:
      'Drop a stack on the honeycomb. Matching colours pour together on their own, eight of one colour lifts off, and the colour underneath starts the next one. An endless sorting puzzle that plays offline.',
    themeColor: '#110F24',
    favicon: '/favicon-huecomb.svg',
  },
  '/huecomb/privacy': {
    title: 'Privacy Policy & Terms of Use — Huecomb',
    description:
      'What Huecomb stores on your device, what its advertising partners collect, how to change your choices, and the terms you agree to when you play.',
    themeColor: '#110F24',
    favicon: '/favicon-huecomb.svg',
  },

  '/scrapglow': {
    title: 'Scrapglow — a salvage arcade run for iOS and Android',
    description:
      'A tiny salvage ship and a growing halo of scrap. Every piece you hold is worth more at the recycler and makes you easier to clip. Three hits end the run.',
    themeColor: '#091521',
    favicon: '/favicon-scrapglow.svg',
  },
  '/scrapglow/privacy': {
    title: 'Privacy Policy & Terms of Use — Scrapglow',
    description:
      'What Scrapglow stores on your device, what its advertising partner collects, what Remove break ads does and does not stop, and the terms you agree to when you play.',
    themeColor: '#091521',
    favicon: '/favicon-scrapglow.svg',
  },

  '/starshell': {
    title: 'Starshell — a firework ordering puzzle for iOS and Android',
    description:
      'Pack a firework shell with stars and launch it. It fires bottom to top and every star changes what happens above it, so five stars is 120 orderings and exactly one is best. Free, offline, no account.',
    themeColor: '#0A0A18',
    favicon: '/favicon-starshell.svg',
  },
  '/starshell/privacy': {
    title: 'Privacy Policy & Terms of Use — Starshell',
    description:
      'What Starshell stores on your device, what its advertising partner collects, what Master Pyrotechnician does and does not stop, and the terms you agree to when you play.',
    themeColor: '#0A0A18',
    favicon: '/favicon-starshell.svg',
  },
  '/starshell/terms': {
    title: 'Terms of Use & Privacy Policy — Starshell',
    description:
      'The terms you agree to when you play Starshell, on the same page as its privacy policy: the one purchase, the optional ads, and what happens to your records.',
    themeColor: '#0A0A18',
    favicon: '/favicon-starshell.svg',
  },

  '/404': {
    title: 'Page not found — developed by max',
    description: 'That page does not exist. The games are all on the front page.',
    themeColor: '#0A0912',
    favicon: '/favicon.svg',
  },
};

/* Every game has its OWN privacy policy and terms, at its own URL, because that
   is the URL each store listing and each AppLovin app is given — one document
   covering all of them would be wrong for each. The differences are real:
   Outrush and Huecomb sell three things and never start the ad SDK once Remove
   Ads is bought; Scrapglow and Starshell sell one each and deliberately keep
   their rewarded ads, so their ad code still runs afterwards.

   Each is also emitted at the .html spelling. For Outrush that is a requirement
   rather than a nicety — its privacy URL is baked into the shipped app and into
   two store listings as /outrush/privacy.html on this same domain, so keeping
   that exact file here is what makes the old links survive the separate outrush
   repository being deleted. The others follow the same pattern so the
   store-facing URLs are uniform across the games.

   Starshell also has a terms address of its own, /starshell/terms(.html),
   because that is the URL its store copy and release runbook were written with.
   It renders the same page and opens it at the terms. */
export const ALIASES = {
  '/outrush/privacy.html': '/outrush/privacy',
  '/huecomb/privacy.html': '/huecomb/privacy',
  '/scrapglow/privacy.html': '/scrapglow/privacy',
  '/starshell/privacy.html': '/starshell/privacy',
  '/starshell/terms.html': '/starshell/terms',
};

export const ROUTES = [
  '/',
  '/outrush', '/outrush/privacy',
  '/huecomb', '/huecomb/privacy',
  '/scrapglow', '/scrapglow/privacy',
  '/starshell', '/starshell/privacy', '/starshell/terms',
];
