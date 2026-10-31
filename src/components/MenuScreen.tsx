import React from 'react';
import { Play, Calendar, Trophy, Zap, Sparkles, Brain, Eye, Hash, Shapes } from 'lucide-react';
import { getPerformanceTier } from '../utils/storage';

interface Props {
  highScore: number;
  onStartGame: (mode: 'timed-30s' | 'daily') => void;
  onOpenLeaderboard: () => void;
  onOpenDaily: () => void;
}

export const MenuScreen: React.FC<Props> = ({
  highScore,
  onStartGame,
  onOpenLeaderboard,
  onOpenDaily,
}) => {
  const currentTier = getPerformanceTier(highScore);

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-md mx-auto px-4 py-4 select-none">
      {/* Top Banner / Trophy pill */}
      <div className="w-full flex justify-center mb-1">
        <button
          onClick={onOpenLeaderboard}
          className="px-3.5 py-1.5 rounded-full bg-dark-850/90 border border-slate-700/80 hover:border-yellow-500/80 flex items-center gap-2 text-xs font-mono transition-all shadow-md cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-slate-300">BEST:</span>
          <span className="text-yellow-400 font-bold">{highScore} PTS</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">{currentTier.emoji} {currentTier.label}</span>
        </button>
      </div>

      {/* Hero Headline & Neon Branding */}
      <div className="flex flex-col items-center text-center my-auto py-2">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-neon-purple via-indigo-600 to-neon-blue flex items-center justify-center shadow-neon-purple animate-glow-pulse">
            <Zap className="w-10 h-10 text-white fill-white" />
          </div>
          <div className="absolute -top-1 -right-2 px-2 py-0.5 rounded-full bg-neon-orange text-[10px] font-black tracking-widest text-dark-950 uppercase shadow-neon-orange">
            HARD
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange">
            ONLY 1%
          </span>
          <span className="block mt-1 tracking-wider text-3xl sm:text-4xl text-slate-100">
            CAN WIN
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 mt-3 max-w-xs font-medium">
          30 seconds of lightning-fast brain challenges. Can you achieve the top 1% score?
        </p>

        {/* 6 Challenge Types Icons */}
        <div className="grid grid-cols-6 gap-2 w-full max-w-xs mt-4 p-2 rounded-2xl bg-dark-900/60 border border-slate-800">
          <div className="flex flex-col items-center text-[10px] text-slate-400" title="Color Reflex">
            <div className="w-8 h-8 rounded-xl bg-purple-950/70 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono">Color</span>
          </div>

          <div className="flex flex-col items-center text-[10px] text-slate-400" title="Odd Emoji">
            <div className="w-8 h-8 rounded-xl bg-pink-950/70 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Eye className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono">Emoji</span>
          </div>

          <div className="flex flex-col items-center text-[10px] text-slate-400" title="Memory Sequence">
            <div className="w-8 h-8 rounded-xl bg-blue-950/70 border border-neon-blue/40 flex items-center justify-center text-neon-blue">
              <Hash className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono">Memory</span>
          </div>

          <div className="flex flex-col items-center text-[10px] text-slate-400" title="Speed Tracker">
            <div className="w-8 h-8 rounded-xl bg-orange-950/70 border border-neon-orange/40 flex items-center justify-center text-neon-orange">
              <Zap className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono">Speed</span>
          </div>

          <div className="flex flex-col items-center text-[10px] text-slate-400" title="Rapid Math">
            <div className="w-8 h-8 rounded-xl bg-green-950/70 border border-green-500/40 flex items-center justify-center text-neon-green">
              <Brain className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono">Math</span>
          </div>

          <div className="flex flex-col items-center text-[10px] text-slate-400" title="Odd Shape">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-neon-cyan">
              <Shapes className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[9px] font-mono">Shape</span>
          </div>
        </div>
      </div>

      {/* Buttons: Play 30s & Daily Challenge */}
      <div className="w-full flex flex-col gap-3 mt-4">
        {/* Main 30s Play Button */}
        <button
          onClick={() => onStartGame('timed-30s')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-neon-purple via-indigo-600 to-neon-blue hover:from-purple-500 hover:to-blue-500 text-white font-black text-lg md:text-xl tracking-wider uppercase flex items-center justify-center gap-3 shadow-neon-purple active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-white" />
          <span>START 30s RUN</span>
        </button>

        {/* Daily Mode Button */}
        <button
          onClick={onOpenDaily}
          className="w-full py-3.5 px-4 rounded-2xl bg-dark-850 hover:bg-dark-800 border-2 border-slate-700/80 hover:border-neon-orange text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-neon-orange" />
          <span>DAILY CHALLENGE RUN</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-neon-orange/20 text-neon-orange text-[10px] font-mono">
            STREAK
          </span>
        </button>
      </div>

      {/* Micro-rules footer */}
      <div className="text-[11px] text-slate-500 font-mono text-center mt-3 flex items-center justify-center gap-2">
        <span>⏱️ 30s limit</span>
        <span>•</span>
        <span>📈 Harder every 3 wins</span>
        <span>•</span>
        <span>❌ Wrong answer = -1 pt</span>
      </div>
    </div>
  );
};
