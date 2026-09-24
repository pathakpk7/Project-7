"use client";

import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Heart, Sparkles, Quote, Terminal } from "lucide-react";

export const PersonalTributeSection: React.FC = () => {
  return (
    <section id="tribute" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      <SectionHeader
        badge="CHAPTER XI · A FAN'S NOTE"
        title="WHY THIS STORY EXISTS"
        subtitle="“A personal word before the final page—honoring the composure, the leadership, and the memories of No. 7.”"
        accentColor="purple"
        bgImage="/images/tribute/dhoni_goat_outfield.jpg"
        bgOpacity="opacity-35 sm:opacity-30"
      />

      {/* Creator's Tribute Box with The GOAT Background */}
      <div className="rounded-3xl bg-surface/90 border border-purple-500/30 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center">
        {/* Low-Fade GOAT Outfield Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <Image
            src="/images/tribute/dhoni_goat_outfield.jpg"
            alt="MS Dhoni The GOAT Outfield Background"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center opacity-35 sm:opacity-28 scale-100"
          />
          {/* Soft Contrast & Dark Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-[#08090C]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_15%,#08090C_90%)]" />
        </div>

        {/* Dynamic purple ambient aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>CREATOR&apos;S NOTE</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Why I Built This
          </h3>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            <p className="italic text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              &ldquo;Before I studied the numbers, I watched the moments. Before I understood the statistics, I understood what Mahi meant to a generation.&rdquo;
            </p>
            <p className="text-slate-300 text-xs sm:text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              I grew up screaming at the television during the 2007 T20 World Cup, climbing the roof in 2011 when that final six kissed the Mumbai sky, and holding my breath through every impossible last over.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <strong>Captain Cool: Decoded</strong> is my attempt as a data engineer and lifelong fan to honor the composure, tactical genius, and human spirit of Mahendra Singh Dhoni — built with zero compromises in statistical integrity and visual craft.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span>Dedicated to MS Dhoni • &ldquo;Consider me as retired from 1929 hrs&rdquo;</span>
          </div>
        </div>
      </div>
    </section>
  );
};

