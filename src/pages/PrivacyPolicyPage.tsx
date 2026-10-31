import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AdPlacement } from '../components/AdPlacement';
import { SITE_CONFIG } from '../config/site';
import { Shield, Lock, Eye, Database, Cookie, UserCheck, AlertTriangle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = "October 31, 2024";

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6">
      <SEO
        title="Privacy Policy"
        description="Read the Privacy Policy for ONLY 1% CAN WIN. Understand how we protect your privacy, handle local storage, and prepare for third-party advertising cookies."
        path="/privacy-policy"
      />

      <div className="w-full max-w-3xl space-y-8 text-left">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Privacy Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">Policy</span>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Official Production Domain:{' '}
            <a href={SITE_CONFIG.productionUrl} className="text-neon-blue hover:underline">
              {SITE_CONFIG.productionUrl}
            </a>{' '}
            • Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Ad Placement */}
        <AdPlacement format="leaderboard" />

        {/* Summary Card */}
        <div className="p-5 rounded-3xl bg-dark-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-neon-green font-bold text-sm">
            <Shield className="w-4 h-4" />
            <span>Privacy Summary at a Glance</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>ONLY 1% CAN WIN</strong> values player privacy above all else. We do not require accounts, we do not ask for personal information to play, and your gameplay scores and records remain strictly on your own device within HTML5 Local Storage.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-neon-purple" />
            <span>1. Information We Collect</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              When you play <strong>ONLY 1% CAN WIN</strong> at <span className="font-mono text-slate-200">{SITE_CONFIG.productionUrl}</span>, our servers do not collect or log personally identifiable information (such as your full name, physical address, phone number, or government identifiers).
            </p>
            <p>
              If you voluntarily choose to contact us via our contact form or direct email, we only receive the information you choose to provide (your name, email address, and message contents) solely for the purpose of responding to your inquiry.
            </p>
          </div>
        </section>

        {/* Section 2: Browser Local Storage Usage */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-neon-blue" />
            <span>2. Local Storage and Saved Game Data</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              To deliver an engaging and rewarding player experience without requiring user accounts or logins, the game utilizes your web browser's standard <strong>HTML5 Local Storage</strong> API.
            </p>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                Data items saved locally on your device:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li><code className="text-neon-purple">only1_high_score</code>: Your highest numerical score achieved.</li>
                <li><code className="text-neon-orange">only1_player_stats</code>: Aggregated counts (games played, highest combo streak, daily challenges completed).</li>
                <li><code className="text-pink-400">only1_score_history</code>: Recent game session scores for your personal leaderboard.</li>
                <li><code className="text-neon-green">sound_muted</code>: Audio playback preference (muted or unmuted).</li>
                <li><code className="text-neon-cyan">only1_cookie_consent</code>: Your cookie and privacy consent choices.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-400">
              This data resides entirely on your local browser. It is never transmitted to any remote server or shared with third parties. You can clear this data at any moment by clicking "Reset Device Scores" in the website footer or by clearing your browser's site data.
            </p>
          </div>
        </section>

        {/* Section 3: Cookies and Third-Party Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Cookie className="w-5 h-5 text-neon-orange" />
            <span>3. Cookies and Advertising Partners</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              Cookies are small text files placed on your device to support website operations and analyze web traffic.
            </p>
            <p>
              Currently, our website does not activate proprietary tracking or marketing cookies. However, to keep this game 100% free for everyone, we are preparing the website for future integration with verified advertising networks, including <strong>Google AdSense</strong>.
            </p>
          </div>
        </section>

        {/* Section 4: Google AdSense and Advertising Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-400" />
            <span>4. Google AdSense & Advertising Choices</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              When Google AdSense is enabled on this website:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet.
              </li>
              <li>
                Google's use of advertising cookies (such as the DoubleClick cookie) enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-purple hover:underline"
                >
                  Google Ads Settings
                </a>.
              </li>
              <li>
                Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-purple hover:underline"
                >
                  aboutads.info
                </a>.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Children's Privacy (COPPA) */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-neon-green" />
            <span>5. Children's Privacy (COPPA Compliance)</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              Protecting the online privacy of young children is paramount. <strong>ONLY 1% CAN WIN</strong> is designed for a general audience and does not knowingly solicit or collect personal information from children under the age of 13.
            </p>
            <p>
              If a parent or guardian believes that a child has provided us with personal information, please contact us at{' '}
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-neon-purple hover:underline">
                {SITE_CONFIG.contactEmail}
              </a>{' '}
              and we will promptly delete any such communication from our records.
            </p>
          </div>
        </section>

        {/* Section 6: User Rights & GDPR / CCPA */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-neon-cyan" />
            <span>6. Your Privacy Rights (GDPR & CCPA/CPRA)</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              Depending on your geographical location, you may have statutory rights under the European General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), or other regional privacy regulations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Right to Know & Access:</strong> You have the right to request what personal information we hold (we hold none on servers).</li>
              <li><strong>Right to Deletion:</strong> You have the full capability to delete all stored game data directly on your device via the "Reset Device Scores" feature in the footer.</li>
              <li><strong>Right to Non-Discrimination:</strong> You receive identical game mechanics, speeds, and challenges regardless of your privacy selections.</li>
              <li><strong>Right to Withdraw Consent:</strong> You can modify or withdraw your cookie consent choices at any time by selecting "Manage Cookie Consent" in the footer.</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Data Security */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-neon-orange" />
            <span>7. Data Security & HTTPS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All traffic between your browser and our production domain (<span className="font-mono text-slate-200">{SITE_CONFIG.productionUrl}</span>) is strictly encrypted using modern Transport Layer Security (HTTPS/SSL). We continuously maintain best-practice security protocols to prevent unauthorized interception.
          </p>
        </section>

        {/* Section 8: Contact Information */}
        <section className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-white">Contact for Privacy Concerns</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            If you have questions regarding this Privacy Policy or our data handling practices, please write to our privacy team at:
          </p>
          <div className="pt-1">
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="text-neon-purple hover:underline font-mono text-sm font-bold"
            >
              {SITE_CONFIG.contactEmail}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
