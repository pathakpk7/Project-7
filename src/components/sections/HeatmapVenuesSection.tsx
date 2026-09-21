"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import venueStatsData from "@/data/venue_stats.json";
import homeAwayStatsData from "@/data/home_away_stats.json";
import { MapPin, Globe, Award, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const HeatmapVenuesSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  // Top venues
  const topVenues = venueStatsData
    .filter((v) => v.format === "OVERALL" && Number(v.runs) > 0)
    .sort((a, b) => Number(b.runs) - Number(a.runs))
    .slice(0, 12);

  const homeAwayOverall = homeAwayStatsData.filter((h) => h.format === "OVERALL");

  return (
    <section id="venues" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="GLOBAL VENUES & FORTRESSES"
        title="WHERE CAPTAIN COOL CONQUERED"
        subtitle="Performance across iconic stadiums worldwide — from Chepauk and Wankhede to the Wanderers and Lord's."
        accentColor="blue"
      />

      {/* Home vs Away vs Neutral Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 font-mono">
        {homeAwayOverall.map((ha) => (
          <div key={ha.home_away} className="p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase">
              <span>{ha.home_away} CONDITIONS</span>
              <Globe className="w-3 h-3 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {Number(ha.runs).toLocaleString()} runs
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Avg: <strong className="text-csk-gold">{ha.average}</strong> • {ha.matches} Matches
            </div>
          </div>
        ))}
      </div>

      {/* Top 12 Stadiums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {topVenues.map((v, idx) => (
          <div
            key={idx}
            className="group rounded-3xl bg-surface/80 border border-white/10 p-6 backdrop-blur-md hover:border-csk-gold/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-csk-yellow" />
                  <span>{v.city ? `${v.city}, ${v.country}` : v.country}</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase">#{idx + 1} Venue</span>
              </div>

              <h3 className="text-base font-bold uppercase tracking-tight text-white group-hover:text-csk-yellow transition-colors line-clamp-1">
                {v.venue}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs my-4 pt-3 border-t border-white/5">
              <div className="p-2 rounded-xl bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Runs</div>
                <div className="text-sm font-bold text-white mt-0.5">{v.runs}</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Average</div>
                <div className="text-sm font-bold text-csk-gold mt-0.5">{v.average}</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5">
                <div className="text-[10px] text-slate-400 uppercase">Best</div>
                <div className="text-sm font-bold text-sky-400 mt-0.5">{v.highest_score}</div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>{v.innings} Innings Batted</span>
              <span>SR: {v.strike_rate}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
