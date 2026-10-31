import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Heart, Trash2, Globe, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const Footer: React.FC = () => {
  const [dataCleared, setDataCleared] = useState(false);

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset your local high score and stats on this device?')) {
      try {
        localStorage.removeItem('only1_high_score');
        localStorage.removeItem('only1_player_stats');
        localStorage.removeItem('only1_score_history');
        setDataCleared(true);
        setTimeout(() => {
          setDataCleared(false);
          window.location.reload();
        }, 1200);
      } catch {
        // ignore
      }
    }
  };

  const handleReopenConsent = () => {
    try {
      localStorage.removeItem('only1_cookie_consent');
      window.location.reload();
    } catch {
      // ignore
    }
  };

  return (
    <footer className="w-full bg-dark-950 border-t border-slate-800/80 text-slate-400 select-none mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-md shadow-neon-purple/40">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-base font-black tracking-tight text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">
                  ONLY 1%
                </span>{' '}
                CAN WIN
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              A high-precision cognitive reflex and brain agility mini-game. Test observation, working memory, mathematical processing, and speed against a relentless 30-second clock.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
              <Globe className="w-3.5 h-3.5 text-neon-blue" />
              <a
                href={SITE_CONFIG.productionUrl}
                className="hover:text-slate-300 transition-colors"
                rel="canonical"
              >
                {SITE_CONFIG.productionUrl}
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              Quick Navigation
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-neon-purple transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-neon-purple" />
                  <span>Play 30s Speed Run</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Challenge
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Game Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              Trust & Legal
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Cognitive & Score Disclaimer
                </Link>
              </li>
              <li>
                <button
                  onClick={handleReopenConsent}
                  className="hover:text-slate-200 transition-colors text-left cursor-pointer"
                >
                  Manage Cookie Consent
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-500 text-center sm:text-left">
            <span>© {SITE_CONFIG.currentYear} ONLY 1% CAN WIN. All rights reserved. Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>for speed thinkers worldwide.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              title="Clear scores saved in your browser"
              className="text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>{dataCleared ? 'Scores Cleared!' : 'Reset Device Scores'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
