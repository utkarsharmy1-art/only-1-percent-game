import React, { useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  timeLeft: number;
  totalTime: number;
}

export const TimerBar: React.FC<Props> = ({ timeLeft, totalTime }) => {
  const percentage = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  const isUrgent = timeLeft <= 5 && timeLeft > 0;
  const lastSecondRef = useRef<number>(Math.ceil(timeLeft));

  // Trigger urgent sound on whole seconds when < 5s
  useEffect(() => {
    const currentSec = Math.ceil(timeLeft);
    if (isUrgent && currentSec !== lastSecondRef.current) {
      lastSecondRef.current = currentSec;
      sound.playUrgentTick();
    }
  }, [timeLeft, isUrgent]);

  return (
    <div className="w-full px-4 pt-3 pb-1 select-none">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-slate-400">
          <Timer className={`w-3.5 h-3.5 ${isUrgent ? 'text-neon-red animate-pulse' : 'text-neon-blue'}`} />
          <span>TIME REMAINING</span>
        </div>
        <div 
          className={`font-mono text-sm font-black transition-colors ${
            isUrgent ? 'text-neon-red animate-pulse scale-110 font-bold' : 'text-slate-200'
          }`}
        >
          {timeLeft.toFixed(1)}s
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full h-3 rounded-full bg-dark-900 border border-slate-800 p-0.5 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-100 ease-linear ${
            isUrgent 
              ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-500 shadow-neon-red animate-pulse' 
              : timeLeft <= 10
              ? 'bg-gradient-to-r from-neon-orange to-amber-500 shadow-neon-orange'
              : 'bg-gradient-to-r from-neon-purple via-indigo-500 to-neon-blue shadow-neon-purple'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
