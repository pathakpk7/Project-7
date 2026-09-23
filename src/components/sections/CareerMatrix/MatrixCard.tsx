"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AggregatedStat } from "@/analytics/types";
import { SparklineMiniChart } from "./SparklineMiniChart";
import { MapPin, Globe, ChevronRight, Activity, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatrixCardProps {
  stat: AggregatedStat;
  onSelect: (stat: AggregatedStat) => void;
  accentColor?: "gold" | "blue" | "silver";
}

export const MatrixCard: React.FC<MatrixCardProps> = ({
  stat,
  onSelect,
  accentColor = "gold",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    gold: {
      border: "hover:border-csk-gold/50 group-hover:shadow-glow-gold",
      accentText: "text-csk-yellow",
      chartColor: "#F9CD05",
      badge: "bg-csk-gold/15 text-csk-yellow border-csk-gold/30"
    },
    blue: {
      border: "hover:border-sky-500/50 group-hover:shadow-glow-blue",
      accentText: "text-sky-400",
      chartColor: "#38BDF8",
      badge: "bg-sky-500/15 text-sky-400 border-sky-500/30"
    },
    silver: {
      border: "hover:border-slate-400/50",
      accentText: "text-white",
      chartColor: "#E2E8F0",
      badge: "bg-white/10 text-white border-white/20"
    }
  };

  const theme = colors[accentColor];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(stat)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(stat);
        }
      }}
      role="button"
      aria-label={`View statistics for ${stat.name}`}
      className={cn(
        "group relative rounded-2xl bg-surface/90 border border-white/10 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 flex flex-col justify-between overflow-hidden min-h-[220px] select-none focus:outline-none focus:ring-2 focus:ring-csk-gold/50",
        theme.border
      )}
    >
      {/* Background ambient lighting on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-csk-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-csk-gold/15 transition-all duration-500" />

      {/* Header Info */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-0.5 truncate">
              {stat.city ? (
                <>
                  <MapPin className="w-2.5 h-2.5 text-csk-yellow shrink-0" />
                  <span className="truncate">{stat.city}, {stat.country}</span>
                </>
              ) : stat.country ? (
                <>
                  <Globe className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                  <span className="truncate">{stat.country}</span>
                </>
              ) : (
                <span>{stat.subtext || "CAREER METRICS"}</span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-csk-yellow transition-colors line-clamp-1 leading-snug">
              {stat.name}
            </h3>
          </div>

          {stat.code ? (
            <span className={cn("text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full border shrink-0", theme.badge)}>
              {stat.code}
            </span>
          ) : (
            <span className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
              {stat.matches} {stat.matches === 1 ? "Match" : "Matches"}
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Animated Body: Switch between default metric grid and analytical trend view on hover/tap */}
      <div className="my-2 relative z-10 min-h-[90px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            /* DEFAULT STATISTICAL GRID */
            <motion.div
              key="default-view"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5"
            >
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[9px] text-slate-400 uppercase">Runs</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">{stat.runs.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[9px] text-slate-400 uppercase">Average</div>
                  <div className="text-sm sm:text-base font-bold text-csk-yellow mt-0.5">{stat.average}</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[9px] text-slate-400 uppercase">Strike Rate</div>
                  <div className="text-sm sm:text-base font-bold text-sky-400 mt-0.5">{stat.strike_rate}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>HS: <strong className="text-white">{stat.highest_score}</strong></span>
                <span>100/50: <strong className="text-white">{stat.hundreds}/{stat.fifties}</strong></span>
                <span className="text-emerald-400 font-semibold" title={`${stat.catches} Catches, ${stat.stumpings} Stumpings`}>
                  🧤 {(stat.catches || 0) + (stat.stumpings || 0)} Dis ({stat.catches || 0}c/{stat.stumpings || 0}st)
                </span>
              </div>
            </motion.div>
          ) : (
            /* HOVER / TAP ANALYTICAL TRANSFORMATION VIEW */
            <motion.div
              key="hover-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {/* Sparkline Trend */}
              <div className="p-2 rounded-xl bg-slate-950/80 border border-csk-gold/20 shadow-inner">
                <SparklineMiniChart data={stat.trend} color={theme.chartColor} height={46} showLabels={true} />
              </div>

              {/* Quick Format Breakdown if available */}
              {stat.format_breakdown && (
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-slate-300">
                  {Object.entries(stat.format_breakdown).map(([fmt, val]) => (
                    <span key={fmt} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                      <strong className="text-csk-yellow">{fmt}</strong>: {val.runs}r ({val.average})
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Drilldown Indicator */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 relative z-10">
        <span className="flex items-center gap-1 text-slate-400 group-hover:text-csk-yellow transition-colors">
          <TrendingUp className="w-3 h-3" />
          <span>{isHovered ? "Click for match log" : "Hover/Tap for trend"}</span>
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-csk-yellow group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
};
