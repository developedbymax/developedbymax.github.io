import OutrushBoard from './OutrushBoard.jsx';
import HuecombComb from './HuecombComb.jsx';
import ScrapglowArena from './ScrapglowArena.jsx';
import StarshellShell from './StarshellShell.jsx';

/* One entry point for a game's artwork at four sizes, so the home grid, the
   phone screens and the game heroes never drift apart. */
const SIZES = {
  outrush:   { micro: 8,  thumb: 20,  phone: 27,  card: 31,  hero: 'clamp(34px, 6.2vw, 56px)' },
  huecomb:   { micro: 8,  thumb: 21,  phone: 25,  card: 30,  hero: 'clamp(30px, 5.2vw, 48px)' },
  scrapglow: { micro: 58, thumb: 152, phone: 200, card: 250, hero: 'clamp(260px, 32vw, 400px)' },
  starshell: { micro: 58, thumb: 112, phone: 176, card: 230, hero: 'clamp(250px, 29vw, 350px)' },
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
  return null;
}
