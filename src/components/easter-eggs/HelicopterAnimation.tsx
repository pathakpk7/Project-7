"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";

interface HelicopterAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

export const HelicopterAnimation: React.FC<HelicopterAnimationProps> = ({
  isActive,
  onComplete,
}) => {
  useEffect(() => {
    if (!isActive) return;

    // Trigger fireworks / six celebration
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete();
        return;
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        particleCount,
        origin: { x: 0.1, y: 0.8 },
        angle: 60,
        spread: 55,
        colors: ["#FFDF00", "#0077B6", "#FFFFFF"],
      });
      confetti({
        particleCount,
        origin: { x: 0.9, y: 0.8 },
        angle: 120,
        spread: 55,
        colors: ["#FFDF00", "#0077B6", "#FFFFFF"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <div className="animate-in zoom-in-50 fade-in duration-500 text-center bg-black/90 border border-csk-gold/50 rounded-3xl p-8 backdrop-blur-xl shadow-glow-gold max-w-md mx-4">
        <div className="text-6xl mb-4 animate-bounce">🏏 💥 🚀</div>
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-csk-yellow font-mono mb-2">
          THE HELICOPTER SHOT!
        </h2>
        <p className="text-sm text-slate-300 font-mono">
          &ldquo;Dhoni finishes off in style! A magnificent strike into the crowd! India lift the World Cup!&rdquo;
        </p>
        <div className="mt-4 text-xs text-slate-500 font-mono">
          Wrist power • Full whip • Over deep midwicket
        </div>
      </div>
    </div>
  );
};
