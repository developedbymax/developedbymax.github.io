import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import HuecombComb from '../components/art/HuecombComb.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('huecomb');

const NAV = [
  ['How it plays', '#play'],
  ['What is in it', '#inside'],
  ['Themes', '#themes'],
  ['Privacy', '/huecomb/privacy'],
];

const STEPS = [
  {
    h: 'Place a stack',
    p: 'Three stacks wait below the board. Drag one onto any empty cell — or tap it, then tap the cell.',
  },
  {
    h: 'Colours find each other',
    p: 'Neighbours showing the same colour pour together, one tile at a time, into whichever stack holds the most of it.',
  },
  {
    h: 'Eight lifts off',
    p: 'Eight of a colour leaves the board and scores. What was underneath is now on top — and it may pour too. That chain is the game.',
  },
];

const INSIDE = [
  ['Endless', 'No levels, no timer, no lives. One board, for as long as you can keep space on it.'],
  ['Three daily challenges', 'Generated from the date, so everyone gets the same three.'],
  ['Stained glass', 'Every tile you lift sets a pane of a window. Finish one and it hangs in your gallery.'],
  ['Seven palettes', 'Cosmetic only — the same board, the same deals, the same scoring.'],
  ['Colour-blind symbols', 'A distinct shape on every tile, on a switch.'],
  ['Plays offline', 'No account, no server, nothing to sign up for.'],
];

/* The real palettes, from HuecombRN/src/core/meta.js — same names, same costs and
   the same seven colours in the same order. Opal is last because it is the one
   stars cannot buy. */
const THEMES = [
  ['Stained Glass', 'Included', ['#FF4D6D', '#3A86FF', '#FFD23F', '#2ED47A', '#A66CFF', '#FF8C42', '#FF6FD8']],
  ['Macaron', '★ 3', ['#FF8FA3', '#7FAEFF', '#FFE17A', '#8EE6A8', '#C4A2FF', '#FFB07A', '#6FDDD9']],
  ['Neon', '★ 6', ['#FF2E63', '#2EB6FF', '#F9F871', '#39FF88', '#B84DFF', '#FF9F1C', '#FF4FD8']],
  ['Ember', '★ 10', ['#E63946', '#4A86C5', '#F4D35E', '#7CB518', '#9D4EDD', '#F77F00', '#F4A7B9']],
  ['Lagoon', '★ 15', ['#FF6B6B', '#1E88E5', '#FFD166', '#06D6A0', '#7B61FF', '#F9A03F', '#4DD0E1']],
  ['Aurora', '★ 22', ['#FF5D8F', '#4D96FF', '#FFE66D', '#6BCB77', '#9B5DE5', '#FF924C', '#00E5C3']],
  ['Opal', '7-day streak', ['#FF6B8A', '#56A3F5', '#FFDD55', '#43D6A0', '#A981F7', '#FF9F5A', '#5DE0E6']],
];

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

export default function Huecomb() {
  useMeta(meta['/huecomb']);

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Huecomb
              <span className="sub">Hexa Stack Sort</span>
            </h1>
            <p className="lede">
              Drop a stack on the honeycomb. Matching colours pour together on their own
              &mdash; and when eight of one colour gather, they lift off and bare the colour
              underneath, which pours into its neighbour, which lifts too.
            </p>

            <div className="cta-row">
              <a className="btn btn-key" href="#play">See how it plays<Arrow /></a>
              <StoreButtons />
            </div>
            <p className="note">
              Launching on both stores. Free to play, with an optional one-off purchase to
              remove ads.
            </p>
          </div>

          <div className="ghero-art">
            <HuecombComb u="clamp(30px, 5.4vw, 50px)" />
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
            <h2>You place. The board does the rest.</h2>
            <p>
              You never move a tile yourself. You choose where a stack lands, and everything
              that happens after that follows from the rule.
            </p>
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

      <section className="pad-s" id="inside">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What is in it</p>
            <h2>One board, and a reason to come back to it</h2>
          </Reveal>
          <Reveal className="kinds">
            {INSIDE.map(([b, t]) => (
              <div className="kind" key={b} style={{ flexBasis: 300 }}>
                <span className="sq" style={{ background: 'var(--accent)' }} aria-hidden="true">✦</span>
                <span>
                  <b>{b}</b>
                  <span>{t}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pad" id="themes">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Themes</p>
            <h2>Seven palettes, and the best one is not for sale</h2>
            <p>
              Six are bought with stars earned from daily challenges. Opal is bought with
              days &mdash; a seven-day streak &mdash; and it is deliberately the
              widest-separated palette in the game, so the reward is also the board that
              reads best.
            </p>
          </Reveal>
          <div className="themes">
            {THEMES.map(([name, cost, cols], i) => (
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

      <section className="pad-s">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Your data</p>
              <h2>Your scores stay on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Scores, stars, finished windows,
                unlocked themes and settings are written to a small database on the device and
                are never uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                The game does show ads, and ad networks collect their own data to do that. What
                they take, and how to turn personalised ads off, is spelled out plainly rather
                than buried.
              </p>
              <p>
                <Link to="/huecomb/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
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

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Eight of a colour. Then the one underneath.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
