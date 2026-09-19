import { Link } from 'react-router-dom';
import { games } from '../data/games.js';
import { Arrow, Back } from './Icons.jsx';
import { useStuck, EMAIL } from './Layout.jsx';
import GameArt from './art/GameArt.jsx';

/* The second light in the ambient field behind a game page — a colour the game
   actually uses, so the page glows in its own two colours rather than in the
   studio's. */
const SPOT = { outrush: '#B57BFF', huecomb: '#A66CFF', scrapglow: '#FB9C89', starshell: '#FF8AE2' };

export function GameHeader({ game, links = [] }) {
  const stuck = useStuck();
  return (
    <header className={`site-head${stuck ? ' stuck' : ''}`}>
      <div className="wrap bar">
        <Link className="mark" to={`/${game.slug}`}>
          <img src={`/favicon-${game.slug}.svg`} alt="" width="30" height="30" />
          <span>{game.name}</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <span className="sep" aria-hidden="true" />
          <Link className="btn btn-quiet" to="/">
            <Back /> All games
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function GameFooter({ game }) {
  const others = games.filter((g) => g.slug !== game.slug);
  return (
    <>
      <section className="pad-s">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 26 }}>
            <p className="eyebrow">More from the studio</p>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>The other games</h2>
          </div>
          <div className="more">
            {others.map((g) => (
              <Link key={g.slug} className="more-card" to={`/${g.slug}`}>
                <span className="thumb" style={{ background: g.theme.ground }}>
                  <GameArt slug={g.slug} size="micro" label="" />
                </span>
                <span>
                  <b>{g.name}</b>
                  <span>{g.genre}</span>
                </span>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-foot" style={{ background: 'transparent' }}>
        <div className="wrap">
          <div className="foot-base" style={{ borderTop: 0, paddingTop: 0, justifyContent: 'center', textAlign: 'center' }}>
            <nav style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/">All games</Link>
              {game.hasLegal && <Link to={`/${game.slug}/privacy`}>Privacy Policy</Link>}
              {game.hasLegal && <Link to={`/${game.slug}/privacy#terms`}>Terms of Use</Link>}
              <a href={`mailto:${EMAIL}`}>Contact</a>
            </nav>
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-faint)', marginTop: 22 }}>
            {game.name} is made and published by developed&nbsp;by&nbsp;max.
          </p>
        </div>
      </footer>
    </>
  );
}

/* Writes the game's palette onto the design tokens. Every component on the page
   reads those tokens, so one object in src/data/games.js re-themes the lot. */
export default function GameShell({ game, links, children, legal = false }) {
  const t = game.theme;
  const vars = {
    '--ground': t.ground,
    '--ground-2': t.ground,
    '--surface': t.surface,
    '--surface-2': t.surface,
    '--line': t.line,
    '--ink': t.ink,
    '--ink-mute': t.inkMute,
    '--ink-faint': t.inkFaint,
    '--accent': t.accent,
    '--on-accent': t.onAccent,
    '--spot': SPOT[game.slug] ?? t.accent,
  };
  return (
    <div className="gpage" style={vars}>
      <div className="field" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#main">Skip to content</a>
      <GameHeader game={game} links={links} />
      <main id="main" className="page">{children}</main>
      {!legal && <GameFooter game={game} />}
      {legal && (
        <footer className="site-foot" style={{ background: 'transparent' }}>
          <div className="wrap">
            <div className="foot-base" style={{ justifyContent: 'center' }}>
              <nav style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
                <Link to={`/${game.slug}`}>{game.name}</Link>
                <Link to="/">All games</Link>
                <a href={`mailto:${EMAIL}`}>Contact</a>
              </nav>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
