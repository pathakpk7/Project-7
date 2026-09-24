"use client";

import React, { useState, useMemo } from "react";
import {
  CricketFormat,
  AnalyticsMode,
  LocationType,
  AggregatedStat,
} from "@/analytics/types";
import {
  getOpponentAnalytics,
  getVenueAnalytics,
  getCountryAnalytics,
  getHomeAwayAnalytics,
  getYearlyAnalytics,
  getTournamentAnalytics,
  getOverallCareerSummary,
} from "@/analytics/careerAnalytics";
import { MatrixCard } from "./CareerMatrix/MatrixCard";
import { MatrixTable } from "./CareerMatrix/MatrixTable";
import { MatchDrilldownModal } from "./CareerMatrix/MatchDrilldownModal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Search,
  LayoutGrid,
  Table as TableIcon,
  Shield,
  MapPin,
  Globe,
  Home,
  Calendar,
  Trophy,
  Filter,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CareerMatrixSection: React.FC = () => {
  // Filter States
  const [format, setFormat] = useState<CricketFormat>("ALL");
  const [mode, setMode] = useState<AnalyticsMode>("OPPONENTS");
  const [location, setLocation] = useState<LocationType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortField, setSortField] = useState<string>("runs");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Selected Entity for Scorecard Drilldown Modal
  const [selectedStat, setSelectedStat] = useState<AggregatedStat | null>(null);

  // Compute Filtered & Aggregated Data
  const statsList: AggregatedStat[] = useMemo(() => {
    const filters = {
      format,
      mode,
      location,
      searchQuery,
      sortField,
      sortDirection,
    };

    switch (mode) {
      case "OPPONENTS":
        return getOpponentAnalytics(filters);
      case "VENUES":
        return getVenueAnalytics(filters);
      case "COUNTRIES":
        return getCountryAnalytics(filters);
      case "HOME_AWAY":
        return getHomeAwayAnalytics(filters);
      case "YEARS":
        return getYearlyAnalytics(filters);
      case "TOURNAMENTS":
        return getTournamentAnalytics(filters);
      default:
        return getOpponentAnalytics(filters);
    }
  }, [format, mode, location, searchQuery, sortField, sortDirection]);

  // Overall summary metrics for the active format & location selection
  const overallSummary = useMemo(() => {
    return getOverallCareerSummary({ format, location });
  }, [format, location]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formats: { key: CricketFormat; label: string }[] = [
    { key: "ALL", label: "ALL FORMATS" },
    { key: "TEST", label: "TEST" },
    { key: "ODI", label: "ODI" },
    { key: "T20I", label: "T20I" },
    { key: "IPL", label: "IPL" },
  ];

  const modes: { key: AnalyticsMode; label: string; icon: any }[] = [
    { key: "OPPONENTS", label: "OPPONENTS", icon: Shield },
    { key: "VENUES", label: "VENUES / GROUNDS", icon: MapPin },
    { key: "COUNTRIES", label: "COUNTRIES", icon: Globe },
    { key: "HOME_AWAY", label: "HOME / AWAY", icon: Home },
    { key: "YEARS", label: "YEAR BY YEAR", icon: Calendar },
    { key: "TOURNAMENTS", label: "TOURNAMENTS", icon: Trophy },
  ];

  const locations: { key: LocationType; label: string }[] = [
    { key: "ALL", label: "All Venues" },
    { key: "HOME", label: "Home" },
    { key: "AWAY", label: "Away" },
    { key: "NEUTRAL", label: "Neutral" },
  ];

  return (
    <section
      id="career-matrix"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20"
    >
      {/* Legacy Anchor for backwards compatibility */}
      <div id="venues" className="absolute -top-24 pointer-events-none" />

      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-csk-gold/10 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <SectionHeader
        badge="CHAPTER IX · THE ARCHIVE"
        title="THE RECORD ROOM & WAREHOUSE"
        subtitle="“Pull the files. Compare the eras. Every opponent, ground, and season verified in data.”"
        accentColor="silver"
      />

      {/* KPI Career Summary Bar */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-surface/90 border border-white/10 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cumulative Scope:</span>
            <strong className="text-csk-yellow font-bold">
              {format} FORMAT {location !== "ALL" ? `• ${location}` : ""}
            </strong>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {overallSummary.matches} Matches • {overallSummary.innings} Innings
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3 text-center font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase">Total Runs</span>
            <div className="text-lg sm:text-xl font-black text-white mt-0.5">
              {overallSummary.runs.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase">Batting Avg</span>
            <div className="text-lg sm:text-xl font-black text-csk-yellow mt-0.5">
              {overallSummary.average}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase">Strike Rate</span>
            <div className="text-lg sm:text-xl font-black text-sky-400 mt-0.5">
              {overallSummary.strike_rate}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase">Highest Score</span>
            <div className="text-lg sm:text-xl font-black text-white mt-0.5">
              {overallSummary.highest_score}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase">100s / 50s</span>
            <div className="text-lg sm:text-xl font-black text-amber-400 mt-0.5">
              {overallSummary.hundreds} / {overallSummary.fifties}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase">6s / 4s Hit</span>
            <div className="text-lg sm:text-xl font-black text-csk-gold mt-0.5">
              {overallSummary.sixes} / {overallSummary.fours}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-emerald-500/20 col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="text-[10px] text-emerald-400 uppercase font-bold">WK Dismissals</span>
            <div className="text-lg sm:text-xl font-black text-emerald-300 mt-0.5">
              {(overallSummary.catches || 0) + (overallSummary.stumpings || 0)}
            </div>
            <span className="text-[9px] text-slate-400 block mt-0.5 truncate">
              {overallSummary.catches || 0} Ct • {overallSummary.stumpings || 0} St
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Format Selector & Dimension Modes */}
      <div className="space-y-4 mb-8">
        {/* Format Selector Pills */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-surface/90 border border-white/10 backdrop-blur-xl shadow-lg gap-1 overflow-x-auto max-w-full">
            {formats.map((f) => (
              <button
                key={f.key}
                onClick={() => setFormat(f.key)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-200 whitespace-nowrap",
                  format === f.key
                    ? "bg-csk-gold text-slate-950 shadow-glow-gold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics Dimension Modes */}
        <div className="flex items-center justify-center overflow-x-auto no-scrollbar py-1">
          <div className="inline-flex p-1 rounded-xl bg-surface/80 border border-white/10 gap-1 backdrop-blur-md">
            {modes.map((m) => {
              const Icon = m.icon;
              const isActive = mode === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-white/15 text-csk-yellow font-bold border border-csk-gold/40 shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search, Location Filter & View Switcher Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filter ${mode.toLowerCase()}...`}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-csk-gold/60 focus:ring-1 focus:ring-csk-gold/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Location Filters */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full">
            {locations.map((loc) => (
              <button
                key={loc.key}
                onClick={() => setLocation(loc.key)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all",
                  location === loc.key
                    ? "bg-csk-gold/20 text-csk-yellow border border-csk-gold/40 font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle (Cards vs Table) */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">
              {statsList.length} {statsList.length === 1 ? "Result" : "Results"}
            </span>

            <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10">
              <button
                onClick={() => setViewMode("cards")}
                aria-label="Cards view"
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === "cards"
                    ? "bg-csk-gold text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                aria-label="Table view"
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === "table"
                    ? "bg-csk-gold text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Cards Grid or Table */}
      <div className="relative z-10">
        {viewMode === "cards" ? (
          statsList.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface/80 border border-white/10 font-mono">
              <div className="text-sm font-bold text-white uppercase">
                No Recorded Innings Match This Filter
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Try switching format or clearing search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {statsList.map((stat) => (
                <MatrixCard
                  key={stat.id}
                  stat={stat}
                  onSelect={(item) => setSelectedStat(item)}
                  accentColor={
                    format === "IPL"
                      ? "gold"
                      : format === "ODI"
                      ? "blue"
                      : format === "TEST"
                      ? "silver"
                      : "gold"
                  }
                />
              ))}
            </div>
          )
        ) : (
          <MatrixTable
            stats={statsList}
            onSelect={(item) => setSelectedStat(item)}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            entityTitle={
              mode === "OPPONENTS"
                ? "Opponent / Franchise"
                : mode === "VENUES"
                ? "Stadium / Ground"
                : mode === "COUNTRIES"
                ? "Host Country"
                : mode === "YEARS"
                ? "Calendar Year"
                : mode === "TOURNAMENTS"
                ? "Tournament / Series"
                : "Condition"
            }
          />
        )}
      </div>

      {/* Match Drilldown Modal */}
      <MatchDrilldownModal
        stat={selectedStat}
        mode={mode}
        format={format}
        onClose={() => setSelectedStat(null)}
      />
    </section>
  );
};
