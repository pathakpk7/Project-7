import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
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
  const badgeStyles = {
    gold: "border-csk-gold/40 text-csk-yellow bg-csk-gold/10",
    blue: "border-india-blue/40 text-sky-400 bg-india-blue/10",
    silver: "border-slate-500/40 text-metallic-silver bg-slate-500/10",
    emerald: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  };

  const titleGlowStyles = {
    gold: "from-white via-slate-100 to-csk-gold/80",
    blue: "from-white via-slate-100 to-sky-400/80",
    silver: "from-white via-slate-200 to-slate-400",
    emerald: "from-white via-slate-100 to-emerald-400/80",
  };

  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-12 sm:mb-16", className)}>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold uppercase tracking-widest mb-4 backdrop-blur-md shadow-sm transition-transform hover:scale-105">
        <span className={cn("w-1.5 h-1.5 rounded-full animate-ping", accentColor === "gold" ? "bg-csk-gold" : "bg-india-blue")} />
        <span className={badgeStyles[accentColor]}>{badge}</span>
      </div>
      <h2 className={cn("text-3xl sm:text-5xl font-extrabold tracking-tight uppercase bg-gradient-to-r bg-clip-text text-transparent mb-4", titleGlowStyles[accentColor])}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
