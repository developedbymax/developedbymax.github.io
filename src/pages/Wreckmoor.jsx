import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import WreckmoorYard from '../components/art/WreckmoorYard.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('wreckmoor');

const NAV = [
  ['How it plays', '#play'],
  ['Upgrades', '#upgrades'],
  ['The wake', '#wake'],
  ['Privacy', '/wreckmoor/privacy'],
];

const STEPS = [
  {
    h: 'One thumb, anywhere',
    p: 'Touch the yard wherever you like and drag: that is your joystick. The skiff goes where you point and keeps going while you hold. Lift your thumb and it glides to a stop.',
  },
  {
    h: 'Curve to swing',
    p: 'The ember ball on your tether does the damage. Curve your path and it winds up; a clean, fast swing shatters a whole row of ceramic, and every break keeps the chain alive.',
  },
  {
    h: 'Get out with the haul',
    p: 'Break every glowing core to open the upper gate, sweep up the orange salvage, and slip through. The gate secures what you carry. Then extract, or fit an upgrade and go deeper.',
  },
];

/* The upgrades, word for word as the game describes them (UPGRADES in
   WreckmoorRN/src/core/game.js). The first five stack to III. */
const UPGRADES = [
  ['↔', 'Long reach', 'A wider swing. Tether length +18%.'],
  ['◆', 'Iron heart', 'Harder hits. Impact damage +45%.'],
  ['◎', 'Magnetic wake', 'Pull salvage in from twice as far.'],
  ['ϟ', 'Arc core', 'Ball strikes that shatter a target shock its closest neighbor.'],
  ['✺', 'Ember core', 'Destroyed targets burst, damaging nearby structures.'],
  ['+', 'Field repair', 'Restore two armor segments, up to four.'],
];

const WAKE = [
  {
    h: 'Watch the red circles',
    p: 'Blasts are marked on the ground before they go off, and they aim for where you are heading. Keep moving. You have four armor segments and a moment of cover after each hit; when the last one breaks, the run is over.',
  },
  {
    h: 'The Cinder Engine',
    p: 'Every third district is guarded by a moving engine whose hull hurts to touch. Swing wide and bring it down: silencing one secures a hundred bonus salvage on the spot.',
  },
  {
    h: 'No last district',
    p: 'The yards cycle and each one pushes harder: faster blasts, wider ones, tougher cores that move around the grid, and engines that range further. Every run ends somewhere. The question is where.',
  },
];

const INSIDE = [
  ['Daily expedition', 'Three districts built from the day’s seed, the same layout for everyone that day, to see how cleanly you can take them.'],
  ['Safe practice', 'A yard with no blasts and nothing at stake, to learn the swing. Your saved run is left exactly where it was.'],
  ['Saves as you play', 'Close the game mid-district and it is waiting where you left it, with a countdown before anything moves.'],
  ['One repair every three districts', 'At a gate you may choose to watch an ad to restore one armor segment. It is never required and never offered in daily or practice runs.'],
  ['Reduced effects', 'Turn off flashes and particles, and sound and haptics separately.'],
  ['Phones and tablets', 'Portrait on phones; a wide tablet gets the yard at full height with the readout beside it.'],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Wreckmoor() {
  useMeta(meta['/wreckmoor']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Wreckmoor
              <span className="sub">Leave nothing unbroken.</span>
            </h1>
            <p className="lede">
              Pilot a little salvage skiff with one thumb and let the wrecking ball on its tether do
              the rest. Curve your path to wind up the swing, smash through rows of ceramic ruins
              to the glowing cores, and get out through the gate with everything you scooped up
              &mdash; or go one district deeper.
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
            <WreckmoorYard size="clamp(260px, 31vw, 390px)" />
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
            <h2>Swing wide. Break the whole row.</h2>
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

      <section className="pad-s" id="upgrades">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Upgrades</p>
            <h2>One at every gate, and they stack</h2>
            <p>
              Each time you go deeper, fit one of three upgrades for the rest of the run. Take the
              same one again and it grows, up to III. When everything is maxed out, a salvage cache
              is always on offer.
            </p>
          </Reveal>
          <Reveal className="kinds">
            {UPGRADES.map(([icon, b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq cw-sq" style={{ color: 'var(--accent)' }} aria-hidden="true">{icon}</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="wake">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The wake</p>
            <h2>Every gate asks the same thing: one more?</h2>
          </Reveal>
          <div className="g3">
            {WAKE.map((s, i) => (
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
            <h2>A small yard, made to be wrecked again</h2>
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
              <h2>Your salvage stays on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your secured salvage, your deepest
                district and the run you are part way through are written to the device and never
                uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Wreckmoor has its own privacy policy, separate from the other games, because what
                it does is its own: it sells one thing, it ships no crash reporting at all, and its
                purchase removes the ads between runs but keeps the optional repair ad you can
                choose to watch.
              </p>
              <p>
                <Link to="/wreckmoor/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Wreckmoor&rsquo;s privacy policy &rarr;
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
                <li>Your salvage and records never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Bank it, or go deeper.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
