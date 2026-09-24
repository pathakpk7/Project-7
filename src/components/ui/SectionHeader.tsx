import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type SectionAccentColor = "gold" | "blue" | "navy" | "emerald" | "purple" | "amber" | "silver";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: React.ReactNode;
  accentColor?: SectionAccentColor;
  bgImage?: string;
  bgOpacity?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  accentColor = "gold",
  bgImage,
  bgOpacity,
  className,
}) => {
  const colorThemes: Record<SectionAccentColor, {
    cardBg: string;
    badgeBg: string;
    dot: string;
    line: string;
    titleGlow: string;
    ornament: string;
    subtitleText: string;
  }> = {
    gold: {
      cardBg: "bg-gradient-to-b from-csk-gold/15 via-[#0c0e14]/80 to-[#08090C]/90 border-csk-gold/30 shadow-[0_0_35px_rgba(253,185,19,0.12)]",
      badgeBg: "bg-csk-gold/15 border-csk-gold/40 text-csk-yellow",
      dot: "bg-csk-gold",
      line: "from-csk-gold/60 via-csk-yellow to-csk-gold/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(253,185,19,0.3)]",
      ornament: "text-csk-yellow/90",
      subtitleText: "text-slate-200",
    },
    blue: {
      cardBg: "bg-gradient-to-b from-sky-500/15 via-[#0c0e14]/80 to-[#08090C]/90 border-sky-500/30 shadow-[0_0_35px_rgba(56,189,248,0.12)]",
      badgeBg: "bg-sky-500/15 border-sky-500/40 text-sky-400",
      dot: "bg-sky-400",
      line: "from-sky-500/60 via-blue-400 to-sky-500/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(56,189,248,0.3)]",
      ornament: "text-sky-300/90",
      subtitleText: "text-slate-200",
    },
    navy: {
      cardBg: "bg-gradient-to-b from-blue-900/30 via-[#0c0e14]/80 to-[#08090C]/90 border-blue-500/30 shadow-[0_0_35px_rgba(37,99,235,0.15)]",
      badgeBg: "bg-blue-600/20 border-blue-400/40 text-sky-300",
      dot: "bg-blue-400",
      line: "from-blue-600/60 via-sky-400 to-blue-600/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(37,99,235,0.35)]",
      ornament: "text-blue-300/90",
      subtitleText: "text-slate-200",
    },
    emerald: {
      cardBg: "bg-gradient-to-b from-emerald-500/15 via-[#0c0e14]/80 to-[#08090C]/90 border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.12)]",
      badgeBg: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
      dot: "bg-emerald-400",
      line: "from-emerald-500/60 via-emerald-300 to-emerald-500/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(16,185,129,0.3)]",
      ornament: "text-emerald-300/90",
      subtitleText: "text-slate-200",
    },
    purple: {
      cardBg: "bg-gradient-to-b from-purple-500/15 via-[#0c0e14]/80 to-[#08090C]/90 border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.12)]",
      badgeBg: "bg-purple-500/15 border-purple-500/40 text-purple-300",
      dot: "bg-purple-400",
      line: "from-purple-500/60 via-purple-300 to-purple-500/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(168,85,247,0.3)]",
      ornament: "text-purple-300/90",
      subtitleText: "text-slate-200",
    },
    amber: {
      cardBg: "bg-gradient-to-b from-amber-500/15 via-[#0c0e14]/80 to-[#08090C]/90 border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.12)]",
      badgeBg: "bg-amber-500/15 border-amber-500/40 text-amber-300",
      dot: "bg-amber-400",
      line: "from-amber-500/60 via-amber-300 to-amber-500/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(245,158,11,0.3)]",
      ornament: "text-amber-300/90",
      subtitleText: "text-slate-200",
    },
    silver: {
      cardBg: "bg-gradient-to-b from-slate-500/15 via-[#0c0e14]/80 to-[#08090C]/90 border-white/20 shadow-[0_0_35px_rgba(255,255,255,0.06)]",
      badgeBg: "bg-white/10 border-white/20 text-slate-200",
      dot: "bg-slate-300",
      line: "from-slate-500/60 via-slate-300 to-slate-500/60",
      titleGlow: "text-white drop-shadow-[0_2px_14px_rgba(255,255,255,0.2)]",
      ornament: "text-slate-300",
      subtitleText: "text-slate-200",
    },
  };

  const theme = colorThemes[accentColor] || colorThemes.gold;

  return (
    <div className={cn("text-center max-w-4xl mx-auto mb-12 sm:mb-16 relative", className)}>
      <div className={cn("p-6 sm:p-8 rounded-3xl border backdrop-blur-md shadow-2xl transition-all relative overflow-hidden", theme.cardBg)}>
        {/* Optional Custom Background Image with Low Fade */}
        {bgImage && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
            <Image
              src={bgImage}
              alt={`${title} Header Background`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className={cn("object-cover object-center", bgOpacity || "opacity-30 sm:opacity-25")}
            />
            {/* Soft Contrast & Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-[#08090C]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_20%,#08090C_90%)]" />
          </div>
        )}

        <div className="relative z-10">
          {/* Top accent line */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={cn("h-px w-10 sm:w-16 bg-gradient-to-r", theme.line, "opacity-70")} />
            <span className={cn("w-2 h-2 rounded-full shrink-0 shadow-sm animate-pulse", theme.dot)} />
            <span className={cn("h-px w-10 sm:w-16 bg-gradient-to-l", theme.line, "opacity-70")} />
          </div>

          {/* Badge Pill */}
          <div className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] mb-4 shadow-sm backdrop-blur-sm", theme.badgeBg)}>
            <span>{badge}</span>
          </div>

          {/* Section Title */}
          <h2 className={cn("font-display text-3xl sm:text-5xl font-bold tracking-wide mb-3 leading-tight", theme.titleGlow)}>
            {title}
          </h2>

          {/* Ornament */}
          <div className={cn("story-ornament mx-auto mb-4 opacity-80", theme.ornament)} />

          {/* Subtitle / Hook */}
          {subtitle && (
            <p className={cn("font-story text-base sm:text-lg leading-relaxed max-w-2xl mx-auto italic", theme.subtitleText)}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


