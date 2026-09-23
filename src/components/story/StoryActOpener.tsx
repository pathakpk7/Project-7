"use client";

import React from "react";
import type { StoryAct } from "@/config/storySpine";

interface StoryActOpenerProps {
  act: StoryAct;
}

export const StoryActOpener: React.FC<StoryActOpenerProps> = ({ act }) => {
  return (
    <div className="story-act-opener relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-slate-500 mb-3">
          Act {act.roman}
        </p>
        <h2 className="font-display text-3xl sm:text-5xl text-white tracking-wide mb-4">{act.title}</h2>
        <div className="story-ornament mx-auto mb-6" />
        <p className="font-story text-lg sm:text-xl text-slate-300 leading-relaxed italic max-w-2xl mx-auto">
          {act.hook}
        </p>
      </div>
    </div>
  );
};
