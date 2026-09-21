"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import timelineData from "@/data/career_timeline.json";
import milestonesData from "@/data/milestones.json";
import { Calendar, Trophy, Award, Sparkles, ChevronRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const YEAR_IMAGES: Record<number, { src: string; alt: string; label: string }> = {
  2004: {
    src: "/images/odi/dhoni_long_hair_raina.jpg",
    alt: "MS Dhoni Debut & Early ODI Era",
    label: "2004: The Rise of Dhoni"
  },
  2005: {
    src: "/images/odi/dhoni_long_hair_bat_raise.jpg",
    alt: "MS Dhoni 183* & 148 Bat-Raise",
    label: "2005: 183* vs SL & 148 vs PAK"
  },
  2006: {
    src: "/images/odi/dhoni_sachin_celebration.jpg",
    alt: "MS Dhoni Sahara Retro ODI Era",
    label: "2006: Sahara Retro Series"
  },
  2007: {
    src: "/images/odi/dhoni_pull_shot.jpg",
    alt: "MS Dhoni Power Mechanics",
    label: "2007: T20 WC Triumph & Power Arrival"
  },
  2008: {
    src: "/images/odi/dhoni_century_celebration.jpg",
    alt: "MS Dhoni CB Series & Milestones",
    label: "2008: Historic Australia CB Series"
  },
  2009: {
    src: "/images/odi/dhoni_century_celebration.jpg",
    alt: "MS Dhoni No. 1 ODI Team & Batsman",
    label: "2009: World No. 1 Peak"
  },
  2010: {
    src: "/images/odi/dhoni_power_lofted.jpg",
    alt: "MS Dhoni Asia Cup & IPL Double",
    label: "2010: Asia Cup Champions & Dharamsala"
  },
  2011: {
    src: "/images/odi/dhoni_wc_focus.jpg",
    alt: "MS Dhoni 2011 World Cup Final (91*)",
    label: "2011: World Cup Glory (91* at Wankhede)"
  },
  2012: {
    src: "/images/odi/dhoni_power_lofted.jpg",
    alt: "MS Dhoni Adelaide Last Over Finish",
    label: "2012: Adelaide 112m Maximum"
  },
  2013: {
    src: "/images/odi/dhoni_tricolour_profile.jpg",
    alt: "MS Dhoni ICC Champions Trophy & Celkon Cup",
    label: "2013: ICC Champions Trophy Trifecta"
  },
  2014: {
    src: "/images/odi/dhoni_tricolour_profile.jpg",
    alt: "MS Dhoni Leadership Transition",
    label: "2014: Master Tactician"
  },
  2015: {
    src: "/images/odi/dhoni_wc_focus.jpg",
    alt: "MS Dhoni 2015 World Cup Campaign",
    label: "2015: Undefeated CWC Group Stage"
  },
  2016: {
    src: "/images/odi/dhoni_pull_shot.jpg",
    alt: "MS Dhoni Power Finishing",
    label: "2016: 0.08s Glove-Off Sprint & Finish"
  },
  2017: {
    src: "/images/odi/dhoni_power_lofted.jpg",
    alt: "MS Dhoni 134 vs England Cuttack",
    label: "2017: 134 in Cuttack with Yuvraj"
  },
  2018: {
    src: "/images/odi/dhoni_jersey7_back_walk.jpg",
    alt: "MS Dhoni 10,000 ODI Runs",
    label: "2018: 10,000 ODI Runs & CSK Comeback"
  },
  2019: {
    src: "/images/odi/dhoni_jersey7_back_walk.jpg",
    alt: "MS Dhoni 350th ODI & Australia Man of the Series",
    label: "2019: Player of the Series in Australia"
  },
  2020: {
    src: "/images/odi/dhoni_jersey7_back_walk.jpg",
    alt: "MS Dhoni 19:29 International Retirement",
    label: "2020: 19:29 hrs Farewell & CSK Legacy"
  },
  2021: {
    src: "/images/odi/dhoni_power_lofted.jpg",
    alt: "MS Dhoni CSK 4th Title",
    label: "2021: The 4th IPL Crown (Dubai)"
  },
  2023: {
    src: "/images/odi/dhoni_jersey7_back_walk.jpg",
    alt: "MS Dhoni 5th IPL Title at Ahmedabad",
    label: "2023: 5th IPL Title Masterclass"
  },
  2024: {
    src: "/images/odi/dhoni_jersey7_back_walk.jpg",
    alt: "MS Dhoni The Timeless Legend",
    label: "2024: The Timeless Icon of No. 7"
  }
};

export const CareerTimelineSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2011);
  const [filterMode, setFilterMode] = useState<"all" | "trophy" | "milestone">("all");

  const currentYearItem = timelineData.find((t) => Number(t.year) === selectedYear) || timelineData[0];
  const relatedMilestones = milestonesData.filter((m) => m.date.startsWith(String(selectedYear)));
  const yearImage = YEAR_IMAGES[selectedYear] || YEAR_IMAGES[2011];

  const filteredTimeline = timelineData.filter((item) => {
    if (filterMode === "trophy") return item.trophy !== "None";
    if (filterMode === "milestone") return item.milestone !== "None";
    return true;
  });

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="CAREER JOURNEY (2004 — 2024)"
        title="THE TIMELINE OF A LEGEND"
        subtitle="Explore two decades of leadership, evolution, trophies, and milestones across international cricket and the IPL."
        accentColor="gold"
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setFilterMode("all")}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all",
            filterMode === "all" ? "bg-white/20 text-white border border-white/30" : "bg-white/5 text-slate-400 hover:text-white"
          )}
        >
          ALL YEARS ({timelineData.length})
        </button>
        <button
          onClick={() => setFilterMode("trophy")}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5",
            filterMode === "trophy" ? "bg-csk-gold/20 text-csk-yellow border border-csk-gold/40" : "bg-white/5 text-slate-400 hover:text-csk-yellow"
          )}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>TROPHY YEARS</span>
        </button>
        <button
          onClick={() => setFilterMode("milestone")}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5",
            filterMode === "milestone" ? "bg-sky-500/20 text-sky-400 border border-sky-500/40" : "bg-white/5 text-slate-400 hover:text-sky-400"
          )}
        >
          <Award className="w-3.5 h-3.5" />
          <span>KEY MILESTONES</span>
        </button>
      </div>

      {/* Horizontal Scroller of Year Nodes */}
      <div className="relative mb-10 overflow-x-auto pb-4 pt-2 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max px-2">
          {filteredTimeline.map((item) => {
            const yr = Number(item.year);
            const isSelected = yr === selectedYear;
            const hasTrophy = item.trophy !== "None";

            return (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 min-w-[90px]",
                  isSelected
                    ? "bg-surface-raised border-csk-gold shadow-glow-gold scale-105"
                    : "bg-surface/60 border-white/10 hover:border-white/20 hover:bg-surface/80"
                )}
              >
                <div className="flex items-center gap-1">
                  {hasTrophy && <Trophy className="w-3 h-3 text-csk-yellow fill-csk-yellow" />}
                  <span className={cn("text-xs font-mono font-bold", isSelected ? "text-csk-yellow" : "text-slate-300")}>
                    {yr}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1">
                  {item.runs} runs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Selected Year Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl bg-surface/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-csk-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Col: Year & Main Event */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-6xl font-black font-mono text-csk-yellow">
              {currentYearItem.year}
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-metallic-silver">
                {currentYearItem.format}
              </span>
              {currentYearItem.captaincy !== "No" && (
                <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 ml-2">
                  {currentYearItem.captaincy}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              {currentYearItem.major_event}
            </h3>
            <p className="text-sm text-slate-300 font-mono">
              Milestone: <span className="text-slate-100">{currentYearItem.milestone}</span>
            </p>
          </div>

          {/* If trophy won in this year */}
          {currentYearItem.trophy !== "None" && (
            <div className="p-4 rounded-2xl bg-csk-gold/10 border border-csk-gold/30 flex items-start gap-3.5">
              <Trophy className="w-5 h-5 text-csk-yellow shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold uppercase text-csk-gold">Trophy / Championship Won</div>
                <div className="text-sm font-semibold text-white mt-0.5">{currentYearItem.trophy}</div>
              </div>
            </div>
          )}

          {/* Specific Milestone details if matched */}
          {relatedMilestones.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Verified Chronology Records:</div>
              <div className="space-y-1.5">
                {relatedMilestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-slate-400 font-semibold">{m.date}:</span> {m.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Season Statistics & Era Visual */}
        <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-6 pt-4 lg:pt-0 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {currentYearItem.year} SEASON METRICS
            </div>

            {/* Embedded Era Image with crisp 16/9 aspect ratio */}
            {yearImage && (
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 shadow-lg group">
                <img
                  src={yearImage.src}
                  alt={yearImage.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-csk-yellow font-bold truncate">{yearImage.label}</span>
                  <span className="text-[10px] text-slate-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">ERA</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3.5 rounded-xl bg-surface-raised border border-white/10">
                <div className="text-[11px] text-slate-400 uppercase">Runs Scored</div>
                <div className="text-2xl font-bold text-white mt-1">{currentYearItem.runs}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-raised border border-white/10">
                <div className="text-[11px] text-slate-400 uppercase">Matches Played</div>
                <div className="text-2xl font-bold text-white mt-1">{currentYearItem.matches}</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 leading-relaxed font-mono">
            Data sourced from Cricsheet match files for season {currentYearItem.year}. Verified against ESPNcricinfo historical archives.
          </div>
        </div>
      </div>
    </section>
  );
};
