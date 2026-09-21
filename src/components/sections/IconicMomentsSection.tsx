"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import momentsData from "@/data/iconic_moments.json";
import { Sparkles, Play, Calendar, MapPin, Award, CheckCircle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const MOMENT_IMAGES: Record<string, { src: string; caption: string }> = {
  "MOMENT_01": {
    src: "/images/odi/dhoni_long_hair_raina.jpg",
    caption: "148 vs Pakistan: Early Swashbuckler Era"
  },
  "MOMENT_02": {
    src: "/images/odi/dhoni_long_hair_bat_raise.jpg",
    caption: "183* vs Sri Lanka: Highest Wicketkeeper ODI Score"
  },
  "MOMENT_05": {
    src: "/images/odi/dhoni_wc_focus.jpg",
    caption: "91* in 2011 World Cup Final: Finishing In Style"
  },
  "MOMENT_07": {
    src: "/images/odi/dhoni_tricolour_profile.jpg",
    caption: "2013 Champions Trophy: Captaincy Trifecta"
  },
  "MOMENT_08": {
    src: "/images/odi/dhoni_power_lofted.jpg",
    caption: "Tri-Nation Final: 15 Off Final Over vs Eranga"
  },
  "MOMENT_10": {
    src: "/images/odi/dhoni_jersey7_back_walk.jpg",
    caption: "No. 7 Walking In: The Death Over Master"
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
    <section id="moments" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="ICONIC MOMENTS"
        title="THE MOMENTS THAT DEFINED CRICKET"
        subtitle="Step inside the high-stakes decisions, impossible chases, and clutch masterstrokes etched in cricket folklore."
        accentColor="gold"
      />

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase transition-all whitespace-nowrap",
              selectedCategory === cat
                ? "bg-gradient-to-r from-csk-gold to-csk-yellow text-black font-bold shadow-glow-gold scale-105"
                : "bg-surface-raised border border-white/10 text-slate-400 hover:text-white"
            )}
          >
            {cat.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* Moments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMoments.map((m) => (
          <div
            key={m.moment_id}
            className="group relative rounded-3xl bg-surface/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-csk-gold/40 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-csk-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-csk-gold/20 transition-all" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-csk-yellow" />
                  <span>{m.date}</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-csk-gold">
                  {m.category.replace(/_/g, " ")}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-csk-yellow transition-colors">
                  {m.match}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{m.venue}</span>
                </div>
              </div>

              {/* Moment HD Photo if mapped */}
              {MOMENT_IMAGES[m.moment_id] && (
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 shadow-lg group-hover:border-csk-gold/30 transition-all">
                  <img
                    src={MOMENT_IMAGES[m.moment_id].src}
                    alt={m.match}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-[11px] font-mono text-csk-yellow font-bold truncate">
                    {MOMENT_IMAGES[m.moment_id].caption}
                  </div>
                </div>
              )}

              {/* Context */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300 leading-relaxed">
                <span className="font-mono text-slate-400 font-bold uppercase block mb-1">Match Context:</span>
                {m.context}
              </div>

              {/* Performance */}
              <div className="p-3.5 rounded-2xl bg-csk-gold/10 border border-csk-gold/20 text-xs text-white font-mono leading-relaxed">
                <span className="text-csk-gold font-bold uppercase block mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Dhoni Masterstroke / Performance:</span>
                </span>
                {m.performance}
              </div>

              {/* Result */}
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Result: {m.result}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Moment ID: {m.moment_id}</span>
              <span>Verified: {m.source}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
