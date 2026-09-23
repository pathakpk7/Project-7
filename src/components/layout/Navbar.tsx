"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Menu, Trophy, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoryChapter } from "@/config/storySpine";

interface NavbarProps {
  onTriggerNo7: () => void;
  onTrigger3DHelicopter: () => void;
  onTriggerBadge?: () => void;
  onOpenAskMahi?: () => void;
  unlockedAchievementsCount: number;
  activeChapter: StoryChapter;
  onToggleSidebar: () => void;
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerNo7,
  onTrigger3DHelicopter,
  onTriggerBadge,
  onOpenAskMahi,
  unlockedAchievementsCount,
  activeChapter,
  onToggleSidebar,
  scrolled,
}) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background,border] duration-300",
        scrolled
          ? "bg-[#0a0b0f]/95 border-b border-white/10 py-2 backdrop-blur-md"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-2.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-csk-yellow hover:border-csk-gold/40 shrink-0 cursor-pointer"
          aria-label="Open chapters sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a href="#hero" className="flex items-center gap-2.5 shrink-0 min-w-0 group cursor-pointer">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-csk-gold/60 group-hover:border-csk-gold transition-all shadow-glow-gold bg-black shrink-0">
            <Image
              src="/images/brand/dhoni_icon.jpg"
              alt="MS Dhoni Captain Cool 07 Icon"
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
          <span className="hidden md:inline font-display text-sm text-white group-hover:text-csk-yellow transition-colors truncate">Captain Cool</span>
        </a>

        <a
          href={`#${activeChapter.id}`}
          className="flex-1 min-w-0 flex justify-center sm:justify-start sm:pl-2 cursor-pointer"
          title={activeChapter.tagline}
        >
          <span className="inline-flex items-center gap-2 max-w-full px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-csk-gold/30 transition-colors">
            <span className="text-[10px] font-mono text-slate-500 shrink-0">{activeChapter.index}</span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wide text-slate-200 truncate">
              {activeChapter.title}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onOpenAskMahi && (
            <button
              onClick={onOpenAskMahi}
              title="Ask Mahi · Verified Career Data Assistant"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-slate-300 hover:text-csk-yellow hover:border-csk-gold/40 transition-all text-xs font-mono cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-csk-gold" />
              <span>Ask Mahi</span>
            </button>
          )}

          <button
            onClick={onTrigger3DHelicopter}
            title="3D Helicopter Shot · Signature Weapon"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-csk-gold/25 to-csk-yellow/20 border border-csk-gold/50 text-csk-yellow hover:border-csk-gold hover:bg-csk-gold/30 hover:scale-105 active:scale-95 transition-all text-[10px] sm:text-xs font-mono font-bold shadow-glow-gold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-csk-yellow animate-pulse" />
            <span className="hidden md:inline">3D HELICOPTER SHOT</span>
            <span className="md:hidden">3D SHOT</span>
          </button>

          <button
            onClick={onTriggerNo7}
            title="Surprise MS Dhoni Stats"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-csk-gold/10 border border-csk-gold/40 text-csk-yellow text-[10px] font-mono font-bold hover:bg-csk-gold/20 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>No. 7</span>
          </button>

          <button
            onClick={onTriggerBadge}
            title={
              unlockedAchievementsCount === 7
                ? "All 7 Chapter Badges Unlocked! View 7 Stage Badges"
                : `View 7 Stage Badges (${unlockedAchievementsCount}/7 Unlocked)`
            }
            className={cn(
              "flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full border transition-colors text-[10px] font-mono font-bold cursor-pointer",
              unlockedAchievementsCount === 7
                ? "bg-csk-gold/20 border-csk-yellow text-csk-yellow shadow-glow-gold"
                : "bg-black/40 border-white/10 text-slate-300 hover:border-csk-gold/40 hover:text-white"
            )}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{unlockedAchievementsCount}/7 Badges</span>
          </button>
        </div>
      </div>
    </header>
  );
};
