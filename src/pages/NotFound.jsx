import { Link } from 'react-router-dom';
import { SiteHeader, SiteFooter } from '../components/Layout.jsx';
import { games } from '../data/games.js';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

export default function NotFound() {
  useMeta(meta['/404']);
  return (
    <>
      <div className="field" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      <main className="page">
        <div className="wrap nf">
          <div>
            <div className="code" aria-hidden="true">404</div>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)' }}>Nothing here.</h1>
            <p style={{ maxWidth: '42ch', marginInline: 'auto' }}>
              That address does not exist on this site. The games are all one click away.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center', marginTop: 26 }}>
              <Link className="btn btn-key" to="/">All games<Arrow /></Link>
              {games.map((g) => (
                <Link key={g.slug} className="btn btn-quiet" to={`/${g.slug}`}>{g.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
