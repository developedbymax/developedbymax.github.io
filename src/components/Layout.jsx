import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { games } from '../data/games.js';
import { Arrow, Mail, Github } from './Icons.jsx';

export const EMAIL = 'developedbymax@gmail.com';

export function useStuck(at = 8) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > at);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [at]);
  return stuck;
}

export function Mark({ to = '/' }) {
  return (
    <Link className="mark" to={to}>
      <img src="/favicon.svg" alt="" width="30" height="30" />
      <span>developed<span className="thin">&nbsp;by&nbsp;</span>max</span>
    </Link>
  );
}

export function SiteHeader() {
  const stuck = useStuck();
  return (
    <header className={`site-head${stuck ? ' stuck' : ''}`}>
      <div className="wrap bar">
        <Mark />
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>Games</NavLink>
          <a href="/#approach">How I build</a>
          <span className="sep" aria-hidden="true" />
          <a className="btn btn-quiet" href={`mailto:${EMAIL}`}>Get in touch</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Mark />
            <p className="blurb">
              Small, tactile mobile games made by one person in the open. No accounts,
              no servers, nothing following you around.
            </p>
          </div>

          <div className="foot-col">
            <h4>Games</h4>
            <ul>
              {games.map((g) => (
                <li key={g.slug}><Link to={`/${g.slug}`}>{g.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Each game is a separate app with its own privacy policy and terms, and
              its own URL for the two stores and AppLovin to point at. Listing one
              of them here as though it were the site's would be wrong, and would
              be the thing a store reviewer notices. */}
          <div className="foot-col">
            <h4>Privacy &amp; terms</h4>
            <ul>
              {games.filter((g) => g.hasLegal).map((g) => (
                <li key={g.slug}>
                  <Link to={`/${g.slug}/privacy`}>{g.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`} style={{ display: 'inline-flex', gap: 9, alignItems: 'center' }}>
                  <Mail width="16" height="16" /> Email
                </a>
              </li>
              <li>
                <a href="https://github.com/developedbymax" rel="noopener" target="_blank"
                   style={{ display: 'inline-flex', gap: 9, alignItems: 'center' }}>
                  <Github width="16" height="16" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <p>&copy; {new Date().getFullYear()} developed by max. All games and artwork are mine.</p>
          <p>Built with React. Hosted on GitHub&nbsp;Pages.</p>
        </div>
      </div>
    </footer>
  );
}

export function BigLink({ to, children }) {
  return (
    <Link className="btn btn-key" to={to}>{children}<Arrow /></Link>
  );
}
