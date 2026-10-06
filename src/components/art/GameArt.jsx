import OutrushBoard from './OutrushBoard.jsx';
import HuecombComb from './HuecombComb.jsx';
import ScrapglowArena from './ScrapglowArena.jsx';
import StarshellShell from './StarshellShell.jsx';
import PearlboundReef from './PearlboundReef.jsx';
import WreckmoorYard from './WreckmoorYard.jsx';
import RiftHaulerIsland from './RiftHaulerIsland.jsx';
import LeadlightWindow from './LeadlightWindow.jsx';
import FloehelmBay from './FloehelmBay.jsx';
import SiroccoPoster from './SiroccoPoster.jsx';

/* One entry point for a game's artwork at four sizes, so the home grid, the
   phone screens and the game heroes never drift apart. */
const SIZES = {
  outrush:   { micro: 8,  thumb: 20,  phone: 27,  card: 31,  hero: 'clamp(34px, 6.2vw, 56px)' },
  huecomb:   { micro: 8,  thumb: 21,  phone: 25,  card: 30,  hero: 'clamp(30px, 5.2vw, 48px)' },
  scrapglow: { micro: 58, thumb: 152, phone: 200, card: 250, hero: 'clamp(260px, 32vw, 400px)' },
  starshell: { micro: 58, thumb: 112, phone: 176, card: 230, hero: 'clamp(250px, 29vw, 350px)' },
  pearlbound: { micro: 58, thumb: 132, phone: 190, card: 240, hero: 'clamp(260px, 31vw, 390px)' },
  wreckmoor: { micro: 58, thumb: 132, phone: 190, card: 240, hero: 'clamp(260px, 31vw, 390px)' },
  rifthauler: { micro: 58, thumb: 132, phone: 190, card: 240, hero: 'clamp(260px, 31vw, 390px)' },
  /* a tall lancet, so Leadlight's sizes are HEIGHTS, not widths */
  leadlight: { micro: 58, thumb: 140, phone: 210, card: 280, hero: 'clamp(320px, 42vw, 500px)' },
  floehelm: { micro: 58, thumb: 132, phone: 190, card: 240, hero: 'clamp(260px, 31vw, 390px)' },
  /* a 400 × 280 postcard, so it gets a little more width than the square arts */
  sirocco: { micro: 58, thumb: 150, phone: 210, card: 270, hero: 'clamp(300px, 38vw, 470px)' },
};

const BARE = new Set(['micro', 'thumb']);   // no score pop, no tray

export default function GameArt({ slug, size = 'card', ...rest }) {
  const s = SIZES[slug]?.[size];
  const bare = BARE.has(size);
  if (slug === 'outrush') return <OutrushBoard cell={s} pop={bare ? null : '+2,400 ×4'} {...rest} />;
  if (slug === 'huecomb') return <HuecombComb u={s} tray={!bare} {...rest} />;
  if (slug === 'scrapglow') return <ScrapglowArena size={s} {...rest} />;
  /* at micro size the shell is unreadable, so it is the burst on its own —
     which is also the app icon */
  if (slug === 'starshell') return <StarshellShell size={s} mark={size === 'micro'} {...rest} />;
  /* the pearl in its shell, the app icon, where the reef would be specks */
  if (slug === 'pearlbound') return <PearlboundReef size={s} mark={size === 'micro'} {...rest} />;
  /* the skiff and its ball, the app icon, where the yard would be specks */
  if (slug === 'wreckmoor') return <WreckmoorYard size={s} mark={size === 'micro'} {...rest} />;
  /* the crystal on its hexagon, the app icon, where the island would be specks */
  if (slug === 'rifthauler') return <RiftHaulerIsland size={s} mark={size === 'micro'} {...rest} />;
  /* the app icon's window, where the live pane would be too small to read */
  if (slug === 'leadlight') return <LeadlightWindow size={s} mark={size === 'micro'} {...rest} />;
  /* the app icon's icebreaker, where the bay would be specks */
  if (slug === 'floehelm') return <FloehelmBay size={s} mark={size === 'micro'} {...rest} />;
  /* the app icon's glider, where the dunes would be specks */
  if (slug === 'sirocco') return <SiroccoPoster size={s} mark={size === 'micro'} {...rest} />;
  return null;
}
