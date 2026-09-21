"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Award, Shield, Zap, Sparkles, Flame, CheckCircle2, Crown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GamificationSectionProps {
  unlockedList: string[];
  onResetProgress?: () => void;
}

export const GamificationSection: React.FC<GamificationSectionProps> = ({
  unlockedList,
  onResetProgress,
}) => {
  const achievements = [
    { id: "timeline", title: "MAHI FAN", desc: "Explored the 2004–2024 career timeline & roots", icon: Trophy, color: "text-csk-gold" },
    { id: "batsman", title: "THE BATSMAN", desc: "Analyzed batting positions (1–4 vs 5–7)", icon: Flame, color: "text-amber-400" },
    { id: "keeper", title: "THE KEEPER", desc: "Tested reflexes against the 0.08s benchmark", icon: Shield, color: "text-sky-400" },
    { id: "captain", title: "CAPTAIN COOL", desc: "Explored the ICC Trifecta & leadership records", icon: Award, color: "text-csk-yellow" },
    { id: "finisher", title: "THE FINISHER", desc: "Decoded death-over strike rates & chases", icon: Zap, color: "text-emerald-400" },
    { id: "csk", title: "WHISTLE PODU", desc: "Explored the India × CSK Dual Universe", icon: Sparkles, color: "text-purple-400" },
    { id: "trivia_master", title: "MAHI FAN MOMENT", desc: "Answered all 7 progressive trivia checkpoints", icon: Crown, color: "text-csk-yellow" },
  ];

  const count = unlockedList.length;
  const progressPct = Math.min((count / achievements.length) * 100, 100);

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="LEGACY PASSPORT (7 / 7 BADGES)"
        title="BADGES OF THE CAPTAIN COOL ODYSSEY"
        subtitle="Unlock badges as you explore verified career records and solve the 7 progressive trivia checkpoints."
        accentColor="gold"
      />

      {/* Progress Bar & Reset Button */}
      <div className="max-w-xl mx-auto mb-10 p-6 rounded-3xl bg-surface/80 border border-white/10 backdrop-blur-md text-center font-mono space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 uppercase">
          <span>Exploration & Trivia Progress</span>
          <span className="font-bold text-csk-yellow">{count} / {achievements.length} Badges Won</span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden border border-white/10">
          <div
            style={{ width: `${progressPct}%` }}
            className="h-full rounded-full bg-gradient-to-r from-india-blue via-csk-gold to-csk-yellow transition-all duration-500 shadow-glow-gold"
          />
        </div>

        {onResetProgress && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-rose-400 transition-colors uppercase"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Progress</span>
            </button>
          </div>
        )}
      </div>

      {/* Badges Grid (7 Badges) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {achievements.map((ach) => {
          const isUnlocked = unlockedList.includes(ach.id);
          const Icon = ach.icon;
          const isCrown = ach.id === "trivia_master";

          return (
            <div
              key={ach.id}
              className={cn(
                "rounded-3xl p-4 border text-center transition-all flex flex-col items-center justify-between",
                isUnlocked
                  ? isCrown
                    ? "bg-gradient-to-b from-csk-gold/30 to-amber-950/40 border-csk-gold shadow-glow-gold col-span-2 sm:col-span-1"
                    : "bg-surface-raised border-csk-gold/40 shadow-glow-gold"
                  : "bg-surface/40 border-white/5 opacity-50"
              )}
            >
              <div className={cn("p-3 rounded-2xl bg-white/5 border border-white/10 mb-2.5", ach.color)}>
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase text-white mb-1">
                  {ach.title}
                </h4>
                <p className="text-[9px] text-slate-400 leading-tight line-clamp-2">
                  {ach.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 w-full flex items-center justify-center gap-1 text-[9px] font-mono">
                {isUnlocked ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>UNLOCKED</span>
                  </span>
                ) : (
                  <span className="text-slate-500">LOCKED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
