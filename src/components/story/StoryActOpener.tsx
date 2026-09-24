"use client";

import React from "react";
import Image from "next/image";
import type { StoryAct } from "@/config/storySpine";

interface StoryActOpenerProps {
  act: StoryAct;
}

const ACT_BACKGROUNDS: Record<string, string> = {
  weight: "/images/captain/dhoni_armband_calm.webp",
};

export const StoryActOpener: React.FC<StoryActOpenerProps> = ({ act }) => {
  const bgImage = ACT_BACKGROUNDS[act.id];

  return (
    <div className="story-act-opener relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden rounded-3xl my-8 max-w-6xl mx-auto border border-white/5 bg-black/40">
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <Image
            src={bgImage}
            alt={`${act.title} Background`}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30 sm:opacity-25 scale-100"
          />
          {/* Vignette & Soft Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-[#08090C]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_20%,#08090C_90%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,rgba(0,119,182,0.15),transparent_70%)]" />
        </div>
      )}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-sky-400 mb-3 drop-shadow">
          Act {act.roman}
        </p>
        <h2 className="font-display text-3xl sm:text-5xl text-white tracking-wide mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
          {act.title}
        </h2>
        <div className="story-ornament mx-auto mb-6" />
        <p className="font-story text-lg sm:text-xl text-slate-200 leading-relaxed italic max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          &ldquo;{act.hook}&rdquo;
        </p>
      </div>
    </div>
  );
};

