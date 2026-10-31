import React from 'react';
import { ChallengeData, ShapeKind } from '../../types/game';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

const renderShapeSvg = (shape: ShapeKind, rotation: number = 0) => {
  const style = { transform: `rotate(${rotation}deg)`, transformOrigin: 'center' };

  switch (shape) {
    case 'triangle':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform" style={style}>
          <polygon points="50,15 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform" style={style}>
          <rect x="18" y="18" width="64" height="64" rx="8" fill="none" stroke="currentColor" strokeWidth="8" />
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform" style={style}>
          <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="8" />
        </svg>
      );
    case 'pentagon':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform" style={style}>
          <polygon points="50,15 90,44 75,90 25,90 10,44" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
        </svg>
      );
    case 'hexagon':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform" style={style}>
          <polygon points="50,12 88,32 88,68 50,88 12,68 12,32" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform" style={style}>
          <polygon points="50,10 61,38 91,38 66,56 75,84 50,67 25,84 34,56 9,38 39,38" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

export const ShapeChallenge: React.FC<Props> = ({ challenge, onAnswer, disabled }) => {
  const { items, count } = challenge.data;
  const gridCols = count === 4 ? 'grid-cols-2' : 'grid-cols-3';

  const handleClick = (isOdd: boolean) => {
    if (disabled) return;
    onAnswer(isOdd);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-sm mx-auto py-2">
      <div className={`grid ${gridCols} gap-3 sm:gap-4 w-full p-3 bg-dark-900/60 rounded-3xl border border-slate-800/80 shadow-2xl`}>
        {items.map((item: any) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.isOdd)}
            disabled={disabled}
            className="aspect-square flex items-center justify-center rounded-2xl bg-dark-800/90 border-2 border-slate-700/60 hover:border-neon-purple active:scale-90 transition-all duration-150 text-neon-purple hover:text-purple-300 shadow-md cursor-pointer hover:shadow-neon-purple/40"
          >
            {renderShapeSvg(item.shape, item.rotation)}
          </button>
        ))}
      </div>
    </div>
  );
};
