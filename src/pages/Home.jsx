import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { games, statusLabel, TOTAL_PLANNED } from '../data/games.js';
import { SiteHeader, SiteFooter, EMAIL } from '../components/Layout.jsx';
import { Arrow, Mail, Github, Shield, Spark } from '../components/Icons.jsx';
import Reveal from '../components/Reveal.jsx';
import PhoneScreen from '../components/art/PhoneScreen.jsx';
import GameArt from '../components/art/GameArt.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

/* ---------------------------------------------------------------- hero ---- */

function Stage() {
  const ref = useRef(null);

  /* Pointer parallax, rAF-throttled and pointer-device only. Touch never gets
     this — there is no hover on a phone, and reading the pointer there would
     only fight the scroll. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const on = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    const off = () => { el.style.setProperty('--px', 0); el.style.setProperty('--py', 0); };

    window.addEventListener('pointermove', on, { passive: true });
    el.addEventListener('pointerleave', off);
    return () => {
      window.removeEventListener('pointermove', on);
      el.removeEventListener('pointerleave', off);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const [outrush, huecomb, scrapglow] = games;

  return (
    <div className="stage" ref={ref}>
      <div className="slotp left" aria-hidden="true">
        <PhoneScreen game={huecomb} hud={['Score', '8,140', 'Best', '11,275']} label="" />
      </div>
      <div className="slotp right" aria-hidden="true">
        <PhoneScreen game={scrapglow} hud={['Cargo', '14', 'Banked', '6,320']} label="" />
      </div>
      <div className="slotp mid">
        <PhoneScreen
          game={outrush}
          hud={['Score', '12,480', 'Best', '18,902']}
          label="Outrush running on a phone: a six by six board where four blocks clear as a single chain."
        />
      </div>
    </div>
  );
}

function Hero() {
  const built = games.length;
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Independent studio &middot; iPhone &amp; Android</p>
          <h1 className="display">
            Ten small games.
            <span className="swap">One pair of hands.</span>
          </h1>
          <p className="lede">
            I&rsquo;m Max. I make tiny, tactile puzzle games for phones &mdash; the kind you
            finish a run of while the kettle boils. No accounts, no servers, nothing
            following you around. Three are built. Seven to go.
          </p>

          <div className="cta-row">
            <a className="btn btn-key" href="#games">See the games<Arrow /></a>
            <a className="btn btn-quiet" href={`mailto:${EMAIL}`}><Mail width="17" height="17" />Get in touch</a>
          </div>

          <ul className="ticks">
            <li>Plays fully offline</li>
            <li>No account, ever</li>
            <li>Scores stay on your phone</li>
          </ul>

          <div className="meter">
            <div className="meter-top">
              <b>{built} of {TOTAL_PLANNED} built</b>
              <span>The plan for 2026</span>
            </div>
            <div className="meter-bar" role="img"
                 aria-label={`${built} of ${TOTAL_PLANNED} planned games are built.`}>
              {Array.from({ length: TOTAL_PLANNED }, (_, i) => (
                <i key={i} className={i < built ? 'on' : ''} />
              ))}
            </div>
          </div>
        </div>

        <Stage />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ marquee ---- */

const CHANTS = [
  'No accounts', 'No servers', 'Plays offline', 'Scores stay on your phone',
  'No loot boxes', 'No energy timers', 'One optional purchase', 'Made by one person',
];

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <span key={n}>{CHANTS.map((c) => <span key={c}>{c}</span>)}</span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- games ---- */

function themeVars(g) {
  return {
    '--g-accent': g.theme.accent,
    '--g-ground': g.theme.ground,
    '--g-ink': g.theme.ink,
    '--g-mute': g.theme.inkMute,
    '--g-faint': g.theme.inkFaint,
  };
}

function Feature({ game }) {
  const ref = useRef(null);

  /* The light that follows the cursor across the card. Written as custom
     properties so the paint stays in CSS. */
  const track = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <Link
      ref={ref}
      to={`/${game.slug}`}
      className="feature"
      style={themeVars(game)}
      onPointerMove={track}
      aria-label={`${game.name}: ${game.subtitle}`}
    >
      <div className="feature-grid">
        <div>
          <div className="flag">
            <span className={`pill ${game.status}`}><i className="dot" />{statusLabel[game.status]}</span>
            <span className="tag">{game.genre}</span>
          </div>
          <h3>{game.name}</h3>
          <span className="sub">{game.subtitle}</span>
          <p className="blurb">{game.blurb}</p>
          <span className="go">Open the game page<Arrow /></span>
        </div>
        <div className="feature-art" aria-hidden="true">
          <GameArt slug={game.slug} size="card" label="" />
        </div>
      </div>
      <div className="feature-facts" aria-hidden="true">
        {game.facts.map(([v, k]) => (
          <div key={k}><b>{v}</b><span>{k}</span></div>
        ))}
      </div>
    </Link>
  );
}

function GameCard({ game }) {
  return (
    <Link to={`/${game.slug}`} className="gcard" style={themeVars(game)}>
      <span className={`pill ${game.status}`}><i className="dot" />{statusLabel[game.status]}</span>
      <div className="gcard-art" aria-hidden="true">
        <GameArt slug={game.slug} size="thumb" label="" />
      </div>
      <div className="gcard-body">
        <div className="row"><h3>{game.name}</h3></div>
        <p className="gen">{game.genre}</p>
        <p>{game.short}</p>
        <Arrow />
      </div>
    </Link>
  );
}

/* Seven slots that are genuinely empty. They are numbered and labelled rather
   than filled with invented titles, because a visitor works out the difference
   in about a second and the invented version costs all the credit the real
   games just earned. */
const SLOTS = [
  { n: 4, cap: 'Next up', txt: 'In design. Not ready to be named yet.' },
  { n: 5, cap: 'Planned', txt: 'Not announced.' },
  { n: 6, cap: 'Planned', txt: 'Not announced.' },
  { n: 7, cap: 'Planned', txt: 'Not announced.' },
  { n: 8, cap: 'Planned', txt: 'Not announced.' },
  { n: 9, cap: 'Planned', txt: 'Not announced.' },
  { n: 10, cap: 'Open', txt: 'Got an idea you would actually play?', mail: true },
];

function Slot({ s }) {
  const body = (
    <>
      <div>
        <span className="slot-mark" aria-hidden="true">+</span>
      </div>
      <div>
        <div className="no" aria-hidden="true">{String(s.n).padStart(2, '0')}</div>
        <div className="cap">{s.cap}</div>
        <p className="txt">{s.txt}{s.mail && <> <span style={{ color: 'var(--accent)' }}>Tell me &rarr;</span></>}</p>
      </div>
    </>
  );
  return s.mail
    ? <a className="slot" href={`mailto:${EMAIL}?subject=A game idea`}>{body}</a>
    : <div className="slot">{body}</div>;
}

function Games() {
  const [featured, ...rest] = games;
  return (
    <section className="pad games" id="games">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">The shelf</p>
            <h2>Three built, seven still to come</h2>
            <p>
              Each one is designed, coded, drawn, scored and shipped by me. Tap a card to
              read what a game actually is before you spend a download on it.
            </p>
          </div>
          <span className="pill"><i className="dot" style={{ background: 'var(--accent)' }} />
            {games.length} / {TOTAL_PLANNED} built
          </span>
        </Reveal>

        <Reveal><Feature game={featured} /></Reveal>

        <div className="grid9">
          {rest.map((g, i) => (
            <Reveal key={g.slug} delay={i * 60}><GameCard game={g} /></Reveal>
          ))}
          {SLOTS.map((s, i) => (
            <Reveal key={s.n} delay={(rest.length + i) * 45}><Slot s={s} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- approach ---- */

const PRINCIPLES = [
  {
    Ic: Shield,
    h: 'No account. Ever.',
    p: 'There is nothing to sign up for. Scores, stars and settings live in a small database on your phone and are never uploaded, because there is nowhere to upload them to.',
  },
  {
    Ic: Plane,
    h: 'Works on a plane.',
    p: 'Every game runs fully offline. No server means no outage, no shutdown notice, and no version of the game that quietly stops working when I stop paying a bill.',
  },
  {
    Ic: Spark,
    h: 'One purchase, not a treadmill.',
    p: 'Free with ads, and a one-off purchase removes them for good — buy it and the ad code is never started at all. No energy timers, no loot boxes, nothing that costs more the longer you play.',
  },
];

function Plane(p) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M12 2.6c1.3 0 2.2 2.4 2.2 5.4l6.4 3.8v2.1l-6.4-1.9v3.8l2.3 1.7v1.7L12 18.6l-4.5 1.6v-1.7l2.3-1.7V13l-6.4 1.9v-2.1l6.4-3.8c0-3 .9-5.4 2.2-5.4z" />
    </svg>
  );
}

function Approach() {
  return (
    <section className="pad-s" id="approach">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">How I build</p>
          <h2>Three rules I have not broken yet</h2>
          <p>
            They are not marketing. They are the reason the games are small, and the
            reason they will still run in five years.
          </p>
        </Reveal>
        <div className="principles">
          {PRINCIPLES.map(({ Ic, h, p }, i) => (
            <Reveal key={h} delay={i * 80} className="pr">
              <span className="ic"><Ic /></span>
              <h3>{h}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ closing ---- */

function Closing() {
  return (
    <section className="pad">
      <div className="wrap">
        <Reveal className="band">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Say hello</p>
          <h2>Playtesters, bug reports and bad ideas all welcome.</h2>
          <p>
            It is a one-person studio, so the person reading your message is the person
            who fixes it. That is the whole advantage, and I would like to keep using it.
          </p>
          <p style={{ marginTop: 26 }}>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <div className="cta-row">
            <a className="btn btn-key" href={`mailto:${EMAIL}`}><Mail width="17" height="17" />Email me</a>
            <a className="btn btn-quiet" href="https://github.com/developedbymax" rel="noopener" target="_blank">
              <Github width="17" height="17" />GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- page ---- */

export default function Home() {
  useMeta(meta['/']);
  return (
    <>
      <div className="field" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className="page">
        <Hero />
        <Marquee />
        <Games />
        <Approach />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
