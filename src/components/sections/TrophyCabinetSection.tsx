"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import trophiesData from "@/data/trophies.json";
import { Trophy, Award, Crown, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const TrophyCabinetSection: React.FC = () => {
  const [filterTeam, setFilterTeam] = useState<"ALL" | "India" | "CSK">("ALL");

  const filteredTrophies = trophiesData.filter((t) => {
    if (filterTeam === "India") return t.team === "India";
    if (filterTeam === "CSK") return t.team === "Chennai Super Kings";
    return true;
  });

  return (
    <section id="trophies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="THE TROPHY CABINET"
        title="THE GOLDEN VAULT"
        subtitle="Every major ICC, continental, and franchise trophy lifted under the leadership of Captain Cool."
        accentColor="gold"
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setFilterTeam("ALL")}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all",
            filterTeam === "ALL" ? "bg-white/20 text-white border border-white/30" : "bg-white/5 text-slate-400 hover:text-white"
          )}
        >
          ALL TITLES ({trophiesData.length})
        </button>
        <button
          onClick={() => setFilterTeam("India")}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5",
            filterTeam === "India" ? "bg-sky-500/20 text-sky-400 border border-sky-500/40" : "bg-white/5 text-slate-400 hover:text-sky-400"
          )}
        >
          <span>🇮🇳 INDIA TITLES</span>
        </button>
        <button
          onClick={() => setFilterTeam("CSK")}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5",
            filterTeam === "CSK" ? "bg-csk-gold/20 text-csk-yellow border border-csk-gold/40" : "bg-white/5 text-slate-400 hover:text-csk-yellow"
          )}
        >
          <span>🟡 CSK TITLES</span>
        </button>
      </div>

      {/* Trophy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrophies.map((trophy, idx) => {
          const isICC = trophy.competition.includes("ICC") || trophy.competition.includes("World");
          const isCSK = trophy.team.includes("Chennai");

          return (
            <div
              key={idx}
              className={cn(
                "group relative rounded-3xl bg-surface/90 border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-2xl",
                isICC ? "border-sky-500/30 hover:border-sky-400 shadow-glow-blue" : "border-csk-gold/30 hover:border-csk-gold shadow-glow-gold"
              )}
            >
              {/* Top ambient glow */}
              <div className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity",
                isICC ? "bg-sky-500" : "bg-csk-gold"
              )} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-2.5 rounded-2xl border flex items-center justify-center",
                      isICC ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-csk-gold/10 border-csk-gold/30 text-csk-yellow"
                    )}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xl font-extrabold text-white">
                      {trophy.year}
                    </span>
                  </div>

                  <span className={cn(
                    "text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border",
                    isICC ? "bg-sky-950/50 border-sky-500/30 text-sky-400" : "bg-amber-950/50 border-csk-gold/30 text-csk-yellow"
                  )}>
                    {trophy.team}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-csk-yellow transition-colors">
                    {trophy.competition}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    vs {trophy.opponent} • {trophy.venue}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{trophy.result}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {trophy.significance}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Captain: {trophy.captain}</span>
                <span>{trophy.source}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
