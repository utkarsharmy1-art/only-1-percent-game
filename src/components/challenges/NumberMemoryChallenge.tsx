import React, { useState, useEffect } from 'react';
import { ChallengeData } from '../../types/game';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const NumberMemoryChallenge: React.FC<Props> = ({ challenge, onAnswer, disabled }) => {
  const { sequence, displayDurationMs, digits } = challenge.data;
  const [isMemorizing, setIsMemorizing] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    setIsMemorizing(true);
    setUserInput([]);
    setFailed(false);

    const timer = setTimeout(() => {
      setIsMemorizing(false);
    }, displayDurationMs);

    return () => clearTimeout(timer);
  }, [challenge.id, displayDurationMs]);

  const handleDigitTap = (digit: number) => {
    if (disabled || isMemorizing || failed) return;

    const nextIndex = userInput.length;
    const expected = sequence[nextIndex];

    if (digit === expected) {
      const nextInput = [...userInput, digit];
      setUserInput(nextInput);

      if (nextInput.length === sequence.length) {
        // Successfully recalled full sequence!
        onAnswer(true);
      }
    } else {
      // Wrong digit
      setFailed(true);
      setUserInput(prev => [...prev, digit]);
      onAnswer(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-sm mx-auto py-2">
      {/* Sequence Display or Slots */}
      <div className="flex-1 flex flex-col items-center justify-center my-2 w-full">
        {isMemorizing ? (
          <div className="flex flex-col items-center justify-center animate-pulse">
            <div className="text-xs uppercase tracking-widest text-neon-orange font-mono mb-2">
              MEMORIZE NOW!
            </div>
            <div className="flex items-center gap-3">
              {sequence.map((num: number, idx: number) => (
                <div
                  key={idx}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-dark-800 border-2 border-neon-orange flex items-center justify-center text-3xl md:text-4xl font-black text-neon-orange shadow-neon-orange"
                >
                  {num}
                </div>
              ))}
            </div>
            {/* Countdown bar */}
            <div className="w-40 h-1.5 bg-dark-800 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-neon-orange transition-all ease-linear"
                style={{
                  width: '100%',
                  animation: `shrinkWidth ${displayDurationMs}ms linear forwards`
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-widest text-neon-blue font-mono mb-2">
              ENTER IN ORDER:
            </div>
            <div className="flex items-center gap-2.5">
              {sequence.map((_num: number, idx: number) => {
                const filled = userInput[idx] !== undefined;
                const isErr = failed && idx === userInput.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black transition-all ${
                      isErr 
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-300 animate-shake' 
                        : filled 
                        ? 'bg-neon-green/20 border-2 border-neon-green text-neon-green shadow-neon-green' 
                        : 'bg-dark-800 border-2 border-slate-700/60 text-slate-500'
                    }`}
                  >
                    {filled ? userInput[idx] : '·'}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3x3 Keypad (1 - 9) */}
      <div className={`grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-[280px] transition-opacity duration-200 ${isMemorizing ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        {digits.map((d: number) => (
          <button
            key={d}
            onClick={() => handleDigitTap(d)}
            disabled={disabled || isMemorizing}
            className="h-12 md:h-14 rounded-xl bg-dark-800/90 border border-slate-700/70 hover:border-neon-blue active:bg-neon-blue/20 active:scale-95 transition-all text-xl font-black text-slate-100 shadow-md cursor-pointer flex items-center justify-center"
          >
            {d}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};
