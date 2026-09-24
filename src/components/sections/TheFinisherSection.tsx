"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import chasingStatsData from "@/data/chasing_stats.json";
import finishingStatsData from "@/data/finishing_stats.json";
import { Zap, Flame, Target, Award, ShieldAlert, CheckCircle, Timer, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchHeist {
  id: string;
  year: string;
  match: string;
  targetRuns: number;
  ballsLeft: number;
  sequence: string[];
  finalScore: string;
  description: string;
}

const HISTORICAL_HEISTS: MatchHeist[] = [
  {
    id: "celkon_2013",
    year: "2013",
    match: "Tri-Series Final vs Sri Lanka (Port of Spain)",
    targetRuns: 15,
    ballsLeft: 6,
    sequence: ["0 (Dot)", "6 (Long-off)", "4 (Point)", "6 (Cover)"],
    finalScore: "45* (52 balls)",
    description: "India 9 wickets down needing 15 off Shaminda Eranga. Dhoni waited out ball 1, then unleashed 6, 4, 6 to claim the silverware with 2 balls to spare."
  },
  {
    id: "dharamsala_2010",
    year: "2010",
    match: "IPL Virtual Quarter-Final vs KXIP (Dharamsala)",
    targetRuns: 16,
    ballsLeft: 6,
    sequence: ["4 (Square)", "2 (Running)", "6 (Over Cover)", "6 (Out of Stadium)"],
    finalScore: "54* (29 balls)",
    description: "CSK needed 16 off Irfan Pathan. Dhoni finished 4, 2, 6, 6 and delivered the iconic helmet-punch celebration to launch CSK's maiden IPL title run."
  },
  {
    id: "rcb_2018",
    year: "2018",
    match: "CSK vs RCB (Chinnaswamy Stadium)",
    targetRuns: 16,
    ballsLeft: 6,
    sequence: ["Single (Rayudu)", "6 (Dhoni over long-on)", "2", "6 (Winning Six)"],
    finalScore: "70* (34 balls)",
    description: "Chasing 206, Dhoni blasted 7 sixes and launched Corey Anderson over wide long-on with 2 balls to spare."
  },
  {
    id: "mi_2024",
    year: "2024",
    match: "CSK vs MI (Wankhede Stadium)",
    targetRuns: 20,
    ballsLeft: 4,
    sequence: ["6 (Long-off)", "6 (Deep Mid-Wicket)", "6 (Square Leg)", "2"],
    finalScore: "20* (4 balls)",
    description: "Walked in with 4 balls left in the 20th over off Hardik Pandya. Smashed a natural hat-trick of sixes (6, 6, 6) for 20* — the exact winning margin."
  }
];

export const TheFinisherSection: React.FC = () => {
  const [selectedArena, setSelectedArena] = useState<"ODI" | "IPL" | "T20I">("ODI");
  const [selectedHeistId, setSelectedHeistId] = useState<string>("celkon_2013");

  const currentDeathStats = finishingStatsData.find((f) => f.format === selectedArena) || finishingStatsData[0];
  const activeHeist = HISTORICAL_HEISTS.find((h) => h.id === selectedHeistId) || HISTORICAL_HEISTS[0];

  return (
    <section id="finisher" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="CHAPTER V · THE CALM"
        title="THE DEATH-OVERS ENGINE"
        subtitle="“Death overs, ice in the veins. How MS Dhoni turned impossible high-pressure math into inevitable victories.”"
        accentColor="emerald"
        bgImage="/images/finisher/dhoni_finisher_celebration.jpg"
        bgOpacity="opacity-40 sm:opacity-35"
      />

      {/* Hero Finishing Highlight Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 via-surface-raised to-slate-900 border border-csk-gold/40 p-6 sm:p-8 backdrop-blur-xl mb-10 shadow-glow-gold relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-15 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/images/odi/dhoni_jersey7_back_walk.jpg')` }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-csk-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-csk-gold/20 text-csk-yellow text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>THE GOLDEN ARITHMETIC OF CHASING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              &ldquo;TAKE THE GAME DEEP. THE BOWLER IS UNDER MORE PRESSURE THAN YOU.&rdquo;
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              In successful ODI run-chases, MS Dhoni scored 2,876 runs with an astronomical average of 102.71 and 47 not outs in victories. He finished international matches with a six on 9 distinct occasions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface/90 border border-csk-gold/30 font-mono text-center space-y-2 backdrop-blur-md shadow-lg">
            <div className="text-xs text-slate-400 uppercase">ODI Successful Chases Avg</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-csk-yellow font-display">102.71</div>
            <div className="text-[11px] text-emerald-400 font-bold">47 Not Outs in Victories (116 Matches)</div>
          </div>
        </div>
      </div>

      {/* Interactive Final Over Heist Simulator */}
      <div className="rounded-3xl bg-black/50 border border-white/15 p-6 sm:p-8 backdrop-blur-xl mb-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-csk-gold font-bold uppercase tracking-wider">
              <Timer className="w-3.5 h-3.5" />
              <span>FINAL-OVER PRESSURE HEISTS: HOW HE BROKE OPPONENTS</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              {activeHeist.match}
            </h3>
          </div>

          {/* Heist Selector Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {HISTORICAL_HEISTS.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHeistId(h.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer",
                  selectedHeistId === h.id
                    ? "bg-csk-gold text-black shadow-glow-gold"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                )}
              >
                {h.year} ({h.targetRuns} in {h.ballsLeft}b)
              </button>
            ))}
          </div>
        </div>

        {/* Live Over Execution Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs">
            <span className="text-slate-400">Pressure Required: <strong className="text-white">{activeHeist.targetRuns} runs</strong> needed</span>
            <span className="text-csk-yellow font-bold">Dhoni's Inning: {activeHeist.finalScore}</span>
          </div>

          {/* Sequence Bubbles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeHeist.sequence.map((ball, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3.5 rounded-xl border text-center font-mono space-y-1",
                  ball.includes("6")
                    ? "bg-amber-500/15 border-csk-gold text-csk-yellow shadow-glow-gold"
                    : ball.includes("4")
                    ? "bg-sky-500/15 border-sky-400 text-sky-300"
                    : "bg-white/5 border-white/10 text-slate-300"
                )}
              >
                <div className="text-[10px] text-slate-400 uppercase">Ball {idx + 1}</div>
                <div className="text-sm font-bold">{ball}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2">
            {activeHeist.description}
          </p>
        </div>
      </div>

      {/* Arena Selector */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(["ODI", "IPL", "T20I"] as const).map((arena) => (
          <button
            key={arena}
            onClick={() => setSelectedArena(arena)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer",
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
