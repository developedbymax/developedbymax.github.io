import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import ScrapglowArena from '../components/art/ScrapglowArena.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow, Mail } from '../components/Icons.jsx';
import { EMAIL } from '../components/Layout.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('scrapglow');

const NAV = [
  ['How it plays', '#play'],
  ['The catch', '#catch'],
  ['What is in it', '#inside'],
  ['Privacy', '/scrapglow/privacy'],
];

const STEPS = [
  {
    h: 'Steer from anywhere',
    p: 'Drag anywhere in the arena and the ship moves relative to your drag, so your thumb never has to sit on top of the thing you are trying to see.',
  },
  {
    h: 'Sweep up the mint',
    p: 'Scrap sticks to your magnetic field as you pass. Coral debris does not — clip it and you lose a hull charge. Three of those and the run is over.',
  },
  {
    h: 'Bank it, or push on',
    p: 'Fly into the gold recycler to deposit the haul. The longer you hold, the more the deposit pays — and the wider you get before you reach it.',
  },
];

const INSIDE = [
  ['Daily expedition', 'Seeded from your device’s own calendar date, so everyone flies the same arena that day.'],
  ['Flight School', 'A short, safe tutorial before the first run — and replayable any time from the home screen.'],
  ['Pick up where you left', 'An expedition saves after deposits, periodically, and when you pause or leave. Continue it from the home screen.'],
  ['One rescue per run', 'A single restored hull charge, once, per expedition. After that, three hits is three hits.'],
  ['Original sound', 'Fifteen hand-made effects and a quiet sixteen-second ambient loop, all written for this game.'],
  ['Plays offline', 'No account, no server. Your best score and settings save to the device.'],
];

export default function Scrapglow() {
  useMeta(meta['/scrapglow']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">{statusLabel[game.status]} &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Scrapglow
              <span className="sub">A tiny salvage ship, and one more piece before you bank it</span>
            </h1>
            <p className="lede">
              Collect scrap, avoid debris, and fly into the recycler to cash the haul in.
              Everything you are carrying makes the deposit worth more &mdash; and makes you
              wider, slower to thread a gap, easier to clip.
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it plays<Arrow /></a>
              <a className="btn btn-quiet" href={`mailto:${EMAIL}?subject=Scrapglow playtest`}>
                <Mail width="17" height="17" />Ask to playtest
              </a>
            </div>
            <p className="note">
              Still being built. There is no store listing yet, and no date I would be willing
              to hold myself to.
            </p>
          </div>

          <div className="ghero-art">
            <ScrapglowArena size="clamp(260px, 32vw, 400px)" />
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
            <p className="eyebrow">How it plays</p>
            <h2>Three things to do, and only one of them is safe</h2>
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

      <section className="pad-s" id="catch">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">The catch</p>
              <h2>Greed makes you bigger. Bigger is how runs end.</h2>
              <p>
                Cargo is not just score waiting to be banked. Every piece you hold grows the
                magnetic field around the ship, and the field is also what debris hits. A full
                hold sweeps up scrap you could never have reached empty-handed, and it catches
                the coral you would have flown straight past.
              </p>
              <p>
                So the whole game is one question asked over and over, and the answer is never
                obviously yes or no: bank what you have now, or go and get one more.
              </p>
            </Reveal>
            <Reveal className="step" delay={90}>
              <h3>What the arena is made of</h3>
              <ul className="bullets">
                <li><b>Mint scrap</b> — free to take, worth more in a crowd.</li>
                <li><b>Coral debris</b> — costs a hull charge, and you only have three.</li>
                <li><b>The gold recycler</b> — the only place cargo turns into score.</li>
                <li><b>Your field</b> — grows with the haul, collects and collides in equal measure.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad" id="inside">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What is in it</p>
            <h2>Built for short runs and long evenings alike</h2>
          </Reveal>
          <Reveal className="kinds">
            {INSIDE.map(([b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq" style={{ background: 'var(--accent)' }} aria-hidden="true">◆</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Your data</p>
              <h2>Your scores stay on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your best score, your totals,
                your settings and the expedition you are part way through are written to the
                device and are never uploaded anywhere. Uninstall the game and they are gone
                with it.
              </p>
              <p>
                Scrapglow has its own privacy policy, separate from the other games, because
                what it does is different: it sells one thing rather than three, it ships no
                crash reporting at all, and <b>Remove break ads</b> deliberately keeps the
                rescue ad you choose to watch.
              </p>
              <p>
                <Link to="/scrapglow/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Scrapglow&rsquo;s privacy policy &rarr;
                </Link>
              </p>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>The short version</h3>
              <ul className="bullets">
                <li>Plays fully offline.</li>
                <li>No account, no email, no sign-in.</li>
                <li>No location, contacts, photos or microphone.</li>
                <li>No crash reporting and no analytics, at all.</li>
                <li>Scores never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>One more piece. Then the recycler. Probably.</h2>
            <p>
              It is playable, it is not finished, and early opinions are worth more to me now
              than they will be later.
            </p>
            <div className="cta-row">
              <a className="btn btn-key" href={`mailto:${EMAIL}?subject=Scrapglow playtest`}>
                <Mail width="17" height="17" />Ask to playtest
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
