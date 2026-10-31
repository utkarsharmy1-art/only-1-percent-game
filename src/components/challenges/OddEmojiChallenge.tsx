import React from 'react';
import { ChallengeData } from '../../types/game';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const OddEmojiChallenge: React.FC<Props> = ({ challenge, onAnswer, disabled }) => {
  const { emojis, count } = challenge.data;

  // Choose column layout based on count:
  // 9 -> 3 cols
  // 12 -> 3 or 4 cols
  // 16 -> 4 cols
  const gridClass = count === 9 
    ? 'grid-cols-3' 
    : count === 12 
    ? 'grid-cols-4' 
    : 'grid-cols-4';

  const handleClick = (isOdd: boolean) => {
    if (disabled) return;
    onAnswer(isOdd);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-sm mx-auto py-2">
      <div className={`grid ${gridClass} gap-2.5 sm:gap-3 w-full p-2 bg-dark-900/60 rounded-3xl border border-slate-800/80 shadow-2xl`}>
        {emojis.map((item: any) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.isOdd)}
            disabled={disabled}
            className="aspect-square flex items-center justify-center rounded-2xl bg-dark-800/80 border border-slate-700/40 hover:border-neon-purple/70 active:scale-90 hover:scale-105 transition-transform duration-150 text-3xl sm:text-4xl shadow-md cursor-pointer"
          >
            {item.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
