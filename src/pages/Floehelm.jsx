import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import FloehelmBay from '../components/art/FloehelmBay.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('floehelm');

const NAV = [
  ['How it plays', '#play'],
  ['Upgrades', '#upgrades'],
  ['The storm', '#storm'],
  ['Privacy', '/floehelm/privacy'],
];

const STEPS = [
  {
    h: 'Carve your channel',
    p: 'Drag anywhere on the chart to steer. The ship turns towards your drag and keeps going while you hold; let go and it brakes. Its bow breaks the ice as it goes, and dark stone does not break at all.',
  },
  {
    h: 'Wake the fleet',
    p: 'Reach a stranded boat and it follows the open water you carved back to the harbor on its own, while you break a path to the next one. Every boat that gets home banks its salvage for good.',
  },
  {
    h: 'Bank it or sail on',
    p: 'Meet the rescue quota and steer back to the lanterns. Extract with a return bonus, choose an upgrade and head into the next bay, or stay and bring the rest of the fleet home first.',
  },
];

/* The upgrades, word for word as the game describes them (UPGRADES in
   FloehelmRN/src/core/game.ts). Each stacks to III. */
const UPGRADES = [
  ['↔', 'Split bow', 'Carve a wider channel with every pass.'],
  ['≋', 'Hot keel', 'Break heavy ice 30% faster.'],
  ['✧', 'Harbor beacon', 'Cargo boats travel 20% faster.'],
  ['⊙', 'Signal flare', 'Wake connected boats from farther away.'],
  ['»', 'Escort wake', 'Nearby cargo boats gain a speed boost.'],
  ['+', 'Reinforced hull', 'Restore hull and increase its capacity.'],
];

const STORM = [
  {
    h: 'Watch the weather',
    p: 'Rose bands sweep the bay a moment before a crosswind strikes. Get caught in one and you lose a hull segment. Lose them all, or let the storm clock run out, and the expedition ends.',
  },
  {
    h: 'Nothing delivered is lost',
    p: 'Every boat that reaches the harbor banks its salvage the moment it arrives. When an expedition ends, what you already brought home stays yours.',
  },
  {
    h: 'No last bay',
    p: 'The bays go on. The regions come back under new numerals, and each bay deeper is harder: a shorter storm clock, more boats to rescue, heavier ice, more stone in the way and wider crosswinds. Every expedition ends somewhere.',
  },
];

const INSIDE = [
  ['Three ships', 'Start with the Tern. Earn salvage to unlock the faster Swift, or the Mammoth, which breaks ice faster and takes more hits but is slower at sea.'],
  ['Daily chart', 'Three fixed bays and the same ship for everyone each day, with your own daily best to beat.'],
  ['Safe practice', 'A bay with no storm and no damage, for learning the ice. Your saved expedition is left where it was.'],
  ['Saves as you play', 'Close the game mid-bay and the expedition is waiting in the harbor, with a short countdown before anything moves.'],
  ['Liveries', 'Earn Paint on every expedition and spend it on new hull colours for your ship.'],
  ['Phones and tablets', 'Portrait or landscape; a wide tablet gets the whole chart with the voyage console and a rescue manifest beside it.'],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Floehelm() {
  useMeta(meta['/floehelm']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Floehelm
              <span className="sub">Carve ice. Rescue the fleet.</span>
            </h1>
            <p className="lede">
              Steer a small icebreaker with one thumb and cut channels through a frozen bay. Every
              stranded boat you reach sails home along the water you opened &mdash; so the route you
              carve is the route they take. Meet the quota, then bank the haul or sail into a harder
              bay before the storm closes in.
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it plays<Arrow /></a>
              <StoreButtons />
            </div>
            <p className="note">
              Launching on both stores. Free to play, with optional purchases.
            </p>
          </div>

          <div className="ghero-art">
            <FloehelmBay size="clamp(260px, 31vw, 390px)" />
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
            <h2>Every channel you carve is a way home.</h2>
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
            <h2>One at every harbor, and they stack</h2>
            <p>
              Each time you sail on, choose one of three upgrades for the rest of the expedition.
              Take the same one again and it grows, up to III. When everything is maxed out, a
              salvage cache is on offer instead.
            </p>
          </Reveal>
          <Reveal className="kinds">
            {UPGRADES.map(([icon, b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq fh-sq" style={{ color: 'var(--accent)' }} aria-hidden="true">{icon}</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="storm">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The storm</p>
            <h2>Every harbor asks the same thing: one more bay?</h2>
          </Reveal>
          <div className="g3">
            {STORM.map((s, i) => (
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
            <h2>A small ship, a whole fleet counting on you</h2>
          </Reveal>
          <Reveal className="kinds">
            {INSIDE.map(([b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq" style={{ background: 'var(--accent)' }} aria-hidden="true">◈</span>
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
              <h2>Your harbor log stays on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your salvage, your records, your
                ships and the expedition you are part way through are written to the device and
                never uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Floehelm has its own privacy policy, separate from the other games, because what it
                does is its own: it offers three purchases, two of them cosmetic, and its Remove Ads
                purchase stops every ad, including the optional one.
              </p>
              <p>
                <Link to="/floehelm/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Floehelm&rsquo;s privacy policy &rarr;
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
            <h2>Bring them home.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
