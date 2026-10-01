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

  '/pearlbound': {
    title: 'Pearlbound — a ricochet treasure dive for iOS and Android',
    description:
      'Pull back, let one pearl go, and watch it ricochet through a reef of coral and gold. Break the seals, then bank your treasure or dive deeper. Free, offline, no account, no last chamber.',
    themeColor: '#211D35',
    favicon: '/favicon-pearlbound.svg',
  },
  '/pearlbound/privacy': {
    title: 'Privacy Policy & Terms of Use — Pearlbound',
    description:
      'What Pearlbound stores on your device, what its advertising partner collects, what Remove break ads does and does not stop, and the terms you agree to when you play.',
    themeColor: '#211D35',
    favicon: '/favicon-pearlbound.svg',
  },
  '/pearlbound/terms': {
    title: 'Terms of Use & Privacy Policy — Pearlbound',
    description:
      'The terms you agree to when you play Pearlbound, on the same page as its privacy policy: the one purchase, the optional rescue ad, and what happens to your treasure.',
    themeColor: '#211D35',
    favicon: '/favicon-pearlbound.svg',
  },

  '/wreckmoor': {
    title: 'Wreckmoor — a one-thumb demolition game for iOS and Android',
    description:
      'Steer a salvage skiff with one thumb and swing a wrecking ball through ceramic ruins. Break the glowing cores, grab the salvage, and bank it or go deeper. Endless, free, and it plays offline.',
    themeColor: '#191522',
    favicon: '/favicon-wreckmoor.svg',
  },
  '/wreckmoor/privacy': {
    title: 'Privacy Policy & Terms of Use — Wreckmoor',
    description:
      'What Wreckmoor stores on your device, what its advertising partner collects, what Remove break ads does and does not stop, and the terms you agree to when you play.',
    themeColor: '#191522',
    favicon: '/favicon-wreckmoor.svg',
  },
  '/wreckmoor/terms': {
    title: 'Terms of Use & Privacy Policy — Wreckmoor',
    description:
      'The terms you agree to when you play Wreckmoor, on the same page as its privacy policy: the one purchase, the optional repair ad, and what happens to your salvage.',
    themeColor: '#191522',
    favicon: '/favicon-wreckmoor.svg',
  },
  '/floehelm': {
    title: 'Floehelm — an ice-carving rescue game for iOS and Android',
    description:
      'Steer a small icebreaker with one thumb, carve channels through a frozen bay, and the stranded boats sail home along them. Bank the haul or sail deeper before the storm. Endless, free, and it plays offline.',
    themeColor: '#102635',
    favicon: '/favicon-floehelm.svg',
  },
  '/floehelm/privacy': {
    title: 'Privacy Policy & Terms of Use — Floehelm',
    description:
      'What Floehelm stores on your device, what its advertising partner collects, what Remove Ads and the two cosmetic packs do, and the terms you agree to when you play.',
    themeColor: '#102635',
    favicon: '/favicon-floehelm.svg',
  },
  '/floehelm/terms': {
    title: 'Terms of Use & Privacy Policy — Floehelm',
    description:
      'The terms you agree to when you play Floehelm, on the same page as its privacy policy: the three purchases, the optional Paint bonus ad, and what happens to your salvage.',
    themeColor: '#102635',
    favicon: '/favicon-floehelm.svg',
  },
  '/rifthauler': {
    title: 'Rift Hauler — a crystal mining run for iOS and Android',
    description:
      'Drill a path through a crumbling island, fill a small rover with crystals and bank them at the gold pad before the ground gives way. Free, offline, no account.',
    themeColor: '#0D151D',
    favicon: '/favicon-rifthauler.svg',
  },
  '/rifthauler/privacy': {
    title: 'Privacy Policy & Terms of Use — Rift Hauler',
    description:
      'What Rift Hauler stores on your device, what its advertising partner collects, what Remove break ads does and does not stop, the cosmetic Rover color pack, and the terms you agree to when you play.',
    themeColor: '#0D151D',
    favicon: '/favicon-rifthauler.svg',
  },
  '/rifthauler/terms': {
    title: 'Terms of Use & Privacy Policy — Rift Hauler',
    description:
      'The terms you agree to when you play Rift Hauler, on the same page as its privacy policy: the two purchases, the optional rescue ad, and what happens to your records.',
    themeColor: '#0D151D',
    favicon: '/favicon-rifthauler.svg',
  },

  '/leadlight': {
    title: 'Leadlight: Glass Cutter — a stained-glass arcade game for iOS and Android',
    description:
      'Sparks bounce inside a pane of clear glass. Swipe to cut it at any angle, seal the sparks out, and every piece left with no spark in it floods with colour. Free, offline, no account.',
    themeColor: '#110E13',
    favicon: '/favicon-leadlight.svg',
  },
  '/leadlight/privacy': {
    title: 'Privacy Policy & Terms of Use — Leadlight',
    description:
      'What Leadlight stores on your device, what its advertising partner collects, what Master Glazier does and does not stop, how a shared window leaves your phone, and the terms you agree to when you play.',
    themeColor: '#110E13',
    favicon: '/favicon-leadlight.svg',
  },
  '/leadlight/terms': {
    title: 'Terms of Use & Privacy Policy — Leadlight',
    description:
      'The terms you agree to when you play Leadlight, on the same page as its privacy policy: the one purchase, the optional mend, and what happens to your windows and records.',
    themeColor: '#110E13',
    favicon: '/favicon-leadlight.svg',
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
   It renders the same page and opens it at the terms. Pearlbound follows it:
   its app is given a separate terms URL, /pearlbound/terms, and so are
   Wreckmoor's, /wreckmoor/terms, Rift Hauler's, /rifthauler/terms, and
   Leadlight's, /leadlight/terms, which its store copy names as terms.html,
   and Floehelm's, /floehelm/terms. */
export const ALIASES = {
  '/outrush/privacy.html': '/outrush/privacy',
  '/huecomb/privacy.html': '/huecomb/privacy',
  '/scrapglow/privacy.html': '/scrapglow/privacy',
  '/starshell/privacy.html': '/starshell/privacy',
  '/starshell/terms.html': '/starshell/terms',
  '/pearlbound/privacy.html': '/pearlbound/privacy',
  '/pearlbound/terms.html': '/pearlbound/terms',
  '/wreckmoor/privacy.html': '/wreckmoor/privacy',
  '/wreckmoor/terms.html': '/wreckmoor/terms',
  '/rifthauler/privacy.html': '/rifthauler/privacy',
  '/rifthauler/terms.html': '/rifthauler/terms',
  '/leadlight/privacy.html': '/leadlight/privacy',
  '/leadlight/terms.html': '/leadlight/terms',
  '/floehelm/privacy.html': '/floehelm/privacy',
  '/floehelm/terms.html': '/floehelm/terms',
};

export const ROUTES = [
  '/',
  '/outrush', '/outrush/privacy',
  '/huecomb', '/huecomb/privacy',
  '/scrapglow', '/scrapglow/privacy',
  '/starshell', '/starshell/privacy', '/starshell/terms',
  '/pearlbound', '/pearlbound/privacy', '/pearlbound/terms',
  '/wreckmoor', '/wreckmoor/privacy', '/wreckmoor/terms',
  '/rifthauler', '/rifthauler/privacy', '/rifthauler/terms',
  '/leadlight', '/leadlight/privacy', '/leadlight/terms',
  '/floehelm', '/floehelm/privacy', '/floehelm/terms',
];
