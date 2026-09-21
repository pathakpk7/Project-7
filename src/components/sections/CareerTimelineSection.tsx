"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import timelineData from "@/data/career_timeline.json";
import milestonesData from "@/data/milestones.json";
import { Calendar, Trophy, Award, Sparkles, ChevronRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const TIMELINE_IMAGES: Record<number, { src: string; alt: string; caption?: string }> = {
  2004: {
    src: "/images/timeline/2004.png",
    alt: "MS Dhoni Debut Year 2004",
    caption: "2004: International Debut & Early India Wicketkeeping"
  },
  2005: {
    src: "/images/timeline/2005.jpg",
    alt: "MS Dhoni 183* & 148 Breakthrough 2005",
    caption: "2005: 183* vs SL (Jaipur) & 148 vs PAK (Vizag) Masterclass"
  },
  2006: {
    src: "/images/timeline/2006.jpg",
    alt: "MS Dhoni & Yuvraj Singh Partnership 2006",
    caption: "2006: Dhoni & Yuvraj Chasing Masterclass in Pakistan & World No. 1 Ranking"
  },
  2007: {
    src: "/images/timeline/2007.jpg",
    alt: "MS Dhoni ICC World Twenty20 Champions 2007",
    caption: "2007: Inaugural ICC World Twenty20 Champions (Johannesburg)"
  },
  2008: {
    src: "/images/timeline/2008.jpg",
    alt: "MS Dhoni CSK Captaincy Debut 2008",
    caption: "2008: Inaugural IPL & Chennai Super Kings Captaincy Era Begins"
  },
  2009: {
    src: "/images/timeline/2009.png",
    alt: "MS Dhoni ICC World No. 1 Test Mace 2009",
    caption: "2009: India Reaches ICC World No. 1 in Test Cricket (ICC Test Mace)"
  },
  2010: {
    src: "/images/timeline/2010.jpg",
    alt: "MS Dhoni Maiden IPL Trophy 2010 with CSK",
    caption: "2010: Maiden IPL Title & Champions League T20 Double Triumph"
  },
  2011: {
    src: "/images/timeline/2011.jpg",
    alt: "MS Dhoni 2011 World Cup Winning Six at Wankhede",
    caption: "2011: ICC Cricket World Cup Champions & Iconic 91* Finishing Six"
  },
  2012: {
    src: "/images/timeline/2012.png",
    alt: "MS Dhoni 113* vs Pakistan Chennai 2012",
    caption: "2012: Heroic 113* vs PAK (Chennai) & Asia Cup Mastery"
  },
  2013: {
    src: "/images/timeline/2013.png",
    alt: "MS Dhoni 224 vs Australia in Chennai 2013",
    caption: "2013: Career-Best 224 vs AUS (Chennai) & ICC Champions Trophy Triumph"
  },
  2014: {
    src: "/images/timeline/2014.png",
    alt: "MS Dhoni Final Test Match at MCG Melbourne 2014",
    caption: "2014: Final Test Appearance (MCG) & Graceful Test Retirement"
  },
  2015: {
    src: "/images/timeline/2015.jpg",
    alt: "MS Dhoni 2015 ICC World Cup Campaign in Australia",
    caption: "2015: ICC World Cup Semi-Final Run & 100 ODI Wins as Captain"
  },
  2016: {
    src: "/images/timeline/2016.png",
    alt: "MS Dhoni Asia Cup Champions & T20 Mastery 2016",
    caption: "2016: Asia Cup T20 Champions & Iconic Last-Ball Sprint vs BAN"
  },
  2017: {
    src: "/images/timeline/2017.jpg",
    alt: "MS Dhoni 134 vs England Cuttack 2017",
    caption: "2017: Masterclass 134 vs ENG (Cuttack) with Yuvraj & Captaincy Transition"
  },
  2018: {
    src: "/images/timeline/2018.jpg",
    alt: "MS Dhoni 10,000 ODI Runs & 3rd IPL Trophy 2018",
    caption: "2018: 10,000 ODI Runs Milestone & Fairy Tale 3rd IPL Championship"
  },
  2019: {
    src: "/images/timeline/2019.jpg",
    alt: "MS Dhoni 2019 ICC Cricket World Cup in England",
    caption: "2019: Final ICC World Cup Campaign & Gritty Semi-Final 50"
  },
  2020: {
    src: "/images/timeline/2020.jpg",
    alt: "MS Dhoni No. 7 Jersey Retirement & Definitely Not 2020",
    caption: "2020: International Retirement (1929 hrs) & 'Definitely Not' Resolve"
  },
  2021: {
    src: "/images/timeline/2021.jpg",
    alt: "MS Dhoni 4th IPL Trophy 2021 in Dubai",
    caption: "2021: 4th IPL Championship Glory (Dubai) & Mentor for T20 WC"
  },
  2022: {
    src: "/images/timeline/2022.png",
    alt: "MS Dhoni 16 runs off 4 balls finish vs MI 2022",
    caption: "2022: Vintage Finisher Heist (16 off 4 balls vs MI) & 200+ IPL Matches"
  },
  2023: {
    src: "/images/timeline/2023.jpg",
    alt: "MS Dhoni Lifting Ravindra Jadeja 5th IPL Trophy 2023",
    caption: "2023: Historic 5th IPL Championship & Emotional Jadeja Hug (Ahmedabad)"
  },
  2024: {
    src: "/images/timeline/2024.jpg",
    alt: "MS Dhoni Vintage Long Hair Power Hitting 2024",
    caption: "2024: Vintage Long-Hair Era, 220+ SR Death Overs Fireworks & Ruturaj Handover"
  }
};

export const CareerTimelineSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2004);
  const [filterMode, setFilterMode] = useState<"all" | "trophy" | "milestone">("all");

  const currentYearItem = timelineData.find((t) => Number(t.year) === selectedYear) || timelineData[0];
  const relatedMilestones = milestonesData.filter((m) => m.date.startsWith(String(selectedYear)));
  const currentYearImage = TIMELINE_IMAGES[selectedYear];

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

            {/* Embedded Era Image if available (Uncropped Full Image) */}
            {currentYearImage && (
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-gradient-to-b from-black/90 via-black/60 to-black/95 border border-white/10 shadow-lg group flex items-center justify-center">
                {/* Blurred ambient background bleed */}
                <img
                  src={currentYearImage.src}
                  alt={currentYearImage.alt}
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                />
                {/* Crisp uncropped foreground image */}
                <img
                  src={currentYearImage.src}
                  alt={currentYearImage.alt}
                  className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
                {currentYearImage.caption && (
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-30">
                    <span className="text-csk-yellow font-bold truncate drop-shadow">{currentYearImage.caption}</span>
                    <span className="text-[10px] text-slate-300 bg-black/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">ERA</span>
                  </div>
                )}
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
