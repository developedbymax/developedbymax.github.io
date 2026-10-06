import { Link } from 'react-router-dom';
import { bySlug } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('sirocco');

const NAV = [
  ['Game', '/sirocco'],
  ['Privacy', '#privacy'],
  ['Terms', '#terms'],
];

/* Sirocco Courier's own documents, written against what SiroccoCourierRN
   actually does.

   What sets it apart. It sells TWO permanent purchases: Remove Ads
   (sirocco_no_ads), which stops the between-flight ad and makes the second
   wind free — App.tsx never calls initAds() once ownership has been read
   (noAdsState.checked && !noAds) — and the Dusk Post Pack, three cosmetic
   liveries, which keeps ads. Postmarks are the one earned value and are never
   sold. Ads start only after the player's first flight and never mid-flight;
   Google's UMP message, then Apple's tracking prompt, run before the SDK starts
   (src/platform/ads.ts), and Privacy choices sits in Settings. The game makes
   no network request of its own: no analytics, no crash reporter, no
   expo-updates, and purchases are checked by the store on the device. The
   daily route's seed comes from the device's own date.

   Served at /sirocco/privacy (and /sirocco/privacy.html). It is the game's one
   legal page: the app's PRIVACY_URL points here, and its terms are reached as
   /sirocco/privacy#terms. */
export default function SiroccoLegal() {
  useMeta(meta['/sirocco/privacy']);

  return (
    <GameShell game={game} links={NAV} legal>
      <div className="wrap prose">
        <p className="updated">Last updated &middot; 6 October 2026</p>
        <h1>Privacy Policy &amp; Terms of Use</h1>
        <p>
          Two documents, kept on one page so there is only one link to follow. The privacy
          policy describes what the game does with information; the terms describe the
          agreement between you and us when you play. Both cover{' '}
          <strong>Sirocco Courier</strong> only &mdash; the other games are separate apps with
          their own policies.
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
              <strong>The short version.</strong> Sirocco Courier has no account and no server of
              its own, and it makes no network requests of its own. Your postmarks, your records,
              your gliders and the flight you are part way through live on your phone and are never
              uploaded. The one thing that does leave your device is advertising data, collected by
              our ad partner so it can serve ads &mdash; and if you buy Remove Ads, that stops.
            </p>
          </div>

          <p>
            This policy explains how the mobile game <strong>Sirocco Courier</strong> (&ldquo;the
            game&rdquo;, &ldquo;we&rdquo;) handles information. It covers the iOS and Android
            versions of the game and this website.
          </p>
          <p>
            The game is published by <strong>developed by max</strong>, who is the data
            controller for the purposes of the UK and EU GDPR. See{' '}
            <a href="#contact">Contact</a> below to reach us.
          </p>

          <h3>1. What the game stores on your device</h3>
          <p>
            The game keeps a small flight log on your phone, with a backup copy so a damaged save
            can be recovered. Nothing in it is transmitted to us: Sirocco Courier has no backend
            server of its own, and none of it is uploaded anywhere.
          </p>
          <ul>
            <li>
              Your records &mdash; your best delivery run, your best on each of the last thirty
              daily routes, how many flights you have flown, and the postmarks you have delivered
              and still have to spend
            </li>
            <li>
              Your fleet &mdash; the gliders you have unlocked, the one you have selected, and the
              livery you have chosen
            </li>
            <li>
              The flight in progress &mdash; the route as it stands, your glider, its altitude,
              cargo and integrity, your delivery multiplier and your upgrades &mdash; so closing or
              backgrounding the game does not lose it, together with a small marker that stops the
              same delivery being counted twice
            </li>
            <li>Whether sound, haptics and reduced effects are on, and whether you have read the flight notes</li>
            <li>Which of the two optional purchases you own</li>
          </ul>
          <p>
            That is the whole list. The game has no player name and no profile beyond this log.
            Practice writes nothing to your records, and the daily route is chosen from your
            device&rsquo;s own date, not fetched from anywhere.
          </p>
          <p>
            This data stays on the device. It is not backed up to us, it is not readable by us,
            and <strong>deleting the game deletes all of it</strong>. If your device or app store is
            configured to back up app data, that backup is governed by Apple&rsquo;s or
            Google&rsquo;s own policies, not by this one.
          </p>
          <p>
            The game makes <strong>no network requests of its own</strong>. It does not check for
            updates, it reports nothing about how you play, and it has no server to talk to. The
            only connections it makes are the advertising in section 2 and the store in section 3.
          </p>

          <h3>2. What our advertising partner collects</h3>
          <p>
            The game is free and is funded by advertising. Ads are served through{' '}
            <strong>Google AdMob</strong>. Google may fill an ad slot with its own advertisers
            or with other advertising companies that buy ad space through Google&rsquo;s
            platform. No other ad network is built into the game. Advertising does not start
            until you have finished your first flight, it is never shown while you are flying or
            practising, and there are two kinds:
          </p>
          <ul>
            <li>
              <strong>A full-screen ad</strong>, which may be shown when you leave the screen at the
              end of a flight &mdash; whether the flight was lost or you retired &mdash; to fly
              again or return to the airfield.
            </li>
            <li>
              <strong>A second wind</strong>, which you can choose to watch when a flight is lost: it
              lifts the glider back into the air, once per flight, with its cargo still aboard.
              Declining costs nothing, and a skipped or failed ad gives nothing and costs nothing.
            </li>
          </ul>
          <p>To serve and measure ads, Google and those advertisers may collect:</p>
          <table className="tbl">
            <thead>
              <tr><th>What</th><th>Why</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Your device&rsquo;s advertising identifier (IDFA on iOS, Advertising ID on Android)</td>
                <td>To select ads and to measure whether an ad led to an install, without identifying you by name</td>
              </tr>
              <tr>
                <td>Device and software details &mdash; model, operating system version, language, screen size, network type</td>
                <td>To send an ad that fits and plays correctly on your device</td>
              </tr>
              <tr>
                <td>IP address, and the approximate country or region derived from it</td>
                <td>To meet local legal requirements and to serve ads relevant to your region</td>
              </tr>
              <tr>
                <td>Ad interaction events &mdash; that an ad was requested, shown, watched to the end, or tapped</td>
                <td>To pay for the ad correctly and to detect fraud</td>
              </tr>
              <tr>
                <td>Diagnostics about the advertising code itself &mdash; its performance and any errors it hits</td>
                <td>To keep the ad service working and to fix problems in it</td>
              </tr>
            </tbody>
          </table>
          <p>
            We do not receive this data ourselves in a form that identifies you; we see only
            aggregate revenue reporting. Google&rsquo;s own policies govern what it does
            with it: the{' '}
            <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">
              Google Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/technologies/partner-sites" rel="noopener" target="_blank">
              how Google uses information from apps that use its services
            </a>.
          </p>
          <p>
            <strong>What Remove Ads does.</strong> From the moment the store confirms the purchase,
            the game shows no more ads of either kind, and the second wind is yours without a
            video. On later launches, once the game has read that you own it, the advertising code
            is not started at all, so this section stops applying to you from then on (other than
            to data Google already collected before). The Dusk Post Pack does not change
            advertising.
          </p>

          <h4>Your choices about advertising</h4>
          <ul>
            <li>
              <strong>On iOS</strong>, the game asks for permission to track before any ad is
              requested. If you decline, ads still appear but are not personalised, and the game
              plays exactly the same. You can change this later in{' '}
              <em>Settings &rarr; Privacy &amp; Security &rarr; Tracking</em>.
            </li>
            <li>
              <strong>In the EEA and the UK</strong>, Google&rsquo;s consent dialog appears before
              any ad is requested, and your answer is recorded on your device. You can reopen it at
              any time from <em>Privacy choices</em> in the game&rsquo;s Settings.
            </li>
            <li>
              <strong>On Android</strong>, you can reset or delete your Advertising ID in{' '}
              <em>Settings &rarr; Google &rarr; Ads</em>.
            </li>
            <li>
              <strong>With your Google account</strong>, you can review and limit ad
              personalisation at{' '}
              <a href="https://myadcenter.google.com/" rel="noopener" target="_blank">
                myadcenter.google.com
              </a>.
            </li>
          </ul>

          <h3>3. Purchases</h3>
          <p>
            The game offers two optional, one-off, non-consumable purchases:{' '}
            <em>Remove Ads</em> and the <em>Dusk Post Pack</em>, a set of three glider liveries.
            Nothing consumable is sold, and postmarks cannot be bought. Purchases are processed
            entirely by <strong>Apple&rsquo;s App Store</strong> or <strong>Google Play</strong>.
          </p>
          <p>
            We never see, receive or store your payment card, billing address or store account.
            The game writes one thing to your device when you buy: which of the two you own. When
            the game opens and can reach the store, it asks the store whether that is still true,
            so a purchase made on another device with the same store account is recognised, and a
            refunded one is taken back.
          </p>
          <p>
            On Android, the game talks to the store through Google Play&rsquo;s billing library,
            which sends Google its own diagnostic information about purchases. That is governed by
            Google&rsquo;s privacy policy, not by this one, and none of it reaches us.
          </p>
          <p>Refunds are handled by the store you bought from, under their policies, not by us.</p>

          <h3>4. Crash and error reporting</h3>
          <p>
            <strong>There is none.</strong> Sirocco Courier ships no crash-reporting and no
            analytics SDK, so no report of any kind is sent when something goes wrong. If the game
            misbehaves, the only way we learn about it is if you tell us. If that ever changes,
            this section will change with it, before the build that changes it ships.
          </p>

          <h3>5. What the game does not do</h3>
          <ul>
            <li>No account, sign-in, email address or password.</li>
            <li>No access to location, contacts, photos, camera or microphone.</li>
            <li>No gameplay analytics sent anywhere.</li>
            <li>No crash reporting.</li>
            <li>No network requests of its own, not even to check for updates.</li>
            <li>No selling of personal information by us to anyone.</li>
          </ul>

          <h3>6. Children</h3>
          <p>
            Sirocco Courier is not directed at children under 13 (or the equivalent minimum age
            where you live), and we do not knowingly collect personal information from them. If
            you believe a child has provided information through the game, contact us and we will
            delete what we can reach.
          </p>

          <h3>7. Your rights</h3>
          <p>
            If you are in the UK, the EEA, or a jurisdiction with comparable law, you have rights
            to access, correct, delete and port your personal data, and to object to how it is
            processed. These are unusually simple to exercise here, because we hold no personal
            data about you on any server:
          </p>
          <ul>
            <li>
              <strong>To see everything the game holds about you</strong>, open the game &mdash;
              your records are on the airfield, your gliders in the hangar, and your settings and
              purchases in Settings.
            </li>
            <li><strong>To delete everything</strong>, uninstall the game.</li>
            <li>
              <strong>For advertising data</strong>, use the choices in section 2, or contact
              Google directly using its privacy policy.
            </li>
          </ul>
          <p>
            If you are a California resident: we do not sell your personal information.
            Personalised advertising may count as &ldquo;sharing&rdquo; under California law, and
            you can opt out using the same controls in section 2. You may also complain to your
            local data protection authority. In the UK that is the Information
            Commissioner&rsquo;s Office.
          </p>

          <h3>8. Data transfers and retention</h3>
          <p>
            We retain no personal data, so there is nothing for us to transfer or to delete on a
            schedule. Data held by our advertising partner may be processed in countries outside
            your own, including the United States, under the safeguards described in their own
            policy.
          </p>

          <h3>9. Changes to this policy</h3>
          <p>
            If this policy changes in a way that materially affects you, the date at the top of
            this page will change and the updated policy will be published here before the change
            takes effect in a new version of the game.
          </p>
        </section>

        {/* ================================================================ */}
        <section className="doc" id="terms" aria-labelledby="terms-h">
          <h2 id="terms-h">Terms of Use</h2>

          <div className="callout">
            <p>
              <strong>The short version.</strong> Play the game, don&rsquo;t try to break it, and
              understand that your postmarks, your gliders and the flight you are part way through
              live only on your phone &mdash; uninstalling loses them. Your purchases are tied to
              your store account and can be restored.
            </p>
          </div>

          <p>
            These terms are an agreement between you and <strong>developed by max</strong>{' '}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;) covering the mobile game{' '}
            <strong>Sirocco Courier</strong> (&ldquo;the game&rdquo;) and this website. By
            installing or playing the game you accept them. If you do not accept them, please do
            not install or play it.
          </p>

          <h3>1. Who may play</h3>
          <p>
            You must be at least 13 years old, or the minimum age your country requires for an App
            Store or Google Play account, whichever is higher. The game itself has no account and no
            sign-in &mdash; this is the age the store sets for the account you install it from. If
            you are under the age of majority where you live, you should read these terms with a
            parent or guardian.
          </p>

          <h3>2. Your licence to use the game</h3>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable licence to install
            and play the game on devices you own or control, for your own non-commercial use. That
            licence is subject to these terms and to the rules of the app store you installed from.
          </p>
          <p>
            You may not sell, rent, sublicense or redistribute the game; modify, decompile or
            reverse engineer it, except to the extent that law expressly permits you to; remove or
            obscure any notice in it; or use it to build a competing product.
          </p>

          <h3>3. Fair play</h3>
          <p>
            Please do not use cheats, automation, modified clients or memory editors, or otherwise
            tamper with the game or its stored data to obtain postmarks, gliders, liveries, records
            or purchases you have not earned or paid for. We may stop supporting a modified
            installation, and a tampered save may stop working correctly.
          </p>

          <h3>4. Purchases</h3>
          <p>The game is free to play. It offers two optional purchases:</p>
          <ul>
            <li>
              <strong>Remove Ads</strong> &mdash; permanently stops all advertising in the game,
              on that store account, and makes the second wind free, without a video.
            </li>
            <li>
              <strong>Dusk Post Pack</strong> &mdash; three glider liveries, Moonstone, Desert rose
              and Marigold, for every glider you own. Cosmetic only; ads remain.
            </li>
          </ul>
          <p>
            Each is a one-off, non-consumable purchase. Neither unlocks gameplay: every region, mode,
            glider and upgrade is earned the same way by everyone, and postmarks cannot be bought.
            Purchases are made through and charged by <strong>Apple&rsquo;s App Store</strong> or{' '}
            <strong>Google Play</strong>. The price is shown in your local currency by the store
            itself and may vary by country and over time. We do not process payments, and we never
            see your payment details.
          </p>
          <p>
            <strong>Refunds are handled by the store you bought from</strong>, under its own policy.
            We cannot issue, reverse or override a store refund. If a purchase is refunded, what it
            bought is removed from the game.
          </p>
          <p>
            Where the law gives you a right to cancel a digital purchase, that right may end once
            the content is delivered to you, which for these purchases is immediate.
          </p>

          <h3>5. Postmarks and records</h3>
          <p>
            Postmarks, gliders, liveries, records and a flight in progress are{' '}
            <strong>not property and have no monetary value</strong>. You do not own them; you hold a
            limited licence to use them inside the game. They cannot be sold, transferred between
            accounts or devices, or exchanged for money or anything outside the game.
          </p>
          <p>
            Two consequences worth stating plainly, because they follow from how the game is built:
          </p>
          <ul>
            <li>
              <strong>Your progress is stored on your device, not on a server.</strong> If you
              uninstall the game, reset the device, or lose it, your postmarks, gliders, records and
              any flight in progress are gone and cannot be recovered by us.
            </li>
            <li>
              <strong>Purchases are the exception.</strong> Because they are non-consumable
              purchases recorded against your store account, they can be restored on a new device
              with <em>Restore purchases</em>, in the game&rsquo;s shop or its Settings.
            </li>
          </ul>
          <p>
            We may change the balance of the game &mdash; how fast the wind picks up, what a
            delivery pays, what a glider costs, when a full-screen ad is shown &mdash; as part of
            normal updates. The daily route is the same for everyone on a given date only as far as
            the device&rsquo;s own clock allows; it is not a verified competition.
          </p>

          <h3>6. Advertising</h3>
          <p>
            Unless you have purchased Remove Ads, the game may show an ad when you leave the screen
            at the end of a flight, and you may choose to watch an ad for a second wind when a
            flight is lost; that one is never shown unless you ask for it. Advertising is supplied
            by third parties; we do not control which specific ads are shown and are not
            responsible for their content or for anything you buy from an advertiser. What
            advertising partners collect is described in the <a href="#privacy">Privacy Policy</a>{' '}
            above.
          </p>

          <h3>7. Ownership</h3>
          <p>
            The game, its name, artwork, sounds, code and this website belong to us or our licensors
            and are protected by copyright and other laws. These terms give you no rights in them
            beyond the licence in section 2.
          </p>
          <p>
            You are welcome to record, stream and share footage of yourself playing the game,
            including on monetised channels, provided you do not present it as your own work and do
            not use our name in a way that implies we endorse you.
          </p>

          <h3>8. Availability and changes</h3>
          <p>
            We may update, change or discontinue the game or any part of it, and we may stop
            supporting older operating system versions. We try not to break things, but we do not
            promise the game will always be available, uninterrupted or error-free.
          </p>

          <h3>9. No warranty</h3>
          <p>
            To the fullest extent the law allows, the game is provided &ldquo;as is&rdquo; and
            &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied,
            including any implied warranty of merchantability, fitness for a particular purpose or
            non-infringement.
          </p>
          <p>
            Nothing in these terms excludes or limits any right you have under mandatory consumer
            protection law in your country, including your statutory rights in the UK, the EU and
            elsewhere. Where those rights apply, they apply regardless of anything in this section.
          </p>

          <h3>10. Limitation of liability</h3>
          <p>
            To the fullest extent the law allows, we are not liable for indirect, incidental, special
            or consequential loss, for lost data or lost progress, or for loss of profit or goodwill,
            arising from your use of the game.
          </p>
          <p>
            Where liability cannot be excluded, our total liability to you is limited to the greater
            of the amount you paid us for the game in the twelve months before the claim, or ten US
            dollars. We do not exclude liability for death or personal injury caused by our
            negligence, for fraud, or for anything else that cannot lawfully be excluded.
          </p>

          <h3>11. Ending this agreement</h3>
          <p>
            You can end it at any time by uninstalling the game. We may suspend or end your licence
            if you materially breach these terms, in particular section 3. Sections 5, 7, 9 and 10
            continue to apply afterwards.
          </p>

          <h3>12. Changes to these terms</h3>
          <p>
            If these terms change materially, the date at the top of this page will change and the
            new version will be published here before it takes effect in a new version of the game.
            Continuing to play after that means you accept the change.
          </p>
        </section>

        {/* ================================================================ */}
        <section className="doc" id="contact" aria-labelledby="contact-h">
          <h2 id="contact-h">Contact</h2>
          <p>
            Questions about either document above, a privacy request, or anything else about the
            game:
          </p>
          <p>
            <a className="contact-mail" href="mailto:developedbymax@gmail.com">
              developedbymax@gmail.com
            </a>
          </p>
          <p style={{ marginTop: 26 }}>
            <Link to="/sirocco" style={{ fontWeight: 700 }}>&larr; Back to Sirocco Courier</Link>
          </p>
        </section>
      </div>
    </GameShell>
  );
}
