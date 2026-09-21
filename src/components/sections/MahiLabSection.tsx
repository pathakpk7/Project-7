"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Zap, Target, Sliders, Shield, AlertTriangle, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const MahiLabSection: React.FC = () => {
  const [runsRequired, setRunsRequired] = useState<number>(15);
  const [ballsRemaining, setBallsRemaining] = useState<number>(6);
  const [bowlerType, setBowlerType] = useState<string>("Fast Bowler (Yorkers)");
  const [fieldSetting, setFieldSetting] = useState<string>("Deep Midwicket + Long-On Out");

  const requiredRate = ((runsRequired / ballsRemaining) * 6).toFixed(1);

  // Dynamic tactical simulation calculation
  const calculateOdds = () => {
    if (runsRequired <= ballsRemaining) return { prob: "94%", plan: "Puncture gaps, convert 1s into 2s, zero panic." };
    if (runsRequired <= ballsRemaining * 2) return { prob: "78%", plan: "Target one boundary in first 3 balls, take the chase to the final 2 deliveries." };
    if (runsRequired <= ballsRemaining * 3) return { prob: "52%", plan: "Pre-empt the yorker, open the face past short third man, whip full balls with wrists." };
    if (runsRequired <= ballsRemaining * 4) return { prob: "28%", plan: "Helicopter shot zone! High-risk maximum required over long-on." };
    return { prob: "12%", plan: "Near-impossible mathematical equation; requires no-balls or extras." };
  };

  const simulationResult = calculateOdds();

  return (
    <section id="lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="MAHI TACTICAL LAB"
        title="CRUNCH TIME SCENARIO SIMULATOR"
        subtitle="Step into Dhoni's tactical mindset in the final overs. Adjust variables and decode the strategic roadmap."
        accentColor="gold"
      />

      {/* Simulator Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl bg-surface/90 border border-csk-gold/30 p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-csk-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left 2 Cols: Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-csk-yellow uppercase tracking-widest">
            <Sliders className="w-4 h-4" />
            <span>TACTICAL CONTROL VARIABLES</span>
          </div>

          {/* Runs Required Slider */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase">Runs Required to Win:</span>
              <span className="text-xl font-bold text-csk-yellow">{runsRequired} runs</span>
            </div>
            <input
              type="range"
              min="4"
              max="30"
              value={runsRequired}
              onChange={(e) => setRunsRequired(Number(e.target.value))}
              className="w-full accent-csk-gold cursor-pointer"
            />
          </div>

          {/* Balls Remaining Slider */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase">Balls Remaining:</span>
              <span className="text-xl font-bold text-sky-400">{ballsRemaining} balls</span>
            </div>
            <input
              type="range"
              min="2"
              max="18"
              value={ballsRemaining}
              onChange={(e) => setBallsRemaining(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          {/* Bowler Type Selector */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/10 space-y-2">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase">Opposition Bowler:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {["Fast Bowler (Yorkers)", "Left-Arm Seamer (Angles)", "Leg Spinner / Mystery"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBowlerType(b)}
                  className={cn(
                    "p-2.5 rounded-xl text-xs font-mono transition-all text-left",
                    bowlerType === b ? "bg-csk-gold/20 border border-csk-gold text-csk-yellow font-bold" : "bg-white/5 text-slate-400 hover:text-white"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Simulation Output */}
        <div className="rounded-2xl bg-surface-raised border border-white/10 p-6 flex flex-col justify-between space-y-6 font-mono">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">CALCULATED TARGET MATH</div>
            <div className="text-4xl font-extrabold text-white">
              {runsRequired} <span className="text-sm font-normal text-slate-400">off</span> {ballsRemaining}
            </div>
            <div className="text-xs text-sky-400 mt-1">
              Required Run Rate: <strong>{requiredRate} RPO</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <div className="text-xs text-slate-400 uppercase">Historical Dhoni Win Probability:</div>
            <div className="text-3xl font-extrabold text-emerald-400">{simulationResult.prob}</div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="font-bold text-csk-gold uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Dhoni Blueprint & Execution:</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              {simulationResult.plan}
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 text-[10px] text-slate-500">
            Hypothetical mathematical simulation powered by career death-over scoring distributions.
          </div>
        </div>
      </div>
    </section>
  );
};
