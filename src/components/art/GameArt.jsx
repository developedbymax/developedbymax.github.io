import OutrushBoard from './OutrushBoard.jsx';
import HuecombComb from './HuecombComb.jsx';
import ScrapglowArena from './ScrapglowArena.jsx';

/* One entry point for a game's artwork at four sizes, so the home grid, the
   phone screens and the game heroes never drift apart. */
const SIZES = {
  outrush:   { micro: 8,  thumb: 20,  phone: 24,  card: 31,  hero: 'clamp(34px, 6.2vw, 56px)' },
  huecomb:   { micro: 8,  thumb: 21,  phone: 22,  card: 30,  hero: 'clamp(30px, 5.2vw, 48px)' },
  scrapglow: { micro: 58, thumb: 152, phone: 176, card: 250, hero: 'clamp(260px, 32vw, 400px)' },
};

const BARE = new Set(['micro', 'thumb']);   // no score pop, no tray

export default function GameArt({ slug, size = 'card', ...rest }) {
  const s = SIZES[slug]?.[size];
  const bare = BARE.has(size);
  if (slug === 'outrush') return <OutrushBoard cell={s} pop={bare ? null : '+2,400 ×4'} {...rest} />;
  if (slug === 'huecomb') return <HuecombComb u={s} tray={!bare} {...rest} />;
  if (slug === 'scrapglow') return <ScrapglowArena size={s} {...rest} />;
  return null;
}
