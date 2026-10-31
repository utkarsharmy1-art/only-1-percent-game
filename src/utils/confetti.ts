import confetti from 'canvas-confetti';

export function fireHighScoreConfetti() {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  const colors = ['#a855f7', '#3b82f6', '#f97316', '#ec4899', '#22c55e', '#eab308'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireBurstConfetti(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { x, y },
    colors: ['#a855f7', '#3b82f6', '#f97316', '#22c55e'],
    zIndex: 9999,
  });
}
