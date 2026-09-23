import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: React.ReactNode;
  accentColor?: "gold" | "blue" | "silver" | "emerald";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  accentColor = "gold",
  className,
}) => {
  const accentDot = {
    gold: "bg-csk-gold",
    blue: "bg-india-blue",
    silver: "bg-slate-400",
    emerald: "bg-emerald-500",
  };

  const accentLine = {
    gold: "from-csk-gold/60 via-csk-yellow to-csk-gold/60",
    blue: "from-india-blue/60 via-sky-400 to-india-blue/60",
    silver: "from-slate-500/60 via-slate-300 to-slate-500/60",
    emerald: "from-emerald-600/60 via-emerald-400 to-emerald-600/60",
  };

  const titleAccent = {
    gold: "text-csk-yellow/90",
    blue: "text-sky-300/90",
    silver: "text-slate-200",
    emerald: "text-emerald-300/90",
  };

  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative", className)}>
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className={cn("h-px w-8 sm:w-12 bg-gradient-to-r", accentLine[accentColor], "opacity-50")} />
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", accentDot[accentColor])} />
        <span className={cn("h-px w-8 sm:w-12 bg-gradient-to-l", accentLine[accentColor], "opacity-50")} />
      </div>

      <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500 mb-2">
        {badge}
      </p>

      <h2
        className={cn(
          "font-display text-3xl sm:text-5xl font-semibold tracking-wide text-white mb-4 leading-tight"
        )}
      >
        {title}
      </h2>

      <div className={cn("story-ornament mx-auto mb-5 opacity-80", titleAccent[accentColor])} />

      {subtitle && (
        <p className="font-story text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto italic">
          {subtitle}
        </p>
      )}
    </div>
  );
};
