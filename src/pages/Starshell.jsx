import { Link } from 'react-router-dom';
import { bySlug, statusLabel } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import StarshellShell from '../components/art/StarshellShell.jsx';
import { StarMark, FAMILIES, colourOf } from '../components/art/StarMark.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('starshell');

const NAV = [
  ['How it plays', '#play'],
  ['The stars', '#stars'],
  ['Ways to play', '#modes'],
  ['Privacy', '/starshell/privacy'],
];

const STEPS = [
  {
    h: 'Pack the shell',
    p: 'Take stars from the bench and drag them into order. The shell fires from the bottom, so the bottom row lights first and everything above it burns in turn.',
  },
  {
    h: 'See what you are about to do',
    p: 'Every row shows what that star will actually score where it stands, not its printed brightness, and the wiring between stars is drawn down the side before you launch.',
  },
  {
    h: 'Launch, and get graded',
    p: 'The burst plays, the ledger accounts for every point, and the shell is graded against the best one the same bench could have built. Perfect, or what you left behind.',
  },
];

/* The result screen for the shell in the hero, copied from the store
   screenshot: firing order, the game's own notes, and what each star scored.
   Willow appears twice because Crossette fired it twice. */
const LEDGER = [
  ['bombette', 'Bombette', 38, null],
  ['pearl', 'Pearl', 24, null],
  ['crossette', 'Crossette', 8, 'the star above fires twice'],
  ['willow', 'Willow', 12, '×2 to the star above'],
  ['willow', 'Willow', 24, '×2 to the star above'],
  ['emberdrift', 'Emberdrift', 68, null],
];

const NAMES = {
  peony: 'Peony', pearl: 'Pearl', willow: 'Willow', lantern: 'Lantern', ringlet: 'Ringlet',
  palm: 'Palm', chrysanth: 'Chrysanth', crossette: 'Crossette', relay: 'Relay', wick: 'Wick',
  comet: 'Comet', horsetail: 'Horsetail', emberdrift: 'Emberdrift', mine: 'Mine', quill: 'Quill',
  nautilus: 'Nautilus', fountain: 'Fountain', brocade: 'Brocade', bombette: 'Bombette',
  ghost: 'Ghost', kamuro: 'Kamuro', salute: 'Salute',
};

const MODES = [
  {
    h: 'Festival',
    p: 'Fourteen nights, three shells a night, and a quota to clear each time. After every night you pick one of three rewards: a new star, a level on one you own, or a charm. Win, and you may keep going with the quota still climbing.',
  },
  {
    h: 'Endless',
    p: 'Its own curve, harder from the first night, with no finish line. Its record is kept apart from the festival’s, because they are different games and a shared best would compare the two.',
  },
  {
    h: 'Tonight’s festival',
    p: 'One bench, seeded from the date, once a day — the same for everyone who plays it. The optional purchase does not change it: the daily is five slots for everybody.',
  },
];

const INSIDE = [
  ['Flight school', 'Four short lessons that teach by contradiction: the same two stars, both ways round, and the second order scores less.'],
  ['Weather', 'From the third night, fog or a gale can change what a shell is worth. The quota allows for it, so weather changes how a night is played and never whether it can be.'],
  ['Charms', 'At most two a festival, and each one bends a rule for the whole run — the bottom star always fires twice, or every shell gains a slot.'],
  ['The sky book', 'Every star you have lit, and the brightest it has ever burned for you.'],
  ['Runs save and resume', 'Close the game mid-festival and it is waiting where you left it.'],
  ['Original sound', 'Twenty-one effects, all made for this game, with haptics to match.'],
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
            <p className="eyebrow">Free &middot; iPhone &amp; Android</p>
            <h1 className="title">
              Starshell
              <span className="sub">Pack a firework shell. The order is the whole game.</span>
            </h1>
            <p className="lede">
              A shell fires bottom to top, and every star changes what happens above it. Five
              stars is a hundred and twenty orderings, and exactly one of them is best &mdash; a
              small, complete puzzle handed to you fresh every turn, with a firework as the
              answer.
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
            <StarshellShell size="clamp(250px, 29vw, 350px)" />
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
            <h2>Choose the order. Watch what it was worth.</h2>
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

      <section className="pad-s" id="order">
        <div className="wrap">
          <div className="g2">
            <Reveal>
              <p className="eyebrow">Why the order matters</p>
              <h2>A star&rsquo;s printed number is the one it is almost never worth</h2>
              <p>
                Willow multiplies whatever sits directly above it. Crossette makes the star
                above it fire twice. Emberdrift is barely anything on its own and grows with
                every star that fired before it. Salute burns brighter than most of the bench
                &mdash; and it ends the burst, so everything stacked above it stays dark.
              </p>
              <p>
                Put those in the right order and they multiply each other. Put them in the wrong
                one and they waste each other. The game shows you both before you commit: every row
                is live, so you can try an order, read what it does, and change your mind.
              </p>
              <p>
                There are no timers, no energy and no currency. A shell takes as long as you
                want it to.
              </p>
            </Reveal>

            <Reveal className="ledger" delay={90}>
              <div className="ledger-grade">
                <b>Perfect shell</b>
                <span>nothing on this bench could have burned brighter</span>
              </div>
              <ol>
                {LEDGER.map(([star, name, v, why], i) => (
                  <li key={i} style={{ '--c': colourOf(star) }}>
                    <span className="nm">{name}</span>
                    <span className="pts">+{v}</span>
                    {why && <span className="why">{why}</span>}
                  </li>
                ))}
              </ol>
              <div className="ledger-total"><span>Brightness</span><b>174</b></div>
              <p className="ledger-note">
                The same five stars as the shell at the top of the page, listed in the order they
                fired. Willow is there twice because Crossette fired it twice.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pad" id="stars">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The stars</p>
            <h2>Twenty-two stars, eight kinds of trouble</h2>
            <p>
              Colour tells you what a star does before you read a word. The mark tells you which
              one it is &mdash; so a bench reads as shapes first, and a star you have never met
              still tells you roughly what it wants.
            </p>
          </Reveal>
          <div className="families">
            {FAMILIES.map((f, i) => (
              <Reveal key={f.key} delay={(i % 4) * 60} className="fam">
                <div className="fam-head" style={{ '--c': f.colour }}>
                  <i aria-hidden="true" />
                  <b>{f.name}</b>
                </div>
                <ul>
                  {f.stars.map((s) => (
                    <li key={s}>
                      <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
                        <StarMark star={s} />
                      </svg>
                      {NAMES[s]}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="fam-foot">
            One rule holds all of them together: <b>a star never fires more than twice</b>. Stars
            that repeat each other can chain, and without that rule the chain would never stop.
          </p>
        </div>
      </section>

      <section className="pad-s" id="modes">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Ways to play</p>
            <h2>Three ways to light the sky</h2>
          </Reveal>
          <div className="g3">
            {MODES.map((m, i) => (
              <Reveal key={m.h} delay={i * 80} className="step">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.h}</h3>
                <p>{m.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pad" id="inside">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What is in it</p>
            <h2>A quiet game about ordering things well</h2>
          </Reveal>
          <Reveal className="kinds">
            {INSIDE.map(([b, t], i) => {
              const star = ['peony', 'fountain', 'chrysanth', 'brocade', 'relay', 'crossette'][i];
              return (
                <div className="kind" key={b} style={{ flexBasis: 300 }}>
                  <span className="sq ss-sq" aria-hidden="true">
                    <svg viewBox="0 0 22 22" width="26" height="26"><StarMark star={star} /></svg>
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
              <h2>Your records stay on your phone</h2>
              <p>
                There is no account, no sign-in and no server. Your records, the sky book, your
                daily results and the festival you are part way through are written to the
                device and never uploaded anywhere. Uninstall the game and they are gone with it.
              </p>
              <p>
                Starshell has its own privacy policy, separate from the other games, because what
                it does is different: it sells one thing, it ships no crash reporting at all, and
                its purchase ends the ad at the end of a run but keeps the two optional ads you
                can choose to watch, for a relight or a reroll.
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
            <h2>Five stars. One best order.</h2>
            <p>Free on iPhone and Android.</p>
            <div className="cta-row"><StoreButtons /></div>
          </Reveal>
        </div>
      </section>
    </GameShell>
  );
}
