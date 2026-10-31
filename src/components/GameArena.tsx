import React from 'react';
import { ChallengeData } from '../types/game';
import { ColorChallenge } from './challenges/ColorChallenge';
import { OddEmojiChallenge } from './challenges/OddEmojiChallenge';
import { NumberMemoryChallenge } from './challenges/NumberMemoryChallenge';
import { FastestObjectChallenge } from './challenges/FastestObjectChallenge';
import { MathChallenge } from './challenges/MathChallenge';
import { ShapeChallenge } from './challenges/ShapeChallenge';
import { Sparkles } from 'lucide-react';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  isShaking: boolean;
  disabled?: boolean;
}

export const GameArena: React.FC<Props> = ({ challenge, onAnswer, isShaking, disabled }) => {
  const renderChallengeComponent = () => {
    switch (challenge.type) {
      case 'color-match':
        return <ColorChallenge challenge={challenge} onAnswer={onAnswer} disabled={disabled} />;
      case 'odd-emoji':
        return <OddEmojiChallenge challenge={challenge} onAnswer={onAnswer} disabled={disabled} />;
      case 'number-memory':
        return <NumberMemoryChallenge challenge={challenge} onAnswer={onAnswer} disabled={disabled} />;
      case 'fastest-object':
        return <FastestObjectChallenge challenge={challenge} onAnswer={onAnswer} disabled={disabled} />;
      case 'math-puzzle':
        return <MathChallenge challenge={challenge} onAnswer={onAnswer} disabled={disabled} />;
      case 'different-shape':
        return <ShapeChallenge challenge={challenge} onAnswer={onAnswer} disabled={disabled} />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex-1 flex flex-col items-center justify-between w-full max-w-md mx-auto px-4 py-2 transition-all ${isShaking ? 'animate-shake' : ''}`}>
      {/* Challenge Title & Instruction Bar */}
      <div className="w-full text-center py-2 px-3 rounded-2xl bg-dark-850/80 border border-slate-800 shadow-sm flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-neon-purple flex-shrink-0" />
        <span className="text-xs sm:text-sm font-bold text-slate-200">
          {challenge.prompt}
        </span>
      </div>

      {/* Challenge Content Area */}
      <div className="flex-1 w-full flex items-center justify-center py-2">
        {renderChallengeComponent()}
      </div>
    </div>
  );
};
