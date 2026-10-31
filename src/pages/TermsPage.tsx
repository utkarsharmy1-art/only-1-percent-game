import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AdPlacement } from '../components/AdPlacement';
import { SITE_CONFIG } from '../config/site';
import { FileText, ShieldAlert, Award, AlertOctagon, Scale, RefreshCw } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const lastUpdated = "October 31, 2024";

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6">
      <SEO
        title="Terms and Conditions"
        description="Review the terms and conditions governing the use of ONLY 1% CAN WIN browser game."
        path="/terms"
      />

      <div className="w-full max-w-3xl space-y-8 text-left">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Terms and Conditions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">Conditions</span>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Official Production Domain:{' '}
            <a href={SITE_CONFIG.productionUrl} className="text-neon-blue hover:underline">
              {SITE_CONFIG.productionUrl}
            </a>{' '}
            • Effective Date: {lastUpdated}
          </p>
        </div>

        {/* Ad Placement */}
        <AdPlacement format="leaderboard" />

        {/* Section 1: Acceptance of Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-neon-purple" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By accessing, browsing, or playing <strong>ONLY 1% CAN WIN</strong> on the official website (<span className="font-mono text-slate-200">{SITE_CONFIG.productionUrl}</span>), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use the website.
          </p>
        </section>

        {/* Section 2: Website Usage & Permitted License */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-neon-blue" />
            <span>2. Permitted Use & Conduct</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              We grant you a personal, non-exclusive, non-transferable, revocable license to access and play the game for personal, non-commercial entertainment purposes.
            </p>
            <p className="font-semibold text-slate-200">You agree that you will NOT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Use automated scripts, click bots, screen scrapers, or memory tampering tools to manipulate game speed, scores, or timers.</li>
              <li>Attempt to decompile, reverse engineer, or extract proprietary game mechanics for unauthorized commercial distribution.</li>
              <li>Engage in any denial-of-service (DoS) attack, server overload, or conduct that impairs the normal functioning of the website for others.</li>
              <li>Misrepresent your identity or spoof game records for fraudulent or deceptive purposes.</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Game Participation & Fair Play */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-orange" />
            <span>3. Game Participation & Scores</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              <strong>ONLY 1% CAN WIN</strong> is designed as a fast-paced skill and reaction challenge. Scoring rules, multipliers, difficulty transitions, and countdown limits are calculated algorithmically in real time.
            </p>
            <p>
              All high scores, streaks, and stats are maintained locally on your browser. We reserve the right to modify game parameters, timing constraints, puzzle generation frequencies, or scoring systems at any time to preserve balance and fair gameplay.
            </p>
          </div>
        </section>

        {/* Section 4: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-neon-green" />
            <span>4. Intellectual Property Rights</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              All proprietary software, audio synthesis routines, user interface layouts, graphic styling, animations, and branding associated with <strong>ONLY 1% CAN WIN</strong> are the intellectual property of the site operators and are protected by applicable copyright, trademark, and unfair competition laws.
            </p>
            <p>
              Open-source libraries utilized in this project (such as React, Tailwind CSS, Lucide icons, and Canvas-Confetti) remain the property of their respective authors under their respective MIT/permissive licenses.
            </p>
          </div>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <span>5. Disclaimer of Warranties & Limitation of Liability</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              THE WEBSITE AND GAME ARE PROVIDED ON AN <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR UNINTERRUPTED ERROR-FREE OPERATION.
            </p>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE OPERATORS, DEVELOPERS, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR ACCESS TO, OR INABILITY TO ACCESS OR PLAY, THE GAME.
            </p>
          </div>
        </section>

        {/* Section 6: Modifications to the Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-neon-cyan" />
            <span>6. Changes to the Website & Terms</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We reserve the right, at our sole discretion, to modify, update, replace, or temporarily discontinue any aspect of the game or these Terms and Conditions at any time. When changes occur, the "Effective Date" at the top of this page will be revised. Continued use of the website following any posted modifications constitutes full acceptance of the updated terms.
          </p>
        </section>

        {/* Section 7: Contact */}
        <section className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-white">Questions Regarding Terms</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            If you have questions or inquiries concerning our Terms and Conditions, please contact us at:
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
