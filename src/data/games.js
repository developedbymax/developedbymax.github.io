/* The one place a game is described.
   Everything on the site — the home grid, the per-game pages, the sitemap and
   the prerendered <head> of each route — reads from here, so a new game is
   added once and appears everywhere.

   Colours are not approximations: they are the values the apps actually render.
   Outrush's come from OutrushRN/src/ui/theme.js, Huecomb's from
   HuecombRN/src/ui/theme.js, Scrapglow's from ScrapglowRN/src/game/Scene.js. */

export const games = [
  {
    slug: 'outrush',
    name: 'Outrush',
    subtitle: 'Block Escape',
    genre: 'Chain-reaction puzzle',
    year: '2026',
    status: 'soon',           // soon | live | building
    featured: true,
    art: 'outrush',
    tagline: 'One tap. Then everything moves at once.',
    blurb:
      'Tap a block, it slides where its arrow points and leaves through a gate in the wall. Clearing one sets off everything waiting behind it — that cascade is the game.',
    short: 'Tap one block and the four behind it follow it out.',
    theme: {
      ground: '#141227',
      surface: '#1D1A36',
      line: '#3B3470',
      accent: '#FFC44D',
      onAccent: '#241704',
      ink: '#EEEBFF',
      inkMute: '#9992C4',
      inkFaint: '#6F6899',
    },
    facts: [
      ['6×6', 'The whole board'],
      ['6', 'Palettes to unlock'],
      ['3', 'Challenges a day'],
      ['0', 'Accounts or logins'],
    ],
    hasLegal: true,
  },
  {
    slug: 'huecomb',
    name: 'Huecomb',
    subtitle: 'Hexa Stack Sort',
    genre: 'Sorting puzzle',
    year: '2026',
    status: 'soon',
    featured: false,
    art: 'huecomb',
    tagline: 'Colours find each other. You just make room.',
    blurb:
      'Drop a stack on the honeycomb. Matching colours pour together on their own — and when eight of one colour gather, they lift off and bare the colour underneath, which pours into its neighbour, which lifts too.',
    short: 'Eight of a colour lifts off — and starts the next one.',
    theme: {
      ground: '#110F24',
      surface: '#1B1834',
      line: '#3A3370',
      accent: '#FFC44D',
      onAccent: '#241704',
      ink: '#EFEBFF',
      inkMute: '#9C95C9',
      inkFaint: '#6E6799',
    },
    facts: [
      ['8', 'Tiles clear a colour'],
      ['6', 'Themes to equip'],
      ['3', 'Challenges a day'],
      ['∞', 'No levels, no timer'],
    ],
    hasLegal: true,
  },
  {
    slug: 'scrapglow',
    name: 'Scrapglow',
    subtitle: 'Salvage Run',
    genre: 'Arcade survival',
    year: '2026',
    status: 'building',
    featured: false,
    art: 'scrapglow',
    tagline: 'One more piece before you bank it.',
    blurb:
      'A tiny salvage ship and a growing halo of scrap. Every piece you hold makes the deposit worth more — and makes you wider, slower to thread a gap, easier to clip. Three hits end the run.',
    short: 'Greed makes you bigger. Bigger is how runs end.',
    theme: {
      ground: '#091521',
      surface: '#112738',
      line: '#1E3A4E',
      accent: '#61DAC8',
      onAccent: '#04231F',
      ink: '#E8F4F3',
      inkMute: '#8BA8B9',
      inkFaint: '#5E7B8C',
    },
    facts: [
      ['3', 'Hits and the run is over'],
      ['1', 'Rescue per expedition'],
      ['15', 'Original sound effects'],
      ['0', 'Accounts or logins'],
    ],
    hasLegal: true,
  },
];

export const bySlug = (slug) => games.find((g) => g.slug === slug);

/* Nine slots sit under the featured card. Two are finished games; the rest are
   deliberately empty and numbered, because "seven still to make" is the actual
   state of things and a grid that pretends otherwise would be a lie the visitor
   catches immediately. */
export const TOTAL_PLANNED = 10;

export const statusLabel = {
  live: 'Out now',
  soon: 'Coming soon',
  building: 'In development',
};
