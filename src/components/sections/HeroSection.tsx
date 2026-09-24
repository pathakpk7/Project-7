"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Compass, Activity, Database, Sparkles } from "lucide-react";

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
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden z-10"
    >
      {/* Dual Dhoni Hero Background Image - Vibrant & Balanced Visibility */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <Image
          src="/images/hero/hero_dhoni_duo.jpg"
          alt="MS Dhoni India Blue and CSK Yellow Dual Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 sm:opacity-40 scale-100 transition-opacity duration-700"
        />
        {/* Cinematic Vignette & Bottom/Top Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-[#08090C]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,rgba(8,9,12,0.45)_0%,rgba(8,9,12,0.2)_50%,rgba(8,9,12,0.85)_100%)]" />
      </div>

      {/* Atmospheric team color aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_40%,rgba(0,119,182,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_40%,rgba(253,185,19,0.18),transparent_70%)] pointer-events-none" />

      <div className="relative z-20 max-w-4xl mx-auto space-y-6">
        {/* Prologue Badge & Quote */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-csk-gold/40 bg-black/80 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-csk-gold animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-csk-yellow font-semibold">
              RANCHI 2004 — CHENNAI 2024
            </span>
          </div>

          <p className="font-story text-xl sm:text-2xl md:text-3xl text-slate-100 italic leading-snug max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            &ldquo;Before Captain Cool... there was just Mahi.&rdquo;
          </p>
        </div>

        {/* Hero Title & Golden Emblem */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-csk-gold shadow-glow-gold bg-black/90 shrink-0">
              <Image
                src="/images/brand/dhoni_icon.jpg"
                alt="MS Dhoni No. 7 Emblem"
                fill
                sizes="(max-width: 768px) 48px, 64px"
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Captain <span className="text-csk-yellow">Cool</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-slate-200 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            DECODED · The Numbers · The Decisions · The Moments
          </p>
        </div>

        {/* Hero Description */}
        <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
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
              className="w-full sm:w-auto px-7 py-4 rounded-full border border-csk-gold/50 bg-csk-gold/15 hover:bg-csk-gold/25 text-csk-yellow font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Database className="w-4 h-4 text-csk-yellow" />
              <span>Ask Mahi Warehouse</span>
            </button>
          )}

          <a
            href="#batsman"
            className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] text-slate-100 font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>The Blade (1–7)</span>
          </a>
        </div>

        {/* Core Pillar Numbers (Always Visible & Highly Legible) */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-[#0e111a]/90 border border-white/15 backdrop-blur-md shadow-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Intl Runs</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">17,266</div>
            <div className="text-[11px] text-sky-400 font-mono mt-1 font-medium">Avg 44.96 • 538 Matches</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e111a]/90 border border-csk-gold/40 backdrop-blur-md shadow-glow-gold">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">ICC White-Ball Cups</div>
            <div className="text-2xl sm:text-3xl font-display text-csk-yellow mt-1">3 / 3</div>
            <div className="text-[11px] text-csk-gold font-mono mt-1 font-medium">T20 WC, CWC, CT (Only Captain)</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e111a]/90 border border-white/15 backdrop-blur-md shadow-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">IPL Titles (CSK)</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">5 Titles</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1 font-medium">11 Finals • 264 Matches</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e111a]/90 border border-white/15 backdrop-blur-md shadow-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Wicketkeeping</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">829</div>
            <div className="text-[11px] text-purple-300 font-mono mt-1 font-medium">195 Stumpings (World Record)</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-400">Scroll down to enter the documentary</span>
        <ArrowDown className="w-4 h-4 text-csk-gold animate-bounce" />
      </div>
    </section>
  );
};
