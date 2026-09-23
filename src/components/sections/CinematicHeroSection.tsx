"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PinnedScene } from "@/components/cinematic/PinnedScene";
import { RevealText, ClipReveal } from "@/components/cinematic/RevealText";
import { AnimatedNumber } from "@/components/cinematic/AnimatedNumber";
import { ParallaxImage } from "@/components/cinematic/ParallaxImage";
import { ArrowDown, Compass, Database, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCinemaMode } from "@/components/cinematic/CinemaModeProvider";

interface CinematicHeroSectionProps {
  onEnterJourney: () => void;
  onTriggerNo7: () => void;
  onOpenAskMahi?: () => void;
}

const CAREER_BEATS = [
  { year: "2004", title: "DEBUT", subtitle: "International Cricket Begins" },
  { year: "2005", title: "183*", subtitle: "Jaipur Masterclass" },
  { year: "2007", title: "CAPTAIN", subtitle: "Leadership Era Begins" },
  { year: "2011", title: "WORLD CUP", subtitle: "28 Years of Wait Ends" },
  { year: "2013", title: "CHAMPIONS TROPHY", subtitle: "ICC Trifecta Complete" },
  { year: "2018", title: "COMEBACK", subtitle: "Return to Glory" },
  { year: "2023", title: "FAREWELL", subtitle: "The Final Chapter" },
];

export const CinematicHeroSection: React.FC<CinematicHeroSectionProps> = ({
  onEnterJourney,
  onTriggerNo7,
  onOpenAskMahi,
}) => {
  const { isCinemaMode } = useCinemaMode();
  const [currentBeat, setCurrentBeat] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [showOpening, setShowOpening] = useState(true);

  // Auto-transition from opening to scroll-driven content after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOpening(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PinnedScene height="400vh" onProgress={(progress) => {
      // If user scrolls significantly, immediately hide opening
      if (progress > 0.1 && showOpening) {
        setShowOpening(false);
      }
      
      const beatIndex = Math.min(
        Math.floor(progress * CAREER_BEATS.length),
        CAREER_BEATS.length - 1
      );
      setCurrentBeat(beatIndex);
      setShowActions(progress > 0.85);
    }}>
      {({ progress }) => (
        <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
          
          {/* Cinematic Background Layers */}
          <div className="absolute inset-0">
            {/* Base dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
            
            {/* Ambient stadium glow - emerges with progress */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(0,119,182,0.15),transparent_70%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: !showOpening && progress > 0.15 ? (progress < 0.3 ? progress * 3.33 : 1) : 0 }}
            />
            
            {/* CSK gold glow - enters later */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_70%,rgba(253,185,19,0.1),transparent_80%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: !showOpening && progress > 0.5 ? (progress < 0.8 ? (progress - 0.5) * 5 : 1) : 0 }}
            />
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            
            {/* Phase 1: Opening Text (Always shows initially, then transitions on scroll) */}
            <AnimatePresence mode="wait">
              {showOpening && progress < 0.2 && (
                <motion.div
                  key="opening"
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* RANCHI 2004 */}
                  <RevealText
                    direction="fade"
                    delay={0.2}
                    duration={0.8}
                    isInView={true}
                    className="block"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-csk-gold animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-slate-300">
                        RANCHI 2004
                      </span>
                    </div>
                  </RevealText>

                  {/* BEFORE CAPTAIN COOL... */}
                  <RevealText
                    direction="up"
                    delay={0.6}
                    duration={0.8}
                    isInView={true}
                  >
                    <p className="font-story text-2xl sm:text-4xl md:text-5xl text-slate-300 italic leading-snug">
                      &ldquo;Before Captain Cool...&rdquo;
                    </p>
                  </RevealText>

                  {/* THERE WAS JUST MAHI */}
                  <RevealText
                    direction="up"
                    delay={1.2}
                    duration={0.8}
                    isInView={true}
                  >
                    <p className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white">
                      THERE WAS JUST <span className="text-csk-yellow">MAHI</span>
                    </p>
                  </RevealText>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 2: Career Beats Progression (0.15-0.85 progress) */}
            <AnimatePresence mode="wait">
              {!showOpening && progress >= 0.15 && progress < 0.85 && (
                <motion.div
                  key="career-beats"
                  className="space-y-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Current Year Beat */}
                  <div className="space-y-4">
                    <motion.div
                      className="font-display text-6xl sm:text-8xl md:text-9xl font-black text-white"
                      animate={{
                        scale: 0.8 + (progress - 0.15) * 0.4,
                        opacity: progress < 0.2 ? (progress - 0.15) * 20 : (progress > 0.8 ? (0.85 - progress) * 20 : 1)
                      }}
                    >
                      {CAREER_BEATS[currentBeat]?.year}
                    </motion.div>

                    <ClipReveal
                      delay={0.1}
                      duration={0.8}
                      isInView={true}
                    >
                      <div className="space-y-2">
                        <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-csk-yellow">
                          {CAREER_BEATS[currentBeat]?.title}
                        </h2>
                        <p className="font-mono text-sm sm:text-base text-slate-300">
                          {CAREER_BEATS[currentBeat]?.subtitle}
                        </p>
                      </div>
                    </ClipReveal>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center gap-2 pt-8">
                    {CAREER_BEATS.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className={cn(
                          "h-1 rounded-full transition-all",
                          idx === currentBeat
                            ? "w-8 bg-csk-gold"
                            : "w-2 bg-white/20"
                        )}
                        initial={false}
                        animate={{
                          width: idx === currentBeat ? "2rem" : "0.5rem",
                          backgroundColor: idx === currentBeat ? "#E5A823" : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3: Helicopter Shot Payoff (0.85-1.0 progress) */}
            <AnimatePresence mode="wait">
              {progress >= 0.85 && (
                <motion.div
                  key="helicopter-payoff"
                  className="space-y-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* 2011 World Cup Context */}
                  <div className="space-y-4">
                    <RevealText direction="up" delay={0.2} isInView={true}>
                      <div className="font-display text-5xl sm:text-7xl font-black text-white">
                        2011
                      </div>
                    </RevealText>

                    <RevealText direction="up" delay={0.4} isInView={true}>
                      <div className="font-mono text-lg sm:text-2xl text-csk-yellow">
                        28 YEARS OLD • 91 METRES • WORLD CUP FINAL
                      </div>
                    </RevealText>

                    {/* Helicopter Shot Call-to-Action */}
                    <motion.div
                      className="pt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: progress > 0.9 ? (progress - 0.9) * 10 : 0 }}
                    >
                      <button
                        onClick={onTriggerNo7}
                        className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-[0.98] transition-transform shadow-glow-gold flex items-center justify-center gap-3 mx-auto"
                      >
                        <span>Experience the Helicopter Shot</span>
                        <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons - Fade in at end */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  className="absolute bottom-8 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-3 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="#journey"
                    onClick={onEnterJourney}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-csk-gold via-csk-yellow to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-glow-gold flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    <span>Begin Chapter I</span>
                    <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </a>

                  {onOpenAskMahi && (
                    <button
                      onClick={onOpenAskMahi}
                      className="w-full sm:w-auto px-7 py-4 rounded-full border border-csk-gold/40 bg-csk-gold/10 hover:bg-csk-gold/20 text-csk-yellow font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Database className="w-4 h-4" />
                      <span>Ask Mahi Warehouse</span>
                    </button>
                  )}

                  <a
                    href="#batsman"
                    className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-sky-400" />
                    <span>The Blade (1–7)</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            animate={{ 
              opacity: showOpening ? 0 : (progress < 0.15 ? 1 : (progress > 0.8 ? 0 : 1 - (progress - 0.15) * 1.43))
            }}
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-500">
              Scroll to enter the documentary
            </span>
            <ArrowDown className="w-4 h-4 text-csk-gold/70 animate-bounce" />
          </motion.div>

          {/* Opening sequence indicator */}
          <AnimatePresence>
            {showOpening && (
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-csk-gold">
                  Opening sequence...
                </span>
                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-csk-gold"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Statistics - Subtle background */}
          <motion.div
            className="absolute bottom-4 right-4 grid grid-cols-2 gap-2 text-right opacity-30"
            animate={{ 
              opacity: !showOpening && progress > 0.3 ? (progress < 0.7 ? (progress - 0.3) * 0.75 : 0.3) : 0
            }}
          >
            <div className="font-mono text-[10px] text-slate-400">17,266 RUNS</div>
            <div className="font-mono text-[10px] text-csk-yellow">3/3 ICC TROPHIES</div>
            <div className="font-mono text-[10px] text-slate-400">5 IPL TITLES</div>
            <div className="font-mono text-[10px] text-sky-400">829 DISMISSALS</div>
          </motion.div>
        </div>
      )}
    </PinnedScene>
  );
};
