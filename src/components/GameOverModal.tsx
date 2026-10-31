import React, { useState, useEffect } from 'react';
import { RotateCcw, Share2, Copy, Check, Trophy, Flame, Zap, Award, Target } from 'lucide-react';
import { getPerformanceTier } from '../utils/storage';
import { fireHighScoreConfetti, fireBurstConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';

interface Props {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  highestStreak: number;
  isNewHigh: boolean;
  highScore: number;
  avgReactionTimeMs: number;
  onPlayAgain: () => void;
  onOpenLeaderboard: () => void;
}

export const GameOverModal: React.FC<Props> = ({
  score,
  correctAnswers,
  wrongAnswers,
  highestStreak,
  isNewHigh,
  highScore,
  avgReactionTimeMs,
  onPlayAgain,
  onOpenLeaderboard,
}) => {
  const [copied, setCopied] = useState(false);
  const tier = getPerformanceTier(score);
  const totalAttempts = correctAnswers + wrongAnswers;
  const accuracy = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

  useEffect(() => {
    if (isNewHigh && score > 0) {
      sound.playHighScore();
      fireHighScoreConfetti();
    } else {
      sound.playGameOver();
      fireBurstConfetti(0.5, 0.4);
    }
  }, [isNewHigh, score]);

  const shareText = `⚡ I scored ${score} in "ONLY 1% CAN WIN"!
${tier.emoji} Rank: ${tier.label} (${tier.percentile})
🔥 Streak: ${highestStreak}x | 🎯 Accuracy: ${accuracy}%
Can you beat me? Only 1% of players reach the top score! 🏆`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      sound.playTap();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsAppShare = () => {
    sound.playTap();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    sound.playTap();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'ONLY 1% CAN WIN — Brain & Reflex Challenge',
          text: shareText,
        });
      } catch {
        // Share cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md overflow-y-auto animate-pop select-none">
      <div className="relative w-full max-w-md my-auto bg-dark-900 border-2 border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl overflow-hidden flex flex-col items-center text-center">
        {/* Glow ambient background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl pointer-events-none" />

        {/* New High Score Pill */}
        {isNewHigh && score > 0 && (
          <div className="mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 text-dark-950 font-black text-xs tracking-wider uppercase shadow-neon-orange animate-bounce-short flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>NEW ALL-TIME RECORD!</span>
          </div>
        )}

        {/* Final Score Circle */}
        <div className="text-xs uppercase tracking-widest font-mono text-slate-400 mb-1">
          FINAL SCORE
        </div>
        <div className="text-6xl md:text-7xl font-black font-mono text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          {score}
        </div>

        {/* Performance Tier Badge */}
        <div className={`mt-3 w-full py-3 px-4 rounded-2xl bg-gradient-to-br ${tier.bgGlow} border flex flex-col items-center justify-center shadow-lg`}>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{tier.emoji}</span>
            <span className={`text-xl md:text-2xl font-black ${tier.color}`}>
              {tier.label}
            </span>
          </div>
          <div className="text-xs font-mono font-bold tracking-widest uppercase mt-0.5 text-slate-300">
            {tier.rankTitle} • <span className="text-yellow-400">{tier.percentile}</span>
          </div>
          <p className="text-xs text-slate-300 mt-1.5 italic font-medium">
            "{tier.comment}"
          </p>
        </div>

        {/* Detailed Stats Row */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          <div className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Target className="w-3 h-3 text-neon-cyan" />
              <span>ACCURACY</span>
            </div>
            <div className="text-base font-black text-slate-100 font-mono mt-0.5">
              {accuracy}%
            </div>
            <div className="text-[10px] text-slate-500">
              {correctAnswers}/{totalAttempts}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Flame className="w-3 h-3 text-neon-orange" />
              <span>MAX STREAK</span>
            </div>
            <div className="text-base font-black text-neon-orange font-mono mt-0.5">
              {highestStreak}x
            </div>
            <div className="text-[10px] text-slate-500">
              Combo
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Zap className="w-3 h-3 text-neon-purple" />
              <span>SPEED</span>
            </div>
            <div className="text-base font-black text-neon-purple-glow font-mono mt-0.5">
              {avgReactionTimeMs > 0 ? (avgReactionTimeMs / 1000).toFixed(2) + 's' : '-'}
            </div>
            <div className="text-[10px] text-slate-500">
              Avg Reaction
            </div>
          </div>
        </div>

        {/* Viral Sharing Buttons */}
        <div className="w-full flex flex-col gap-2 mt-4">
          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-extrabold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 active:scale-95 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Copy Result Button & Native Share */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className={`py-3 px-3 rounded-2xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                copied 
                  ? 'bg-neon-green/20 border-neon-green text-neon-green' 
                  : 'bg-dark-850 border-slate-700/80 hover:border-slate-500 text-slate-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied! 🎉</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Result</span>
                </>
              )}
            </button>

            <button
              onClick={handleNativeShare}
              className="py-3 px-3 rounded-2xl bg-dark-850 border border-slate-700/80 hover:border-slate-500 text-slate-200 flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-neon-purple" />
              <span>Brag & Challenge</span>
            </button>
          </div>
        </div>

        {/* Primary Action Buttons: Play Again & Leaderboard */}
        <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={onOpenLeaderboard}
            className="col-span-1 py-3 px-3 rounded-2xl bg-dark-800 border border-slate-700 hover:border-yellow-500 text-yellow-400 font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <Trophy className="w-4 h-4 fill-yellow-400" />
            <span>Personal Best ({highScore})</span>
          </button>

          <button
            onClick={onPlayAgain}
            className="col-span-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-neon-purple via-indigo-600 to-neon-blue hover:from-purple-500 hover:to-blue-500 text-white font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-neon-purple active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
