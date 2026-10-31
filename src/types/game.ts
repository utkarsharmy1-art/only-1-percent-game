export type ChallengeType = 
  | 'color-match'
  | 'odd-emoji'
  | 'number-memory'
  | 'fastest-object'
  | 'math-puzzle'
  | 'different-shape';

export type ShapeKind = 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'circle' | 'star';

export type GameMode = 'timed-30s' | 'daily';

export type GamePhase = 
  | 'menu'
  | 'countdown'
  | 'playing'
  | 'gameover';

export interface PerformanceTier {
  minScore: number;
  maxScore: number;
  label: string;
  emoji: string;
  rankTitle: string;
  percentile: string;
  color: string;
  bgGlow: string;
  comment: string;
}

export interface ChallengeData {
  id: string;
  type: ChallengeType;
  title: string;
  prompt: string;
  difficulty: number;
  data: any;
}

export interface GameScoreRecord {
  id: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  highestStreak: number;
  tier: string;
  mode: GameMode;
  date: string;
  timestamp: number;
  avgReactionTimeMs: number;
}

export interface PlayerStats {
  gamesPlayed: number;
  highScore: number;
  bestStreak: number;
  totalCorrect: number;
  totalWrong: number;
  dailyStreak: number;
  lastDailyDate: string | null;
  dailyBestScore: number;
}
