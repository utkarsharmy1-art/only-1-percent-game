import React from 'react';
import { ChallengeData } from '../../types/game';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const MathChallenge: React.FC<Props> = ({ challenge, onAnswer, disabled }) => {
  const { equation, answer, options } = challenge.data;

  const handleSelect = (selectedAnswer: number) => {
    if (disabled) return;
    onAnswer(selectedAnswer === answer);
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-sm mx-auto py-2">
      {/* Equation display */}
      <div className="flex-1 flex flex-col items-center justify-center my-3 w-full">
        <div className="text-xs uppercase tracking-widest text-neon-blue font-mono mb-2">
          ARITHMETIC PULSE
        </div>
        <div className="text-4xl md:text-5xl font-black tracking-wider text-slate-100 py-4 px-6 rounded-2xl bg-dark-800/90 border border-slate-700/60 shadow-xl text-center">
          {equation}
        </div>
      </div>

      {/* 4 Large Choice Buttons */}
      <div className="grid grid-cols-2 gap-3.5 w-full mt-auto">
        {options.map((opt: number, idx: number) => {
          const accentColors = [
            'hover:border-neon-purple focus:border-neon-purple text-purple-300',
            'hover:border-neon-blue focus:border-neon-blue text-blue-300',
            'hover:border-neon-orange focus:border-neon-orange text-orange-300',
            'hover:border-neon-pink focus:border-neon-pink text-pink-300',
          ];
          const colorClass = accentColors[idx % accentColors.length];

          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              disabled={disabled}
              className={`py-4 md:py-5 px-4 rounded-2xl bg-dark-800 border-2 border-slate-700/60 active:scale-95 transition-all duration-150 flex items-center justify-center font-black text-2xl md:text-3xl shadow-lg active:bg-dark-700 cursor-pointer ${colorClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
