"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import capStatsData from "@/data/captaincy_stats.json";
import { Trophy, Award, Shield, Target, CheckCircle2, Flame, Crown, Compass, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface TacticalGambit {
  id: string;
  year: string;
  title: string;
  match: string;
  situation: string;
  decision: string;
  outcome: string;
  fieldFocus: string;
}

const TACTICAL_GAMBITS: TacticalGambit[] = [
  {
    id: "2007_wc",
    year: "2007",
    title: "The Joginder Sharma Final Over Gambit",
    match: "ICC World Twenty20 Final vs Pakistan (Johannesburg)",
    situation: "Pakistan need 13 runs off 6 balls with 1 wicket in hand. Misbah-ul-Haq is on strike.",
    decision: "Entrusted the unheralded medium-pacer Joginder Sharma instead of veteran Harbhajan Singh, placing Sreesanth at fine-leg for the scoop shot.",
    outcome: "Misbah scooped high to short fine-leg. India won by 5 runs to claim the inaugural World T20 crown.",
    fieldFocus: "Short Fine-Leg trap set specifically anticipating the scoop"
  },
  {
    id: "2013_ct",
    year: "2013",
    title: "The Ishant Sharma 18th Over Re-call",
    match: "ICC Champions Trophy Final vs England (Edgbaston)",
    situation: "Rain-reduced 20-over final. England cruising at 102/4 needing 28 off 18 balls.",
    decision: "Backed Ishant Sharma (who had conceded 27 runs in 3 overs) to bowl the crucial 18th over with tailored field cushions.",
    outcome: "Ishant dismissed Eoin Morgan and Ravi Bopara on consecutive balls, triggering a 4/3 collapse to win by 5 runs.",
    fieldFocus: "Deep Mid-Wicket & Square-Leg boundary cushions"
  },
  {
    id: "2016_ban",
    year: "2016",
    title: "The Glove-Off 25m Sprint Run-Out",
    match: "ICC World T20 Group Match vs Bangladesh (Bengaluru)",
    situation: "Bangladesh need 2 runs to win off 1 ball with Mustafizur Rahman and Shuvagata Hom.",
    decision: "Removed right keeping glove before the delivery to eliminate throwing delay, anticipating a bye attempt and opting to out-sprint the batsman.",
    outcome: "Sprint run-out completed by inches. India won by 1 run in one of cricket's most heart-stopping finishes.",
    fieldFocus: "Keeper positioned 3 yards closer with right glove in left hand"
  }
];

export const TheCaptainSection: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>("India");
  const [activeGambit, setActiveGambit] = useState<string>("2007_wc");

  const indiaStats = capStatsData.filter((c) => c.team === "India");
  const cskStats = capStatsData.filter((c) => c.team === "Chennai Super Kings");
  const rpsgStats = capStatsData.filter((c) => c.team === "Rising Pune Supergiant" || c.team === "Rising Pune Supergiants");

  const totalCaptained = selectedTeam === "India" ? 332 : selectedTeam === "CSK" ? 226 : 14;
  const totalWins = selectedTeam === "India" ? 178 : selectedTeam === "CSK" ? 133 : 5;
  const winRate = selectedTeam === "India" ? "59.52%" : selectedTeam === "CSK" ? "58.85%" : "35.71%";

  const currentGambit = TACTICAL_GAMBITS.find((g) => g.id === activeGambit) || TACTICAL_GAMBITS[0];

  return (
    <section id="captain" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="THE CAPTAIN & TACTICIAN"
        title="THE MIND OF CAPTAIN COOL"
        subtitle="Unshakable composure, gut instinct backed by data, high-pressure clarity, and an unprecedented ICC trophy clean sweep."
        accentColor="gold"
      />

      {/* Team Filter Pills */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        <button
          onClick={() => setSelectedTeam("India")}
          className={cn(
            "px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer",
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
            "px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer",
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
            "px-4 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer",
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

      {/* Interactive 2D Tactical Field & Gambit Explorer */}
      <div className="rounded-3xl bg-black/50 border border-white/15 p-6 sm:p-8 backdrop-blur-xl mb-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-csk-gold font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>TACTICAL CHESSBOARD: SIGNATURE CAPTAINCY GAMBITS</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              {currentGambit.title} ({currentGambit.year})
            </h3>
          </div>

          {/* Gambit Selector Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {TACTICAL_GAMBITS.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGambit(g.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer",
                  activeGambit === g.id
                    ? "bg-csk-gold text-black shadow-glow-gold"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                )}
              >
                {g.year}
              </button>
            ))}
          </div>
        </div>

        {/* Tactical Scenario Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">01. Match Pressure Situation</span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentGambit.situation}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-csk-gold/20 space-y-2">
            <span className="text-[10px] font-mono text-csk-yellow font-bold uppercase tracking-wider">02. Captain Cool's Tactical Call</span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentGambit.decision}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/20 space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">03. Historic Outcome</span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentGambit.outcome}</p>
          </div>
        </div>
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-csk-gold hover:bg-csk-yellow text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-glow-gold whitespace-nowrap cursor-pointer"
          >
            <span>VIEW TROPHY CABINET</span>
            <Trophy className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
