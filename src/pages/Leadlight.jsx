import { Link } from 'react-router-dom';
import { bySlug } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import LeadlightWindow from '../components/art/LeadlightWindow.jsx';
import { Arrow } from '../components/Icons.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';
import '../styles/leadlight.css';
const game = bySlug('leadlight');
const NAV = [['How to cut','#play'],['The collection','#collection'],['Watch','#film'],['Privacy','/leadlight/privacy']];
const palettes = [
 ['Cathedral','From the start',['#3D8D82','#91BEB0','#E8B96F','#CE765C','#698E9D']],
 ['Tiffany','8 windows',['#67B9A1','#A6D0BA','#F1C475','#DE95A3','#7CB7C9']],
 ['Art Deco','25 windows',['#326D75','#D6AD5D','#AEB9A2','#D58368','#55766A']],
 ['De Stijl','30 perfect cuts',['#BC5145','#3B698B','#E6BE53','#EDE6D5','#BC5145']],
 ['Midnight','60 windows',['#515C99','#8D7BA6','#66AFB6','#BF81A3','#3B7596']],
];
export default function Leadlight() {
 useMeta(meta['/leadlight']);
 return <div className="atelier-site"><GameShell game={game} links={NAV}>
  <section className="atelier-hero wrap">
   <div><p className="eyebrow">THE GLASS ATELIER · IPHONE, IPAD & ANDROID</p>
    <h1>Leadlight<span>G L A S S &nbsp; C U T T E R</span></h1>
    <h2>A little precision.<br/>An endless play of light.</h2>
    <p className="lede">Cut by eye. Find your rhythm. Turn six good cuts into a window worth keeping.</p>
    <div className="cta-row"><a className="btn btn-key" href="#play">Learn the art of a cut<Arrow/></a><a className="atelier-text-link" href="#film">Watch the film ↗</a></div>
    <div className="atelier-store-buttons" role="group" aria-label="Store availability">
      <button className="atelier-store-button" type="button" disabled><span>Coming soon on the</span><strong>App Store</strong></button>
      <button className="atelier-store-button" type="button" disabled><span>Coming soon on</span><strong>Google Play</strong></button>
    </div>
    <p className="atelier-availability">Free to play. One optional purchase.</p>
   </div>
   <figure className="atelier-hero-art"><LeadlightWindow size="clamp(270px, 36vw, 460px)"/><figcaption>Nº 001 / FIRST LIGHT</figcaption></figure>
  </section>
  <section className="wrap atelier-facts" aria-label="Game features">{[['∞','ENDLESS GLASS'],['6','CUTS MAKE A WINDOW'],['5','GLASS PALETTES'],['0','TIMERS']].map(([v,k])=><div key={k}><strong>{v}</strong><span>{k}</span></div>)}</section>
  <section className="wrap atelier-section" id="play"><p className="eyebrow">THE ART OF A CUT</p><h2>A good eye is everything.</h2><div className="atelier-steps">
   {[['01','Read the commission','Each pane asks for 20–50% of its area. Take a moment. Imagine the piece you want to cut away.'],['02','Draw one straight line','Touch, drag to aim, then release. The line extends to the glass edges. The smaller piece is the one we measure. Button controls offer another way to aim.'],['03','Let the light in','Stay within the shown tolerance to keep your glass. Within two percentage points is perfect. Six successful cuts colour a new window.']].map(([n,h,p])=><article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}
  </div></section>
  <section className="atelier-band" id="collection"><div className="wrap atelier-section"><div className="atelier-section-head"><div><p className="eyebrow">LIGHT, COLLECTED</p><h2>Your craft. Your collection.</h2></div><p>Different shapes. Tighter tolerances. A multiplier that grows with your streak, up to ×5. There is always another pane waiting.</p></div>
   <div className="atelier-shots">{[['01-perfect-cut','Cut by eye','A perfect 30% cut on the glass cutting mat.'],['02-completed-window','Six cuts. A new window.','A completed window added to the collection.'],['03-collection','Keep a little light','The collection of six completed stained-glass windows.']].map(([file,title,alt])=><figure key={file}><img src={`/leadlight/screenshots/${file}.webp`} width="642" height="1389" alt={alt} loading="lazy"/><figcaption>{title}</figcaption></figure>)}</div>
  </div></section>
  <section className="wrap atelier-section"><div className="atelier-section-head"><div><p className="eyebrow">NO CLOCK, JUST CRAFT</p><h2>The glass can wait.</h2></div><div><p>Three missed cuts end a run. Three perfect cuts in a row repair one crack. There’s no countdown and no final level.</p><p>Leave whenever you like. Your unfinished run saves on your device. Play offline, without an account, energy meter or in-game currency.</p></div></div></section>
  <section className="wrap atelier-section" id="glass"><p className="eyebrow">THE GLASS CABINET</p><h2>Five ways to catch the light.</h2><p>Earn every palette through play, or open the whole cabinet with Master Glazier.</p><div className="atelier-palettes">{palettes.map(([name,unlock,colors])=><article key={name}><div aria-hidden="true">{colors.map((c,i)=><i key={i} style={{background:c}}/>)}</div><h3>{name}</h3><p>{unlock}</p></article>)}</div></section>
  <section className="wrap atelier-section" id="film"><p className="eyebrow">A MOMENT IN THE ATELIER</p><h2>See the light take shape.</h2><video className="atelier-film" controls playsInline preload="none" poster="/leadlight/feature-graphic.png" aria-label="Leadlight Atelier promotional film"><source src="/leadlight/promo-landscape.mp4" type="video/mp4"/><track kind="captions" src="/leadlight/promo.vtt" srcLang="en" label="English" default/>Your browser does not support video. <a href="/leadlight/promo-landscape.mp4">Download the film</a>.</video><p className="atelier-caption">A 24-second animated look at precision cutting and collecting windows. Music and glass sounds; no spoken dialogue.</p></section>
  <section className="wrap atelier-section atelier-purchase"><div><p className="eyebrow">MASTER GLAZIER</p><h2>A little more room to create.</h2></div><div><p>One optional, one-time purchase unlocks all five palettes and removes break ads between runs. Optional mend videos remain available.</p><p>When offered, a rewarded video can mend one crack once per run. Purchases and ads need an internet connection; the game itself does not.</p><p><Link to="/leadlight/privacy">Privacy policy</Link> · <Link to="/leadlight/terms">Terms of use</Link> · <a href="mailto:developedbymax@gmail.com">Contact & support</a></p></div></section>
 </GameShell></div>;
}
