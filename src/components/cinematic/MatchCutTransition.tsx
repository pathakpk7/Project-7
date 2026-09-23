"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MatchCutTransitionProps {
  fromTheme: "navy" | "gold" | "dark" | "amber";
  toTheme: "navy" | "gold" | "dark" | "amber";
  metaphor: string;
  subtext?: string;
}

export const MatchCutTransition: React.FC<MatchCutTransitionProps> = ({
  fromTheme,
  toTheme,
  metaphor,
  subtext,
}) => {
  const getGradient = () => {
    if (fromTheme === "navy" && toTheme === "gold") {
      return "from-sky-950/40 via-black to-amber-950/40";
    }
    if (fromTheme === "gold" && toTheme === "navy") {
      return "from-amber-950/40 via-black to-sky-950/40";
    }
    return "from-black via-zinc-900/30 to-black";
  };

  return (
    <div className={cn("w-full py-16 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b", getGradient())}>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-csk-gold/60 to-transparent mb-4" />
      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-slate-400">
        {metaphor}
      </span>
      {subtext && (
        <p className="mt-2 text-xs sm:text-sm font-story italic text-slate-400 max-w-md mx-auto">
          &ldquo;{subtext}&rdquo;
        </p>
      )}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-csk-gold/60 to-transparent mt-4" />
    </div>
  );
};
