import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import LeadlightWindow from '../components/art/LeadlightWindow.jsx';
import { PANES, PALETTES, SPARK } from '../components/art/leadlightData.js';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('leadlight');

const NAV = [
  ['How it plays', '#play'],
  ['The glass', '#glass'],
  ['What is in it', '#inside'],
  ['Privacy', '/leadlight/privacy'],
];

const STEPS = [
  {
    h: 'Swipe at any angle',
    p: 'Swipe anywhere on the pane and a lead line grows from your finger toward both edges. Not only up and down, not only across: wherever your thumb points.',
  },
  {
    h: 'Land it before a spark does',
    p: 'The line is fragile until both arms reach an edge. A spark touching it while it grows cracks the pane, and three cracks end the run. Start against a wall and it lands almost at once.',
  },
  {
    h: 'Light the window',
    p: 'Every piece left with no spark inside it floods with colour. Colour three quarters of the pane and the window lights up; then the next pane arrives, with more sparks, moving faster.',
  },
];

/* The four kinds, as config.js defines them: size, speed, and the window each
   first turns up in. The colours are the game's (SPARK in palette.js). */
const KINDS = [
  ['ember', 'Ember', 'The first spark, from window one. Steady, and a straight line between bounces.'],
  ['flint', 'Flint', 'From window three. Smaller, and a third faster, so it closes on a line sooner than it looks.'],
  ['ingot', 'Ingot', 'From window five. Half as big again and slower, and hard to seal into a small piece.'],
  ['drifter', 'Drifter', 'From window seven. Its path curves, so it never quite goes where the last bounce said it would.'],
];

const UNLOCK = {
  cathedral: 'From the start',
  tiffany: '8 windows',
  deco: '25 windows',
  mondrian: '30 jewels',
  midnight: '60 windows',
};

const INSIDE = [
  ['cathedral', 'The gallery', 'Every window you finish is kept, the last thirty and your best, and any of them can be sent on as a picture.'],
  ['tiffany', 'Daily window', 'One pane a day with the same sparks for everyone, and still no two people hand in the same window.'],
  ['deco', 'Jewels', 'Seal a spark into a small enough piece and it is not trapped, it is set: a jewel in the glass, and a bonus.'],
  ['mondrian', 'The combo is a tune', 'Seals within a second and a half of each other climb to five times, each one a step higher.'],
  ['midnight', 'The candle', 'Every window has a forty-second candle. Let it gutter and that is a crack, so waiting is never the best play.'],
  ['cathedral', 'Saves as you go', 'Close the game mid-window and it is waiting where you left it, sparks and all.'],
];

const d = (pts) => {
  let s = `M${pts[0]} ${pts[1]}`;
  for (let i = 2; i < pts.length; i += 2) s += `L${pts[i]} ${pts[i + 1]}`;
  return `${s}Z`;
};

const StoreButtons = () => (
  <>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">App&nbsp;Store<i>Soon</i></a>
    <a className="btn btn-quiet btn-store" href="#" aria-disabled="true">Google&nbsp;Play<i>Soon</i></a>
  </>
);

function SparkDot({ kind, size = 26 }) {
  const s = SPARK[kind];
  return (
    <svg viewBox="-13 -13 26 26" width={size} height={size} aria-hidden="true">
      <circle r="12" fill={s.glow} opacity=".28" />
      <circle r="6.5" fill={s.glow} />
      <circle r="3.2" fill={s.core} />
    </svg>
  );
}

export default function Leadlight() {
  useMeta(meta['/leadlight']);
  const cathedral = PALETTES[0];

  return (
    <GameShell game={game} links={NAV}>
      <section className="ghero">
        <div className="wrap ghero-grid">
          <div>
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Leadlight
              <span className="sub">Cut the glass. Trap the sparks.</span>
            </h1>
            <p className="lede">
              Sparks bounce inside a pane of clear glass. Swipe to cut it at any angle: a lead
              line grows to both edges, and every piece left with no spark in it floods with
              colour. Colour three quarters and the window lights up &mdash; a stained-glass
              window nobody else has, because nobody else cut it where you did.
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
            <LeadlightWindow size="clamp(320px, 42vw, 500px)" />
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
            <h2>One swipe. The angle is the whole decision.</h2>
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

      <section className="pad-s" id="sparks">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Where to cut</p>
              <h2>Wedge a spark into a corner</h2>
              <p>
                A diagonal that traps a spark in a corner is worth more than a safe cut down the
                middle. The first window has one spark, and it is a lesson. After that every window
                brings more of them, up to nine, and each is a little faster than the last. Where
                you start a cut decides how long it is exposed: against a wall it lands almost
                at once; out in the open, with a spark already turning your way, you are
                gambling.
              </p>
              <p>
                There is no energy, no currency and nothing to wait for between runs. A run
                lasts as long as your nerve does.
              </p>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>Four kinds of spark</h3>
              <ul className="ll-kinds">
                {KINDS.map(([k, name, text]) => (
                  <li key={k}>
                    <SparkDot kind={k} />
                    <span><b>{name}</b>{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad" id="glass">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The glass</p>
            <h2>Six panes, five glasses</h2>
            <p>
              The first two windows are a plain tall light. After that the pane changes every
              window, and the shape changes how it cuts: a lancet narrows to a point, a rose
              window has no corners at all. The glasses are earned by playing, or all opened at
              once by the one purchase.
            </p>
          </Reveal>

          <Reveal className="ll-panes">
            {PANES.map((p) => (
              <figure key={p.id}>
                <svg viewBox="0 0 360 600" aria-hidden="true">
                  <path d={d(p.pts)} fill="none" stroke={cathedral.frame} strokeWidth="18" strokeLinejoin="round" />
                  <path d={d(p.pts)} fill="#0c0d12" />
                  <path d={d(p.pts)} fill={cathedral.clear} opacity=".16" />
                  <path d={d(p.pts)} fill="none" stroke={cathedral.leadHi} strokeWidth="3" strokeLinejoin="round" opacity=".7" />
                </svg>
                <figcaption>{p.name}</figcaption>
              </figure>
            ))}
          </Reveal>

          <div className="themes" style={{ marginTop: 'clamp(22px, 3vw, 34px)' }}>
            {PALETTES.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 60} className="thm">
                <div className="row">
                  <span className="nm">{p.name}</span>
                  <span className={`cost${p.need ? '' : ' free'}`}>{UNLOCK[p.id]}</span>
                </div>
                <div className="swatch">
                  {p.glass.map((c, j) => <i key={j} style={{ background: c }} />)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-s" id="inside">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What is in it</p>
            <h2>Windows you keep</h2>
          </Reveal>
          <Reveal className="kinds">
            {INSIDE.map(([palette, b, t]) => {
              const glass = PALETTES.find((p) => p.id === palette).glass;
              return (
                <div className="kind" key={b} style={{ flexBasis: 300 }}>
                  <span className="sq ll-sq" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="26" height="26">
                      <path d="M2 22V10C2 5.6 6.5 2 12 2s10 3.6 10 8v12Z" fill={glass[0]} />
                      <path d="M2 14L22 7V22H2Z" fill={glass[1]} />
                      <path d="M12 22L22 12V22Z" fill={glass[3]} />
                      <path d="M2 22V10C2 5.6 6.5 2 12 2s10 3.6 10 8v12ZM2 14L22 7M12 22L22 12" fill="none" stroke="#17120e" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <b>{b}</b>
                    <span>{t}</span>
                  </span>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Your data</p>
              <h2>Your windows stay on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your records, the gallery and
                the run you are part way through are written to the device and never uploaded
                anywhere. A window only leaves your phone when you share it yourself, as a
                picture, to wherever you choose.
              </p>
              <p>
                Leadlight has its own privacy policy, separate from the other games, because
                what it does is different: it sells one thing, it ships no crash reporting at
                all, and its purchase ends the ad between runs but keeps the optional mend you
                can choose to watch for.
              </p>
              <p>
                <Link to="/leadlight/privacy" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                  Read Leadlight&rsquo;s privacy policy &rarr;
                </Link>
              </p>
            </Reveal>

            <Reveal className="step" delay={90}>
              <h3>The short version</h3>
              <ul className="bullets">
                <li>Plays fully offline.</li>
                <li>No account, no email, no sign-in.</li>
                <li>No location, contacts or microphone, and nothing read from your photos.</li>
                <li>No crash reporting and no analytics, at all.</li>
                <li>Windows and scores never leave the device unless you share one.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <Reveal className="band">
            <p className="eyebrow" style={{ justifyContent: 'center' }}>{statusLabel[game.status]}</p>
            <h2>Cut the glass. Trap the sparks.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
