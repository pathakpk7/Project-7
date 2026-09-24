"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Shield, Activity, Target, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const IndiaCsSection: React.FC = () => {
  const [activeUniverse, setActiveUniverse] = useState<"india" | "csk">("india");

  const indiaData = {
    title: "TEAM INDIA",
    tagline: "The World Leader & ICC Legend",
    matches: "538",
    runs: "17,266",
    average: "44.96",
    strikeRate: "79.07",
    hundreds: "16",
    fifties: "108",
    catches: "634",
    stumpings: "195",
    captaincyMatches: "332",
    captaincyWins: "178",
    winRate: "59.52%",
    trophies: "2007 T20 WC • 2011 CWC • 2013 CT • 2009 Test Mace #1 • 2x Asia Cups",
    colorTheme: "from-sky-600 to-blue-900 border-sky-500/40 text-sky-400 shadow-glow-blue",
  };

  const cskData = {
    title: "CHENNAI SUPER KINGS",
    tagline: "Thala & The Yellow Army",
    matches: "264 (IPL) + 24 (CLT20)",
    runs: "5,243 (IPL)",
    average: "39.13",
    strikeRate: "137.54",
    hundreds: "0",
    fifties: "24",
    catches: "142",
    stumpings: "42",
    captaincyMatches: "226 (IPL) + 24 (CLT20)",
    captaincyWins: "133 (IPL) + 15 (CLT20)",
    winRate: "58.85% (IPL) • 65.2% (CLT20)",
    trophies: "5x IPL Titles (2010, 2011, 2018, 2021, 2023) • 2x CLT20 Titles (2010, 2014)",
    colorTheme: "from-amber-500 to-yellow-600 border-csk-gold/40 text-csk-yellow shadow-glow-gold",
  };

  const current = activeUniverse === "india" ? indiaData : cskData;
  const currentBgImage = activeUniverse === "india" 
    ? "/images/two-worlds/dhoni_india_jersey7_back.jpg" 
    : "/images/two-worlds/dhoni_csk_action_shot.jpg";

  return (
    <section id="india-csk" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="CHAPTER VIII · TWO WORLDS"
        title="INDIA BLUE & CSK YELLOW"
        subtitle="“One heartbeat, two immortal jerseys. Same composure—nation on his chest, yellow in his veins.”"
        accentColor={activeUniverse === "india" ? "blue" : "gold"}
        bgImage={currentBgImage}
        bgOpacity={activeUniverse === "india" ? "opacity-45 sm:opacity-35" : "opacity-35 sm:opacity-30"}
      />

      {/* Universe Switcher Tabs */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveUniverse("india")}
          className={cn(
            "px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer",
            activeUniverse === "india"
              ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-glow-blue scale-105"
              : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
          )}
        >
          <span>🇮🇳 1. TEAM INDIA (BLUE)</span>
        </button>

        <button
          onClick={() => setActiveUniverse("csk")}
          className={cn(
            "px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer",
            activeUniverse === "csk"
              ? "bg-gradient-to-r from-csk-gold to-csk-yellow text-black shadow-glow-gold scale-105 font-bold"
              : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
          )}
        >
          <span>🟡 2. CHENNAI SUPER KINGS (YELLOW)</span>
        </button>
      </div>

      {/* Active Universe Showcase Card */}
      <div className={cn(
        "rounded-3xl bg-surface/90 border p-6 sm:p-10 backdrop-blur-xl shadow-2xl transition-all duration-500 relative overflow-hidden",
        activeUniverse === "india" ? "border-sky-500/30 shadow-glow-blue" : "border-csk-gold/30 shadow-glow-gold"
      )}>
        {/* Dynamic Low-Fade Background Image inside Showcase Card */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <Image
            key={activeUniverse}
            src={currentBgImage}
            alt={`${current.title} Showcase Background`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className={cn(
              "object-cover object-center transition-opacity duration-700",
              activeUniverse === "india" ? "opacity-25 sm:opacity-20 object-top" : "opacity-25 sm:opacity-20 object-center"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/85 to-[#08090C]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_20%,#08090C_90%)]" />
        </div>

        {/* Dynamic ambient backdrop */}
        <div className={cn(
          "absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 transition-colors z-0",
          activeUniverse === "india" ? "bg-sky-500" : "bg-csk-gold"
        )} />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                {current.tagline}
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-mono">
                {current.title}
              </h3>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
              <span>Career Span: {activeUniverse === "india" ? "2004 — 2019" : "2008 — Present"}</span>
            </div>
          </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-mono">
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10">
            <div className="text-xs text-slate-400 uppercase">Matches Played</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">{current.matches}</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10">
            <div className="text-xs text-slate-400 uppercase">Total Runs</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">{current.runs}</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10">
            <div className="text-xs text-slate-400 uppercase">Batting Average</div>
            <div className={cn("text-2xl sm:text-3xl font-bold mt-1", activeUniverse === "india" ? "text-sky-400" : "text-csk-yellow")}>{current.average}</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10">
            <div className="text-xs text-slate-400 uppercase">Strike Rate</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">{current.strikeRate}</div>
          </div>
        </div>

        {/* Captaincy & Keeping Splits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono">
          <div className="p-5 rounded-2xl bg-surface-raised border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300">
              <Crown className="w-4 h-4 text-csk-gold" />
              <span>Captaincy Leadership Record</span>
            </div>
            <div className="text-sm text-white">
              {current.captaincyMatches} Matches Captained • {current.captaincyWins} Wins
            </div>
            <div className="text-xs text-emerald-400 font-bold">
              Win Rate: {current.winRate}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-raised border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Wicketkeeping Dismissals</span>
            </div>
            <div className="text-sm text-white">
              {current.catches} Catches Taken • {current.stumpings} Lightning Stumpings
            </div>
            <div className="text-xs text-slate-400">
              Total Dismissals: {Number(current.catches) + Number(current.stumpings)}
            </div>
          </div>
        </div>

        {/* Major Trophies List */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-csk-yellow">
            <Trophy className="w-4 h-4" />
            <span>Title Honors in this Arena:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-semibold">
            {current.trophies}
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};
