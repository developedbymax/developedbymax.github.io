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
  '/scrapglow/privacy': {
    title: 'Privacy Policy & Terms of Use — Scrapglow',
    description:
      'What Scrapglow stores on your device, what its advertising partner collects, what Remove break ads does and does not stop, and the terms you agree to when you play.',
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

/* Every game has its OWN privacy policy and terms, at its own URL, because that
   is the URL each store listing and each AppLovin app is given — one document
   covering all three would be wrong for all three. The differences are real:
   Outrush and Huecomb sell three things and never start the ad SDK once Remove
   Ads is bought; Scrapglow sells one and deliberately keeps the rewarded rescue,
   so its ad code still runs afterwards.

   Each is also emitted at the .html spelling. For Outrush that is a requirement
   rather than a nicety — its privacy URL is baked into the shipped app and into
   two store listings as /outrush/privacy.html on this same domain, so keeping
   that exact file here is what makes the old links survive the separate outrush
   repository being deleted. The other two follow the same pattern so the
   store-facing URLs are uniform across the games. */
export const ALIASES = {
  '/outrush/privacy.html': '/outrush/privacy',
  '/huecomb/privacy.html': '/huecomb/privacy',
  '/scrapglow/privacy.html': '/scrapglow/privacy',
};

export const ROUTES = [
  '/',
  '/outrush', '/outrush/privacy',
  '/huecomb', '/huecomb/privacy',
  '/scrapglow', '/scrapglow/privacy',
];
