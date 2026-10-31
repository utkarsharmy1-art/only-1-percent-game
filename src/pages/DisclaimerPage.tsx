import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AdPlacement } from '../components/AdPlacement';
import { SITE_CONFIG } from '../config/site';
import { AlertCircle, Brain, Target, ShieldCheck, HeartPulse, Laptop } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const lastUpdated = "October 31, 2024";

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6">
      <SEO
        title="Disclaimer"
        description="Read the official cognitive performance and entertainment disclaimer for ONLY 1% CAN WIN."
        path="/disclaimer"
      />

      <div className="w-full max-w-3xl space-y-8 text-left">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Disclaimer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Game & Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">Disclaimer</span>
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Official Production Domain:{' '}
            <a href={SITE_CONFIG.productionUrl} className="text-neon-blue hover:underline">
              {SITE_CONFIG.productionUrl}
            </a>{' '}
            • Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Highlight Alert Box */}
        <div className="p-5 rounded-3xl bg-amber-950/40 border border-amber-500/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>Important Entertainment Notice</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>ONLY 1% CAN WIN</strong> is created strictly for <strong>entertainment, casual gaming, and personal skill practice</strong>. Performance tiers, score calculations, percentile ranks, and the title "ONLY 1% CAN WIN" are fun, gamified labels and do not represent formal psychological, neurological, medical, or IQ diagnostics.
          </p>
        </div>

        {/* Ad Placement */}
        <AdPlacement format="leaderboard" />

        {/* Section 1: Entertainment & Skill-Based Practice Only */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-neon-purple" />
            <span>1. Entertainment and Skill-Based Purpose</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              The micro-challenges featured in <strong>ONLY 1% CAN WIN</strong> (such as color Stroop matching, finding odd emojis, sequence memorization, velocity tracking, rapid arithmetic, and shape rotation) are casual games designed to stimulate fast reaction and concentration.
            </p>
            <p>
              While practicing these challenges may help train focus and hand-eye coordination in a gaming context, no representation or guarantee is made regarding real-world cognitive enhancement, academic performance, or professional aptitude.
            </p>
          </div>
        </section>

        {/* Section 2: No Medical, Neurological, or IQ Assessment */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-neon-blue" />
            <span>2. No Scientific, Medical, or Clinical Claims</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              Nothing on this website should be interpreted as medical advice, clinical diagnosis, cognitive therapy, or professional psychological evaluation.
            </p>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-200 block">Performance Badges are Satirical & Gamified:</span>
              <ul className="space-y-1 text-slate-400">
                <li>• <em>"Brain Sleeping 😴"</em> is a humorous prompt to encourage replaying, not an indicator of low intelligence or cognitive deficit.</li>
                <li>• <em>"Genius 🧠"</em>, <em>"Brain Monster 🔥"</em>, and <em>"Absolute Legend 👑"</em> are celebratory arcade badges earned for rapid taps, not formal certifications of genius-level IQ.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-400">
              If you have concerns regarding your neurological health, memory function, or reflex speed, please consult a licensed healthcare physician or qualified medical professional.
            </p>
          </div>
        </section>

        {/* Section 3: Technical & Hardware Variability */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Laptop className="w-5 h-5 text-neon-orange" />
            <span>3. Technical and Hardware Factors</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
            <p>
              Your reaction times and gameplay scores can vary drastically based on physical and technical factors outside our control, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Display refresh rates (e.g., 60 Hz vs. 120 Hz or 144 Hz).</li>
              <li>Touchscreen digitizer sampling rates and touch latency on mobile devices.</li>
              <li>Mouse polling rates, optical sensor sensitivity, and click actuation delays on desktop.</li>
              <li>Browser frame throttling, background applications, and device thermal throttling.</li>
              <li>Ambient lighting, player fatigue, caffeine intake, and physical surroundings.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Healthy Gaming & Eye Strain Notice */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-400" />
            <span>4. Healthy Gaming & Photosensitivity Awareness</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Fast-paced reflex games feature high-contrast colors, rapid screen changes, and quick visual pulses. We recommend taking regular breaks to prevent eye strain or hand fatigue. If you experience dizziness, visual discomfort, or fatigue, please pause gameplay immediately and rest your eyes.
          </p>
        </section>

        {/* Section 5: Third-Party Content & External Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-neon-cyan" />
            <span>5. Third-Party Links & Advertising Disclaimer</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The website may display advertisements or links to external third-party websites (such as Google Ad Settings or social sharing tools). We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-white">Contact Us</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            If you have questions or seek clarification regarding this disclaimer, please reach out to us at:
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
