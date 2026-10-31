import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Play, Home, HelpCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-16 px-4 text-center select-none">
      <SEO
        title="Page Not Found (404)"
        description="The page you requested could not be found. Return to ONLY 1% CAN WIN home page."
        path="/404"
      />

      <div className="max-w-md w-full p-8 rounded-3xl bg-dark-900 border border-slate-800 space-y-6 shadow-2xl">
        <div className="text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange tracking-tight">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Challenge Not Found!</h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The page or route you were looking for doesn't exist, was renamed, or took a wrong turn at speed.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-blue hover:from-purple-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-purple transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play 30s Game</span>
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>About Us</span>
          </Link>
        </div>

        <div className="pt-2 text-xs text-slate-500 font-mono flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Need help? Visit our <Link to="/contact" className="text-neon-purple hover:underline">Contact Page</Link></span>
        </div>
      </div>
    </div>
  );
};
