"use client";

import React, { useState, useEffect } from "react";
import { Shield, Sparkles, Menu, X, Trophy, Compass, Activity, Target, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onTriggerNo7: () => void;
  onTriggerBadge?: () => void;
  unlockedAchievementsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onTriggerNo7, 
  onTriggerBadge,
  unlockedAchievementsCount 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const sections = [
        "hero", "journey", "batsman", "keeper", "captain",
        "finisher", "trophies", "moments", "india-csk", "venues", "era"
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "journey", label: "JOURNEY", icon: Compass },
    { id: "batsman", label: "BATSMAN", icon: Activity },
    { id: "keeper", label: "KEEPER", icon: Shield },
    { id: "captain", label: "CAPTAIN", icon: Trophy },
    { id: "finisher", label: "FINISHER", icon: Zap },
    { id: "trophies", label: "TROPHIES", icon: Trophy },
    { id: "moments", label: "MOMENTS", icon: Sparkles },
    { id: "india-csk", label: "INDIA × CSK", icon: Target },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-surface/90 backdrop-blur-2xl border-b border-white/10 py-2.5 shadow-2xl" 
        : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-csk-gold/20 via-surface to-csk-yellow/30 border border-csk-gold/40 flex items-center justify-center font-mono font-black text-csk-yellow group-hover:border-csk-gold transition-all shadow-glow-gold">
            07
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-csk-yellow animate-ping" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-wider uppercase text-white flex items-center gap-1.5">
              <span>CAPTAIN COOL</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-csk-gold/20 border border-csk-gold/30 text-csk-yellow font-mono font-semibold">DECODED</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 tracking-widest uppercase hidden sm:block">
              THE NUMBERS. THE DECISIONS. THE MOMENTS.
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-surface-raised/60 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "px-3 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5",
                activeSection === item.id 
                  ? "bg-csk-gold/20 text-csk-yellow font-bold border border-csk-gold/40 shadow-glow-gold" 
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              )}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Actions (Easter Egg Trigger & Badges) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Number 7 Surprise Trigger Button */}
          <button
            onClick={onTriggerNo7}
            title="Helicopter Shot Me! • Surprise MS Dhoni Stats"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-csk-gold/25 via-csk-yellow/20 to-amber-500/20 border border-csk-gold/50 text-csk-yellow text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all shadow-glow-gold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-csk-gold animate-spin-slow" />
            <span>NO. 7</span>
          </button>

          {/* Badges Counter Pill (Clickable trigger for 07 Mahi Fan Badge modal) */}
          <button
            onClick={onTriggerBadge || onTriggerNo7}
            title={unlockedAchievementsCount === 7 ? "Click to view 07 Mahi Fan Badge!" : `${unlockedAchievementsCount} of 7 Trivia Checkpoints Solved - Click to view Badge`}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-mono font-bold cursor-pointer",
              unlockedAchievementsCount === 7
                ? "bg-gradient-to-r from-csk-gold/30 to-amber-500/30 border-csk-yellow text-csk-yellow shadow-glow-gold animate-pulse hover:scale-105"
                : "bg-surface-raised/80 border-white/10 text-slate-300 hover:border-csk-gold/40 hover:text-white"
            )}
          >
            <Trophy className={cn("w-3.5 h-3.5", unlockedAchievementsCount === 7 ? "text-csk-yellow" : "text-csk-gold")} />
            <span>{unlockedAchievementsCount} / 7</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-surface-raised/90 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-csk-yellow" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl transition-all">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono tracking-wide uppercase transition-all",
                  activeSection === item.id 
                    ? "bg-csk-gold/20 text-csk-yellow font-bold border border-csk-gold/40" 
                    : "bg-surface-raised/60 text-slate-300 hover:bg-white/10 border border-white/5"
                )}
              >
                <item.icon className="w-3.5 h-3.5 text-csk-gold shrink-0" />
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">BADGES WON</span>
            <span className="text-xs font-mono font-bold text-csk-yellow">{unlockedAchievementsCount} / 7 UNLOCKED</span>
          </div>
        </div>
      )}
    </header>
  );
};
