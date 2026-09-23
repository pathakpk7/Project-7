"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, Flame, Award, Zap, X, Dices, Shield, Target } from "lucide-react";
import conciseStatsData from "@/data/concise_stats.json";
import { cn } from "@/lib/utils";

interface Number7ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Number7Modal: React.FC<Number7ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Pick a random stat when opened or triggered
  const rollSurprise = () => {
    setIsRotating(true);
    if (conciseStatsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * conciseStatsData.length);
      // Ensure a fresh different stat is picked on each roll
      const nextIdx = (conciseStatsData.length > 1 && randomIndex === currentIndex)
        ? (randomIndex + 1) % conciseStatsData.length
        : randomIndex;
      setCurrentIndex(nextIdx);
    }

    // Mini celebratory burst
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FDB913", "#0081E9", "#FFFFFF", "#FFD700"],
      });
    } catch {}

    setTimeout(() => setIsRotating(false), 250);
  };

  useEffect(() => {
    if (isOpen) {
      rollSurprise();
      try {
        confetti({
          particleCount: 77,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFDF00", "#0077B6", "#FFFFFF", "#FF9933"],
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStat = conciseStatsData[currentIndex] || conciseStatsData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-surface-raised border border-csk-gold/40 p-5 sm:p-7 text-center shadow-glow-gold overflow-hidden my-auto">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-gradient-to-b from-csk-gold/25 via-india-blue/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20 cursor-pointer"
          aria-label="Close Surprise Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* No. 07 Emblem */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl bg-csk-gold/20 border-2 border-csk-gold flex items-center justify-center font-mono text-3xl sm:text-4xl font-black text-csk-yellow shadow-glow-gold">
          07
        </div>

        {/* Header & Subheading */}
        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-1">
          HELICOPTER SHOT ME !
        </h3>
        <p className="text-xs text-csk-gold font-mono uppercase tracking-widest mb-5 flex items-center justify-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-csk-yellow animate-spin-slow" />
          <span>Did You Know ?</span>
          <Sparkles className="w-3.5 h-3.5 text-csk-yellow animate-spin-slow" />
        </p>

        {/* Active Random Record Card */}
        <div className={cn(
          "relative rounded-2xl bg-surface/90 border border-csk-gold/30 p-4 sm:p-6 text-left backdrop-blur-xl shadow-inner transition-all duration-300 mb-6",
          isRotating ? "scale-[0.98] opacity-80" : "scale-100 opacity-100"
        )}>
          {/* Top Category Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-csk-gold/20 text-csk-yellow border border-csk-gold/40 font-black">
              {currentStat.category}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              #{currentStat.id}
            </span>
          </div>

          {/* Headline */}
          <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white mb-3">
            {currentStat.headline}
          </h4>

          {/* Prominent Stat Highlight Box */}
          <div className="mb-3.5 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-csk-gold/20 via-csk-yellow/15 to-transparent border border-csk-gold/40 text-csk-yellow font-mono font-black text-sm sm:text-base tracking-wide shadow-glow-gold">
            {currentStat.stat_box}
          </div>

          {/* Story Narrative */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-2 font-medium">
            {currentStat.story}
          </p>

          {/* Deeper Details */}
          <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3 whitespace-pre-line">
            {currentStat.details}
          </p>

          {/* Optional Comparison Table if provided in stat item */}
          {currentStat.table && (
            <div className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-black/50">
              <table className="w-full text-[11px] font-mono text-left">
                <thead className="bg-white/5 text-csk-yellow uppercase border-b border-white/10">
                  <tr>
                    {currentStat.table.headers.map((h, i) => (
                      <th key={i} className="py-1.5 px-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {currentStat.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={cn(row[0].includes("Dhoni") || row[0].includes("MS Dhoni") ? "bg-csk-gold/15 font-bold text-white" : "")}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-1.5 px-3 whitespace-nowrap">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Source Footer */}
          <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Verified Source: <strong className="text-slate-300">{currentStat.source}</strong></span>
            <span className="text-csk-gold font-bold">LEGENDARY FACT</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
          <button
            onClick={rollSurprise}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 text-black font-mono font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-glow-gold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>SURPRISE ME AGAIN ⚡</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
