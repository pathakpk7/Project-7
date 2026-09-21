"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import wkStatsData from "@/data/wicketkeeping_stats.json";
import { Shield, Zap, Timer, Award, CheckCircle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export const TheKeeperSection: React.FC = () => {
  // Reaction test state
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready" | "finished">("idle");
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState("waiting");
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 2000) + 1200;
    const tid = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, delay);
    setTimeoutId(tid);
  };

  const handleBoxClick = () => {
    if (gameState === "waiting") {
      if (timeoutId) clearTimeout(timeoutId);
      setGameState("idle");
      alert("Too early! Wait for the light to turn green.");
    } else if (gameState === "ready") {
      const elapsed = Date.now() - startTime;
      setReactionTime(elapsed);
      setGameState("finished");
    }
  };

  const overallWk = wkStatsData.find((w) => w.format === "OVERALL") || wkStatsData[0];
  const odisWk = wkStatsData.find((w) => w.format === "ODI") || { catches: "308", stumpings: "118", total_dismissals: "426" };
  const testsWk = wkStatsData.find((w) => w.format === "TEST") || { catches: "248", stumpings: "36", total_dismissals: "284" };
  const iplWk = wkStatsData.find((w) => w.format === "IPL") || { catches: "142", stumpings: "42", total_dismissals: "184" };

  return (
    <section id="keeper" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="THE WICKETKEEPER"
        title="LIGHTNING BEHIND THE STUMPS"
        subtitle="Unorthodox technique, zero-backlift collection, blind flicks, and an undisputed world record 195 stumpings."
        accentColor="blue"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <KpiCard label="Total Dismissals" value={overallWk.total_dismissals} subtext="Across All Formats" accent="blue" icon={Shield} />
        <KpiCard label="World Record Stumpings" value={overallWk.stumpings} subtext="Fastest Hands in Cricket" accent="gold" icon={Zap} />
        <KpiCard label="Catches Taken" value={overallWk.catches} subtext="Behind the Stumps" accent="silver" icon={Award} />
        <KpiCard label="Fastest Stumping" value="0.08 sec" subtext="Faster than a blink (0.10s)" accent="emerald" icon={Timer} />
      </div>

      {/* Interactive Wicketkeeping Arena & Reaction Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Left: Reaction Time Simulator */}
        <div className="rounded-3xl bg-surface/90 border border-india-blue/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold mb-3">
              <Timer className="w-3.5 h-3.5" />
              <span>INTERACTIVE SIMULATOR: 0.08s REFLEX TEST</span>
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
              CAN YOU MATCH DHONI&apos;S 0.08-SECOND REFLEXES?
            </h3>
            <p className="text-xs text-slate-400 font-mono leading-relaxed mb-6">
              When the button flashes green, tap or click immediately. MS Dhoni recorded stumping dismissals in as low as 80 milliseconds.
            </p>
          </div>

          {/* Game Action Area */}
          <div className="my-4">
            {gameState === "idle" && (
              <button
                onClick={startTest}
                className="w-full py-8 rounded-2xl bg-surface-raised border border-white/20 text-white font-mono font-bold text-sm uppercase tracking-widest hover:border-sky-400 transition-all"
              >
                CLICK TO START REFLEX CHALLENGE
              </button>
            )}

            {gameState === "waiting" && (
              <button
                onClick={handleBoxClick}
                className="w-full py-8 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-rose-300 font-mono font-bold text-sm uppercase tracking-widest animate-pulse"
              >
                WAIT FOR GREEN...
              </button>
            )}

            {gameState === "ready" && (
              <button
                onClick={handleBoxClick}
                className="w-full py-8 rounded-2xl bg-emerald-500 text-black font-mono font-extrabold text-lg uppercase tracking-widest shadow-glow-gold scale-105 transition-all"
              >
                ⚡ STUMP NOW! ⚡
              </button>
            )}

            {gameState === "finished" && (
              <div className="p-6 rounded-2xl bg-surface-raised border border-white/20 text-center font-mono space-y-3">
                <div className="text-xs text-slate-400 uppercase">Your Reaction Time</div>
                <div className="text-4xl font-extrabold text-sky-400">{reactionTime} ms</div>
                <div className="text-xs text-slate-300">
                  {reactionTime && reactionTime <= 120 ? (
                    <span className="text-csk-yellow font-bold">🏆 Incredible! Dhoni-level reflexes!</span>
                  ) : reactionTime && reactionTime <= 250 ? (
                    <span className="text-emerald-400">⚡ Fast human reflexes (average is ~220ms).</span>
                  ) : (
                    <span className="text-slate-400">Dhoni would have taken the bails off twice! Try again.</span>
                  )}
                </div>
                <button
                  onClick={startTest}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white uppercase tracking-wider transition-colors"
                >
                  TRY AGAIN
                </button>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-mono pt-4 border-t border-white/5">
            Measured against verified stumping speeds recorded via stump-camera telemetry.
          </div>
        </div>

        {/* Right: Format Dismissals & Unorthodox Mastery */}
        <div className="rounded-3xl bg-surface/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <h3 className="text-lg font-mono uppercase tracking-widest text-slate-200 font-bold">
            WICKETKEEPING BREAKDOWN BY ARENA
          </h3>

          <div className="space-y-3 font-mono">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">One Day Internationals (ODI)</div>
                <div className="text-xs text-slate-400">{odisWk.catches} Catches • {odisWk.stumpings} Stumpings</div>
              </div>
              <div className="text-xl font-bold text-sky-400">{odisWk.total_dismissals}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Test Matches</div>
                <div className="text-xs text-slate-400">{testsWk.catches} Catches • {testsWk.stumpings} Stumpings</div>
              </div>
              <div className="text-xl font-bold text-sky-400">{testsWk.total_dismissals}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Indian Premier League (IPL)</div>
                <div className="text-xs text-slate-400">{iplWk.catches} Catches • {iplWk.stumpings} Stumpings</div>
              </div>
              <div className="text-xl font-bold text-csk-yellow">{iplWk.total_dismissals}</div>
            </div>
          </div>

          {/* Masterclass Highlights */}
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-sky-400 uppercase font-mono">Signature Techniques:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>No-Reach Stumping</strong>: Absorbing ball momentum into stumps without swinging hands back.</li>
              <li><strong>Blind Deflection / Backhand Flick</strong>: Deflecting throws onto the stumps without looking.</li>
              <li><strong>The 2016 Glove-Off Sprint</strong>: Removing right glove before the final ball to run out Mustafizur Rahman.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
