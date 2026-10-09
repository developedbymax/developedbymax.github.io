import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import LeadlightWindow from '../components/art/LeadlightWindow.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';
import '../styles/leadlight.css';

const game = bySlug('leadlight');

const NAV = [
  ['How to cut', '#play'],
  ['The collection', '#collection'],
  ['Watch', '#film'],
  ['Privacy', '/leadlight/privacy'],
];

const STEPS = [
  {
    h: 'Read the commission',
    p: 'Each pane asks for 20–50% of its area. Take a moment. Imagine the piece you want to cut away.',
  },
  {
    h: 'Draw one straight line',
    p: 'Touch, drag to aim, then release. The line extends to the glass edges, and the smaller piece is the one we measure. Button controls offer another way to aim.',
  },
  {
    h: 'Let the light in',
    p: 'Stay within the shown tolerance to keep your glass. Within two percentage points is perfect. Six successful cuts colour a new window for your collection.',
  },
];

const SHOTS = [
  ['01-perfect-cut', 'Cut by eye', 'A perfect 30% cut on the glass cutting mat.'],
  ['02-completed-window', 'Six cuts. A new window.', 'A completed window added to the collection.'],
  ['03-collection', 'Keep a little light', 'The collection of six completed stained-glass windows.'],
];

const RHYTHM = [
  {
    h: 'Build a streak',
    p: 'Consecutive good cuts raise your multiplier, up to ×5. New shapes keep arriving and the tolerances slowly tighten.',
  },
  {
    h: 'Mend a crack',
    p: 'Three missed cuts end a run. Three perfect cuts in a row repair one crack, and there is no countdown and no final level.',
  },
  {
    h: 'Leave any time',
    p: 'Your unfinished run saves on your device. Play offline, without an account, energy meter or in-game currency.',
  },
];

/* Unlock thresholds word for word from LeadlightRN/src/core/profile.js. */
const PALETTES = [
  ['Cathedral', 'From the start', ['#3D8D82', '#91BEB0', '#E8B96F', '#CE765C']],
  ['Tiffany', '8 windows', ['#67B9A1', '#A6D0BA', '#F1C475', '#DE95A3']],
  ['Art Deco', '25 windows', ['#326D75', '#D6AD5D', '#AEB9A2', '#D58368']],
  ['De Stijl', '30 perfect cuts', ['#BC5145', '#3B698B', '#E6BE53', '#EDE6D5']],
  ['Midnight', '60 windows', ['#515C99', '#8D7BA6', '#66AFB6', '#BF81A3']],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Leadlight() {
  useMeta(meta['/leadlight']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone, iPad &amp; Android</p>
            <h1 className="title">
              Leadlight
              <span className="sub">Cut by eye. Let the light in.</span>
            </h1>
            <p className="lede">
              Cut by eye in a quiet glass atelier. Each pane asks for a percentage: draw one
              straight line, release, and see how close your eye can get. Six good cuts colour a
              stained-glass window for your collection. No clock, just craft.
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it plays<Arrow /></a>
              <StoreButtons />
            </div>
            <p className="note">
              Launching on both stores. Free to play, with one optional purchase.
            </p>
          </div>

          <div className="ghero-art">
            <LeadlightWindow size="clamp(260px, 31vw, 390px)" />
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="stats">
            {game.facts.map(([v, k]) => (
              <div key={k}>
                <div className="v">{v}</div>
                <div className="k">{k}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="play">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The art of a cut</p>
            <h2>A good eye is everything.</h2>
          </Reveal>
          <div className="g3">
            {STEPS.map((s, i) => (
              <Reveal key={s.h} delay={i * 80} className="step">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-s" id="collection">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Light, collected</p>
            <h2>Your craft. Your collection.</h2>
            <p>
              Every six good cuts become a named window. Open any of them for a closer look, and
              build your personal best one pane at a time.
            </p>
          </Reveal>
          <div className="g3 ll-shots">
            {SHOTS.map(([file, title, alt], i) => (
              <Reveal key={file} delay={i * 80}>
                <figure>
                  <img src={`/leadlight/screenshots/${file}.webp`} width="642" height="1389" alt={alt} loading="lazy" />
                  <figcaption>{title}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad" id="rhythm">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">No clock, just craft</p>
            <h2>The glass can wait.</h2>
          </Reveal>
          <div className="g3">
            {RHYTHM.map((s, i) => (
              <Reveal key={s.h} delay={i * 80} className="step">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-s" id="glass">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The glass cabinet</p>
            <h2>Five ways to catch the light</h2>
            <p>Earn every palette through play, or open the whole cabinet with Master Glazier.</p>
          </Reveal>
          <Reveal className="kinds">
            {PALETTES.map(([name, unlock, colors]) => (
              <div className="kind" key={name} style={{ flexBasis: 170 }}>
                <span className="sq ll-swatch" aria-hidden="true">
                  {colors.map((c) => <i key={c} style={{ background: c }} />)}
                </span>
                <span>
                  <b>{name}</b>
                  <span>{unlock}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad-s" id="film">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">A moment in the atelier</p>
            <h2>See the light take shape</h2>
            <p>A 24-second animated look at precision cutting and collecting windows. Music and glass sounds; no spoken dialogue.</p>
          </Reveal>
          <Reveal>
            <video className="ll-film" controls playsInline preload="none" poster="/leadlight/feature-graphic.png" aria-label="Leadlight promotional film">
              <source src="/leadlight/promo-landscape.mp4" type="video/mp4" />
              <track kind="captions" src="/leadlight/promo.vtt" srcLang="en" label="English" default />
              Your browser does not support video. <a href="/leadlight/promo-landscape.mp4">Download the film</a>.
            </video>
          </Reveal>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Master Glazier</p>
              <h2>A little more room to create</h2>
              <p>
                One optional, one-time purchase unlocks all five palettes and removes the break ads
                between runs. Optional mend videos remain available: when offered, a rewarded video
                can mend one crack once per run.
              </p>
              <p>
                Your runs, records and collection stay on your device. Leadlight has its own privacy
                policy, separate from the other games.
              </p>
              <p>
                <Link to="/leadlight/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Leadlight&rsquo;s privacy policy &rarr;
                </Link>
              </p>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>The short version</h3>
              <ul className="bullets">
                <li>Plays fully offline; purchases and ads need a connection.</li>
                <li>No account, no email, no sign-in.</li>
                <li>No location, contacts, camera, microphone or photos.</li>
                <li>No crash reporting and no analytics.</li>
                <li>Your windows and records never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Let the light in.</h2>
            <p>Free on iPhone, iPad and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
