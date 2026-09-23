"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Sparkles, Flame, Zap, Shield, Target, Trophy, Crown, Lock, CheckCircle2, X, Award, ChevronRight, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StageBadge {
  id: number;
  stageNumber: string;
  badgeName: string;
  badgeImage: string;
  tierName: string;
  percentile: string;
  chapter: string;
  requirement: string;
  description: string;
  statHighlight: string;
}

export const STAGE_BADGES: StageBadge[] = [
  {
    id: 1,
    stageNumber: "LEVEL 01",
    badgeName: "The Debut Spark",
    badgeImage: "/images/badges/badge_1.jpg",
    tierName: "Gully Cricket Observer",
    percentile: "Top 95%",
    chapter: "Act I · The Journey & Debut (2004)",
    requirement: "Solve Level 1 Trivia (Debut & Kharagpur)",
    description: "From Kharagpur railway platforms to the blue jersey in Chattogram.",
    statHighlight: "Dec 23, 2004 Debut"
  },
  {
    id: 2,
    stageNumber: "LEVEL 02",
    badgeName: "Master of the Blade",
    badgeImage: "/images/badges/badge_2.jpg",
    tierName: "Bleed Blue Follower",
    percentile: "Top 75%",
    chapter: "Act II · The Swashbuckler (183* Jaipur)",
    requirement: "Solve Level 2 Trivia (Vizag & 183* Jaipur)",
    description: "183* off 145 balls with 10 sixes — highest ODI score by a wicketkeeper.",
    statHighlight: "183* vs Sri Lanka"
  },
  {
    id: 3,
    stageNumber: "LEVEL 03",
    badgeName: "Lightning Gloves (0.08s)",
    badgeImage: "/images/badges/badge_3.jpg",
    tierName: "Tactical Keeper Analyst",
    percentile: "Top 55%",
    chapter: "Act III · The Stumps & Gloves",
    requirement: "Solve Level 3 Trivia (0.08s Speed & 2016 Sprint)",
    description: "World record 195 international stumpings with 0.08-second reflexes.",
    statHighlight: "195 Stumpings Record"
  },
  {
    id: 4,
    stageNumber: "LEVEL 04",
    badgeName: "Captain Cool's Mind",
    badgeImage: "/images/badges/badge_4.jpg",
    tierName: "Tactical Strategist",
    percentile: "Top 35%",
    chapter: "Act IV · 2007 T20 World Cup Champion",
    requirement: "Solve Level 4 Trivia (Joginder Gamble & Leadership)",
    description: "The ice-cold tactical gamble in Johannesburg that sparked the T20 revolution.",
    statHighlight: "2007 World T20 Title"
  },
  {
    id: 5,
    stageNumber: "LEVEL 05",
    badgeName: "The Immortal Finisher",
    badgeImage: "/images/badges/badge_5.jpg",
    tierName: "Ice-Cold Pressure Master",
    percentile: "Top 20%",
    chapter: "Act V · 2011 World Cup Final (91* Wankhede)",
    requirement: "Solve Level 5 Trivia (Wankhede Six & Run Chases)",
    description: "'Dhoni finishes off in style!' — ending India's 28-year wait with that iconic six.",
    statHighlight: "2011 World Cup + 91*"
  },
  {
    id: 6,
    stageNumber: "LEVEL 06",
    badgeName: "White-Ball Emperor",
    badgeImage: "/images/badges/badge_6.jpg",
    tierName: "Dhoniologist",
    percentile: "Top 8%",
    chapter: "Act VI · 2013 Champions Trophy",
    requirement: "Solve Level 6 Trivia (ICC Trifecta & Test #1 Mace)",
    description: "The only captain in cricket history to capture all three ICC white-ball trophies.",
    statHighlight: "ICC Trifecta Complete"
  },
  {
    id: 7,
    stageNumber: "LEVEL 07",
    badgeName: "07 Mahi Legend (The Crown)",
    badgeImage: "/images/badges/badge_7.jpg",
    tierName: "Immortal Mahi Demi-God",
    percentile: "Top 1%",
    chapter: "Act VII · 5x IPL Champion with CSK",
    requirement: "Solve Level 7 Trivia (5x IPL Titles & 3 AM Finale)",
    description: "5 IPL Titles, 2 Champions League T20s, and the eternal captain of Chennai.",
    statHighlight: "5x IPL + 2x CLT20 Titles"
  }
];

const FAN_KNOWLEDGE_TIERS = [
  { level: 0, title: "Uninitiated Rookie", percentile: "Bottom 10%", desc: "Just starting your journey. Walk through the chapters to begin unlocking badges." },
  { level: 1, title: "Gully Cricket Observer", percentile: "Top 95%", desc: "Spark ignited! You know the humble beginnings and the arrival of No. 7." },
  { level: 2, title: "Bleed Blue Follower", percentile: "Top 75%", desc: "You remember the raw firepower, the long hair era, and the 183* fireworks!" },
  { level: 3, title: "Tactical Keeper Analyst", percentile: "Top 55%", desc: "Sharp eyes! You understand wicketkeeping geometry, 0.08s reflexes, and blind runouts." },
  { level: 4, title: "Tactical Strategist", percentile: "Top 35%", desc: "Captain's mind! You decode field placings, bowling rotations, and the 2007 T20 gambles." },
  { level: 5, title: "Ice-Cold Pressure Master", percentile: "Top 20%", desc: "Finisher blood! You understand how run-chases are calculated and closed under pressure." },
  { level: 6, title: "Dhoniologist", percentile: "Top 8%", desc: "Elite cricket scholar! You know the ICC White-Ball Trifecta and Test #1 Mace history inside out." },
  { level: 7, title: "Immortal Mahi Demi-God", percentile: "Top 1%", desc: "LEGENDARY STATUS! You know MS Dhoni better than 99% of cricket fans on Earth." }
];

interface MahiFanBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  answeredTriviaIds?: number[];
  unlockedCount?: number;
}

export const MahiFanBadgeModal: React.FC<MahiFanBadgeModalProps> = ({
  isOpen,
  onClose,
  answeredTriviaIds = [],
  unlockedCount = 0,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<StageBadge | null>(null);
  const [copied, setCopied] = useState(false);

  // Derive unlocked level count
  const count = Math.min(Math.max(answeredTriviaIds.length, unlockedCount), 7);
  const currentTier = FAN_KNOWLEDGE_TIERS[count] || FAN_KNOWLEDGE_TIERS[0];
  const isAllUnlocked = count >= 7;

  useEffect(() => {
    if (isOpen && isAllUnlocked) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFDF00", "#0077B6", "#FFFFFF", "#FF9933"],
      });
    }
  }, [isOpen, isAllUnlocked]);

  if (!isOpen) return null;

  const handleShare = () => {
    const shareText = `🏏 I just unlocked ${count}/7 MS Dhoni Badges on Captain Cool: Decoded! My Fan Tier: "${currentTier.title}" (${currentTier.percentile})! Test your Dhoni IQ here:`;
    if (navigator.share) {
      navigator.share({
        title: "Captain Cool: Decoded - Fan Knowledge Tier",
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-surface-raised border border-csk-gold/40 p-5 sm:p-7 text-left shadow-glow-gold overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-csk-gold/25 via-india-blue/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Close Badges Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Fan Knowledge Tier Assessment */}
        <div className="mb-4 pr-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-csk-yellow animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-csk-gold font-bold">
              DHONI IQ & GAMIFICATION TIERS
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span>7 STAGES OF THE LEGEND</span>
          </h3>
        </div>

        {/* Fan Knowledge Tier Hero Card */}
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-csk-gold/20 via-black/60 to-black/80 border border-csk-gold/40 backdrop-blur-md relative overflow-hidden shadow-glow-gold">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-csk-yellow/20 text-csk-yellow border border-csk-yellow/40 font-bold uppercase">
                  {currentTier.percentile} OF CRICKET FANS
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {count}/7 Badges Unlocked
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                Fan Tier: <span className="text-csk-yellow">{currentTier.title}</span>
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-0.5 max-w-lg">
                {currentTier.desc}
              </p>
            </div>

            {/* Share / Copy Tier Button */}
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl bg-csk-gold/20 hover:bg-csk-gold/30 border border-csk-gold/50 text-csk-yellow text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Share Tier"}</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 transition-all duration-500 shadow-glow-gold"
              style={{ width: `${(count / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Badges Grid (7 Levels) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar mb-3">
          {STAGE_BADGES.map((badge, idx) => {
            const isUnlocked = idx < count;

            return (
              <div
                key={badge.id}
                className={cn(
                  "p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 relative overflow-hidden",
                  isUnlocked
                    ? "bg-gradient-to-r from-csk-gold/15 via-surface/80 to-surface border-csk-gold/40 shadow-sm"
                    : "bg-surface/50 border-white/5 opacity-70"
                )}
              >
                {/* Visual Badge Medallion Image */}
                <div
                  className={cn(
                    "relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border transition-all",
                    isUnlocked
                      ? "border-csk-gold shadow-glow-gold bg-black"
                      : "border-white/10 grayscale opacity-60 bg-black/50"
                  )}
                >
                  <Image
                    src={badge.badgeImage}
                    alt={badge.badgeName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Badge Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-csk-gold uppercase tracking-wider">
                        {badge.stageNumber}
                      </span>
                      <h4
                        className={cn(
                          "text-xs sm:text-sm font-black uppercase tracking-tight truncate",
                          isUnlocked ? "text-white" : "text-slate-400"
                        )}
                      >
                        {badge.badgeName}
                      </h4>
                    </div>
                    <span
                      className={cn(
                        "text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 shrink-0",
                        isUnlocked
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-white/5 text-slate-400 border-white/10"
                      )}
                    >
                      {isUnlocked ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>UNLOCKED</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-slate-500" />
                          <span>LOCKED</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-300 font-sans leading-snug line-clamp-1 mb-1">
                    {badge.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span className="text-csk-gold/80 font-bold">{badge.tierName} ({badge.percentile})</span>
                    <span className="text-slate-600">•</span>
                    <span className={cn(isUnlocked ? "text-csk-yellow font-bold" : "text-slate-500")}>
                      {isUnlocked ? badge.statHighlight : badge.requirement}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] font-mono text-slate-400">
            {count < 7
              ? `${7 - count} more badge${7 - count === 1 ? "" : "s"} to reach Immortal Legend status`
              : "🏆 All 7 Gamification Badges Mastered!"}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
