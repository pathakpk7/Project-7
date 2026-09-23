"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AggregatedStat, CricketFormat, MatchRecord } from "@/analytics/types";
import { getMatchesForEntity } from "@/analytics/careerAnalytics";
import { X, Calendar, MapPin, Trophy, Shield, Activity, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchDrilldownModalProps {
  stat: AggregatedStat | null;
  mode: string;
  format: CricketFormat;
  onClose: () => void;
}

export const MatchDrilldownModal: React.FC<MatchDrilldownModalProps> = ({
  stat,
  mode,
  format,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (stat) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stat, onClose]);

  if (!stat) return null;

  const matches: MatchRecord[] = getMatchesForEntity(mode, stat.id, format);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-surface-elevated/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-csk-gold/10 via-transparent to-sky-500/10 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-csk-yellow uppercase tracking-widest mb-1">
                <span className="px-2 py-0.5 rounded bg-csk-gold/15 border border-csk-gold/30">
                  {format === "ALL" ? "ALL FORMATS" : format}
                </span>
                <span>•</span>
                <span className="text-slate-400">{mode.replace("_", " ")} LOG</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-display">
                {stat.name}
              </h2>
              {stat.subtext && (
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{stat.subtext}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* KPI Summary Banner */}
          <div className="px-5 py-3 bg-white/5 border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 font-mono text-center">
            <div className="p-2 rounded-lg bg-black/30">
              <span className="text-[10px] text-slate-400 uppercase">Innings</span>
              <div className="text-sm sm:text-base font-bold text-white">{stat.innings}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/30">
              <span className="text-[10px] text-slate-400 uppercase">Runs</span>
              <div className="text-sm sm:text-base font-bold text-white">{stat.runs.toLocaleString()}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/30">
              <span className="text-[10px] text-slate-400 uppercase">Average</span>
              <div className="text-sm sm:text-base font-bold text-csk-yellow">{stat.average}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/30">
              <span className="text-[10px] text-slate-400 uppercase">Strike Rate</span>
              <div className="text-sm sm:text-base font-bold text-sky-400">{stat.strike_rate}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/30">
              <span className="text-[10px] text-slate-400 uppercase">Highest</span>
              <div className="text-sm sm:text-base font-bold text-white">{stat.highest_score}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/30">
              <span className="text-[10px] text-slate-400 uppercase">100s / 50s</span>
              <div className="text-sm sm:text-base font-bold text-amber-400">{stat.hundreds} / {stat.fifties}</div>
            </div>
            <div className="p-2 rounded-lg bg-black/30 col-span-2 sm:col-span-2 lg:col-span-1 border border-purple-500/20">
              <span className="text-[10px] text-purple-300 uppercase">WK Dismissals</span>
              <div className="text-sm sm:text-base font-bold text-emerald-400">
                {(stat.catches || 0) + (stat.stumpings || 0)}{" "}
                <span className="text-[10px] text-slate-400 font-normal">
                  ({stat.catches || 0}c/{stat.stumpings || 0}s)
                </span>
              </div>
            </div>
          </div>

          {/* Match Log Scorecard Table */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Match-by-Match Breakdown ({matches.length} Records)</span>
              <span className="text-[10px] text-slate-500">Sorted by most recent</span>
            </div>

            {matches.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-mono text-xs">
                No individual scorecards found for this selection.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-slate-400 select-none">
                      <th className="py-2.5 px-3 uppercase text-left">Date</th>
                      <th className="py-2.5 px-3 uppercase text-center">Fmt</th>
                      <th className="py-2.5 px-3 uppercase text-left">Versus / Match</th>
                      <th className="py-2.5 px-3 uppercase text-left">Venue</th>
                      <th className="py-2.5 px-3 uppercase text-center">Pos</th>
                      <th className="py-2.5 px-3 uppercase text-right">Runs (Balls)</th>
                      <th className="py-2.5 px-3 uppercase text-right">4s/6s</th>
                      <th className="py-2.5 px-3 uppercase text-right">SR</th>
                      <th className="py-2.5 px-3 uppercase text-center">WK Dis</th>
                      <th className="py-2.5 px-3 uppercase text-left">Dismissal</th>
                      <th className="py-2.5 px-3 uppercase text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {matches.map((m, idx) => {
                      const isCentury = m.runs >= 100;
                      const isFifty = m.runs >= 50 && m.runs < 100;
                      const isDuck = m.runs === 0 && m.dismissed;

                      return (
                        <tr
                          key={`${m.match_id}-${m.innings_id}-${idx}`}
                          className="hover:bg-white/5 transition-colors"
                        >
                          {/* Date */}
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                            {m.date}
                          </td>

                          {/* Format Badge */}
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <span
                              className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                                m.format === "TEST" && "bg-white/10 text-white border-white/20",
                                m.format === "ODI" && "bg-sky-500/15 text-sky-400 border-sky-500/30",
                                m.format === "T20I" && "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                                m.format === "IPL" && "bg-csk-gold/15 text-csk-yellow border-csk-gold/30"
                              )}
                            >
                              {m.format}
                            </span>
                          </td>

                          {/* Opponent & Captain Tag */}
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-white">vs {m.opponent}</span>
                              {m.captain && (
                                <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  (C)
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 font-sans">
                              {m.competition}
                            </div>
                          </td>

                          {/* Venue & Location */}
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-300">
                            <div>{m.venue}</div>
                            <div className="text-[10px] text-slate-500">
                              {m.city ? `${m.city}, ${m.country}` : m.country} •{" "}
                              <span
                                className={cn(
                                  m.location_type === "HOME" && "text-emerald-400",
                                  m.location_type === "AWAY" && "text-sky-400",
                                  m.location_type === "NEUTRAL" && "text-purple-400"
                                )}
                              >
                                {m.location_type}
                              </span>
                            </div>
                          </td>

                          {/* Batting Position */}
                          <td className="py-2.5 px-3 text-center text-slate-400 font-bold">
                            #{m.batting_position || "—"}
                          </td>

                          {/* Runs & Balls */}
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            <span
                              className={cn(
                                "font-bold text-sm",
                                isCentury && "text-amber-400 font-black",
                                isFifty && "text-csk-yellow",
                                isDuck && "text-rose-500",
                                !isCentury && !isFifty && !isDuck && "text-white"
                              )}
                            >
                              {m.runs}
                              {m.not_out ? "*" : ""}
                            </span>
                            <span className="text-slate-500 text-[10px] ml-1">({m.balls}b)</span>
                          </td>

                          {/* Boundaries */}
                          <td className="py-2.5 px-3 text-right whitespace-nowrap text-slate-400 text-[11px]">
                            <span className="text-slate-300">{m.fours}</span> /{" "}
                            <span className="text-csk-gold font-bold">{m.sixes}</span>
                          </td>

                          {/* Strike Rate */}
                          <td className="py-2.5 px-3 text-right whitespace-nowrap text-sky-400">
                            {m.strike_rate}
                          </td>

                          {/* WK Dismissals (Catches & Stumpings in this match) */}
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            {(m.catches || 0) + (m.stumpings || 0) > 0 ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                {m.catches || 0}c {m.stumpings ? `${m.stumpings}st` : ""}
                              </span>
                            ) : (
                              <span className="text-slate-600 text-[10px]">—</span>
                            )}
                          </td>

                          {/* Dismissal */}
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-400 text-[11px] max-w-[150px] truncate">
                            {m.not_out ? (
                              <span className="text-emerald-400 font-semibold">not out</span>
                            ) : (
                              <span>
                                {m.dismissal_type} {m.bowler ? `b ${m.bowler}` : ""}
                              </span>
                            )}
                          </td>

                          {/* Match Result */}
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <span
                              className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                m.result.toLowerCase().includes("won") && "bg-emerald-500/20 text-emerald-300",
                                m.result.toLowerCase().includes("lost") && "bg-rose-500/20 text-rose-300",
                                (m.result.toLowerCase().includes("tied") || m.result.toLowerCase().includes("draw")) &&
                                  "bg-amber-500/20 text-amber-300",
                                m.result.toLowerCase().includes("no result") && "bg-slate-500/20 text-slate-400"
                              )}
                            >
                              {m.result}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Verified canonical ball-by-ball archives</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Close Log
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
