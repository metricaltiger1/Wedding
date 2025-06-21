import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  type?: 'confetti' | 'hearts';
}

const Confetti = ({ type = 'confetti' }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: type === 'hearts' ? 20 : 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0 
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      if (type === 'hearts') {
        // Heart-shaped confetti
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          shapes: ['heart' as confetti.Shape],
          colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffc0cb'],
          scalar: 0.8
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          shapes: ['heart' as confetti.Shape],
          colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffc0cb'],
          scalar: 0.8
        });
      } else {
        // Regular confetti
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          shapes: ['circle'], 
          colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffc0cb'],
          scalar: 0.8
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, [type]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />;
};

export default Confetti;