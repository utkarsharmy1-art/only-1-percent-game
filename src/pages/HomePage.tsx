import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GamePhase, GameMode, ChallengeData } from '../types/game';
import { sound } from '../utils/sound';
import { loadHighScore, saveGameResult } from '../utils/storage';
import { generateNextChallenge } from '../utils/challenges';
import { Header } from '../components/Header';
import { MenuScreen } from '../components/MenuScreen';
import { TimerBar } from '../components/TimerBar';
import { ScoreHeader } from '../components/ScoreHeader';
import { GameArena } from '../components/GameArena';
import { CountdownOverlay } from '../components/CountdownOverlay';
import { GameOverModal } from '../components/GameOverModal';
import { LeaderboardModal } from '../components/LeaderboardModal';
import { DailyChallengeModal } from '../components/DailyChallengeModal';
import { SEO } from '../components/SEO';
import { AdPlacement } from '../components/AdPlacement';
import { Brain, Trophy, Zap } from 'lucide-react';

const TOTAL_TIME = 30.0;

export const HomePage: React.FC = () => {
  // Navigation & Modals
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('timed-30s');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Game Stats
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(loadHighScore());
  const [isNewHigh, setIsNewHigh] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(1);

  // Time & Reaction Tracking
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const reactionTimesRef = useRef<number[]>([]);
  const challengeStartTimestampRef = useRef<number>(0);

  // Challenge State
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeData | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<{ text: string; isPositive: boolean; key: number } | null>(null);

  // Animation / Timer Refs
  const timerIntervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Toggle Mute
  const handleToggleMute = () => {
    const updated = sound.toggleMute();
    setIsMuted(updated);
  };

  // Start Countdown for a game
  const handleStartGame = (mode: GameMode = 'timed-30s') => {
    sound.playTap();
    setGameMode(mode);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setStreak(0);
    setHighestStreak(0);
    setDifficulty(1);
    setTimeLeft(TOTAL_TIME);
    reactionTimesRef.current = [];
    setIsNewHigh(false);
    setLastFeedback(null);

    // Initial challenge
    const firstChallenge = generateNextChallenge(1);
    setCurrentChallenge(firstChallenge);

    setPhase('countdown');
  };

  // End Game handler
  const handleGameOver = useCallback(() => {
    if (!isPlayingRef.current) return;
    isPlayingRef.current = false;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const times = reactionTimesRef.current;
    const avgReactionTime = times.length > 0 
      ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) 
      : 0;

    const { isNewHigh: newHighCreated, stats } = saveGameResult(
      score,
      correctAnswers,
      wrongAnswers,
      highestStreak,
      avgReactionTime,
      gameMode
    );

    setIsNewHigh(newHighCreated);
    setHighScore(stats.highScore);
    setPhase('gameover');
  }, [score, correctAnswers, wrongAnswers, highestStreak, gameMode]);

  // Launch round after countdown
  const handleCountdownComplete = () => {
    setPhase('playing');
    isPlayingRef.current = true;
    challengeStartTimestampRef.current = Date.now();

    const startTime = performance.now();
    const duration = TOTAL_TIME * 1000;

    timerIntervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timerIntervalRef.current!);
        timerIntervalRef.current = null;
        handleGameOver();
      }
    }, 50);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Answer handler
  const handleAnswer = (isCorrect: boolean) => {
    if (phase !== 'playing') return;

    // Track reaction time
    const reactionTime = Date.now() - challengeStartTimestampRef.current;
    reactionTimesRef.current.push(reactionTime);

    if (isCorrect) {
      // Correct
      const newScore = score + 1;
      const newCorrect = correctAnswers + 1;
      const newStreak = streak + 1;

      setScore(newScore);
      setCorrectAnswers(newCorrect);
      setStreak(newStreak);
      setHighestStreak(prev => Math.max(prev, newStreak));

      sound.playSuccess(newStreak);
      setLastFeedback({ text: '+1', isPositive: true, key: Date.now() });

      // Difficulty increases every 3 successful challenges
      const newDifficulty = Math.floor(newCorrect / 3) + 1;
      if (newDifficulty > difficulty) {
        setDifficulty(newDifficulty);
        sound.playLevelUp();
      }

      // Next challenge
      const nextChallenge = generateNextChallenge(newDifficulty, currentChallenge?.type);
      setCurrentChallenge(nextChallenge);
      challengeStartTimestampRef.current = Date.now();
    } else {
      // Wrong answer reduces score (min 0)
      const newScore = Math.max(0, score - 1);
      setScore(newScore);
      setWrongAnswers(prev => prev + 1);
      setStreak(0);

      sound.playError();
      setLastFeedback({ text: '-1', isPositive: false, key: Date.now() });

      // Trigger shake
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);

      // Give new challenge on wrong answer as well so user is not stuck
      const nextChallenge = generateNextChallenge(difficulty, currentChallenge?.type);
      setCurrentChallenge(nextChallenge);
      challengeStartTimestampRef.current = Date.now();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <SEO
        title="ONLY 1% CAN WIN"
        description="Fast-paced 30-second cognitive reaction and brain challenge mini-game. Test observation, memory, speed, and mental agility."
        path="/"
      />

      {/* Main Game Card */}
      <div className="w-full max-w-lg mx-auto py-2 sm:py-4 px-2 sm:px-4">
        {/* Game Container with glowing border */}
        <div className="relative w-full rounded-3xl bg-dark-900/90 border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[580px]">
          {/* Header Bar */}
          <Header
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            highScore={highScore}
            onOpenLeaderboard={() => {
              sound.playTap();
              setIsLeaderboardOpen(true);
            }}
            onOpenDaily={() => {
              sound.playTap();
              setIsDailyOpen(true);
            }}
            isDailyMode={gameMode === 'daily'}
          />

          {/* Game Views */}
          <div className="flex-1 flex flex-col w-full relative z-10">
            {phase === 'menu' && (
              <MenuScreen
                highScore={highScore}
                onStartGame={handleStartGame}
                onOpenLeaderboard={() => {
                  sound.playTap();
                  setIsLeaderboardOpen(true);
                }}
                onOpenDaily={() => {
                  sound.playTap();
                  setIsDailyOpen(true);
                }}
              />
            )}

            {(phase === 'playing' || phase === 'countdown') && (
              <div className="flex-1 flex flex-col w-full">
                <TimerBar timeLeft={timeLeft} totalTime={TOTAL_TIME} />
                <ScoreHeader
                  score={score}
                  streak={streak}
                  difficulty={difficulty}
                  lastFeedback={lastFeedback}
                />

                {currentChallenge && (
                  <GameArena
                    challenge={currentChallenge}
                    onAnswer={handleAnswer}
                    isShaking={isShaking}
                    disabled={phase === 'countdown'}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Ad Placement (Separated from game buttons) */}
      <div className="w-full max-w-3xl px-4 mt-2">
        <AdPlacement format="leaderboard" />
      </div>

      {/* Educational & Guide Content (SEO & AdSense Quality Depth) */}
      <div className="w-full max-w-3xl px-4 sm:px-6 py-8 space-y-8 text-left">
        {/* Section 1: Overview */}
        <section className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-neon-purple">
            <Zap className="w-5 h-5" />
            <h2 className="text-xl font-black text-white">How to Play "ONLY 1% CAN WIN"</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>ONLY 1% CAN WIN</strong> puts your visual reflexes, working memory, and rapid decision-making to the ultimate test in a continuous 30-second sprint. Every round serves a randomized cognitive micro-puzzle designed to deceive your instinctive habits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-neon-orange font-mono font-bold text-xs uppercase block">01. 30s Limit</span>
              <p className="text-xs text-slate-400 mt-1">Solve as many puzzles as possible before the clock expires.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-neon-purple font-mono font-bold text-xs uppercase block">02. Progressive</span>
              <p className="text-xs text-slate-400 mt-1">Difficulty scales up after every 3 successful answers.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-neon-green font-mono font-bold text-xs uppercase block">03. High Precision</span>
              <p className="text-xs text-slate-400 mt-1">Mistakes deduct 1 point and break your combo multiplier.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Six Micro-Challenges */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-neon-blue">
            <Brain className="w-5 h-5" />
            <h2 className="text-xl font-black text-white">The 6 Cognitive Challenge Types</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1">
              <span className="font-bold text-white text-sm">1. Color Reflex</span>
              <p className="text-slate-400">Overcome the Stroop effect by tapping the ink color or forbidden shade rather than reading the word.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1">
              <span className="font-bold text-white text-sm">2. Odd Emoji Out</span>
              <p className="text-slate-400">Scan dense grids of nearly identical emojis to spot the single subtle outlier.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1">
              <span className="font-bold text-white text-sm">3. Number Memory</span>
              <p className="text-slate-400">Memorize flashed multi-digit sequences in under a second and input them in precise order.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1">
              <span className="font-bold text-white text-sm">4. Speed Tracker</span>
              <p className="text-slate-400">Track bouncing orbs across an animated radar field and tap the one traveling at top velocity.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1">
              <span className="font-bold text-white text-sm">5. Lightning Math</span>
              <p className="text-slate-400">Compute quick arithmetic under intense pressure without falling for nearby numeric decoys.</p>
            </div>
            <div className="p-4 rounded-2xl bg-dark-850 border border-slate-800 space-y-1">
              <span className="font-bold text-white text-sm">6. Different Shape</span>
              <p className="text-slate-400">Identify geometric differences in vertex count, corner smoothness, or inverted rotation angles.</p>
            </div>
          </div>
        </section>

        {/* Mid Ad Placement */}
        <AdPlacement format="rectangle" />

        {/* Section 3: Performance Tiers */}
        <section className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy className="w-5 h-5" />
            <h2 className="text-xl font-black text-white">Performance Tier Breakdown</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            How does your reaction speed compare to fellow players? Here is where scores land:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-slate-400 block font-bold">0–5 Points</span>
              <span className="text-slate-300 font-bold">Brain Sleeping 😴</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Bottom 40%</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-amber-400 block font-bold">6–10 Points</span>
              <span className="text-amber-300 font-bold">Beginner 🐣</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top 60%</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-cyan-400 block font-bold">11–15 Points</span>
              <span className="text-cyan-300 font-bold">Smart Cookie 🍪</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top 30%</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-purple-400 block font-bold">16–20 Points</span>
              <span className="text-purple-300 font-bold">Genius 🧠</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top 10%</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-850 border border-slate-800">
              <span className="text-orange-400 block font-bold">21–25 Points</span>
              <span className="text-orange-300 font-bold">Brain Monster 🔥</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Top 3%</span>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-pink-500/20 border border-yellow-500/40">
              <span className="text-yellow-400 block font-bold">26+ Points</span>
              <span className="text-yellow-300 font-bold">Absolute Legend 👑</span>
              <span className="text-[10px] text-yellow-400 block mt-0.5">TOP 1% CLUB</span>
            </div>
          </div>
        </section>
      </div>

      {/* Countdown 3, 2, 1, GO! Overlay */}
      {phase === 'countdown' && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      {/* Game Over Performance Modal */}
      {phase === 'gameover' && (
        <GameOverModal
          score={score}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          highestStreak={highestStreak}
          isNewHigh={isNewHigh}
          highScore={highScore}
          avgReactionTimeMs={
            reactionTimesRef.current.length > 0
              ? Math.round(reactionTimesRef.current.reduce((a, b) => a + b, 0) / reactionTimesRef.current.length)
              : 0
          }
          onPlayAgain={() => handleStartGame(gameMode)}
          onOpenLeaderboard={() => {
            sound.playTap();
            setIsLeaderboardOpen(true);
          }}
        />
      )}

      {/* Leaderboard & Stats Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal
          onClose={() => {
            sound.playTap();
            setIsLeaderboardOpen(false);
          }}
          onPlayMode={mode => {
            setIsLeaderboardOpen(false);
            handleStartGame(mode);
          }}
        />
      )}

      {/* Daily Challenge Modal */}
      {isDailyOpen && (
        <DailyChallengeModal
          onClose={() => {
            sound.playTap();
            setIsDailyOpen(false);
          }}
          onStartDaily={() => {
            setIsDailyOpen(false);
            handleStartGame('daily');
          }}
        />
      )}
    </div>
  );
};
