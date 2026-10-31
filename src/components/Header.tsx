import React from 'react';
import { Volume2, VolumeX, Trophy, Zap, Calendar } from 'lucide-react';

interface Props {
  isMuted: boolean;
  onToggleMute: () => void;
  highScore: number;
  onOpenLeaderboard: () => void;
  onOpenDaily: () => void;
  isDailyMode?: boolean;
}

export const Header: React.FC<Props> = ({
  isMuted,
  onToggleMute,
  highScore,
  onOpenLeaderboard,
  onOpenDaily,
  isDailyMode
}) => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-dark-900/80 backdrop-blur-md border-b border-slate-800/80 select-none z-20">
      {/* Brand logo & tagline */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-neon-purple/50 shadow-md">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <div>
          <div className="text-sm font-black tracking-tight flex items-center gap-1.5 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-pink-400 to-neon-orange font-black">
              ONLY 1%
            </span>
            <span className="text-slate-300 text-xs font-semibold">CAN WIN</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-wider">
            {isDailyMode ? '📅 DAILY SPECIAL RUN' : '⚡ 30s SPEED RUN'}
          </div>
        </div>
      </div>

      {/* Action controls */}
      <div className="flex items-center gap-2">
        {/* Daily challenge button */}
        <button
          onClick={onOpenDaily}
          title="Daily Challenge"
          className="p-2 rounded-xl bg-dark-800 border border-slate-700/60 hover:border-neon-orange text-slate-300 hover:text-neon-orange transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          <Calendar className="w-4 h-4 text-neon-orange" />
          <span className="hidden sm:inline">Daily</span>
        </button>

        {/* High score / Leaderboard button */}
        <button
          onClick={onOpenLeaderboard}
          title="High Score & Stats"
          className="px-2.5 py-1.5 rounded-xl bg-dark-800 border border-slate-700/60 hover:border-yellow-500 text-yellow-400 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span>{highScore}</span>
        </button>

        {/* Audio Mute / Unmute */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="p-2 rounded-xl bg-dark-800 border border-slate-700/60 hover:border-slate-500 text-slate-300 transition-all cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-neon-purple" />
          )}
        </button>
      </div>
    </header>
  );
};
