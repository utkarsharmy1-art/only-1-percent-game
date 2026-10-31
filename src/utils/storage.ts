import { GameScoreRecord, PerformanceTier, PlayerStats } from '../types/game';

const HIGH_SCORE_KEY = 'only1_high_score';
const STATS_KEY = 'only1_player_stats';
const RECORDS_KEY = 'only1_score_history';

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    minScore: 0,
    maxScore: 5,
    label: 'Brain Sleeping',
    emoji: '😴',
    rankTitle: 'Drowsy Novice',
    percentile: 'Bottom 40%',
    color: 'text-slate-400',
    bgGlow: 'from-slate-600/30 to-slate-800/50 border-slate-500/40',
    comment: 'Did you play with your eyes closed? Wake up and try again!'
  },
  {
    minScore: 6,
    maxScore: 10,
    label: 'Beginner',
    emoji: '🐣',
    rankTitle: 'Awakening Mind',
    percentile: 'Top 60%',
    color: 'text-amber-400',
    bgGlow: 'from-amber-600/30 to-yellow-900/50 border-amber-500/40',
    comment: 'Getting the gears turning! You can definitely do better.'
  },
  {
    minScore: 11,
    maxScore: 15,
    label: 'Smart Cookie',
    emoji: '🍪',
    rankTitle: 'Quick Thinker',
    percentile: 'Top 30%',
    color: 'text-cyan-400',
    bgGlow: 'from-cyan-600/30 to-blue-900/50 border-cyan-500/40',
    comment: 'Impressive reflexes! You are faster than the average human.'
  },
  {
    minScore: 16,
    maxScore: 20,
    label: 'Genius',
    emoji: '🧠',
    rankTitle: 'Neural Prodigy',
    percentile: 'Top 10%',
    color: 'text-purple-400',
    bgGlow: 'from-purple-600/30 to-indigo-950/50 border-purple-500/50',
    comment: 'Incredible speed and focus! Only an elite few reach this level.'
  },
  {
    minScore: 21,
    maxScore: 25,
    label: 'Brain Monster',
    emoji: '🔥',
    rankTitle: 'Superhuman Reflexes',
    percentile: 'Top 3%',
    color: 'text-orange-400',
    bgGlow: 'from-orange-600/40 to-rose-950/60 border-orange-500/60',
    comment: 'Absolute beast mode! Your synaptic speed is off the charts!'
  },
  {
    minScore: 26,
    maxScore: 999,
    label: 'Absolute Legend',
    emoji: '👑',
    rankTitle: 'THE 1% GOD TIER',
    percentile: 'TOP 1%',
    color: 'text-yellow-300',
    bgGlow: 'from-yellow-500/40 via-purple-600/40 to-pink-600/40 border-yellow-400/80',
    comment: 'YOU DID IT! You officially belong to the elite 1% of human brains!'
  }
];

export function getPerformanceTier(score: number): PerformanceTier {
  const tier = PERFORMANCE_TIERS.find(t => score >= t.minScore && score <= t.maxScore);
  return tier || PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
}

export function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function loadHighScore(): number {
  try {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score: number): boolean {
  try {
    const currentHigh = loadHighScore();
    if (score > currentHigh) {
      localStorage.setItem(HIGH_SCORE_KEY, String(score));
      return true; // New high score
    }
  } catch {
    // ignore
  }
  return false;
}

export function loadPlayerStats(): PlayerStats {
  try {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return {
    gamesPlayed: 0,
    highScore: 0,
    bestStreak: 0,
    totalCorrect: 0,
    totalWrong: 0,
    dailyStreak: 0,
    lastDailyDate: null,
    dailyBestScore: 0,
  };
}

export function saveGameResult(
  score: number,
  correct: number,
  wrong: number,
  streak: number,
  avgReactionTimeMs: number,
  mode: 'timed-30s' | 'daily'
): { isNewHigh: boolean; record: GameScoreRecord; stats: PlayerStats } {
  const currentHigh = loadHighScore();
  const isNewHigh = score > currentHigh;
  if (isNewHigh) {
    saveHighScore(score);
  }

  const today = getTodayDateString();
  const stats = loadPlayerStats();

  stats.gamesPlayed += 1;
  stats.highScore = Math.max(stats.highScore, score);
  stats.bestStreak = Math.max(stats.bestStreak, streak);
  stats.totalCorrect += correct;
  stats.totalWrong += wrong;

  if (mode === 'daily') {
    if (stats.lastDailyDate !== today) {
      // Check if yesterday was lastDailyDate to keep streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yDateStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      
      if (stats.lastDailyDate === yDateStr) {
        stats.dailyStreak += 1;
      } else {
        stats.dailyStreak = 1;
      }
      stats.lastDailyDate = today;
      stats.dailyBestScore = score;
    } else {
      stats.dailyBestScore = Math.max(stats.dailyBestScore, score);
    }
  }

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }

  const tier = getPerformanceTier(score);
  const record: GameScoreRecord = {
    id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    score,
    correctAnswers: correct,
    wrongAnswers: wrong,
    highestStreak: streak,
    tier: tier.label,
    mode,
    date: today,
    timestamp: Date.now(),
    avgReactionTimeMs,
  };

  try {
    const rawHistory = localStorage.getItem(RECORDS_KEY);
    const history: GameScoreRecord[] = rawHistory ? JSON.parse(rawHistory) : [];
    history.unshift(record);
    // Keep last 30 runs
    localStorage.setItem(RECORDS_KEY, JSON.stringify(history.slice(0, 30)));
  } catch {
    // ignore
  }

  return { isNewHigh, record, stats };
}

export function loadScoreHistory(): GameScoreRecord[] {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
