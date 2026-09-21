"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  accent?: "gold" | "blue" | "silver" | "emerald";
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  accent = "gold",
  className,
}) => {
  const accentGlow = {
    gold: "group-hover:border-csk-gold/40 group-hover:shadow-glow-gold text-csk-yellow",
    blue: "group-hover:border-india-blue/40 group-hover:shadow-glow-blue text-sky-400",
    silver: "group-hover:border-slate-400/40 text-metallic-silver",
    emerald: "group-hover:border-emerald-500/40 text-emerald-400",
  };

  return (
    <div className={cn(
      "group relative rounded-2xl bg-surface/80 border border-white/10 p-5 sm:p-6 backdrop-blur-md glass-panel-hover overflow-hidden transition-all duration-300",
      className
    )}>
      {/* Subtle top edge light */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
          {label}
        </span>
        {Icon && (
          <div className={cn(
            "p-2 rounded-xl bg-white/5 border border-white/10 transition-colors",
            accentGlow[accent]
          )}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono my-1">
        {value}
      </div>

      {subtext && (
        <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
};
