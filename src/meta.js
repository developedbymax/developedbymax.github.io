/* One <head> per route.

   The prerenderer writes these into the static HTML it emits for each path, and
   useMeta re-applies them after a client-side navigation, so a crawler and a
   visitor clicking through the site see exactly the same thing. */

export const SITE = 'https://developedbymax.github.io';

export const meta = {
  '/': {
    title: 'developed by max — small mobile games, built by one person',
    description:
      'Tiny, tactile puzzle games for iPhone and Android. No accounts, no servers, no dark patterns. Three built, seven to go.',
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

  '/404': {
    title: 'Page not found — developed by max',
    description: 'That page does not exist. The games are all on the front page.',
    themeColor: '#0A0912',
    favicon: '/favicon.svg',
  },
};

/* The legal pages are also emitted at their old .html addresses. Outrush's
   privacy URL is baked into the shipped app and into two store listings, and it
   currently points at /outrush/privacy.html on this same domain — keeping that
   exact file here means the old links keep resolving after the separate
   outrush repository is deleted. */
export const ALIASES = {
  '/outrush/privacy.html': '/outrush/privacy',
  '/huecomb/privacy.html': '/huecomb/privacy',
};

export const ROUTES = [
  '/', '/outrush', '/outrush/privacy', '/huecomb', '/huecomb/privacy', '/scrapglow',
];
