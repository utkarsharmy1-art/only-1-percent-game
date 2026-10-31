import React, { useRef, useEffect } from 'react';
import { ChallengeData } from '../../types/game';

interface Props {
  challenge: ChallengeData;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

interface MovingOrb {
  id: number;
  isFastest: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  symbol: string;
}

export const FastestObjectChallenge: React.FC<Props> = ({ challenge, onAnswer, disabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbsRef = useRef<MovingOrb[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const { objects } = challenge.data;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 320;
    const height = canvas.clientHeight || 260;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    // Initialize orbs with realistic bouncing velocity
    orbsRef.current = objects.map((obj: any) => {
      // Fastest orb moves at speed ~5.5-7.0, slower orbs move at 1.8-2.6
      const speed = obj.isFastest ? 6.2 : 2.1;
      const angle = Math.random() * Math.PI * 2;
      return {
        id: obj.id,
        isFastest: obj.isFastest,
        x: (width / 4) + Math.random() * (width / 2),
        y: (height / 4) + Math.random() * (height / 2),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 26,
        color: obj.color,
        symbol: obj.symbol,
      };
    });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.6, 2.0); // normalize frame step
      lastTime = now;

      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, width, height);

      // Subtle grid background effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw orbs
      orbsRef.current.forEach(orb => {
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;

        // Bounce on boundary
        if (orb.x - orb.radius <= 0) {
          orb.x = orb.radius;
          orb.vx = Math.abs(orb.vx);
        } else if (orb.x + orb.radius >= width) {
          orb.x = width - orb.radius;
          orb.vx = -Math.abs(orb.vx);
        }

        if (orb.y - orb.radius <= 0) {
          orb.y = orb.radius;
          orb.vy = Math.abs(orb.vy);
        } else if (orb.y + orb.radius >= height) {
          orb.y = height - orb.radius;
          orb.vy = -Math.abs(orb.vy);
        }

        // Draw glowing outer ring
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = orb.color + '26';
        ctx.fill();

        // Draw main orb body
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = orb.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Draw symbol inside
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(orb.symbol, orb.x, orb.y + 1);
      });

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [challenge.id]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check hit against orbs (generous hit padding of +18px for mobile fingers)
    for (const orb of orbsRef.current) {
      const dx = clickX - orb.x;
      const dy = clickY - orb.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= orb.radius + 20) {
        onAnswer(orb.isFastest);
        return;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-sm mx-auto py-1">
      <div 
        ref={containerRef}
        className="relative w-full h-[260px] rounded-3xl bg-dark-900/90 border-2 border-slate-800 shadow-inner overflow-hidden cursor-crosshair touch-none"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="w-full h-full block"
        />
        <div className="absolute top-2 left-3 text-[11px] font-mono tracking-wider text-slate-500 uppercase pointer-events-none">
          Tracking Radar Active
        </div>
      </div>
      <div className="text-xs text-slate-400 mt-2 font-mono flex items-center gap-1">
        <span>⚡ Tap the orb traveling with highest velocity</span>
      </div>
    </div>
  );
};
