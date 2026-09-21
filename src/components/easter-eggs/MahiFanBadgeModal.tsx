"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Zap, X } from "lucide-react";

interface MahiFanBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerHelicopter?: () => void;
  unlockedCount?: number;
}

export const MahiFanBadgeModal: React.FC<MahiFanBadgeModalProps> = ({
  isOpen,
  onClose,
  onTriggerHelicopter,
  unlockedCount = 7,
}) => {
  const triggerShot = onTriggerHelicopter || (() => {});

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#FFDF00", "#0077B6", "#FFFFFF", "#FF9933"],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-3xl bg-surface-raised border border-csk-gold/40 p-6 sm:p-8 text-center shadow-glow-gold overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-csk-gold/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Badge Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 07 Golden Emblem */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-csk-gold/20 border-2 border-csk-gold flex items-center justify-center font-mono text-4xl font-extrabold text-csk-yellow shadow-glow-gold">
          07
        </div>

        {/* Title & Subheading */}
        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-1.5">
          07 MAHI FAN
        </h3>
        <p className="text-xs text-csk-gold font-mono uppercase tracking-widest mb-4 font-bold">
          BORN 7TH JULY • JERSEY #7
        </p>

        {/* Quote */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
          &ldquo;A lot of people think 7 is a lucky number for me, but it is actually very simple. I was born on the 7th of July, the 7th month, and 1981 was the year — 8 minus 1 is 7.&rdquo;
          <br />
          <span className="text-xs text-slate-400 mt-1 block italic font-mono">— MS Dhoni</span>
        </p>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-white">0.08s</div>
            <div className="text-[10px] text-slate-400 uppercase">STUMPING SPEED</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-white">3 ICC</div>
            <div className="text-[10px] text-slate-400 uppercase">WHITE-BALL CUPS</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-lg font-bold text-white">5 IPL</div>
            <div className="text-[10px] text-slate-400 uppercase">CSK TROPHIES</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => {
              triggerShot();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-csk-gold to-csk-yellow text-black font-mono font-bold text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-glow-gold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>LAUNCH HELICOPTER SHOT</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-sm uppercase tracking-wider transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
