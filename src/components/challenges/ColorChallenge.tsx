import React from 'react';
import { ChallengeData } from '../../types/game';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const ColorChallenge: React.FC<Props> = ({ challenge, onAnswer, disabled }) => {
  const { displayText, displayInk, targetAnswer, isNegationMode, options } = challenge.data;

  const handleSelect = (optionId: string) => {
    if (disabled) return;
    
    if (isNegationMode) {
      // Correct if they did NOT tap the forbidden color
      const forbidden = targetAnswer.replace('NOT_', '');
      const isCorrect = optionId !== forbidden;
      onAnswer(isCorrect);
    } else {
      const isCorrect = optionId === targetAnswer;
      onAnswer(isCorrect);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-sm mx-auto py-2">
      {/* Target Word Display */}
      <div className="flex-1 flex flex-col items-center justify-center my-3 w-full">
        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-mono">
          {isNegationMode ? 'FORBIDDEN TARGET' : 'WORD PROMPT'}
        </div>
        <div 
          className="text-4xl md:text-5xl font-black tracking-wider py-4 px-8 rounded-2xl bg-dark-800/90 border border-slate-700/60 shadow-xl transition-transform transform scale-100 hover:scale-105"
          style={{ color: displayInk, textShadow: `0 0 25px ${displayInk}66` }}
        >
          {displayText}
        </div>
      </div>

      {/* 4 Large Touch Buttons */}
      <div className="grid grid-cols-2 gap-3.5 w-full mt-auto">
        {options.map((opt: any) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            disabled={disabled}
            className="py-4 md:py-5 px-4 rounded-2xl bg-dark-800 border-2 border-slate-700/60 hover:border-neon-purple active:scale-95 transition-all duration-150 flex items-center justify-center font-bold text-lg md:text-xl shadow-lg active:bg-dark-700 select-none cursor-pointer"
            style={{
              color: opt.textColor,
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};
