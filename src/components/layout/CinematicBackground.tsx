"use client";

import React from "react";

/** Lightweight static atmosphere — no canvas loop (scroll perf). */
export const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120vw] h-[600px] bg-gradient-to-b from-india-blue/10 via-csk-gold/5 to-transparent blur-[100px] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,rgba(255,223,0,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(0,119,182,0.06),transparent_45%)]" />
    </div>
  );
};
