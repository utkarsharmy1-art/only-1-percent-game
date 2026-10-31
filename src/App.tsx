import { useState, useEffect, useRef, useCallback } from 'react';
import { GamePhase, GameMode, ChallengeData } from './types/game';
import { sound } from './utils/sound';
import { loadHighScore, saveGameResult } from './utils/storage';
import { generateNextChallenge } from './utils/challenges';
import { Header } from './components/Header';
import { MenuScreen } from './components/MenuScreen';
import { TimerBar } from './components/TimerBar';
import { ScoreHeader } from './components/ScoreHeader';
import { GameArena } from './components/GameArena';
import { CountdownOverlay } from './components/CountdownOverlay';
import { GameOverModal } from './components/GameOverModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';

const TOTAL_TIME = 30.0;

export default function App() {
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
    <div className="relative flex flex-col min-h-screen w-full bg-[#07060e] text-slate-100 overflow-hidden font-sans">
      {/* Background ambient neon glow spheres */}
      <div className="fixed top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none" />

      {/* Persistent App Header */}
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

      {/* Main Container */}
      <main className="flex-1 flex flex-col w-full max-w-lg mx-auto relative z-10">
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
      </main>

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
}
