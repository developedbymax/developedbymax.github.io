import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import SiroccoPoster from '../components/art/SiroccoPoster.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('sirocco');

const NAV = [
  ['How it flies', '#play'],
  ['Upgrades', '#upgrades'],
  ['The long route', '#route'],
  ['Privacy', '/sirocco/privacy'],
];

const STEPS = [
  {
    h: 'Bank with your thumb',
    p: 'Drag anywhere on the chart to bank left or right, and hold the drag to keep turning; let go and the wings level. You cannot climb on your own: altitude only comes from the teal thermal ribbons, so read the wind and line yourself up.',
  },
  {
    h: 'Skim for letters',
    p: 'Drop below 78 altitude to scoop up letters; amber parcels are worth three. Every parcel you carry makes you sink a little faster, so there is always a question: one more, or make for the haven while you still have height?',
  },
  {
    h: 'Dock or bypass',
    p: 'At each haven, steer left to dock, bank your postmarks and pick an upgrade. Steer right to fly past it and raise your delivery multiplier, up to 3×, for a bigger payout at the next one.',
  },
];

/* The upgrades, word for word as the game describes them (UPGRADES in
   SiroccoCourierRN/src/core/game.ts). Each stacks to rank 3. */
const UPGRADES = [
  ['↑', 'Broad sail', 'Thermals give 22% more lift per rank.'],
  ['◇', 'Light harness', 'Cargo causes 25% less sink per rank.'],
  ['↗', 'Bank rudder', 'Turns spend 25% less altitude per rank.'],
  ['⌁', 'Courier hooks', 'Reach parcels from 9 units farther away.'],
  ['◈', 'Storm lining', 'Longer protection after each impact.'],
  ['+', 'Sail repair', 'Restore one integrity segment now.'],
  ['▱', 'Fine satchel', 'Deliveries pay 15% more per rank.'],
  ['✦', 'Wind compass', 'Catch lift from a wider thermal ribbon.'],
  ['◎', 'Lift reserve', 'Gain 10 altitude immediately, +5 on launch.'],
];

const ROUTE = [
  {
    h: 'The wind gets harder',
    p: 'The desert runs through the salt sea, the ochre gardens and the violet reach, and around again. Every leg flies a little faster and sinks a little quicker, with more rock towers and, later, gusts in the way.',
  },
  {
    h: 'Nothing delivered is lost',
    p: 'Run out of altitude, or take three impacts, and the flight ends. The parcels you were carrying are lost with it; every postmark you already banked at a haven stays yours.',
  },
  {
    h: 'A second wind',
    p: 'Once per flight, when a flight ends, you can catch a second wind: the glider lifts back to safe height with its cargo still aboard. Retire safely at any haven and take everything you have banked home.',
  },
];

const INSIDE = [
  ['Three gliders', 'Start with the Tern. Spend postmarks on the Swift, which turns quicker but spends more height, or the Manta, which sinks gently but turns wide.'],
  ['Daily air route', 'One seeded wind a day, the same route and the same Tern for everyone, with your own best to beat.'],
  ['Gentle practice', 'Winds with no damage and no way to fall, for learning the thermals. Your saved flight is left where it was.'],
  ['Saves as you fly', 'Close the game mid-flight and it is waiting where you left it, with a short countdown before the wind picks up.'],
  ['Dusk Post Pack', 'An optional pack of three glider liveries, Moonstone, Desert rose and Marigold, for every glider you own.'],
  ['Phones and tablets', 'Portrait or landscape; a wide screen gets the whole chart with a flight log beside it.'],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Sirocco() {
  useMeta(meta['/sirocco']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Sirocco Courier
              <span className="sub">A little courage. A long way home.</span>
            </h1>
            <p className="lede">
              Steer a paper glider across an endless desert with one thumb. Ride the thermals for
              height, skim low to pick up the letters, and land them at the next haven &mdash; or
              fly straight past it and bet a bigger payout on the one after.
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it flies<Arrow /></a>
              <StoreButtons />
            </div>
            <p className="note">
              Launching on both stores. Free to play, with optional purchases.
            </p>
          </div>

          <div className="ghero-art">
            <SiroccoPoster size="clamp(300px, 38vw, 470px)" />
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
            <p className="eyebrow">How it flies</p>
            <h2>The thermals lift you. The mail weighs you down.</h2>
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
            <h2>A gift for the road at every haven</h2>
            <p>
              Each time you dock, choose one of three upgrades for the rest of the flight. Take the
              same one again and it grows, up to rank 3. Once everything is maxed out, you simply
              keep flying.
            </p>
          </Reveal>
          <Reveal className="kinds">
            {UPGRADES.map(([icon, b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq sc-sq" style={{ color: 'var(--accent)' }} aria-hidden="true">{icon}</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="route">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The long route</p>
            <h2>Every haven asks the same thing: one more leg?</h2>
          </Reveal>
          <div className="g3">
            {ROUTE.map((s, i) => (
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
            <h2>A small glider, a whole desert of post</h2>
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
              <h2>Your flight log stays on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your postmarks, your records, your
                gliders and the flight you are part way through are written to the device and never
                uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Sirocco Courier has its own privacy policy, separate from the other games, because
                what it does is its own: it shows ads between flights, offers a rewarded second
                wind, and sells two things &mdash; Remove Ads, which stops every ad and makes the
                second wind free, and a cosmetic pack.
              </p>
              <p>
                <Link to="/sirocco/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Sirocco Courier&rsquo;s privacy policy &rarr;
                </Link>
              </p>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>The short version</h3>
              <ul className="bullets">
                <li>Plays offline.</li>
                <li>No account, no email, no sign-in.</li>
                <li>No location, contacts, photos or microphone.</li>
                <li>No crash reporting and no analytics, at all.</li>
                <li>Your postmarks and records never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Carry the mail home.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
