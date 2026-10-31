import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface Props {
  score: number;
  streak: number;
  difficulty: number;
  lastFeedback: { text: string; isPositive: boolean; key: number } | null;
}

export const ScoreHeader: React.FC<Props> = ({ score, streak, difficulty, lastFeedback }) => {
  return (
    <div className="w-full px-4 py-2 flex items-center justify-between select-none">
      {/* Score with floating feedback pop */}
      <div className="relative flex items-baseline gap-1.5">
        <span className="text-xs uppercase font-mono text-slate-400 font-bold">SCORE:</span>
        <span className="text-3xl font-black tracking-tight text-white font-mono">
          {score}
        </span>

        {/* Floating feedback animation (+1 / -1) */}
        {lastFeedback && (
          <div
            key={lastFeedback.key}
            className={`absolute -top-3 left-16 text-sm font-black font-mono animate-pop pointer-events-none px-1.5 py-0.5 rounded-md ${
              lastFeedback.isPositive 
                ? 'text-neon-green bg-green-950/80 border border-green-500/40 shadow-neon-green' 
                : 'text-rose-400 bg-rose-950/80 border border-rose-500/40 shadow-neon-red'
            }`}
          >
            {lastFeedback.text}
          </div>
        )}
      </div>

      {/* Streak and Level Badges */}
      <div className="flex items-center gap-2">
        {/* Streak badge */}
        {streak >= 2 && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-950/70 border border-neon-orange/60 text-neon-orange text-xs font-black animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-neon-orange" />
            <span>{streak}x STREAK</span>
          </div>
        )}

        {/* Difficulty Level */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-950/70 border border-neon-purple/50 text-purple-300 text-xs font-mono font-bold">
          <Sparkles className="w-3 h-3 text-neon-purple" />
          <span>LVL {difficulty}</span>
        </div>
      </div>
    </div>
  );
};
