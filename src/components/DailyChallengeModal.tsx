import React from 'react';
import { X, Calendar, Flame, Trophy, Play } from 'lucide-react';
import { loadPlayerStats, getTodayDateString } from '../utils/storage';

interface Props {
  onClose: () => void;
  onStartDaily: () => void;
}

export const DailyChallengeModal: React.FC<Props> = ({ onClose, onStartDaily }) => {
  const stats = loadPlayerStats();
  const today = getTodayDateString();
  const playedToday = stats.lastDailyDate === today;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-sm bg-dark-900 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Icon */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-neon-orange to-amber-500 flex items-center justify-center text-white shadow-neon-orange mt-2 mb-3">
          <Calendar className="w-8 h-8" />
        </div>

        <div className="text-xs uppercase font-mono tracking-widest text-neon-orange font-bold">
          DAILY SPECIAL RUN
        </div>
        <h2 className="text-2xl font-black text-white mt-1">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </h2>
        <p className="text-xs text-slate-400 mt-2 px-2">
          Compete on today's speed challenge! Maintain your daily streak and earn legendary bragging rights.
        </p>

        {/* Streak & Best Card */}
        <div className="grid grid-cols-2 gap-2 w-full mt-4">
          <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Flame className="w-3.5 h-3.5 text-neon-orange" />
              <span>STREAK</span>
            </div>
            <div className="text-xl font-black text-neon-orange font-mono mt-1">
              {stats.dailyStreak} {stats.dailyStreak === 1 ? 'day' : 'days'}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>TODAY'S BEST</span>
            </div>
            <div className="text-xl font-black text-yellow-400 font-mono mt-1">
              {playedToday ? `${stats.dailyBestScore} pts` : '-'}
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <div className="mt-4 py-2 px-3 rounded-xl bg-dark-800 border border-slate-700/60 text-xs text-slate-300 font-mono">
          {playedToday 
            ? '✅ Completed today! You can replay to beat your daily score.' 
            : '⏳ Ready for today\'s attempt! 30 seconds on the clock.'}
        </div>

        {/* Start Button */}
        <button
          onClick={() => {
            onClose();
            onStartDaily();
          }}
          className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-neon-orange via-amber-500 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-dark-950 font-black text-sm flex items-center justify-center gap-2 shadow-neon-orange active:scale-95 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-dark-950" />
          <span>{playedToday ? 'REPLAY TODAY\'S RUN' : 'START TODAY\'S RUN'}</span>
        </button>
      </div>
    </div>
  );
};
