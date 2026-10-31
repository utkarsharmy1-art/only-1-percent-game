import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Trophy, Volume2, VolumeX } from 'lucide-react';
import { loadHighScore } from '../utils/storage';

interface NavbarProps {
  isMuted?: boolean;
  onToggleMute?: () => void;
  onOpenLeaderboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  onOpenLeaderboard,
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const highScore = loadHighScore();

  const navItems = [
    { label: 'Play Game', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Disclaimer', path: '/disclaimer' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-950/90 backdrop-blur-md border-b border-slate-800/80 select-none">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-neon-purple via-pink-500 to-neon-orange flex items-center justify-center shadow-md shadow-neon-purple/40 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight leading-none flex items-center gap-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange font-black">
                ONLY 1%
              </span>
              <span className="text-slate-200 text-xs font-bold tracking-wider">CAN WIN</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono tracking-wider">
              REACTION SPEED TEST
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-900/60 border border-slate-800/80 rounded-2xl px-2 py-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-white border border-neon-purple/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-dark-800/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          {/* High Score Pill (opens modal if on home, or displays score) */}
          {onOpenLeaderboard ? (
            <button
              onClick={onOpenLeaderboard}
              title="Personal Best High Score"
              className="px-2.5 py-1.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-yellow-500 text-yellow-400 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Trophy className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-mono">{highScore}</span>
            </button>
          ) : (
            <Link
              to="/"
              title="Personal Best High Score"
              className="px-2.5 py-1.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-yellow-500 text-yellow-400 flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm"
            >
              <Trophy className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-mono">{highScore}</span>
            </Link>
          )}

          {/* Audio toggle button if handler provided */}
          {onToggleMute !== undefined && (
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-2 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-600 text-slate-300 transition-all cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-neon-purple" />
              )}
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-dark-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/95 border-b border-slate-800 px-4 py-4 space-y-2 animate-pop">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive(item.path)
                  ? 'bg-neon-purple/20 text-white border border-neon-purple/40'
                  : 'text-slate-300 hover:bg-dark-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-xs text-slate-400">
            <Link
              to="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-1.5 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-1.5 hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
