"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import momentsData from "@/data/iconic_moments.json";
import { Calendar, MapPin, CheckCircle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const MOMENT_IMAGES: Record<string, { src: string; caption: string }> = {
  "MOMENT_01": {
    src: "/images/moments/moment_01_vizag_148.jpg",
    caption: "148 vs Pakistan: Early Swashbuckler Era"
  },
  "MOMENT_02": {
    src: "/images/moments/moment_02_jaipur_183.jpg",
    caption: "183* vs Sri Lanka: Highest WK ODI Score"
  },
  "MOMENT_03": {
    src: "/images/moments/moment_03_t20_wc_2007.jpg",
    caption: "2007 T20 WC: Historic Johannesburg Final"
  },
  "MOMENT_04": {
    src: "/images/moments/moment_04_dharamsala_2010.png",
    caption: "2010 Dharamsala: 16 in Final Over Punch"
  },
  "MOMENT_05": {
    src: "/images/moments/moment_05_cwc_2011_final.png",
    caption: "91* in 2011 WC Final: Finishing In Style"
  },
  "MOMENT_06": {
    src: "/images/moments/moment_06_chennai_224.png",
    caption: "224 vs Australia: Record Test Double-Ton"
  },
  "MOMENT_07": {
    src: "/images/moments/moment_07_champions_trophy_2013.jpg",
    caption: "2013 Champions Trophy: Captaincy Trifecta"
  },
  "MOMENT_08": {
    src: "/images/moments/moment_08_trinidad_2013.jpg",
    caption: "Tri-Nation Final: 15 Off Final Over vs Eranga"
  },
  "MOMENT_09": {
    src: "/images/moments/moment_09_bangladesh_sprint_2016.jpg",
    caption: "2016 Glove-Off Sprint: 1-Run Thriller vs Bangladesh"
  },
  "MOMENT_10": {
    src: "/images/moments/moment_10_rcb_84_2019.png",
    caption: "84* (48) vs RCB: 24 Off Final Over Blast"
  }
};

export const IconicMomentsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "WORLD_CUP_LEGEND", "CAPTAINCY_GENIUS", "RECORD_BREAKING", "FINISHING_CLUTCH", "LIGHTNING_WICKETKEEPING"];

  const filteredMoments = momentsData.filter((m) => {
    if (selectedCategory === "ALL") return true;
    return m.category === selectedCategory;
  });

  return (
    <section id="moments" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="CHAPTER VII · THE REELS"
        title="MOMENTS ETCHED IN HISTORY"
        subtitle="“Scenes you still replay at midnight—from Johannesburg 2007 to Wankhede 2011.”"
        accentColor="amber"
      />

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase transition-all whitespace-nowrap",
              selectedCategory === cat
                ? "bg-gradient-to-r from-csk-gold to-csk-yellow text-black font-bold shadow-glow-gold scale-105"
                : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
            )}
          >
            {cat.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* Compact Moments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5 items-stretch">
        {filteredMoments.map((m) => (
          <div
            key={m.moment_id}
            className="group relative rounded-2xl bg-surface/90 border border-white/10 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-csk-gold/40 hover:-translate-y-1 shadow-xl flex flex-col justify-between overflow-hidden"
          >
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-csk-gold/10 rounded-full blur-2xl pointer-events-none group-hover:bg-csk-gold/20 transition-all" />

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Calendar className="w-3 h-3 text-csk-yellow shrink-0" />
                  <span>{m.date}</span>
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-csk-gold shrink-0">
                  {m.category.replace(/_/g, " ")}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-csk-yellow transition-colors line-clamp-2 leading-snug">
                  {m.match}
                </h3>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                  <span className="truncate">{m.venue}</span>
                </div>
              </div>

              {/* Moment Photo - Uncropped with Ambient Bleed */}
              {MOMENT_IMAGES[m.moment_id] && (
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-950/80 border border-white/10 shadow-md group-hover:border-csk-gold/30 flex items-center justify-center transition-all my-1">
                  {/* Backdrop blur bleed to avoid empty bars */}
                  <img
                    src={MOMENT_IMAGES[m.moment_id].src}
                    alt={m.match}
                    className="absolute inset-0 w-full h-full object-cover blur-lg opacity-25 scale-110 pointer-events-none"
                  />
                  {/* Foreground 100% uncropped image */}
                  <img
                    src={MOMENT_IMAGES[m.moment_id].src}
                    alt={m.match}
                    className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
                  <div className="absolute bottom-1.5 left-2.5 right-2.5 text-[10px] font-mono text-csk-yellow font-bold truncate drop-shadow z-30">
                    {MOMENT_IMAGES[m.moment_id].caption}
                  </div>
                </div>
              )}

              {/* Context */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                <span className="font-mono text-slate-400 font-bold uppercase block text-[10px] mb-0.5">Match Context:</span>
                {m.context}
              </div>

              {/* Performance */}
              <div className="p-2.5 rounded-xl bg-csk-gold/10 border border-csk-gold/20 text-[11px] text-white font-mono leading-relaxed">
                <span className="text-csk-gold font-bold uppercase block text-[10px] mb-0.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-csk-gold shrink-0" />
                  <span>Dhoni Masterstroke:</span>
                </span>
                {m.performance}
              </div>

              {/* Result */}
              <div className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1.5 pt-0.5">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="line-clamp-2">Result: {m.result}</span>
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>Moment: {m.moment_id}</span>
              <span>Source: {m.source}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
