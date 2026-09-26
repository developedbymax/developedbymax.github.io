import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { bySlug } from '../data/games.js';
import GameShell from '../components/GameShell.jsx';
import useMeta from '../components/useMeta.js';
import { meta } from '../meta.js';

const game = bySlug('pearlbound');

const NAV = [
  ['Game', '/pearlbound'],
  ['Privacy', '#privacy'],
  ['Terms', '#terms'],
];

/* Pearlbound's own documents, written against what PearlboundRN actually does.

   What sets it apart, each of which a copy of another game's policy would get
   wrong. It sells ONE purchase, Remove break ads, which ends the interstitial
   between finished dives but keeps the optional rescue ad — so the MAX SDK is
   started on every launch, bought or not, and keeps a rescue ad loaded
   (App.tsx starts it whatever the player owns; ads.native.js stops requesting
   interstitials once the store reports ownership). The consent flow (the iOS
   tracking prompt; Google's UMP dialog in the EEA and UK) runs inside that
   start. The game itself makes no network request: no analytics, no crash
   reporter, no expo-updates. On Android, Google Play's billing library sends
   Google its own diagnostics, which section 3 says plainly.

   Served at /pearlbound/privacy and /pearlbound/terms, with the .html spelling
   of both; the app's EXPO_PUBLIC_PRIVACY_POLICY_URL and EXPO_PUBLIC_TERMS_URL
   point here. The terms address opens this same page at the terms. */
export default function PearlboundLegal({ focus }) {
  useMeta(meta[focus === 'terms' ? '/pearlbound/terms' : '/pearlbound/privacy']);
  const { hash } = useLocation();

  useEffect(() => {
    if (focus && !hash) document.getElementById(focus)?.scrollIntoView({ behavior: 'instant' });
  }, [focus, hash]);

  return (
    <GameShell game={game} links={NAV} legal>
      <div className="wrap prose">
        <p className="updated">Last updated &middot; 26 September 2026</p>
        <h1>Privacy Policy &amp; Terms of Use</h1>
        <p>
          Two documents, kept on one page so there is only one link to follow. The privacy
          policy describes what the game does with information; the terms describe the
          agreement between you and us when you play. Both cover{' '}
          <strong>Pearlbound</strong> only &mdash; the other games are separate apps with
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
              <strong>The short version.</strong> Pearlbound has no account and no server of its
              own, and it makes no network requests of its own. Your treasure, your records and
              the dive you are part way through live on your phone and are never uploaded. The one
              thing that does leave your device is advertising data, collected by our ad partner
              so it can serve ads.
            </p>
            <p>
              <strong>Read section 2 before you buy.</strong> Remove break ads ends the ads between
              dives. It deliberately does <em>not</em> remove the rescue ad you can choose to
              watch, so the advertising code still runs after you buy it.
            </p>
          </div>

          <p>
            This policy explains how the mobile game <strong>Pearlbound</strong> (&ldquo;the
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
            The game keeps two small records on your phone. Nothing in them is transmitted to us:
            Pearlbound has no backend server of its own, and none of it is uploaded anywhere.
          </p>
          <ul>
            <li>
              Your records &mdash; treasure banked, the deepest chamber you have cleared, your best
              chain of hits, and how many dives you have finished
            </li>
            <li>
              The dive in progress &mdash; the chamber, what you carry, your gifts and the reef as
              it stands &mdash; so closing or backgrounding the game does not lose it
            </li>
            <li>
              A short list of your most recent finished dives, so that no dive can ever pay out
              twice
            </li>
            <li>Whether sound, haptics and reduced effects are on, and whether you have seen the guide</li>
            <li>Whether you own Remove break ads &mdash; a single yes or no</li>
          </ul>
          <p>
            That is the whole list. The game has no player name, no profile and no in-game
            currency, so there is nothing else for it to keep. Safe practice writes nothing at all.
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
            <strong>AppLovin MAX</strong>, which may also route ad requests to other advertising
            networks it mediates on our behalf. There are exactly two places an ad can appear:
          </p>
          <ul>
            <li>
              <strong>A break ad</strong>, considered only when you leave a dive that has already
              ended &mdash; at most every third finished dive, never within a minute and a half of
              the last one, never after a very short dive, and never in safe practice. Nothing ever
              interrupts a shot.
            </li>
            <li>
              <strong>A rescue</strong>, which you choose to watch, once per dive, when your shell
              breaks: it restores one hull and keeps your treasure and gifts. A skipped or failed
              ad gives nothing and costs nothing.
            </li>
          </ul>
          <p>To serve and measure ads, these partners may collect:</p>
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
            </tbody>
          </table>
          <p>
            We do not receive this data ourselves in a form that identifies you; we see only
            aggregate revenue reporting. AppLovin&rsquo;s own privacy policy governs what they do
            with it:{' '}
            <a href="https://www.applovin.com/privacy/" rel="noopener" target="_blank">
              applovin.com/privacy
            </a>.
          </p>
          <p>
            <strong>What Remove break ads does, and does not do.</strong> It permanently stops the
            break ads between dives, and once the store confirms you own it the game no longer
            requests them at all. The rescue ad stays available, because it is something you choose
            to watch in exchange for something, and taking it away would make the purchase worse
            rather than better. The advertising code is still started each time the game opens,
            whether or not you own it, and it keeps a rescue ad loaded in the background so that one
            is ready if you ask for it &mdash; so this section still applies to you, even if you
            never watch one.
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
              <strong>In the EEA and the UK</strong>, a consent dialog appears before any ad is
              requested, and your answer is recorded on your device. You can reopen it at any time
              from <em>Privacy choices</em> in the game&rsquo;s Shop.
            </li>
            <li>
              <strong>On Android</strong>, you can reset or delete your Advertising ID in{' '}
              <em>Settings &rarr; Google &rarr; Ads</em>.
            </li>
          </ul>

          <h3>3. Purchases</h3>
          <p>
            The game offers <strong>one</strong> optional purchase: <em>Remove break ads</em>, a
            one-off, non-consumable purchase. There is no in-game currency and nothing consumable
            is sold. The purchase is processed entirely by <strong>Apple&rsquo;s App Store</strong>{' '}
            or <strong>Google Play</strong>.
          </p>
          <p>
            We never see, receive or store your payment card, billing address or store account.
            The game writes one thing to your device when you buy: that you own it. Each time the
            game opens it asks the store whether that is still true, so a purchase made on another
            device is recognised, and a refunded one is taken back.
          </p>
          <p>
            On Android, the game talks to the store through Google Play&rsquo;s billing library,
            which sends Google its own diagnostic information about purchases. That is governed by
            Google&rsquo;s privacy policy, not by this one, and none of it reaches us.
          </p>
          <p>Refunds are handled by the store you bought from, under their policies, not by us.</p>

          <h3>4. Crash and error reporting</h3>
          <p>
            <strong>There is none.</strong> Pearlbound ships no crash-reporting and no analytics
            SDK, so no report of any kind is sent when something goes wrong. If the game
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
            Pearlbound is not directed at children under 13 (or the equivalent minimum age where
            you live), and we do not knowingly collect personal information from them. If you
            believe a child has provided information through the game, contact us and we will
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
              your treasure and records are on its home screen.
            </li>
            <li><strong>To delete everything</strong>, uninstall the game.</li>
            <li>
              <strong>For advertising data</strong>, use the choices in section 2, or contact
              AppLovin directly using their privacy policy.
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
              understand that your treasure and the dive you are part way through live only on your
              phone &mdash; uninstalling loses them. <strong>Remove break ads</strong> is tied to
              your store account and can be restored.
            </p>
          </div>

          <p>
            These terms are an agreement between you and <strong>developed by max</strong>{' '}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;) covering the mobile game{' '}
            <strong>Pearlbound</strong> (&ldquo;the game&rdquo;) and this website. By installing or
            playing the game you accept them. If you do not accept them, please do not install or
            play it.
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
            tamper with the game or its stored data to obtain treasure, records, rescues or
            purchases you have not earned or paid for. We may stop supporting a modified
            installation, and a tampered save may stop working correctly.
          </p>

          <h3>4. Purchases</h3>
          <p>The game is free to play. It offers one optional purchase:</p>
          <ul>
            <li>
              <strong>Remove break ads</strong> &mdash; a one-off, non-consumable purchase, on that
              store account, that permanently stops the automatic ads between dives. It does not
              remove the optional rescue ad, which you choose to watch, and it does not unlock any
              content: every chamber and every gift is free for everyone.
            </li>
          </ul>
          <p>
            There is no in-game currency and nothing consumable is sold. The purchase is made
            through and charged by <strong>Apple&rsquo;s App Store</strong> or{' '}
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
            the content is delivered to you, which for this purchase is immediate.
          </p>

          <h3>5. Treasure and records</h3>
          <p>
            Treasure, records and a dive in progress are{' '}
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
              uninstall the game, reset the device, or lose it, your treasure, your records and any
              dive in progress are gone and cannot be recovered by us.
            </li>
            <li>
              <strong>Remove break ads is the exception.</strong> Because it is a non-consumable
              purchase recorded against your store account, it can be restored on a new device with{' '}
              <em>Restore Purchases</em> in the game&rsquo;s Shop.
            </li>
          </ul>
          <p>
            We may change the balance of the game &mdash; how tough a seal is, how fast the reef
            grows, what a vault is worth, how often a break ad is considered &mdash; as part of
            normal updates.
          </p>

          <h3>6. Advertising</h3>
          <p>
            Unless you have purchased Remove break ads, the game may show an ad when you leave some
            finished dives. Separately, and whether or not you have bought anything, you may choose
            to watch an ad to rescue a dive once; it is never shown unless you ask for it.
            Advertising is supplied by third parties; we do not control which specific ads are shown
            and are not responsible for their content or for anything you buy from an advertiser.
            What advertising partners collect is described in the{' '}
            <a href="#privacy">Privacy Policy</a> above.
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
            <Link to="/pearlbound" style={{ fontWeight: 700 }}>&larr; Back to Pearlbound</Link>
          </p>
        </section>
      </div>
    </GameShell>
  );
}
