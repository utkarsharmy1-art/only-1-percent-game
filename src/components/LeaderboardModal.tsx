import React from 'react';
import { X, Trophy, Flame, Target, Calendar, Award, History } from 'lucide-react';
import { loadPlayerStats, loadScoreHistory, getPerformanceTier } from '../utils/storage';

interface Props {
  onClose: () => void;
  onPlayMode: (mode: 'timed-30s' | 'daily') => void;
}

export const LeaderboardModal: React.FC<Props> = ({ onClose, onPlayMode }) => {
  const stats = loadPlayerStats();
  const history = loadScoreHistory();
  const overallTier = getPerformanceTier(stats.highScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-dark-900 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h2 className="text-base font-black text-slate-100 uppercase tracking-wider">
              Personal Best & Stats
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto space-y-4 py-3 pr-1 text-left">
          {/* Main Tier Highlight Card */}
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${overallTier.bgGlow} border flex items-center justify-between`}>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                ALL-TIME HIGH SCORE
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {stats.highScore} <span className="text-sm font-sans font-normal text-slate-300">points</span>
              </div>
              <div className="text-xs font-bold text-yellow-300 flex items-center gap-1 mt-0.5">
                <span>{overallTier.emoji} {overallTier.label}</span>
                <span>•</span>
                <span>{overallTier.percentile}</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-dark-900/60 border border-yellow-400/30 flex items-center justify-center text-3xl shadow-inner">
              {overallTier.emoji}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <History className="w-3.5 h-3.5 text-neon-blue" />
                <span>Runs Played</span>
              </div>
              <div className="text-xl font-black text-slate-100 font-mono mt-1">
                {stats.gamesPlayed}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Flame className="w-3.5 h-3.5 text-neon-orange" />
                <span>Best Combo</span>
              </div>
              <div className="text-xl font-black text-neon-orange font-mono mt-1">
                {stats.bestStreak}x
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Target className="w-3.5 h-3.5 text-neon-green" />
                <span>Solved Puzzles</span>
              </div>
              <div className="text-xl font-black text-neon-green font-mono mt-1">
                {stats.totalCorrect}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-neon-purple" />
                <span>Daily Streak</span>
              </div>
              <div className="text-xl font-black text-purple-300 font-mono mt-1">
                {stats.dailyStreak} {stats.dailyStreak === 1 ? 'day' : 'days'}
              </div>
            </div>
          </div>

          {/* History List */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-neon-purple" />
                Recent Games
              </span>
              <span>{history.length} recorded</span>
            </div>

            {history.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500 font-mono">
                No games played yet! Tap below to start your first speed run.
              </div>
            ) : (
              <div className="space-y-1.5 max-h-44 overflow-y-auto">
                {history.map((rec, i) => (
                  <div
                    key={rec.id || i}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-dark-850 border border-slate-800/80 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500 w-4">#{i + 1}</span>
                      <span className="font-bold text-slate-200">{rec.tier}</span>
                      {rec.mode === 'daily' && (
                        <span className="px-1.5 py-0.2 rounded bg-neon-purple/20 text-neon-purple text-[10px] font-mono">
                          Daily
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-slate-400 text-[11px]">{rec.date}</span>
                      <span className="font-black text-white text-sm">{rec.score} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-800 flex gap-2">
          <button
            onClick={() => {
              onClose();
              onPlayMode('timed-30s');
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue hover:from-purple-500 hover:to-blue-500 text-white font-black text-xs md:text-sm shadow-neon-purple active:scale-95 transition-all cursor-pointer text-center"
          >
            PLAY SPEED RUN
          </button>
        </div>
      </div>
    </div>
  );
};
