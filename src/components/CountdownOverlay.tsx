import React, { useEffect, useState } from 'react';
import { sound } from '../utils/sound';

interface Props {
  onComplete: () => void;
}

export const CountdownOverlay: React.FC<Props> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    sound.playCountdownTick(false);

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          sound.playCountdownTick(true);
          return 0; // "GO!"
        }
        if (prev === 0) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        sound.playCountdownTick(false);
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/90 backdrop-blur-md select-none">
      <div key={count} className="animate-countdown flex flex-col items-center">
        {count > 0 ? (
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-neon-purple via-pink-400 to-neon-orange drop-shadow-[0_0_35px_rgba(168,85,247,0.8)]">
            {count}
          </div>
        ) : (
          <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-300 to-cyan-400 drop-shadow-[0_0_40px_rgba(34,197,94,0.9)]">
            GO!
          </div>
        )}
        <div className="mt-4 text-xs font-mono tracking-widest text-slate-400 uppercase">
          FOCUS & BE FAST!
        </div>
      </div>
    </div>
  );
};
