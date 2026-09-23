"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, Compass, Activity, Database, Sparkles, Trophy } from "lucide-react";
import { useCinemaMode } from "@/components/cinematic/CinemaModeProvider";

interface HeroSectionProps {
  onEnterJourney: () => void;
  onTriggerNo7: () => void;
  onOpenAskMahi?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterJourney,
  onTriggerNo7,
  onOpenAskMahi,
}) => {
  const { isCinemaMode } = useCinemaMode();
  const [prologueBeat, setPrologueBeat] = useState(0);

  // Cinematic opening beats on mount
  useEffect(() => {
    const t1 = setTimeout(() => setPrologueBeat(1), 300);
    const t2 = setTimeout(() => setPrologueBeat(2), 1200);
    const t3 = setTimeout(() => setPrologueBeat(3), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20 overflow-hidden"
    >
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_15%,rgba(0,119,182,0.16),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_85%,rgba(253,185,19,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-7">
        {/* Prologue Atmosphere Pacing */}
        <div className="flex flex-col items-center gap-2 transition-all duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-csk-gold animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-slate-300">
              RANCHI 2004 — CHENNAI 2024
            </span>
          </div>

          <p
            className={`font-story text-xl sm:text-2xl md:text-3xl text-slate-300 italic leading-snug max-w-2xl mx-auto transition-opacity duration-1000 ${
              prologueBeat >= 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            &ldquo;Before Captain Cool... there was just Mahi.&rdquo;
          </p>
        </div>

        {/* Hero Title & Golden Emblem */}
        <div
          className={`space-y-3 pt-1 transition-all duration-1000 ${
            prologueBeat >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-csk-gold/50 shadow-glow-gold bg-black/80">
              <Image
                src="/images/brand/dhoni_icon.jpg"
                alt="MS Dhoni No. 7 Emblem"
                fill
                sizes="(max-width: 768px) 48px, 64px"
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white">
              Captain <span className="text-csk-yellow">Cool</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.45em] text-slate-400">
            DECODED · The Numbers · The Decisions · The Moments
          </p>
        </div>

        <p
          className={`text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-sans transition-opacity duration-1000 ${
            prologueBeat >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          From a raw Railway ticket collector hitting balls out of Kharagpur to cricket&apos;s most decorated white-ball tactician.
          Journey through the verified data warehouse of sports&apos; greatest finisher.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="#journey"
            onClick={onEnterJourney}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-glow-gold flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Begin Chapter I</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>

          {onOpenAskMahi && (
            <button
              onClick={onOpenAskMahi}
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-csk-gold/40 bg-csk-gold/10 hover:bg-csk-gold/20 text-csk-yellow font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Database className="w-4 h-4" />
              <span>Ask Mahi Warehouse</span>
            </button>
          )}

          <a
            href="#batsman"
            className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>The Blade (1–7)</span>
          </a>
        </div>

        {/* Core Pillar Numbers (Strictly Verified) */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Intl Runs</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">17,266</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-1">Avg 44.96 • 538 Matches</div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-csk-gold/30 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">ICC White-Ball Cups</div>
            <div className="text-2xl sm:text-3xl font-display text-csk-yellow mt-1">3 / 3</div>
            <div className="text-[11px] text-csk-gold/90 font-mono mt-1">T20 WC, CWC, CT (Only Captain)</div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">IPL Titles (CSK)</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">5 Titles</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-1">11 Finals • 264 Matches</div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Wicketkeeping</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">829</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-1">195 Stumpings (World Record)</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-500">Scroll down to enter the documentary</span>
        <ArrowDown className="w-4 h-4 text-csk-gold/70 animate-bounce" />
      </div>
    </section>
  );
};
