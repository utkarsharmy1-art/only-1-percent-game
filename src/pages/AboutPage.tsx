import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AdPlacement } from '../components/AdPlacement';
import { Zap, Play, Brain, Target, ShieldCheck, Award, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6">
      <SEO
        title="About Us"
        description="Learn about ONLY 1% CAN WIN — the fast-paced 30-second cognitive reaction and mental agility challenge game."
        path="/about"
      />

      <div className="w-full max-w-3xl space-y-8 text-left">
        {/* Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-neon-purple transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">ONLY 1% CAN WIN</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            A fast-paced, high-intensity browser mini-game engineered to test cognitive processing speed, working memory, attention to detail, and rapid decision-making under strict time pressure.
          </p>
        </div>

        {/* Top Ad Placement Container */}
        <AdPlacement format="leaderboard" />

        {/* Section 1: The Mission */}
        <section className="p-6 rounded-3xl bg-dark-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 text-neon-purple">
            <Target className="w-6 h-6" />
            <h2 className="text-xl font-black text-white">Our Mission</h2>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            In an era of passive digital consumption and short attention spans, <strong>ONLY 1% CAN WIN</strong> was built to offer an engaging, intellectually stimulating micro-challenge. Our mission is to provide an accessible, instant-loading, and completely free web playground where players can benchmark their real-time reflexes, observational acuity, and mental agility.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Whether you want a quick 30-second warm-up before a competitive gaming session, a midday mental recharge, or a friendly rivalry with colleagues and family, our mini-game tests how cleanly your synapses fire when every fraction of a second counts.
          </p>
        </section>

        {/* Section 2: Core Game Pillars */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-neon-blue" />
            <span>The Science of Reaction & Observation</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Human reaction time is not just a single physical reflex—it is an intricate chain comprising sensory perception, neurological transmission, mental calculation, conflict resolution, and motor output. Our six micro-challenge categories each isolate and challenge specific cognitive pathways:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neon-purple font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <h3>Color Reflex (Stroop Effect)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tests inhibitory control and cognitive conflict resolution by displaying mismatched color names and font inks, forcing the brain to suppress automatic reading habits.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <h3>Visual Eagle Eye (Odd Emoji)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Challenges high-density visual scanning and pattern detection. Players must rapidly distinguish subtle visual discrepancies among identical distractors.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neon-blue font-bold text-sm">
                <Clock className="w-4 h-4" />
                <h3>Instant Memory (Number Recall)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strains short-term working memory and phonological loops by flashing multi-digit sequences for under a second, demanding immediate ordered recall.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neon-orange font-bold text-sm">
                <Zap className="w-4 h-4" />
                <h3>Speed Tracker (Dynamic Velocity)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exercises motion perception and spatial tracking across multiple bouncing vectors, measuring your ability to filter noise and lock onto the fastest moving entity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neon-green font-bold text-sm">
                <Brain className="w-4 h-4" />
                <h3>Lightning Math (Mental Calculation)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measures mental computational agility and fast arithmetic retrieval while resisting decoy choices that share similar mathematical properties.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-neon-cyan font-bold text-sm">
                <Award className="w-4 h-4" />
                <h3>Shape Recognition (Geometry & Angle)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Examines rotational invariance, vertex counting, and geometric orientation differentiation in split-second decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Why Trust ONLY 1% CAN WIN? */}
        <section className="p-6 rounded-3xl bg-dark-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-neon-green">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-xl font-black text-white">Our Commitments to You</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
              <span><strong>100% Free Forever:</strong> No microtransactions, paywalls, or gated content. Everyone plays under identical, fair conditions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
              <span><strong>Zero Friction & Privacy First:</strong> No registration, login, or personal profile required. All high scores and streaks are stored locally on your device.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
              <span><strong>Lightning Performance:</strong> Built with clean React and Vite code that loads in milliseconds without bloated libraries or intrusive tracking scripts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
              <span><strong>Transparent Entertainment:</strong> Performance badges (such as "Brain Sleeping" or "Genius") are intended as lighthearted entertainment challenges, not clinical diagnostics.</span>
            </li>
          </ul>
        </section>

        {/* Mid Page Ad Placement */}
        <AdPlacement format="rectangle" />

        {/* Call To Action */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-neon-purple/20 via-dark-850 to-neon-blue/20 border border-neon-purple/40 text-center space-y-4">
          <h2 className="text-2xl font-black text-white">Think you can reach the top 1%?</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            The clock starts at 30 seconds. Every correct tap builds your multiplier streak; every mistake deducts a point.
          </p>
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-neon-purple via-pink-500 to-neon-orange text-white font-black text-sm uppercase tracking-wider shadow-neon-purple hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch 30s Speed Run</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
