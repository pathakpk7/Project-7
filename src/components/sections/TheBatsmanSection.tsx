"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import formatStatsData from "@/data/format_stats.json";
import positionStatsData from "@/data/position_stats.json";
import roleComparisonData from "@/data/role_comparison.json";
import yearlyStatsData from "@/data/yearly_stats.json";
import { Activity, Zap, Award, Target, Layers, Sparkles, Flame, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export const TheBatsmanSection: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>("ODI");
  const [roleMode, setRoleMode] = useState<"custom" | "standard">("custom");

  const formats = ["ODI", "TEST", "T20I", "IPL", "ALL_INTERNATIONAL", "OVERALL"];

  // Format stat for selected format
  const currentFormatStat = formatStatsData.find((f) => f.format === selectedFormat) || formatStatsData[0];

  // Filter positions for selected format
  const currentPositions = positionStatsData
    .filter((p) => p.format === selectedFormat)
    .sort((a, b) => Number(a.batting_position) - Number(b.batting_position));

  // Role comparisons for selected format
  const currentRoles = roleComparisonData.filter((r) => r.format === selectedFormat);
  const pos1_4 = currentRoles.find((r) => r.role_group === "POS_1_4");
  const pos5_7 = currentRoles.find((r) => r.role_group === "POS_5_7");
  const topOrder = currentRoles.find((r) => r.role_group === "TOP_ORDER_1_3");
  const middleOrder = currentRoles.find((r) => r.role_group === "MIDDLE_ORDER_4_6");
  const lowerOrder = currentRoles.find((r) => r.role_group === "LOWER_ORDER_7_11");

  // Yearly data for chart
  const yearlyTrend = yearlyStatsData
    .filter((y) => y.format === selectedFormat)
    .sort((a, b) => Number(a.year) - Number(b.year));

  const maxYearlyRuns = Math.max(...yearlyTrend.map((y) => Number(y.runs) || 0), 1);

  return (
    <section id="batsman" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="THE BATSMAN & POSITIONS"
        title="THE RUN MACHINE DECONSTRUCTED"
        subtitle="Explore MS Dhoni's batting career across formats with deep position-level breakdown (1–4 vs 5–7)."
        accentColor="gold"
      />

      {/* Format Selector Pills */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {formats.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300",
              selectedFormat === fmt
                ? "bg-gradient-to-r from-csk-gold to-csk-yellow text-black shadow-glow-gold scale-105"
                : "bg-surface-raised border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
            )}
          >
            {fmt.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
        <KpiCard label="Runs" value={Number(currentFormatStat.runs).toLocaleString()} subtext={`${currentFormatStat.matches} Matches`} accent="gold" />
        <KpiCard label="Batting Avg" value={currentFormatStat.average} subtext={`${currentFormatStat.dismissals} Dismissals`} accent="gold" />
        <KpiCard label="Strike Rate" value={currentFormatStat.strike_rate} subtext={`${currentFormatStat.balls} Balls Faced`} accent="blue" />
        <KpiCard label="Highest Score" value={currentFormatStat.highest_score} subtext="Career Best" accent="silver" />
        <KpiCard label="100s / 50s" value={`${currentFormatStat.hundreds} / ${currentFormatStat.fifties}`} subtext="Milestone Knocks" accent="gold" />
        <KpiCard label="Not Outs" value={currentFormatStat.not_outs} subtext={`${currentFormatStat.innings} Total Innings`} accent="emerald" />
      </div>

      {/* CRITICAL SECTION: POSITIONS 1–4 VS 5–7 SHOWCASE WITH EMBEDDED IMAGERY */}
      <div className="rounded-3xl bg-surface/90 border border-csk-gold/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-12 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-csk-gold/10 border border-csk-gold/30 text-csk-yellow text-xs font-mono font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>SPECIAL ANALYSIS REQUEST: BATTING POSITIONS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              POSITIONS 1–4 vs POSITIONS 5–7 IN {selectedFormat.replace("_", " ")}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Calculated dynamically from underlying delivery-level arrival order. Average = Total Runs / Total Dismissals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRoleMode("custom")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono transition-all",
                roleMode === "custom" ? "bg-white/20 text-white font-bold" : "bg-white/5 text-slate-400"
              )}
            >
              1–4 vs 5–7
            </button>
            <button
              onClick={() => setRoleMode("standard")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono transition-all",
                roleMode === "standard" ? "bg-white/20 text-white font-bold" : "bg-white/5 text-slate-400"
              )}
            >
              Top / Mid / Lower
            </button>
          </div>
        </div>

        {roleMode === "custom" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Order 1-4 with Image */}
            <div className="p-5 rounded-2xl bg-surface-raised border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                    POSITIONS 1–4 (THE EARLY SWASHBUCKLER)
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {pos1_4 ? `${pos1_4.innings} Innings` : "0 Innings"}
                  </span>
                </div>

                {/* Embedded Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10 shadow-lg">
                  <img
                    src="/images/odi/dhoni_long_hair_bat_raise.jpg"
                    alt="MS Dhoni Positions 1-4 Early Era"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-[11px] font-mono text-slate-200">
                    183* vs SL (Jaipur) • 148 vs PAK (Vizag)
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-center">
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs text-slate-400 uppercase">Runs</div>
                    <div className="text-xl font-bold text-white mt-1">{pos1_4 ? pos1_4.runs : "0"}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs text-slate-400 uppercase">Average</div>
                    <div className="text-xl font-bold text-csk-yellow mt-1">{pos1_4 ? pos1_4.average : "0.00"}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs text-slate-400 uppercase">Strike Rate</div>
                    <div className="text-xl font-bold text-sky-400 mt-1">{pos1_4 ? pos1_4.strike_rate : "0.00"}</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between font-mono pt-4 mt-4 border-t border-white/5">
                <span>100s: <strong className="text-white">{pos1_4?.hundreds || 0}</strong></span>
                <span>50s: <strong className="text-white">{pos1_4?.fifties || 0}</strong></span>
                <span>4s/6s: <strong className="text-white">{pos1_4?.fours || 0}/{pos1_4?.sixes || 0}</strong></span>
              </div>
            </div>

            {/* Lower Order 5-7 with Image */}
            <div className="p-5 rounded-2xl bg-surface-raised border border-csk-gold/30 shadow-glow-gold relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-csk-yellow font-bold px-2.5 py-1 rounded bg-csk-gold/10 border border-csk-gold/30">
                    POSITIONS 5–7 (THE FINISHER ENGINE)
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {pos5_7 ? `${pos5_7.innings} Innings` : "0 Innings"}
                  </span>
                </div>

                {/* Embedded Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-csk-gold/30 shadow-lg">
                  <img
                    src="/images/odi/dhoni_jersey7_back_walk.jpg"
                    alt="MS Dhoni Positions 5-7 Finisher Engine"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-[11px] font-mono text-csk-yellow">
                    47 Not Outs in Victories • 102.71 Chasing Avg
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-center">
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs text-slate-400 uppercase">Runs</div>
                    <div className="text-xl font-bold text-white mt-1">{pos5_7 ? pos5_7.runs : "0"}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs text-slate-400 uppercase">Average</div>
                    <div className="text-xl font-bold text-csk-yellow mt-1">{pos5_7 ? pos5_7.average : "0.00"}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs text-slate-400 uppercase">Strike Rate</div>
                    <div className="text-xl font-bold text-sky-400 mt-1">{pos5_7 ? pos5_7.strike_rate : "0.00"}</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between font-mono pt-4 mt-4 border-t border-white/5">
                <span>100s: <strong className="text-white">{pos5_7?.hundreds || 0}</strong></span>
                <span>50s: <strong className="text-white">{pos5_7?.fifties || 0}</strong></span>
                <span>4s/6s: <strong className="text-white">{pos5_7?.fours || 0}/{pos5_7?.sixes || 0}</strong></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Order 1-3 */}
            <div className="p-4 rounded-xl bg-surface-raised border border-white/10 font-mono">
              <div className="text-xs text-sky-400 font-bold uppercase mb-2">TOP ORDER (1–3)</div>
              <div className="text-2xl font-bold text-white">{topOrder?.runs || 0} runs</div>
              <div className="text-xs text-slate-400 mt-1">Avg: {topOrder?.average || "0.00"} • SR: {topOrder?.strike_rate || "0.00"}</div>
            </div>
            {/* Middle Order 4-6 */}
            <div className="p-4 rounded-xl bg-surface-raised border border-csk-gold/30 font-mono">
              <div className="text-xs text-csk-yellow font-bold uppercase mb-2">MIDDLE ORDER (4–6)</div>
              <div className="text-2xl font-bold text-white">{middleOrder?.runs || 0} runs</div>
              <div className="text-xs text-slate-400 mt-1">Avg: {middleOrder?.average || "0.00"} • SR: {middleOrder?.strike_rate || "0.00"}</div>
            </div>
            {/* Lower Order 7-11 */}
            <div className="p-4 rounded-xl bg-surface-raised border border-white/10 font-mono">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-2">LOWER ORDER (7–11)</div>
              <div className="text-2xl font-bold text-white">{lowerOrder?.runs || 0} runs</div>
              <div className="text-xs text-slate-400 mt-1">Avg: {lowerOrder?.average || "0.00"} • SR: {lowerOrder?.strike_rate || "0.00"}</div>
            </div>
          </div>
        )}

        {/* Mechanics Showcase: Pull Shot & Helicopter Shot */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] shadow-xl">
            <img
              src="/images/odi/dhoni_pull_shot.jpg"
              alt="MS Dhoni Signature Pull Shot"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="md:col-span-2 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-xs text-csk-yellow font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-csk-gold" />
              <span>THE HELICOPTER SHOT & BOTTOM-HAND MECHANICS</span>
            </div>
            <h4 className="text-lg font-bold text-white uppercase tracking-tight">
              Re-inventing the Yorker Response in Modern Cricket
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Developed on the hard gravel grounds of Ranchi with tennis balls, Dhoni&apos;s trademark &ldquo;Helicopter Shot&rdquo; converted toe-crushing 145 km/h yorkers into soaring mid-wicket maximums using pure bottom-hand wrist rotation and extreme bat speed.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">183* vs SL</div>
                <div className="font-bold text-csk-yellow mt-0.5">10 Sixes</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">148 vs PAK</div>
                <div className="font-bold text-sky-400 mt-0.5">15 Fours</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">Career Sixes</div>
                <div className="font-bold text-emerald-400 mt-0.5">359+ Sixes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Position 1 to 11 Detailed Breakdown Table */}
      <div className="rounded-3xl bg-surface/80 border border-white/10 p-6 backdrop-blur-md mb-12">
        <h4 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
          EXACT POSITION BREAKDOWN (POSITIONS 1 TO 11) — {selectedFormat.replace("_", " ")}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase">
                <th className="py-3 px-3">Position</th>
                <th className="py-3 px-3">Innings</th>
                <th className="py-3 px-3">Runs</th>
                <th className="py-3 px-3">Balls</th>
                <th className="py-3 px-3">Dismissals</th>
                <th className="py-3 px-3">Average</th>
                <th className="py-3 px-3">Strike Rate</th>
                <th className="py-3 px-3">100s / 50s</th>
                <th className="py-3 px-3">Highest Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentPositions.map((pos) => (
                <tr key={pos.batting_position} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-csk-yellow">
                    No. {pos.batting_position}
                  </td>
                  <td className="py-3 px-3 text-white">{pos.innings}</td>
                  <td className="py-3 px-3 text-white font-bold">{pos.runs}</td>
                  <td className="py-3 px-3 text-slate-400">{pos.balls_faced}</td>
                  <td className="py-3 px-3 text-slate-400">{pos.dismissals}</td>
                  <td className="py-3 px-3 font-bold text-csk-gold">{pos.average}</td>
                  <td className="py-3 px-3 text-sky-400">{pos.strike_rate}</td>
                  <td className="py-3 px-3 text-slate-300">{pos.hundreds} / {pos.fifties}</td>
                  <td className="py-3 px-3 text-white font-bold">{pos.highest_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yearly Runs Evolution Chart */}
      {yearlyTrend.length > 0 && (
        <div className="rounded-3xl bg-surface/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-semibold">
                YEAR-BY-YEAR RUNS EVOLUTION — {selectedFormat.replace("_", " ")}
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Bar height indicates volume of runs; tooltips reveal yearly averages.
              </p>
            </div>
          </div>

          {/* Responsive CSS / SVG Bar Visualizer */}
          <div className="h-48 flex items-end gap-2 pt-6 pb-2 border-b border-white/10">
            {yearlyTrend.map((y) => {
              const r = Number(y.runs) || 0;
              const heightPct = Math.max((r / maxYearlyRuns) * 100, 4);
              return (
                <div key={y.year} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                  {/* Floating tooltip */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-surface-raised border border-csk-gold/40 text-[10px] font-mono p-1.5 rounded-lg shadow-xl text-center whitespace-nowrap">
                    <div className="font-bold text-csk-yellow">{y.year}: {r} runs</div>
                    <div className="text-slate-400">Avg: {y.average} | SR: {y.strike_rate}</div>
                  </div>

                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-india-blue/40 to-csk-gold group-hover:from-csk-gold group-hover:to-csk-yellow transition-all duration-300 shadow-sm"
                  />
                  <span className="text-[10px] font-mono text-slate-400 transform -rotate-45 sm:rotate-0 mt-2">
                    {String(y.year).slice(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
