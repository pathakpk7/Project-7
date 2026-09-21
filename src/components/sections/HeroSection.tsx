"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, Sparkles, Activity, Compass, Shield, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onEnterJourney: () => void;
  onTriggerNo7: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterJourney,
  onTriggerNo7,
}) => {
  const years = [2004, 2005, 2007, 2008, 2009, 2010, 2011, 2013, 2016, 2018, 2020, 2021, 2023, 2024];
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentYearIndex((prev) => (prev + 1) % years.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [years.length]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Dynamic stadium backdrop lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl h-[480px] bg-gradient-to-b from-india-blue/20 via-csk-gold/15 to-transparent blur-[130px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-raised/90 border border-white/10 backdrop-blur-xl shadow-lg hover:border-csk-gold/40 transition-colors">
          <span className="w-2 h-2 rounded-full bg-csk-yellow animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
            DECODING THE MAN BEHIND NO. 7
          </span>
        </div>

        {/* Hero Title */}
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white">
            CAPTAIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-csk-yellow via-amber-200 to-amber-500">COOL</span>
          </h1>
          <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-light tracking-widest uppercase text-slate-400">
            DECODED
          </div>
        </div>

        {/* Triple Tagline */}
        <div className="py-2">
          <p className="text-base sm:text-xl md:text-2xl font-semibold tracking-wider uppercase text-slate-200 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-sky-400">THE NUMBERS.</span>
            <span className="text-slate-600">•</span>
            <span className="text-csk-yellow">THE DECISIONS.</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-100">THE MOMENTS.</span>
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed">
            From the fearless swashbuckler of 2004 to cricket&apos;s most composed tactician. 
            Explore the verified data warehouse behind one of sport&apos;s greatest minds.
          </p>
        </div>

        {/* Year Ticker Pill */}
        <div className="py-2">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-surface/90 border border-white/10 backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">ERA</span>
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-csk-yellow transition-all duration-500">
              {years[currentYearIndex]}
            </span>
            <span className="text-xs font-mono text-slate-500">2004 — 2024</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#journey"
            onClick={onEnterJourney}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 text-black font-mono font-bold text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-glow-gold flex items-center justify-center gap-2.5 group"
          >
            <span>ENTER THE JOURNEY</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>

          <a
            href="#batsman"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-surface-raised/80 hover:bg-surface-raised border border-white/10 hover:border-white/30 text-white font-mono text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5"
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>EXPLORE BATTING (1–4 vs 5–7)</span>
          </a>
        </div>

        {/* Quick Snapshot KPIs */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-md hover:border-sky-500/40 transition-colors">
            <div className="text-xs font-mono text-slate-400 uppercase">Intl Runs</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">17,266</div>
            <div className="text-[11px] text-sky-400 font-mono">Avg: 44.96 • 538 Matches</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-md hover:border-csk-gold/40 transition-colors">
            <div className="text-xs font-mono text-slate-400 uppercase">ICC White-Ball Cups</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-csk-yellow font-mono mt-1">3 / 3</div>
            <div className="text-[11px] text-csk-gold font-mono">T20 WC, CWC, CT (Only Captain)</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
            <div className="text-xs font-mono text-slate-400 uppercase">IPL Titles (CSK)</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">5 Titles</div>
            <div className="text-[11px] text-emerald-400 font-mono">10 Finals • 264 Matches</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-md hover:border-purple-500/40 transition-colors">
            <div className="text-xs font-mono text-slate-400 uppercase">Wicketkeeping</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">829+</div>
            <div className="text-[11px] text-purple-400 font-mono">195 Stumpings (World Record)</div>
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="pt-10 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">SCROLL TO DECODE</span>
        <ArrowDown className="w-4 h-4 text-slate-400 animate-bounce" />
      </div>
    </section>
  );
};
