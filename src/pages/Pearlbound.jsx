import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import PearlboundReef from '../components/art/PearlboundReef.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('pearlbound');

const NAV = [
  ['How it plays', '#play'],
  ['Gifts', '#gifts'],
  ['The dive', '#dive'],
  ['Privacy', '/pearlbound/privacy'],
];

const STEPS = [
  {
    h: 'Pull back, let go',
    p: 'Drag down and to the side anywhere on the reef, like a slingshot, and release. A dotted line shows the first rebounds before you commit; slide back up to change your mind.',
  },
  {
    h: 'Break the ivory seals',
    p: 'The pearl ricochets off walls, coral and shell vaults until it falls back. Break every seal and the chamber opens. Coral and gold vaults pay treasure on the way.',
  },
  {
    h: 'Surface, or dive deeper',
    p: 'Bank what you carry, with a depth bonus that grows to double, or choose a passage and keep going. Lose your shell and only a fifth of the haul comes home.',
  },
];

/* The six gifts, word for word as the game describes them (UPGRADES in
   PearlboundRN/src/core/game.ts). */
const GIFTS = [
  ['↗', 'Bankshot', 'After a wall rebound, your next impact deals +1 damage.'],
  ['◐', 'Twin pearl', 'The first vault you break each shot releases two little pearls.'],
  ['◎', 'Echo shell', 'Your first bumper hit sends a damaging pulse to nearby growth.'],
  ['≈', 'Undertow', 'Crossing a current charges your next hit with +1 damage.'],
  ['◇', 'Piercing pearl', 'Pass through the first coral you break each shot.'],
  ['✧', 'Pearl guard', 'Repair one hull every third chamber you clear.'],
];

const DIVE = [
  {
    h: 'The reef pushes back',
    p: 'Growth creeps toward the red line after every shot, and it quickens the longer a chamber stays sealed. When it reaches the line, your shell takes the hit. Three hits and the dive is over.',
  },
  {
    h: 'Deeper is harder',
    p: 'Seals take more hits the further down you go, and each chamber starts a little closer to the line. There is no last chamber: every dive ends somewhere, and the question is where.',
  },
  {
    h: 'Two passages',
    p: 'After each chamber, choose a quiet passage with slower growth, or a gilded one with an extra vault and a richer haul that grows faster. Three reefs rotate as you descend.',
  },
];

const INSIDE = [
  ['Safe practice', 'A dive with nothing at stake: no hull lost, no records touched, and your saved dive left exactly where it was.'],
  ['One rescue a dive', 'When your shell breaks, you may choose to watch an ad to keep your treasure and gifts and go on with one hull.'],
  ['Saves as you play', 'Close the game mid-dive and it is waiting where you left it, down to the reef as it stood.'],
  ['2× speed', 'Speed up a long rebound without changing where it goes.'],
  ['Reduced effects', 'Turn off the particles, and sound and haptics separately.'],
  ['Phones and tablets', 'Portrait on phones; on a tablet the reef takes the whole height and the stats move beside it.'],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Pearlbound() {
  useMeta(meta['/pearlbound']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Pearlbound
              <span className="sub">One shot. A whole reef of treasure.</span>
            </h1>
            <p className="lede">
              Pull back, let one pearl go, and watch it ricochet through a chamber of coral and
              gold. Break the ivory seals to open the way down &mdash; then surface with
              everything you carry, or dive one chamber deeper and risk it.
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
            <PearlboundReef size="clamp(260px, 31vw, 390px)" />
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
            <h2>Find the angle. Let the reef do the rest.</h2>
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

      <section className="pad-s" id="gifts">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Gifts</p>
            <h2>Six gifts, one every other chamber</h2>
            <p>
              After your first chamber, and every second one after that, choose one of three gifts
              for the rest of the dive. Each changes how a shot is worth taking.
            </p>
          </Reveal>
          <Reveal className="kinds">
            {GIFTS.map(([icon, b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq pb-sq" style={{ color: 'var(--accent)' }} aria-hidden="true">{icon}</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="dive">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The dive</p>
            <h2>Every chamber is a question: one more?</h2>
          </Reveal>
          <div className="g3">
            {DIVE.map((s, i) => (
              <Reveal key={s.h} delay={i * 80} className="step">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-s" id="inside">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What is in it</p>
            <h2>A small reef, made to be dived again</h2>
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
              <h2>Your treasure stays on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your banked treasure, your deepest
                chamber and the dive you are part way through are written to the device and never
                uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Pearlbound has its own privacy policy, separate from the other games, because what
                it does is its own: it sells one thing, it ships no crash reporting at all, and its
                purchase removes the ads between dives but keeps the optional rescue ad you can
                choose to watch.
              </p>
              <p>
                <Link to="/pearlbound/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Pearlbound&rsquo;s privacy policy &rarr;
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
                <li>Your treasure and records never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Bank it, or dive deeper.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
