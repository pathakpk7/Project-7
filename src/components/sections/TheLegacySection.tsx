"use client";

import React from "react";
import { Sparkles, Trophy, Heart, ArrowUp } from "lucide-react";

export const TheLegacySection: React.FC = () => {
  return (
    <section id="legacy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative overflow-hidden">
      {/* Background stadium light aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[450px] bg-gradient-to-r from-india-blue/20 via-csk-gold/20 to-sky-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Number 7 Emblem */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-surface-raised border-2 border-csk-gold flex items-center justify-center font-mono text-5xl font-extrabold text-csk-yellow shadow-glow-gold">
          07
        </div>

        {/* Grand Manifesto Headlines */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            THE NUMBERS TELL THE STORY.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-csk-yellow via-amber-200 to-amber-500">
              THE MOMENTS MADE THE LEGACY.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-mono tracking-widest uppercase max-w-xl mx-auto">
            FROM RANCHI TO CRICKET IMMORTALITY
          </p>
        </div>

        {/* Final Career Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-surface/90 border border-white/10 backdrop-blur-xl font-mono text-left max-w-4xl mx-auto">
          <div>
            <div className="text-[11px] text-slate-400 uppercase">International Career</div>
            <div className="text-2xl font-bold text-white mt-1">17,266 runs</div>
            <div className="text-[10px] text-sky-400">538 matches • 44.96 avg</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase">CSK & IPL Career</div>
            <div className="text-2xl font-bold text-csk-yellow mt-1">5,243 runs</div>
            <div className="text-[10px] text-csk-gold">264 matches • 137.54 SR</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase">All-Time Dismissals</div>
            <div className="text-2xl font-bold text-white mt-1">829+</div>
            <div className="text-[10px] text-purple-400">195 world record stumpings</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase">Major Championships</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">10 Titles</div>
            <div className="text-[10px] text-slate-400">3 ICC • 5 IPL • 2 CLT20</div>
          </div>
        </div>

        {/* Closing Paragraph */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Trophies gather dust in cabinets, but the feeling of watching MS Dhoni stand at the crease in the 20th over with 15 needed and total certainty in his eyes — that remains forever.
        </p>

        {/* Back to Top */}
        <div className="pt-8">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-raised border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/30 transition-all uppercase tracking-wider"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>BACK TO TOP</span>
          </a>
        </div>

      </div>
    </section>
  );
};
