"use client";

import React from "react";

interface StoryBridgeProps {
  label?: string;
  children: React.ReactNode;
}

export const StoryBridge: React.FC<StoryBridgeProps> = ({ label = "Turn the page", children }) => {
  return (
    <div className="story-bridge max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center">
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-csk-gold/70">{label}</span>
      <p className="font-story text-base sm:text-lg text-slate-400 mt-3 leading-relaxed">{children}</p>
    </div>
  );
};
