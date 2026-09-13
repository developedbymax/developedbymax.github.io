import { Link } from 'react-router-dom';
import { bySlug } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('huecomb');

const NAV = [
  ['Game', '/huecomb'],
  ['Privacy', '#privacy'],
  ['Terms', '#terms'],
];

export default function HuecombLegal() {
  useMeta(meta['/huecomb/privacy']);

  return (
    <GameShell game={game} links={NAV} legal>
      <div className="wrap prose">
        <p className="updated">Last updated &middot; 12 September 2026</p>
        <h1>Privacy Policy &amp; Terms of Use</h1>
        <p>
          Two documents, kept on one page so there is only one link to follow. The privacy
          policy describes what the game does with information; the terms describe the
          agreement between you and us when you play.
        </p>

        <nav className="doc-nav" aria-label="Documents on this page">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* ================================================================ */}
        <section className="doc" id="privacy" aria-labelledby="privacy-h">
          <h2 id="privacy-h">Privacy Policy</h2>

          <div className="callout">
            <p>
              <strong>The short version.</strong> Huecomb has no account and no server of its
              own. Your scores, stars, windows, themes and settings live in a small database on
              your phone and are never uploaded. The one thing that does leave your device is
              advertising data, collected by our ad partner so it can serve ads &mdash; and if
              you buy <strong>Remove Ads</strong>, that code never even starts.
            </p>
          </div>

          <p>
            This policy explains how the mobile game <strong>Huecomb: Hexa Stack Sort</strong>{' '}
            (&ldquo;the game&rdquo;, &ldquo;we&rdquo;) handles information. It covers the iOS and
            Android versions of the game and this website.
          </p>

          <h3>1. What the game stores on your device</h3>
          <p>
            The game keeps a small database on your phone. Nothing in it is transmitted to us,
            because there is nowhere for it to be transmitted to &mdash; the game has no backend
            server and makes no network requests of its own.
          </p>
          <ul>
            <li>Your best score and your last few runs</li>
            <li>Stars earned, themes unlocked and the theme currently equipped</li>
            <li>
              Daily challenge progress, your day streak, and the stained-glass windows you have
              finished
            </li>
            <li>The run in progress, so closing the game does not lose it</li>
            <li>A display name, only if you choose to type one for a shared score card</li>
            <li>Settings &mdash; whether sound is muted, whether colour-blind symbols are shown</li>
            <li>A record of purchases you have made, so a purchase is never credited twice</li>
          </ul>
          <p>
            This data stays on the device. It is not backed up to us, it is not readable by us,
            and <strong>deleting the game deletes all of it</strong>. If your device or app store
            is configured to back up app data, that backup is governed by Apple&rsquo;s or
            Google&rsquo;s own policies, not by this one.
          </p>

          <h3>2. What our advertising partner collects</h3>
          <p>
            The game is free and is funded by advertising. Ads are served through{' '}
            <strong>AppLovin MAX</strong>, which may also route ad requests to other advertising
            networks it mediates on our behalf.
          </p>
          <p>
            To serve and measure ads, these partners may collect your device&rsquo;s advertising
            identifier (IDFA on iOS, Advertising ID on Android); device and software details such
            as model, operating system version, language, screen size and network type; your IP
            address and the approximate region derived from it; and ad interaction events &mdash;
            that an ad was requested, shown, watched to the end, or tapped.
          </p>
          <p>
            We do not receive this data ourselves in a form that identifies you; we see only
            aggregate revenue reporting. AppLovin&rsquo;s own privacy policy governs what they do
            with it:{' '}
            <a href="https://www.applovin.com/privacy/" rel="noopener" target="_blank">
              applovin.com/privacy
            </a>.
          </p>
          <p>
            <strong>If you purchase Remove Ads, the advertising SDK is never initialised.</strong>{' '}
            No ad requests are made and no advertising identifier is read. This is not a setting
            that hides ads after the fact &mdash; the code simply does not run.
          </p>

          <h4>Your choices about advertising</h4>
          <ul>
            <li>
              <strong>On iOS</strong>, the game asks for permission to track before any advertising
              code starts. If you decline, ads still appear but are not personalised. You can change
              this later in <em>Settings &rarr; Privacy &amp; Security &rarr; Tracking</em>.
            </li>
            <li>
              <strong>In the EEA and the UK</strong>, a consent dialog appears before any advertising
              code starts, and your answer is recorded. You can reopen it at any time from{' '}
              <em>★ Today &rarr; Shop &rarr; Privacy choices</em> inside the game.
            </li>
            <li>
              <strong>On Android</strong>, you can reset or delete your Advertising ID in{' '}
              <em>Settings &rarr; Google &rarr; Ads</em>.
            </li>
          </ul>

          <h3>3. Purchases</h3>
          <p>
            The game offers three optional purchases: Remove Ads, and two packs of stars. All of
            them are processed entirely by <strong>Apple&rsquo;s App Store</strong> or{' '}
            <strong>Google Play</strong>.
          </p>
          <p>
            We never see, receive or store your payment card, billing address or store account.
            What the game receives back from the store is a transaction identifier, which it writes
            to the device&rsquo;s local database for one reason: so that the same purchase can
            never be credited to you twice, and so an interrupted purchase can still be delivered
            when you next open the game.
          </p>
          <p>Refunds are handled by the store you bought from, under their policies, not by us.</p>

          <h3>4. Crash and error reporting</h3>
          <p>
            If crash reporting is enabled in the build you are running, a crash sends a technical
            report &mdash; the error, the code path that produced it, the device model and the
            operating system version &mdash; to <strong>Sentry</strong>, which we use solely to
            find and fix faults. It is configured not to attach personal information, and it never
            includes your scores, your name or your purchases.
          </p>

          <h3>5. What the game does not do</h3>
          <ul>
            <li>No account, sign-in, email address or password.</li>
            <li>No access to location, contacts, photos, camera or microphone.</li>
            <li>No gameplay analytics sent anywhere.</li>
            <li>No selling of personal information by us to anyone.</li>
          </ul>

          <h3>6. Children</h3>
          <p>
            Huecomb is not directed at children under 13 (or the equivalent minimum age where you
            live), and we do not knowingly collect personal information from them. If you believe a
            child has provided information through the game, contact us and we will delete what we
            can reach.
          </p>

          <h3>7. Your rights</h3>
          <p>
            If you are in the UK, the EEA, or a jurisdiction with comparable law, you have rights to
            access, correct, delete and port your personal data, and to object to how it is
            processed. These are unusually simple to exercise here, because we hold no personal data
            about you on any server:
          </p>
          <ul>
            <li>
              <strong>To see everything the game holds about you</strong>, open the game &mdash; it
              is all shown there.
            </li>
            <li><strong>To delete everything</strong>, uninstall the game.</li>
            <li>
              <strong>For advertising data</strong>, use the choices in section 2, or contact
              AppLovin directly using their privacy policy.
            </li>
          </ul>
          <p>
            If you are a California resident: we do not sell your personal information. Personalised
            advertising may count as &ldquo;sharing&rdquo; under California law, and you can opt out
            using the same controls in section 2. You may also complain to your local data
            protection authority.
          </p>

          <h3>8. Changes to this policy</h3>
          <p>
            If this policy changes in a way that materially affects you, the date at the top of this
            page will change and the updated policy will be published here before the change takes
            effect in a new version of the game.
          </p>
        </section>

        {/* ================================================================ */}
        <section className="doc" id="terms" aria-labelledby="terms-h">
          <h2 id="terms-h">Terms of Use</h2>

          <div className="callout">
            <p>
              <strong>The short version.</strong> Play the game, don&rsquo;t try to break it, and
              understand that stars, windows and unlocked themes live only on your phone &mdash;
              uninstalling loses them. <strong>Remove Ads</strong> is tied to your store account and
              can be restored; stars cannot.
            </p>
          </div>

          <p>
            These terms are an agreement between you and the publisher of{' '}
            <strong>Huecomb: Hexa Stack Sort</strong> (&ldquo;the game&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) covering the game and this website. By installing or playing the game
            you accept them.
          </p>

          <h3>1. Who may play</h3>
          <p>
            You must be at least 13 years old, or the minimum age required to hold an account in
            your country, whichever is higher. If you are under the age of majority where you live,
            you should read these terms with a parent or guardian.
          </p>

          <h3>2. Your licence to use the game</h3>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable licence to install
            and play the game on devices you own or control, for your own non-commercial use,
            subject to these terms and to the rules of the app store you installed from.
          </p>
          <p>
            You may not sell, rent, sublicense or redistribute the game; modify, decompile or
            reverse engineer it, except to the extent that law expressly permits; remove or obscure
            any notice in it; or use it to build a competing product.
          </p>

          <h3>3. Fair play</h3>
          <p>
            Please do not use cheats, automation, modified clients or memory editors, or otherwise
            tamper with the game or its stored data to obtain stars, themes or purchases you have
            not earned or paid for. We may stop supporting a modified installation, and a tampered
            save may stop working correctly.
          </p>

          <h3>4. Purchases</h3>
          <p>
            The game is free to play. It offers three optional purchases: <strong>Remove Ads</strong>,
            a one-off purchase that permanently stops interstitial advertising on that store account
            and makes the revive and the boosters free within their normal per-run limits; and two
            consumable <strong>star packs</strong>.
          </p>
          <p>
            Stars are a virtual item with no monetary value, cannot be exchanged for money, and are
            not transferable between devices or store accounts.{' '}
            <strong>
              They live only on the device that earned or bought them, and uninstalling the game
              destroys them.
            </strong>{' '}
            Remove Ads is restorable on the same store account using the Restore button in the shop.
          </p>
          <p>
            Everything sold is optional. Nothing sold changes how stacks are dealt, how scoring
            works, or how the board behaves.
          </p>

          <h3>5. Advertising</h3>
          <p>
            The free version shows advertising, including full-screen ads between runs and optional
            ads you choose to watch in exchange for a revive or a booster. We do not control the
            content of individual ads; concerns about a specific ad can be sent to us and we will
            pass them on.
          </p>

          <h3>6. Availability and changes</h3>
          <p>
            We may update, change or discontinue the game or any part of it, including the balance
            of the game and the items offered, at any time. We try not to take away things you have
            paid for.
          </p>

          <h3>7. No warranty, and limits on liability</h3>
          <p>
            The game is provided &ldquo;as is&rdquo;, without warranties of any kind to the fullest
            extent the law allows. Nothing in these terms limits liability that cannot lawfully be
            limited &mdash; including liability for death or personal injury caused by negligence,
            or for fraud. Subject to that, our total liability to you is limited to the amount you
            have paid us, through the app stores, in the twelve months before the claim.
          </p>
          <p>
            If you are a consumer, you keep all the rights your local consumer law gives you, and
            nothing here overrides them.
          </p>

          <h3>8. Ending these terms</h3>
          <p>
            You may end this agreement at any time by uninstalling the game. We may end it if you
            materially breach these terms.
          </p>
        </section>

        {/* ================================================================ */}
        <section className="doc" id="contact" aria-labelledby="contact-h">
          <h2 id="contact-h">Contact</h2>
          <p>Questions about either document, or about the game:</p>
          <p>
            <a className="contact-mail" href="mailto:developedbymax@gmail.com">
              developedbymax@gmail.com
            </a>
          </p>
          <p style={{ marginTop: 26 }}>
            <Link to="/huecomb" style={{ fontWeight: 700 }}>&larr; Back to Huecomb</Link>
          </p>
        </section>
      </div>
    </GameShell>
  );
}
