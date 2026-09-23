"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Film, Sparkles, Compass } from "lucide-react";
import { useCinemaMode } from "./CinemaModeProvider";
import { STORY_CHAPTERS, type StoryChapter } from "@/config/storySpine";
import { cn } from "@/lib/utils";

interface CinematicHUDProps {
  activeChapter: StoryChapter;
  onOpenSidebar: () => void;
  onOpenNo7: () => void;
}

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  activeChapter,
  onOpenSidebar,
  onOpenNo7,
}) => {
  const { isCinemaMode, toggleCinemaMode, soundEnabled, toggleSound } = useCinemaMode();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map progress % to approximate Dhoni career year (2004 to 2024)
  const currentYear = Math.min(2024, Math.floor(2004 + (scrollProgress / 100) * 20));

  return (
    <>
      {/* Floating Bottom Career Rail HUD */}
      <div
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-auto",
          isCinemaMode ? "opacity-40 hover:opacity-100" : "opacity-90"
        )}
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0d0f17]/85 backdrop-blur-md border border-white/10 shadow-2xl">
          <span className="text-[10px] font-mono text-slate-400">2004</span>
          
          <div className="w-28 sm:w-44 md:w-56 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-400 via-csk-gold to-csk-yellow rounded-full transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <span className="text-[10px] font-mono text-csk-yellow font-bold">{currentYear}</span>

          <div className="h-3 w-px bg-white/15 mx-0.5" />

          {/* Documentary Mode Button */}
          <button
            onClick={toggleCinemaMode}
            title={isCinemaMode ? "Exit Cinema Mode (Esc)" : "Enter Cinema Mode"}
            className={cn(
              "p-1.5 rounded-full transition-all text-xs flex items-center gap-1 font-mono",
              isCinemaMode
                ? "bg-csk-gold text-black font-bold shadow-glow-gold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">
              {isCinemaMode ? "CINEMA ON" : "CINEMA"}
            </span>
          </button>

          {/* Procedural Audio Atmosphere Button */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Stadium Atmosphere" : "Enable Stadium Atmosphere"}
            className={cn(
              "p-1.5 rounded-full transition-all text-xs flex items-center gap-1 font-mono",
              soundEnabled
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
};
