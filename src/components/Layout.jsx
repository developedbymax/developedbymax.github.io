import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Arrow, Mail } from './Icons.jsx';

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
          {/* A plain anchor, not a Link, on purpose: on the home page the browser
              treats it as a same-document fragment and just scrolls, and from the
              404 page it loads the home page already at the right section. */}
          <a className="btn btn-quiet" href="/#contact">Get in touch</a>
        </nav>
      </div>
    </header>
  );
}

/* Deliberately thin. A footer is where someone looks for one of two things —
   who made this, and how to reach them — and the per-game legal documents are
   linked from the game pages they belong to, which is also where a store
   reviewer arrives. Listing all of it twice only made this harder to read. */
export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Mark />
            <p className="blurb">
              Small, tactile mobile games made by one person. No accounts, no servers,
              nothing following you around.
            </p>
          </div>

          <a className="foot-mail" href={`mailto:${EMAIL}`}>
            <Mail width="18" height="18" />
            {EMAIL}
          </a>
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
