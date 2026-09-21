"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import comparisonsData from "@/data/comparisons.json";
import { Users, Award, Shield, Trophy, Target, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const DhoniVsEraSection: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("Kumar Sangakkara");

  const dhoni = comparisonsData.find((p) => p.player === "MS Dhoni") || comparisonsData[0];
  const peer = comparisonsData.find((p) => p.player === selectedPlayer) || comparisonsData[1];

  const peersList = comparisonsData.filter((p) => p.player !== "MS Dhoni");

  return (
    <section id="era" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="DHONI VS THE ERA"
        title="NEUTRAL STATISTICAL COMPARISON"
        subtitle="Objective side-by-side career metrics comparing MS Dhoni against other legendary titans of the modern cricketing era."
        accentColor="silver"
      />

      {/* Select Peer Player Pills */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {peersList.map((p) => (
          <button
            key={p.player}
            onClick={() => setSelectedPlayer(p.player)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap",
              selectedPlayer === p.player
                ? "bg-white text-black shadow-lg scale-105"
                : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
            )}
          >
            {p.player}
          </button>
        ))}
      </div>

      {/* Head-to-Head Comparison Arena */}
      <div className="rounded-3xl bg-surface/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden">
        
        {/* Headings */}
        <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/10 text-center font-mono">
          <div className="p-4 rounded-2xl bg-csk-gold/10 border border-csk-gold/30">
            <span className="text-xs text-csk-yellow uppercase tracking-widest font-bold block mb-1">REFERENCE SUBJECT</span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">MS DHONI</h3>
            <p className="text-[11px] text-slate-400 mt-1">{dhoni.role}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1">COMPARISON PEER</span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">{peer.player}</h3>
            <p className="text-[11px] text-slate-400 mt-1">{peer.role}</p>
          </div>
        </div>

        {/* Comparative Metric Rows */}
        <div className="space-y-4 pt-6 font-mono text-sm">
          
          {/* ODI Average */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-csk-yellow w-1/3">{dhoni.odis_avg}</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">ODI Batting Average</div>
            <div className="text-right font-bold text-white w-1/3">{peer.odis_avg}</div>
          </div>

          {/* ODI Runs */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-white w-1/3">{Number(dhoni.odis_runs).toLocaleString()}</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">ODI Runs</div>
            <div className="text-right font-bold text-white w-1/3">{Number(peer.odis_runs).toLocaleString()}</div>
          </div>

          {/* ODI Strike Rate */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-sky-400 w-1/3">{dhoni.odis_sr}</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">ODI Strike Rate</div>
            <div className="text-right font-bold text-sky-400 w-1/3">{peer.odis_sr}</div>
          </div>

          {/* IPL Runs & Average */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-csk-yellow w-1/3">{dhoni.ipl_runs} ({dhoni.ipl_avg} avg)</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">IPL Runs (Avg)</div>
            <div className="text-right font-bold text-white w-1/3">{peer.ipl_runs} ({peer.ipl_avg} avg)</div>
          </div>

          {/* Test Runs & Average */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-white w-1/3">{dhoni.tests_runs} ({dhoni.tests_avg} avg)</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">Test Runs (Avg)</div>
            <div className="text-right font-bold text-white w-1/3">{peer.tests_runs} ({peer.tests_avg} avg)</div>
          </div>

          {/* Catches & Stumpings */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-emerald-400 w-1/3">{dhoni.total_catches}c / {dhoni.total_stumpings}st</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">Wicketkeeping (Catches/Stumpings)</div>
            <div className="text-right font-bold text-emerald-400 w-1/3">{peer.total_catches}c / {peer.total_stumpings}st</div>
          </div>

          {/* Captaincy Trophies */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-csk-gold w-1/3">{dhoni.icc_trophies_as_captain} ICC • {dhoni.ipl_titles_as_captain} IPL</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">Titles as Captain</div>
            <div className="text-right font-bold text-slate-300 w-1/3">{peer.icc_trophies_as_captain} ICC • {peer.ipl_titles_as_captain} IPL</div>
          </div>

          {/* Unbeaten ODI Chases */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-white/5 flex items-center justify-between">
            <div className="text-left font-bold text-csk-yellow w-1/3">{dhoni.finishing_not_outs_odis} Not Outs</div>
            <div className="text-center text-xs text-slate-400 uppercase w-1/3">ODI Career Not Outs</div>
            <div className="text-right font-bold text-white w-1/3">{peer.finishing_not_outs_odis} Not Outs</div>
          </div>

        </div>
      </div>

      {/* Neutral Research Transparency Disclaimer */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 font-mono flex items-start gap-2 max-w-2xl mx-auto text-center justify-center">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Note: This comparison presents verified factual data without artificial ranking models or subjective GOAT algorithms.
        </span>
      </div>
    </section>
  );
};
