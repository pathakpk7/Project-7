"use client";

import React from "react";
import Image from "next/image";
import { Heart, BookOpen } from "lucide-react";

interface FooterProps {
  onTriggerNo7?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerNo7 }) => {
  return (
    <footer className="relative border-t border-white/10 bg-black/80 pt-16 pb-12 overflow-hidden xl:pl-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(229,168,35,0.08),transparent)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <BookOpen className="w-8 h-8 text-csk-gold/60 mx-auto mb-4" />
          <p className="font-display text-2xl sm:text-3xl text-white mb-3">End of story</p>
          <p className="font-story text-lg text-slate-400 italic">
            You&apos;ve walked the chapters. The warehouse stays open whenever you return.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <button
                onClick={onTriggerNo7}
                title="Click to activate Number 7 Experience"
                className="relative w-9 h-9 rounded-full overflow-hidden border border-csk-gold/60 hover:border-csk-gold hover:scale-105 transition-all shadow-glow-gold bg-black cursor-pointer"
              >
                <Image
                  src="/images/brand/dhoni_icon.jpg"
                  alt="MS Dhoni Captain Cool 07 Icon"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </button>
              <span className="font-display text-lg tracking-wide text-white">Captain Cool: Decoded</span>
            </div>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed text-center md:text-left mx-auto md:mx-0">
              An interactive, cinematic cricket data exploration dedicated to the legendary career, composure, tactical brilliance, and legacy of Mahendra Singh Dhoni.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-4">Jump to chapter</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li><a href="#journey" className="hover:text-csk-yellow transition-colors">I · The Years</a></li>
              <li><a href="#batsman" className="hover:text-csk-yellow transition-colors">II · The Blade</a></li>
              <li><a href="#keeper" className="hover:text-csk-yellow transition-colors">III · The Gloves</a></li>
              <li><a href="#captain" className="hover:text-csk-yellow transition-colors">IV · The Mind</a></li>
              <li><a href="#finisher" className="hover:text-csk-yellow transition-colors">V · The Calm</a></li>
              <li><a href="#india-csk" className="hover:text-csk-yellow transition-colors">VIII · Two Worlds</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for MS Dhoni by a childhood fan</span>
          </div>
          <div>
            <span>&copy; 2024 Captain Cool: Decoded. Non-commercial passion project.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
