"use client";

import React from "react";
import { Heart, Database, Code2, Award, Sparkles, ExternalLink } from "lucide-react";

interface FooterProps {
  onTriggerNo7?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerNo7 }) => {
  return (
    <footer className="relative border-t border-white/10 bg-surface/90 pt-16 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-radial-stadium pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Rationale */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onTriggerNo7}
                title="Click to activate Number 7 Experience"
                className="w-8 h-8 rounded-lg bg-surface-raised border border-white/10 hover:border-csk-gold flex items-center justify-center font-mono font-bold text-csk-gold shadow-glow-gold transition-all"
              >
                07
              </button>
              <span className="font-bold text-lg tracking-wider uppercase text-white">
                CAPTAIN COOL: DECODED
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An interactive, cinematic cricket data exploration built from verified ball-by-ball archives.
              Dedicated to the career, composure, tactical brilliance, and legacy of Mahendra Singh Dhoni.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Verified Data Warehouse v1.0
              </span>
              <span>•</span>
              <span>Cricsheet Open Data</span>
            </div>
          </div>

          {/* Col 2: Navigation Jumps */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              EXPERIENCE
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li><a href="#journey" className="hover:text-csk-yellow transition-colors">Career Journey (2004–2024)</a></li>
              <li><a href="#batsman" className="hover:text-csk-yellow transition-colors">The Batsman (1–4 vs 5–7)</a></li>
              <li><a href="#keeper" className="hover:text-csk-yellow transition-colors">The Keeper (0.08s Reflex)</a></li>
              <li><a href="#captain" className="hover:text-csk-yellow transition-colors">The Captain & ICC Trifecta</a></li>
              <li><a href="#finisher" className="hover:text-csk-yellow transition-colors">The Finisher & Death Overs</a></li>
              <li><a href="#india-csk" className="hover:text-csk-yellow transition-colors">India × CSK Dual Universe</a></li>
              <li><a href="#lab" className="hover:text-csk-yellow transition-colors">Mahi Tactical Lab</a></li>
              <li><a href="#ask-mahi" className="hover:text-csk-yellow transition-colors">Ask Mahi Data AI</a></li>
            </ul>
          </div>

          {/* Col 3: Research & Pipeline */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              DATA TRANSPARENCY
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li><a href="#data-sources" className="hover:text-csk-yellow transition-colors">Reproducibility & ETL</a></li>
              <li><a href="#data-sources" className="hover:text-csk-yellow transition-colors">Automated Pipeline Audit</a></li>
              <li><a href="#achievements" className="hover:text-csk-yellow transition-colors">Gamification & 7 Badges</a></li>
              <li><a href="https://cricsheet.org" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 flex items-center gap-1">Cricsheet.org <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for MS Dhoni by a childhood fan</span>
          </div>
          <div>
            <span>&copy; 2024 Captain Cool: Decoded. Non-commercial passion project.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
