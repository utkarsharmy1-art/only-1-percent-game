import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, X } from 'lucide-react';

const CONSENT_KEY = 'only1_cookie_consent';

export type ConsentStatus = 'accepted' | 'essential' | 'pending';

export const CookieConsent: React.FC = () => {
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null;
      if (saved) {
        setStatus(saved);
        setIsVisible(false);
      } else {
        // Show after a brief delay so it doesn't jarringly block the page load
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore
    }
    setStatus(choice);
    setIsVisible(false);
  };

  if (!isVisible || status !== 'pending') {
    return null;
  }

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-dark-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl transition-all animate-pop select-none"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Information text */}
        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-xl bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple flex-shrink-0 mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-white block sm:inline sm:mr-1">
              Privacy & Local Data Notice:
            </span>
            We use browser local storage to save your game scores, streak records, and audio preferences directly on your device. We do not sell your personal data. When third-party advertising partners (such as Google AdSense) are active, they may use cookies to serve relevant advertisements. Read our{' '}
            <Link
              to="/privacy-policy"
              className="text-neon-purple hover:underline font-semibold"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              to="/terms"
              className="text-neon-purple hover:underline font-semibold"
            >
              Terms of Service
            </Link>{' '}
            for full details.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-shrink-0">
          <button
            onClick={() => handleChoice('essential')}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Essential Only</span>
          </button>

          <button
            onClick={() => handleChoice('accepted')}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold shadow-neon-purple transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
