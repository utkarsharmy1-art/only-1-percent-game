import { ChallengeData, ChallengeType, ShapeKind } from '../types/game';

// Helper random choice & shuffle
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1. COLOR MATCH CHALLENGE (Stroop effect)
const COLOR_NAMES = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
const COLOR_VALUES: Record<string, string> = {
  RED: '#ef4444',
  BLUE: '#3b82f6',
  GREEN: '#22c55e',
  YELLOW: '#eab308',
  PURPLE: '#a855f7',
  ORANGE: '#f97316',
};

export function generateColorChallenge(difficulty: number): ChallengeData {
  const availableColors = difficulty >= 3 ? COLOR_NAMES : COLOR_NAMES.slice(0, 4);
  
  // Decide question type:
  // type 0: "Tap the word [NAME]"
  // type 1: "Tap the INK COLOR"
  // type 2: "Don't tap [NAME]" (at difficulty >= 4)
  const isInkMode = difficulty >= 2 && Math.random() > 0.4;
  const isNegationMode = difficulty >= 5 && Math.random() > 0.6;

  const textColorName = randomChoice(availableColors);
  let inkColorName = randomChoice(availableColors);
  while (inkColorName === textColorName && availableColors.length > 1) {
    inkColorName = randomChoice(availableColors);
  }

  let prompt = '';
  let targetAnswer = '';

  if (isNegationMode) {
    prompt = `Tap ANY color EXCEPT: ${textColorName}`;
    targetAnswer = 'NOT_' + textColorName;
  } else if (isInkMode) {
    prompt = `Tap the INK COLOR, not the word!`;
    targetAnswer = inkColorName;
  } else {
    prompt = `Tap the word: "${textColorName}"`;
    targetAnswer = textColorName;
  }

  // Generate 4 options
  let optionNames = shuffle([...availableColors]).slice(0, 4);
  if (!optionNames.includes(targetAnswer) && !isNegationMode) {
    optionNames[0] = targetAnswer;
    optionNames = shuffle(optionNames);
  }

  // Shuffle ink colors for each button to make it exciting
  const options = optionNames.map(name => {
    const randomInk = randomChoice(availableColors);
    return {
      text: name,
      textColor: COLOR_VALUES[randomInk] || '#ffffff',
      bgColor: '#181432',
      id: name,
    };
  });

  return {
    id: 'color_' + Date.now() + Math.random(),
    type: 'color-match',
    title: 'Color Reflex',
    prompt,
    difficulty,
    data: {
      displayText: textColorName,
      displayInk: COLOR_VALUES[inkColorName],
      targetAnswer,
      isNegationMode,
      options,
    },
  };
}

// 2. ODD EMOJI CHALLENGE
const EMOJI_PAIRS: [string, string][] = [
  ['😀', '😃'],
  ['😺', '😸'],
  ['🍎', '🍏'],
  ['⭐', '🌟'],
  ['🕶️', '👓'],
  ['🌕', '🌖'],
  ['🐰', '🐇'],
  ['🚗', '🚙'],
  ['🍪', '🍘'],
  ['⏰', '⏱️'],
  ['🔥', '💥'],
  ['⚡', '✨'],
  ['🎈', '🏮'],
  ['💎', '💍'],
  ['🧠', '🫀'],
  ['🦉', '🦅'],
  ['🪐', '🌍'],
  ['👾', '🎮'],
  ['🍄', '🌰'],
  ['🥑', '🍐']
];

export function generateOddEmojiChallenge(difficulty: number): ChallengeData {
  const pair = randomChoice(EMOJI_PAIRS);
  const commonEmoji = pair[0];
  const oddEmoji = pair[1];

  // Grid size scales with difficulty:
  // diff 1: 3x3 = 9
  // diff 2-3: 3x4 = 12
  // diff 4+: 4x4 = 16
  const count = difficulty <= 1 ? 9 : difficulty <= 3 ? 12 : 16;
  const oddIndex = Math.floor(Math.random() * count);

  const emojis = Array.from({ length: count }, (_, idx) => ({
    id: idx,
    emoji: idx === oddIndex ? oddEmoji : commonEmoji,
    isOdd: idx === oddIndex,
  }));

  return {
    id: 'emoji_' + Date.now() + Math.random(),
    type: 'odd-emoji',
    title: 'Visual Eagle Eye',
    prompt: 'Find the ODD emoji as fast as possible!',
    difficulty,
    data: {
      count,
      emojis,
      oddIndex,
    },
  };
}

// 3. NUMBER MEMORY SEQUENCE CHALLENGE
export function generateNumberMemoryChallenge(difficulty: number): ChallengeData {
  // Sequence length: 3 digits for easy, 4 for medium, 5 for hard
  const length = difficulty <= 2 ? 3 : difficulty <= 4 ? 4 : 5;
  const sequence: number[] = [];
  
  while (sequence.length < length) {
    const digit = randomInt(1, 9);
    // Avoid adjacent duplicates for clarity
    if (sequence.length === 0 || sequence[sequence.length - 1] !== digit) {
      sequence.push(digit);
    }
  }

  // Display time: starts around 1000ms, down to 700ms at higher diff
  const displayDurationMs = Math.max(650, 1100 - difficulty * 60);

  return {
    id: 'memory_' + Date.now() + Math.random(),
    type: 'number-memory',
    title: 'Instant Memory',
    prompt: 'Memorize the sequence, then tap in order!',
    difficulty,
    data: {
      sequence,
      displayDurationMs,
      // Numpad 1-9
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  };
}

// 4. FASTEST MOVING OBJECT CHALLENGE
export function generateFastestObjectChallenge(difficulty: number): ChallengeData {
  // Number of objects: 3 (diff 1), 4 (diff 2-3), 5 (diff 4+)
  const objectCount = difficulty <= 1 ? 3 : difficulty <= 3 ? 4 : 5;
  
  // Base speeds in pixels per second / animation period
  // One object has significantly higher speed (e.g. 2.2x to 3x)
  const fastestIndex = Math.floor(Math.random() * objectCount);
  
  const colors = ['#a855f7', '#3b82f6', '#f97316', '#ec4899', '#06b6d4'];
  const symbols = ['⚡', '🔥', '☄️', '🚀', '🛸', '🎯', '🌀'];
  const chosenSymbol = randomChoice(symbols);

  const objects = Array.from({ length: objectCount }, (_, idx) => {
    const isFastest = idx === fastestIndex;
    // Faster object has lower cycle duration (faster animation speed)
    // Regular objects: 2.2s - 3.2s per orbit/bounce
    // Fastest object: 0.7s - 1.1s per orbit/bounce
    const baseDuration = isFastest ? 0.85 : 2.6 + (Math.random() * 0.8);
    
    return {
      id: idx,
      isFastest,
      color: colors[idx % colors.length],
      symbol: chosenSymbol,
      duration: baseDuration,
      // Random path parameters
      orbitRadiusX: 55 + (idx % 2 === 0 ? 25 : -15),
      orbitRadiusY: 40 + (idx % 2 === 1 ? 20 : -10),
      delay: -(Math.random() * 2),
    };
  });

  return {
    id: 'fastest_' + Date.now() + Math.random(),
    type: 'fastest-object',
    title: 'Speed Tracker',
    prompt: 'TAP the fastest moving object!',
    difficulty,
    data: {
      objects,
      fastestIndex,
    },
  };
}

// 5. QUICK MATH PUZZLE CHALLENGE
export function generateMathChallenge(difficulty: number): ChallengeData {
  let equation = '';
  let answer = 0;

  if (difficulty <= 2) {
    // Basic addition / subtraction
    const isAdd = Math.random() > 0.4;
    if (isAdd) {
      const a = randomInt(3, 14);
      const b = randomInt(2, 12);
      equation = `${a} + ${b} = ?`;
      answer = a + b;
    } else {
      const a = randomInt(8, 20);
      const b = randomInt(2, a - 1);
      equation = `${a} - ${b} = ?`;
      answer = a - b;
    }
  } else if (difficulty <= 4) {
    // Multiplication or missing operand
    const type = randomInt(0, 2);
    if (type === 0) {
      const a = randomInt(3, 9);
      const b = randomInt(3, 9);
      equation = `${a} × ${b} = ?`;
      answer = a * b;
    } else if (type === 1) {
      const total = randomInt(15, 35);
      const sub = randomInt(4, 14);
      equation = `${total} - ? = ${total - sub}`;
      answer = sub;
    } else {
      const a = randomInt(12, 28);
      const b = randomInt(9, 25);
      equation = `${a} + ${b} = ?`;
      answer = a + b;
    }
  } else {
    // Chained or faster arithmetic
    const type = randomInt(0, 2);
    if (type === 0) {
      const a = randomInt(3, 6);
      const b = randomInt(3, 6);
      const c = randomInt(2, 8);
      equation = `(${a} × ${b}) + ${c} = ?`;
      answer = (a * b) + c;
    } else if (type === 1) {
      const a = randomInt(40, 85);
      const b = randomInt(15, 38);
      equation = `${a} - ${b} = ?`;
      answer = a - b;
    } else {
      const a = randomInt(6, 12);
      const b = randomInt(4, 9);
      equation = `${a} × ${b} = ?`;
      answer = a * b;
    }
  }

  // Generate 4 plausible distinct answer choices
  const decoys = new Set<number>();
  decoys.add(answer);

  const offsets = [-10, 10, -2, 2, -1, 1, -3, 3, -5, 5];
  for (const off of shuffle(offsets)) {
    if (decoys.size >= 4) break;
    const cand = answer + off;
    if (cand > 0 && !decoys.has(cand)) {
      decoys.add(cand);
    }
  }

  while (decoys.size < 4) {
    const cand = answer + randomInt(-8, 8);
    if (cand > 0 && !decoys.has(cand)) {
      decoys.add(cand);
    }
  }

  const options = shuffle(Array.from(decoys));

  return {
    id: 'math_' + Date.now() + Math.random(),
    type: 'math-puzzle',
    title: 'Lightning Math',
    prompt: 'Solve the equation rapidly!',
    difficulty,
    data: {
      equation,
      answer,
      options,
    },
  };
}

// 6. DIFFERENT SHAPE CHALLENGE
export function generateShapeChallenge(difficulty: number): ChallengeData {
  const shapes: ShapeKind[] = ['triangle', 'square', 'pentagon', 'hexagon', 'circle', 'star'];
  
  // Pick majority shape and odd shape
  const majorityShape = randomChoice(shapes);
  let oddShape = randomChoice(shapes);
  while (oddShape === majorityShape) {
    oddShape = randomChoice(shapes);
  }

  // Count: 4 shapes at low diff, 6 shapes at higher diff
  const count = difficulty <= 2 ? 4 : 6;
  const oddIndex = Math.floor(Math.random() * count);

  // Sub-variation:
  // Sometimes shape kind differs
  // Sometimes rotation differs (all pointing up, one rotated 90 or 180 deg)
  // Sometimes inner fill / dot differs
  const variation = difficulty >= 3 && Math.random() > 0.5 ? 'rotation' : 'type';

  const items = Array.from({ length: count }, (_, idx) => {
    const isOdd = idx === oddIndex;
    if (variation === 'rotation') {
      return {
        id: idx,
        shape: majorityShape,
        rotation: isOdd ? 180 : 0,
        isOdd,
        color: '#a855f7',
      };
    } else {
      return {
        id: idx,
        shape: isOdd ? oddShape : majorityShape,
        rotation: 0,
        isOdd,
        color: '#3b82f6',
      };
    }
  });

  return {
    id: 'shape_' + Date.now() + Math.random(),
    type: 'different-shape',
    title: 'Shape Recognition',
    prompt: variation === 'rotation' 
      ? 'Find the shape with DIFFERENT ORIENTATION!' 
      : 'Find the shape that does NOT MATCH!',
    difficulty,
    data: {
      count,
      items,
      oddIndex,
      variation,
    },
  };
}

// Master generator that cycles or randomly selects challenges
const ALL_TYPES: ChallengeType[] = [
  'color-match',
  'odd-emoji',
  'number-memory',
  'fastest-object',
  'math-puzzle',
  'different-shape',
];

export function generateNextChallenge(
  difficulty: number,
  lastType?: ChallengeType
): ChallengeData {
  const candidates = ALL_TYPES.filter(t => t !== lastType);
  const chosenType = randomChoice(candidates);

  switch (chosenType) {
    case 'color-match':
      return generateColorChallenge(difficulty);
    case 'odd-emoji':
      return generateOddEmojiChallenge(difficulty);
    case 'number-memory':
      return generateNumberMemoryChallenge(difficulty);
    case 'fastest-object':
      return generateFastestObjectChallenge(difficulty);
    case 'math-puzzle':
      return generateMathChallenge(difficulty);
    case 'different-shape':
      return generateShapeChallenge(difficulty);
    default:
      return generateColorChallenge(difficulty);
  }
}
