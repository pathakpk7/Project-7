"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import capStatsData from "@/data/captaincy_stats.json";
import { Trophy, Award, Shield, Target, CheckCircle2, Flame, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export const TheCaptainSection: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("India");

  const indiaStats = capStatsData.filter((c) => c.team === "India");
  const cskStats = capStatsData.filter((c) => c.team === "Chennai Super Kings");
  const rpsgStats = capStatsData.filter((c) => c.team === "Rising Pune Supergiant" || c.team === "Rising Pune Supergiants");

  const currentRecords = selectedTeam === "India" ? indiaStats : selectedTeam === "CSK" ? cskStats : rpsgStats;

  // Key totals
  const totalCaptained = selectedTeam === "India" ? 332 : selectedTeam === "CSK" ? 226 : 14;
  const totalWins = selectedTeam === "India" ? 178 : selectedTeam === "CSK" ? 133 : 5;
  const winRate = selectedTeam === "India" ? "59.52%" : selectedTeam === "CSK" ? "58.85%" : "35.71%";

  return (
    <section id="captain" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="THE CAPTAIN & TACTICIAN"
        title="THE MIND OF CAPTAIN COOL"
        subtitle="Unshakable composure, gut instinct backed by data, high-pressure clarity, and an unprecedented ICC trophy clean sweep."
        accentColor="gold"
      />

      {/* Team Filter Pills */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setSelectedTeam("India")}
          className={cn(
            "px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2",
            selectedTeam === "India"
              ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-glow-blue scale-105"
              : "bg-surface-raised border border-white/10 text-slate-300 hover:text-white"
          )}
        >
          <span>🇮🇳 TEAM INDIA (332 MATCHES)</span>
        </button>

        <button
          onClick={() => setSelectedTeam("CSK")}
          className={cn(
            "px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2",
            selectedTeam === "CSK"
              ? "bg-gradient-to-r from-csk-gold to-csk-yellow text-black shadow-glow-gold scale-105"
              : "bg-surface-raised border border-white/10 text-slate-300 hover:text-white"
          )}
        >
          <span>🟡 CHENNAI SUPER KINGS (226 MATCHES)</span>
        </button>

        <button
          onClick={() => setSelectedTeam("RPSG")}
          className={cn(
            "px-4 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all duration-300",
            selectedTeam === "RPSG"
              ? "bg-purple-600 text-white shadow-lg scale-105"
              : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
          )}
        >
          <span>RPSG (2016)</span>
        </button>
      </div>

      {/* Captaincy Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <KpiCard className="p-3.5 sm:p-4 rounded-xl" label="Matches Captained" value={totalCaptained} subtext={`Across ${selectedTeam} tenures`} accent="gold" icon={Crown} />
        <KpiCard className="p-3.5 sm:p-4 rounded-xl" label="Matches Won" value={totalWins} subtext="Clinical Victories" accent="emerald" icon={CheckCircle2} />
        <KpiCard className="p-3.5 sm:p-4 rounded-xl" label="Win Rate" value={winRate} subtext="Excluding No Results" accent="blue" icon={Target} />
        <KpiCard className="p-3.5 sm:p-4 rounded-xl" label="Major Trophies" value={selectedTeam === "India" ? "3 ICC + #1 Mace" : "5 IPL + 2 CLT20"} subtext="Title Pedigree" accent="gold" icon={Trophy} />
      </div>

      {/* Detailed Format Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10">
        {selectedTeam === "India" ? (
          <>
            {/* ODIs */}
            <div className="rounded-2xl bg-surface/80 border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-sky-400">ONE DAY INTERNATIONALS</span>
                <span className="text-[10px] font-mono text-slate-400">2007–2018</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">200 Matches</div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs pt-2 border-t border-white/5">
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-emerald-400 font-bold text-sm">110</div><div className="text-[9px] text-slate-400">Wins</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-rose-400 font-bold text-sm">74</div><div className="text-[9px] text-slate-400">Losses</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-csk-gold font-bold text-sm">59.5%</div><div className="text-[9px] text-slate-400">Win %</div></div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Led India to 2011 World Cup, 2013 Champions Trophy, and 2008 CB Series triumph in Australia.
              </p>
            </div>

            {/* Tests */}
            <div className="rounded-2xl bg-surface/80 border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-sky-400">TEST MATCHES</span>
                <span className="text-[10px] font-mono text-slate-400">2008–2014</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">60 Matches</div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs pt-2 border-t border-white/5">
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-emerald-400 font-bold text-sm">27</div><div className="text-[9px] text-slate-400">Wins</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-rose-400 font-bold text-sm">18</div><div className="text-[9px] text-slate-400">Losses</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-sky-400 font-bold text-sm">15</div><div className="text-[9px] text-slate-400">Draws</div></div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Propelled India to ICC Test Ranking No. 1 for the first time (2009). 21 home Test victories.
              </p>
            </div>

            {/* T20Is */}
            <div className="rounded-2xl bg-surface/80 border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-sky-400">T20 INTERNATIONALS</span>
                <span className="text-[10px] font-mono text-slate-400">2007–2016</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">72 Matches</div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs pt-2 border-t border-white/5">
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-emerald-400 font-bold text-sm">41</div><div className="text-[9px] text-slate-400">Wins</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-rose-400 font-bold text-sm">28</div><div className="text-[9px] text-slate-400">Losses</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-csk-gold font-bold text-sm">59.3%</div><div className="text-[9px] text-slate-400">Win %</div></div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Inaugural 2007 T20 World Champions, 2014 T20 WC Finalists, and 2016 Asia Cup Champions.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* CSK IPL */}
            <div className="rounded-2xl bg-surface/80 border border-csk-gold/30 p-4 sm:p-5 backdrop-blur-md space-y-3 shadow-glow-gold">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-csk-yellow">IPL CAPTAINCY</span>
                <span className="text-[10px] font-mono text-slate-400">2008–2023</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">226 Matches</div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs pt-2 border-t border-white/5">
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-csk-yellow font-bold text-sm">133</div><div className="text-[9px] text-slate-400">Wins</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-slate-400 font-bold text-sm">91</div><div className="text-[9px] text-slate-400">Losses</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-csk-gold font-bold text-sm">58.8%</div><div className="text-[9px] text-slate-400">Win %</div></div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                5 IPL Trophies (2010, 2011, 2018, 2021, 2023), 10 Finals, 12 Playoffs appearances.
              </p>
            </div>

            {/* CSK CLT20 */}
            <div className="rounded-2xl bg-surface/80 border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-csk-yellow">CHAMPIONS LEAGUE T20</span>
                <span className="text-[10px] font-mono text-slate-400">2010–2014</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">24 Matches</div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs pt-2 border-t border-white/5">
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-csk-yellow font-bold text-sm">15</div><div className="text-[9px] text-slate-400">Wins</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-slate-400 font-bold text-sm">8</div><div className="text-[9px] text-slate-400">Losses</div></div>
                <div className="p-1.5 rounded-lg bg-white/5"><div className="text-csk-gold font-bold text-sm">65.2%</div><div className="text-[9px] text-slate-400">Win %</div></div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                2x Champions League T20 Titles (2010 in South Africa, 2014 in India).
              </p>
            </div>

            {/* Tactical Philosophy */}
            <div className="rounded-2xl bg-surface/80 border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-2.5 font-mono text-xs text-slate-300">
              <div className="text-xs font-bold text-white uppercase mb-1">CSK CULTURE & LEADERSHIP</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                &ldquo;Process is more important than the result.&rdquo; Dhoni created the most stable franchise in global T20 cricket through backing players through slumps and defining roles with crystal clarity.
              </p>
            </div>
          </>
        )}
      </div>

      {/* ICC Trophy Clean Sweep Callout */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-950/40 via-surface to-amber-950/40 border border-csk-gold/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-csk-yellow uppercase tracking-widest">
            <Trophy className="w-4 h-4" />
            <span>UNPRECEDENTED CRICKET HISTORY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            THE ONLY CAPTAIN WITH THE ICC WHITE-BALL TRIFECTA
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            2007 T20 World Cup (South Africa) • 2011 Cricket World Cup (India) • 2013 Champions Trophy (England).
          </p>
        </div>

        <div>
          <a
            href="#trophies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-csk-gold hover:bg-csk-yellow text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-glow-gold whitespace-nowrap"
          >
            <span>VIEW TROPHY CABINET</span>
            <Trophy className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
