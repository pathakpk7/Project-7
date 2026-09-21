"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import chasingStatsData from "@/data/chasing_stats.json";
import finishingStatsData from "@/data/finishing_stats.json";
import { Zap, Flame, Target, Award, ShieldAlert, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const TheFinisherSection: React.FC = () => {
  const [selectedArena, setSelectedArena] = useState<"ODI" | "IPL" | "T20I">("ODI");

  const odisChase = chasingStatsData.find((c) => c.format === "ODI") || chasingStatsData[0];
  const iplChase = chasingStatsData.find((c) => c.format === "IPL") || chasingStatsData[0];

  const currentDeathStats = finishingStatsData.find((f) => f.format === selectedArena) || finishingStatsData[0];

  return (
    <section id="finisher" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="THE FINISHER & DEATH OVERS"
        title="ICE IN THE VEINS: TAKING IT DEEP"
        subtitle="Unraveling the arithmetic of run-chases, death-over strike rates, and nerve management in the final over."
        accentColor="gold"
      />

      {/* Hero Finishing Highlight Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 via-surface-raised to-slate-900 border border-csk-gold/40 p-6 sm:p-8 backdrop-blur-xl mb-12 shadow-glow-gold relative overflow-hidden">
        {/* Cinematic Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-15 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/images/odi/dhoni_jersey7_back_walk.jpg')` }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-csk-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-csk-gold/20 text-csk-yellow text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>THE GOLDEN RULE OF CHASING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              &ldquo;TAKE THE GAME DEEP. THE BOWLER IS UNDER MORE PRESSURE THAN YOU.&rdquo;
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              In ODI run chases, MS Dhoni averaged over 50+, and in successful chases, his average exceeded 102.71 with 47 unbeaten match-winning knocks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-white/10 font-mono text-center space-y-2">
            <div className="text-xs text-slate-400 uppercase">ODI Successful Chases Avg</div>
            <div className="text-4xl font-extrabold text-csk-yellow">102.71</div>
            <div className="text-[11px] text-emerald-400">47 Not Outs in Victories</div>
          </div>
        </div>
      </div>

      {/* Arena Selector */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(["ODI", "IPL", "T20I"] as const).map((arena) => (
          <button
            key={arena}
            onClick={() => setSelectedArena(arena)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all",
              selectedArena === arena
                ? "bg-csk-gold text-black shadow-glow-gold scale-105"
                : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
            )}
          >
            {arena} DEATH OVERS
          </button>
        ))}
      </div>

      {/* Death Over Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Death Overs SR" value={currentDeathStats.strike_rate} subtext={currentDeathStats.death_overs_definition} accent="gold" icon={Zap} />
        <KpiCard label="Boundary %" value={currentDeathStats.boundary_percentage} subtext={`${currentDeathStats.fours} Fours • ${currentDeathStats.sixes} Sixes`} accent="emerald" icon={Flame} />
        <KpiCard label="Dot Ball %" value={currentDeathStats.dot_ball_percentage} subtext={`${currentDeathStats.dot_balls} Dot deliveries`} accent="silver" icon={ShieldAlert} />
        <KpiCard label="Death Overs Runs" value={currentDeathStats.runs_scored} subtext={`Off ${currentDeathStats.balls_faced} balls faced`} accent="blue" icon={Award} />
      </div>
    </section>
  );
};
