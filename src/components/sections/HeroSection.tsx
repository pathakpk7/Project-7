"use client";

import React from "react";
import { ArrowDown, BookOpen, Compass, Activity } from "lucide-react";

interface HeroSectionProps {
  onEnterJourney: () => void;
  onTriggerNo7: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterJourney }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,119,182,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40">
            <BookOpen className="w-3.5 h-3.5 text-csk-gold" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-slate-400">
              An interactive career story
            </span>
          </div>

          <p className="font-story text-xl sm:text-2xl md:text-3xl text-slate-300 italic leading-snug max-w-2xl mx-auto">
            &ldquo;They called him Captain Cool. This is the story the numbers were always trying to tell.&rdquo;
          </p>

          <div className="space-y-1 pt-2">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white">
              Captain <span className="text-csk-yellow">Cool</span>
            </h1>
            <p className="text-sm sm:text-base font-mono uppercase tracking-[0.45em] text-slate-500">
              Decoded · Scroll to read
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-sans">
            From the fearless swashbuckler of 2004 to cricket&apos;s most composed tactician.
            Explore the verified data warehouse behind one of sport&apos;s greatest minds—chapter by chapter.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#journey"
            onClick={onEnterJourney}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-glow-gold flex items-center justify-center gap-2.5 group"
          >
            <span>Begin Chapter I</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>

          <a
            href="#batsman"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] text-slate-200 font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5"
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Jump to The Blade</span>
          </a>
        </div>

        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Intl Runs</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">17,266</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-1">Avg: 44.96 • 538 Matches</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/30 border border-csk-gold/20">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">ICC White-Ball Cups</div>
            <div className="text-2xl sm:text-3xl font-display text-csk-yellow mt-1">3 / 3</div>
            <div className="text-[11px] text-csk-gold/80 font-mono mt-1">T20 WC, CWC, CT (Only Captain)</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">IPL Titles (CSK)</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">5 Titles</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-1">10 Finals • 264 Matches</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Wicketkeeping</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">829+</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-1">195 Stumpings (World Record)</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-500">Scroll the story</span>
        <ArrowDown className="w-4 h-4 text-csk-gold/70 animate-bounce" />
      </div>
    </section>
  );
};
