import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface UseConfettiReturn {
  confettiShown: boolean;
  fireConfetti: () => void;
  resetConfetti: () => void;
}

/**
 * Custom hook to manage confetti celebration animation
 */
export function useConfetti(): UseConfettiReturn {
  const [confettiShown, setConfettiShown] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setConfettiShown(true);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  const resetConfetti = useCallback(() => {
    setConfettiShown(false);
  }, []);

  return {
    confettiShown,
    fireConfetti,
    resetConfetti,
  };
}
