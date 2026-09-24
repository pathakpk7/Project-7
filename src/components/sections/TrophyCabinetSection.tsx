"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import trophiesData from "@/data/trophies.json";
import { Trophy, Award, Crown, CheckCircle2, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Dictionary mapping competition+year to trophy celebration images
const TROPHY_IMAGES: Record<string, { src: string; alt: string }> = {
  "2007_ICC Men's T20 World Cup": {
    src: "/images/trophies/2007_t20_wc.jpg",
    alt: "MS Dhoni with 2007 ICC World Twenty20 Trophy"
  },
  "2008_Commonwealth Bank Series (CB Series)": {
    src: "/images/trophies/2008_cb_series.jpg",
    alt: "Team India with 2008 CB Series Trophy in Australia"
  },
  "2009_ICC Test Championship Mace (Rank #1)": {
    src: "/images/trophies/2009_test_mace.png",
    alt: "MS Dhoni with ICC Test Championship Mace 2009"
  },
  "2010_Asia Cup": {
    src: "/images/trophies/2010_asia_cup.jpg",
    alt: "MS Dhoni with Asia Cup 2010 Trophy"
  },
  "2010_Indian Premier League (IPL 2010)": {
    src: "/images/trophies/2010_ipl.jpg",
    alt: "MS Dhoni with Maiden IPL 2010 Trophy"
  },
  "2010_Champions League Twenty20 (CLT20 2010)": {
    src: "/images/trophies/2010_clt20.png",
    alt: "MS Dhoni receiving 2010 Champions League Twenty20 Trophy"
  },
  "2011_ICC Men's Cricket World Cup": {
    src: "/images/trophies/2011_icc_cwc.jpg",
    alt: "MS Dhoni with ICC Cricket World Cup 2011 Trophy at Gateway of India"
  },
  "2011_Indian Premier League (IPL 2011)": {
    src: "/images/trophies/2011_ipl.jpg",
    alt: "MS Dhoni holding 2011 IPL Trophy under confetti with CSK"
  },
  "2013_ICC Champions Trophy": {
    src: "/images/trophies/2013_champions_trophy.jpg",
    alt: "MS Dhoni with ICC Champions Trophy 2013 in white blazer at Edgbaston"
  },
  "2014_Champions League Twenty20 (CLT20 2014)": {
    src: "/images/trophies/2014_clt20.jpg",
    alt: "MS Dhoni lifting the 2014 Champions League Twenty20 Trophy with CSK"
  },
  "2016_Asia Cup (T20 Format)": {
    src: "/images/trophies/2016_asia_cup.png",
    alt: "MS Dhoni receiving 2016 Asia Cup T20 Trophy"
  },
  "2018_Indian Premier League (IPL 2018)": {
    src: "/images/trophies/2018_ipl.png",
    alt: "MS Dhoni receiving the 2018 IPL Trophy with CSK"
  },
  "2021_Indian Premier League (IPL 2021)": {
    src: "/images/trophies/2021_ipl.png",
    alt: "MS Dhoni holding the 2021 IPL Trophy in Dubai with CSK"
  },
  "2023_Indian Premier League (IPL 2023)": {
    src: "/images/trophies/2023_ipl.jpg",
    alt: "MS Dhoni and Ravindra Jadeja holding the 2023 IPL Trophy"
  }
};

export const TrophyCabinetSection: React.FC = () => {
  const [filterTeam, setFilterTeam] = useState<"ALL" | "India" | "CSK">("ALL");
  const [expandedCardKey, setExpandedCardKey] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedCardKey((prev) => (prev === key ? null : key));
  };

  const filteredTrophies = trophiesData.filter((t) => {
    if (filterTeam === "India") return t.team === "India";
    if (filterTeam === "CSK") return t.team === "Chennai Super Kings";
    return true;
  });

  return (
    <section id="trophies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="CHAPTER VI · THE VAULT"
        title="THE SILVERWARE CABINET"
        subtitle="“Silverware earned, not borrowed. Trophies gleam, reels loop forever, and Chennai yellow meets India blue.”"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {filteredTrophies.map((trophy, idx) => {
          const isIndia = trophy.team === "India" || trophy.team.toLowerCase().includes("india");
          const cardKey = `${trophy.year}_${trophy.competition}`;
          const isExpanded = expandedCardKey === cardKey;
          const trophyImg = TROPHY_IMAGES[cardKey];

          return (
            <div
              key={idx}
              className={cn(
                "group relative rounded-3xl bg-surface/95 border p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl",
                isIndia ? "border-sky-500/30 hover:border-sky-400 shadow-glow-blue" : "border-csk-gold/30 hover:border-csk-gold shadow-glow-gold",
                isExpanded 
                  ? (isIndia ? "ring-2 ring-sky-500/50 shadow-glow-blue" : "ring-2 ring-csk-gold/50 shadow-glow-gold") 
                  : "hover:-translate-y-1"
              )}
            >
              {/* Top ambient glow */}
              <div className={cn(
                "absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-70 transition-opacity",
                isIndia ? "bg-sky-500" : "bg-csk-gold"
              )} />

              <div className="space-y-4 relative z-10">
                {/* Header: Year + Team Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "p-2.5 rounded-2xl border flex items-center justify-center",
                      isIndia ? "bg-sky-500/10 border-sky-500/30 text-sky-400" : "bg-csk-gold/10 border-csk-gold/30 text-csk-yellow"
                    )}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-2xl font-black text-white">
                      {trophy.year}
                    </span>
                  </div>

                  <span className={cn(
                    "text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border font-bold",
                    isIndia ? "bg-sky-950/60 border-sky-500/40 text-sky-400" : "bg-amber-950/60 border-csk-gold/40 text-csk-yellow"
                  )}>
                    {trophy.team}
                  </span>
                </div>

                {/* Dedicated Separate Trophy Image Showcase (Uncropped, Full Image) */}
                {trophyImg ? (
                  <div className={cn(
                    "relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-b from-black/80 via-black/50 to-black/90 border border-white/10 shadow-inner flex items-center justify-center transition-colors",
                    isIndia ? "group-hover:border-sky-400/40" : "group-hover:border-csk-gold/40"
                  )}>
                    {/* Subtle blurred backdrop for aesthetic bleed */}
                    <img
                      src={trophyImg.src}
                      alt={trophyImg.alt}
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 scale-110 pointer-events-none"
                    />
                    {/* Main Uncropped Sharp Foreground Image */}
                    <img
                      src={trophyImg.src}
                      alt={trophyImg.alt}
                      className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-30">
                      <span className={cn(
                        "font-bold truncate drop-shadow",
                        isIndia ? "text-sky-300" : "text-csk-yellow"
                      )}>
                        {trophy.competition}
                      </span>
                      <span className="text-[10px] text-slate-300 bg-black/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">CHAMPIONS</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 aspect-[16/9] flex items-center justify-center bg-white/[0.02]">
                    <span className="text-xs font-mono text-slate-500">🏆 Championship Trophy</span>
                  </div>
                )}

                {/* Competition Details */}
                <div>
                  <h3 className={cn(
                    "text-lg font-extrabold uppercase tracking-tight text-white transition-colors",
                    isIndia ? "group-hover:text-sky-400" : "group-hover:text-csk-yellow"
                  )}>
                    {trophy.competition}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    vs {trophy.opponent} • {trophy.venue}
                  </div>
                </div>

                {/* Expandable Content (Accordion) */}
                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Match Result Badge */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-400 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{trophy.result}</span>
                    </div>

                    {/* Significance Text */}
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {trophy.significance}
                    </p>

                    {/* Footer / Captain & Source */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Captain: <strong className="text-slate-200">{trophy.captain}</strong></span>
                      <span className="text-slate-500">{trophy.source}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Control Bar with Right-Aligned Down Arrow */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
                <button
                  type="button"
                  onClick={() => toggleExpand(cardKey)}
                  className={cn(
                    "flex items-center gap-1.5 text-slate-400 transition-colors cursor-pointer",
                    isIndia ? "hover:text-sky-400" : "hover:text-csk-yellow"
                  )}
                >
                  <span>{isExpanded ? "Less Details" : "View Details"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleExpand(cardKey)}
                  className={cn(
                    "p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md",
                    isExpanded
                      ? (isIndia ? "bg-sky-500/20 border-sky-500 text-sky-400 rotate-180 shadow-glow-blue" : "bg-csk-gold/20 border-csk-gold text-csk-yellow rotate-180 shadow-glow-gold")
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20"
                  )}
                  aria-label={isExpanded ? "Collapse trophy details" : "Expand trophy details"}
                  title={isExpanded ? "Click to collapse" : "Click to view full details"}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
