import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import StarshellOrbit from '../components/art/StarshellOrbit.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('starshell');

const NAV = [
  ['How it plays', '#play'],
  ['Upgrades', '#upgrades'],
  ['What is in it', '#inside'],
  ['Privacy', '/starshell/privacy'],
];

const STEPS = [
  {
    h: 'One tap turns you around',
    p: 'Your ship circles the world on its own. Touch anywhere in the sky and it reverses at once — on the touch, not the release, because a dodge is a matter of moments.',
  },
  {
    h: 'Read the orange',
    p: 'A marker on the outer ring shows where a meteor is about to fall, and meteors fall where you are heading. Keep going, or turn: that is the whole question, asked again and again.',
  },
  {
    h: 'Chase the starlight',
    p: 'Golden diamonds build a streak, and the streak builds your multiplier. Starlight fades if you leave it behind, so a long streak means turning back for it — between the meteors.',
  },
];

const UPGRADES = [
  ['+', 'Patch the shell', 'Restore a hull point. At full hull, gain a reserve shield for the next hit.'],
  ['◎', 'Starlight magnet', 'Collect starlight from farther away.'],
  ['ϟ', 'Quiet reactor', 'Recharge your clearing pulse faster.'],
  ['✦', 'Prism lens', 'Every star you catch is worth more.'],
];

const SKIES = [
  ['Blue hour', '#8DE8D5'],
  ['Violet sea', '#C5B2FF'],
  ['Amber dusk', '#FFD28B'],
  ['Rose nebula', '#F3AFCD'],
];

const INSIDE = [
  ['The pulse', 'Fly and catch stars to charge it, then clear every meteor in the sky at once. When to spend it is yours to decide.'],
  ['Second wind', 'When a flight ends you may choose to watch an ad and carry on with one hull point. Only if you want to; it is never shown otherwise.'],
  ['No finish line', 'Sectors never run out. The sky grows busier and faster up to a ceiling, and the four skies cycle for ever.'],
  ['Pause, save, come back', 'Pause at any moment. Save and leave keeps the flight, and leaving the app pauses it for you.'],
  ['Your records', 'Personal best, farthest sector, longest streak and every flight flown, kept on the device.'],
  ['Gentle on request', 'Sound, haptics and a gentle-effects setting, and the system’s reduce-motion choice is respected.'],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Starshell() {
  useMeta(meta['/starshell']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone, iPad &amp; Android</p>
            <h1 className="title">
              Starshell
              <span className="sub">One ship. An endless sky.</span>
            </h1>
            <p className="lede">
              A small white ship circles a distant world on its own. One tap reverses it. Meteors
              fall where you are heading, starlight fades if you leave it behind, and the sky never
              runs out &mdash; so every second asks the same question: keep going, or turn?
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
            <StarshellOrbit size="clamp(260px, 31vw, 390px)" />
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
            <h2>The decision and the action are the same tap</h2>
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
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Between sectors</p>
              <h2>Survive a sector, choose what your ship becomes</h2>
              <p>
                Each sector ends in a pause and a choice. Repairs are always on offer; the other
                three upgrades climb a level at a time, and you will not see every one each time, so
                no two flights grow the same ship.
              </p>
              <p>
                Then the sky changes colour and the pace picks up. Three hull points, a moment of
                protection after every hit and a pulse you charge yourself give room to recover
                &mdash; and nothing else does.
              </p>
              <div className="ss-skies" aria-label="The four skies">
                {SKIES.map(([name, c]) => (
                  <span key={name}><i style={{ background: c }} aria-hidden="true" />{name}</span>
                ))}
              </div>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>The upgrades</h3>
              <ul className="ss-upgrades">
                {UPGRADES.map(([mark, name, what]) => (
                  <li key={name}>
                    <span className="ss-mk" aria-hidden="true">{mark}</span>
                    <span><b>{name}</b><span>{what}</span></span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad" id="inside">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What is in it</p>
            <h2>A small ship, and everything it needs</h2>
          </Reveal>
          <Reveal className="kinds">
            {INSIDE.map(([b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq ss-sq" aria-hidden="true">
                  <svg viewBox="0 0 22 22" width="24" height="24">
                    <circle cx="11" cy="11" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".6" />
                    <circle cx="11" cy="11" r="3.2" fill="currentColor" opacity=".55" />
                    <path d="M16.6 5.6l2.3 3.9-2.4-0.9-1.6 1.9z" fill="currentColor" />
                  </svg>
                </span>
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
              <h2>Your records stay on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your records, your settings and the
                flight you are part way through are written to the device and never uploaded
                anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Starshell has its own privacy policy, separate from the other games, because what
                it does is different: it sells one thing, it ships no crash reporting at all, and
                its purchase ends the ads between flights but keeps Second wind, the one ad you can
                choose to watch.
              </p>
              <p>
                <Link to="/starshell/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Starshell&rsquo;s privacy policy &rarr;
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
                <li>Records never leave the device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Find your orbit. Keep your light.</h2>
            <p>Free on iPhone, iPad and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
