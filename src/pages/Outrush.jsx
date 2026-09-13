import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import OutrushBoard from '../components/art/OutrushBoard.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('outrush');

const NAV = [
  ['How it plays', '#play'],
  ['Modes', '#modes'],
  ['Themes', '#themes'],
  ['Privacy', '/outrush/privacy'],
];

const STEPS = [
  {
    h: 'One block, one direction',
    p: 'Tap the block. It slides the way its arrow points and leaves through the green gap in the wall.',
  },
  {
    h: 'What is behind it follows',
    p: 'Two now, nose to tail. Clear the front one and the one behind it follows on its own.',
  },
  {
    h: 'That is where the points are',
    p: 'Same idea, four deep, and one is gold. One tap, one long chain. Chains score on the square, so a four is worth far more than four ones.',
  },
];

const KINDS = [
  ['#4CC9F0', '▶', 'Ordinary', 'Slides where it points, if the way is clear.'],
  ['#FFD34D', '✦', 'Gold', 'Pays a bonus on top of whatever chain it is part of.'],
  ['#FF6B5B', '◉', 'Bomb', 'Takes every neighbour with it when it goes.'],
  ['#8C85BE', '🔒', 'Locked', 'Will not budge until something beside it clears.'],
];

const MODES = [
  {
    h: 'Endless',
    p: 'The board refills as fast as you clear it. Keep clearing without pause and a streak multiplier builds; the run ends the moment nothing on the board can move.',
  },
  {
    h: 'Levels',
    p: 'Hand-shaped boards with a fixed answer. Every one is solvable — the ladder is there for when you want a puzzle rather than a scramble.',
  },
  {
    h: 'Daily challenges',
    p: 'Three goals every day, drawn from the date, so everyone gets the same three. Finish them for stars, and spend the stars on palettes.',
  },
];

const PALETTES = [
  ['Classic', 'Included', ['#FF6B5B', '#FFC44D', '#4ADE9B', '#4CC9F0', '#B57BFF']],
  ['Candy', '★ 3', ['#FF8FB1', '#FFC98A', '#8FE8C6', '#9DBEFF', '#D9A6FF']],
  ['Neon', '★ 6', ['#FF2E88', '#EFFF3C', '#2BFFA8', '#22DDFF', '#A94AFF']],
  ['Sunset', '★ 10', ['#E8433F', '#FF8A3D', '#FFC93C', '#FF5E9C', '#7B4DFF']],
  ['Lagoon', '★ 15', ['#12B5A5', '#37D6E8', '#7CE8B4', '#3D8FD6', '#FF7A6B']],
  ['Dusk', '★ 22', ['#6C7BFF', '#A56BFF', '#FF6BC4', '#FFA05C', '#4ED6C4']],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">
      App&nbsp;Store<i>Soon</i>
    </a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">
      Google&nbsp;Play<i>Soon</i>
    </a>
  </>
);

export default function Outrush() {
  useMeta(meta['/outrush']);

  return (
    <GameShell game={game} links={NAV}>
      {/* ============================ hero ============================ */}
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Outrush
              <span className="sub">Block Escape</span>
            </h1>
            <p className="lede">
              Tap a block, it slides where its arrow points and leaves through a gate in
              the wall. Clearing one sets off everything waiting behind it&nbsp;&mdash;
              that cascade is the game.
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it plays<Arrow /></a>
              <StoreButtons />
            </div>
            <p className="note">
              Launching on both stores. Free to play, with an optional one-off purchase
              to remove ads.
            </p>
          </div>

          <div className="ghero-art">
            <OutrushBoard cell="clamp(34px, 6.2vw, 56px)" />
          </div>
        </div>
      </section>

      {/* ============================ stats ============================ */}
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

      {/* ========================= how it plays ========================= */}
      <section className="pad" id="play">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">How it plays</p>
            <h2>Three taps and you know the game</h2>
            <p>There is one rule, and everything else is a consequence of it.</p>
          </Reveal>
          <div className="g3">
            {STEPS.map((s, i) => (
              <Reveal key={s.h} delay={i * 80} className="step">
                <span className="n">{i + 1}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== kinds of block ======================== */}
      <section className="pad-s">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">On the board</p>
            <h2>Four kinds of block</h2>
          </Reveal>
          <Reveal className="kinds">
            {KINDS.map(([bg, glyph, name, desc]) => (
              <div className="kind" key={name}>
                <span
                  className="sq"
                  style={{ background: bg, color: name === 'Locked' ? 'rgba(255,255,255,.94)' : undefined }}
                  aria-hidden="true"
                >
                  {glyph}
                </span>
                <span>
                  <b>{name}</b>
                  <span>{desc}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================ modes ============================ */}
      <section className="pad" id="modes">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Modes</p>
            <h2>Two ways to play, and a reason to come back</h2>
          </Reveal>
          <div className="g3">
            {MODES.map((m, i) => (
              <Reveal key={m.h} delay={i * 80} className="step">
                <h3>{m.h}</h3>
                <p>{m.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== themes =========================== */}
      <section className="pad-s" id="themes">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Themes</p>
            <h2>Six palettes, earned by playing</h2>
            <p>
              Stars come from daily challenges, not from your wallet. Every palette is
              checked for contrast, so the board stays readable whichever you pick.
            </p>
          </Reveal>
          <div className="themes">
            {PALETTES.map(([name, cost, cols], i) => (
              <Reveal key={name} delay={i * 50} className="thm">
                <div className="row">
                  <span className="nm">{name}</span>
                  <span className={`cost${cost === 'Included' ? ' free' : ''}`}>{cost}</span>
                </div>
                <div className="swatch" aria-hidden="true">
                  {cols.map((c) => <i key={c} style={{ background: c }} />)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== privacy =========================== */}
      <section className="pad">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Your data</p>
              <h2>Your scores stay on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Scores, stars, unlocked
                palettes and settings are written to a small database on the device and
                are never uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                The game does show ads, and ad networks collect their own data to do that.
                What they take, and how to turn personalised ads off, is spelled out
                plainly rather than buried.
              </p>
              <p>
                <Link to="/outrush/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read the privacy policy &rarr;
                </Link>
              </p>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>The short version</h3>
              <ul className="bullets">
                <li>Plays fully offline.</li>
                <li>No account, no email, no sign-in.</li>
                <li>No location, contacts, photos or microphone.</li>
                <li>Scores never leave the device.</li>
                <li>Buy <b>Remove Ads</b> and the ad SDK is never started at all.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================== closing =========================== */}
      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              {statusLabel[game.status]}
            </p>
            <h2>One tap. Then everything moves at once.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
