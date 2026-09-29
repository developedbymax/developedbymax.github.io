import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import RiftHaulerIsland from '../components/art/RiftHaulerIsland.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('rifthauler');

const NAV = [
  ['How it plays', '#play'],
  ['Modules', '#modules'],
  ['The islands', '#islands'],
  ['Privacy', '/rifthauler/privacy'],
];

const STEPS = [
  {
    h: 'Cut your own shortcut',
    p: 'Drag anywhere on the island to steer. Push into rock and the rover drills straight through it; crystal seams break open and the crystals spill out for the taking.',
  },
  {
    h: 'Bank it at the gold pad',
    p: 'What you carry is at risk until you drive it home. Stay on the pad a moment and it is banked for good, and a full load pays 20% more.',
  },
  {
    h: 'Get out in time',
    p: 'Each island gives you 1:50 and a quota: 12 crystals, then 24, then 36. Meet it, return to the pad and leave. Every crystal past the quota is score, if you can bring it back.',
  },
];

/* The six modules, word for word as the game describes them (MODULES in
   RiftHaulerApp/src/core/game.ts). */
const MODULES = [
  ['⋈', 'Wide bit', 'Clear adjacent soft rocks with each break.'],
  ['ϟ', 'Resonance', 'Crystal seams fracture their neighbors.'],
  ['◎', 'Tractor field', 'Pull in crystals from twice as far.'],
  ['▥', 'Compressor', 'Carry six more crystals per trip.'],
  ['⌖', 'Survey beacon', 'Earlier fault and vent warnings. More time to dodge debris.'],
  ['»', 'Return boost', 'Move faster for eight seconds after banking.'],
];

const ISLANDS = [
  {
    h: 'The Shatterfields, Ember Reach, The Last Shelf',
    p: 'Three islands, each with a heavier quota than the last, harder rock and debris that comes sooner and more often. Secure all three and the expedition is yours.',
  },
  {
    h: 'The ground gives way',
    p: 'Every island breaks up from the edges in. Coral tiles are about to fall; steam vents charge up and burst; debris lands inside the rings it casts first. Leave it too late and the island closes with you on it.',
  },
  {
    h: 'Three hits, and it is over',
    p: 'A hit costs half the cargo you are carrying, and the rover has three to give. Everything you have already banked stays banked, whatever happens next.',
  },
];

const INSIDE = [
  ['A daily expedition', 'The same three islands for everyone playing on the same day.'],
  ['One rescue an expedition', 'When the rover goes down with time left on the clock, you may choose to watch an ad to go on from the pad with one hull.'],
  ['Pause and come back', 'Save an expedition from the pause menu and continue it later, down to the island as it stood.'],
  ['Rover colours', 'Seafoam, earned by banking 150 crystals, and Amethyst in an optional cosmetic pack.'],
  ['Your settings', 'Sound effects, ambient music and haptics on their own switches, and a reduced-effects mode.'],
  ['Phones and tablets', 'Portrait on phones; on a tablet the island card, hull and modules sit beside the island.'],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function RiftHauler() {
  useMeta(meta['/rifthauler']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Rift Hauler
              <span className="sub">Cut your own shortcut. Bring the haul home.</span>
            </h1>
            <p className="lede">
              Drill a path through a crumbling island, fill a small rover with crystals, and bring
              them home to the gold pad before the ground gives way. Three islands, a clock on
              each, and the same question on every trip: one more crystal?
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it plays<Arrow /></a>
              <StoreButtons />
            </div>
            <p className="note">
              Launching on both stores. Free to play, with two optional purchases.
            </p>
          </div>

          <div className="ghero-art">
            <RiftHaulerIsland size="clamp(260px, 31vw, 390px)" />
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
            <h2>Dig in, load up, get home.</h2>
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

      <section className="pad-s" id="modules">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Modules</p>
            <h2>Six modules, one for each island</h2>
            <p>
              After your first deposit on each island, choose one of three modules for the rest of
              the expedition. Three islands, three picks, a different rover every run.
            </p>
          </Reveal>
          <Reveal className="kinds">
            {MODULES.map(([icon, b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq rh-sq" style={{ color: 'var(--accent)' }} aria-hidden="true">{icon}</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="islands">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The islands</p>
            <h2>Every trip is a question: one more crystal?</h2>
          </Reveal>
          <div className="g3">
            {ISLANDS.map((s, i) => (
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
            <h2>A small rover, made to go back out</h2>
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
              <h2>Your haul stays on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your records, your crystals and the
                expedition you are part way through are written to the device and never uploaded
                anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Rift Hauler has its own privacy policy, separate from the other games, because what
                it does is its own: it sells two things, one of them purely cosmetic, it ships no
                crash reporting at all, and its Remove break ads purchase ends the ads between
                expeditions but keeps the optional rescue ad you can choose to watch.
              </p>
              <p>
                <Link to="/rifthauler/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Rift Hauler&rsquo;s privacy policy &rarr;
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
                <li>Your records and crystals never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>One more crystal. Then get back.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
