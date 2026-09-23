"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Sparkles, Flame, Target, Award, Play, Pause, RotateCcw, Dices } from "lucide-react";
import conciseStatsData from "@/data/concise_stats.json";
import { cn } from "@/lib/utils";

interface CinematicHelicopterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICONIC_HELICOPTER_SHOTS = [
  {
    year: "2011",
    match: "ICC World Cup Final vs Sri Lanka",
    venue: "Wankhede Stadium, Mumbai",
    bowler: "Nuwan Kulasekara",
    distance: "91m Six",
    impact: "Ended India's 28-year World Cup wait in immortal style with 91* off 79 balls.",
    quote: "“Dhoni finishes off in style. A magnificent strike into the crowd!” — Ravi Shastri"
  },
  {
    year: "2010",
    match: "IPL Semi-Final Qualifier vs Kings XI Punjab",
    venue: "Dharamsala",
    bowler: "Irfan Pathan",
    distance: "95m Six",
    impact: "CSK needed 16 in the 20th over. Dhoni hit 4, 2, 6, 6 (54* off 29) followed by the rare helmet punch celebration.",
    quote: "“When the team needed me most, the helicopter took off.”"
  },
  {
    year: "2012",
    match: "CB Series Match vs Australia",
    venue: "Adelaide Oval",
    bowler: "Clint McKay",
    distance: "112m Monster Six",
    impact: "Needed 12 off 4 balls. Smashed a 112-meter straight helicopter six over the longest boundary in Australia.",
    quote: "“The ball landed near the top deck of the Chappell Stand.”"
  },
  {
    year: "2018",
    match: "IPL League Match vs RCB",
    venue: "Chinnaswamy Stadium, Bengaluru",
    bowler: "Corey Anderson",
    distance: "105m Six",
    impact: "CSK chased 206 from 74/4. Dhoni blasted 70* (34) and finished the game with 2 balls to spare.",
    quote: "“The trademark bottom-hand whiplash into the Bengaluru night sky.”"
  }
];

export const CinematicHelicopterModal: React.FC<CinematicHelicopterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedShotIndex, setSelectedShotIndex] = useState(0);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keyboard close handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Reset video and pick random stat on open
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
      if (conciseStatsData.length > 0) {
        const randomIndex = Math.floor(Math.random() * conciseStatsData.length);
        setCurrentStatIndex(randomIndex);
      }
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleNextStat = useCallback(() => {
    if (conciseStatsData.length > 0) {
      const nextIndex = (currentStatIndex + 1) % conciseStatsData.length;
      setCurrentStatIndex(nextIndex);
    }
  }, [currentStatIndex]);

  const currentStat = conciseStatsData[currentStatIndex] || conciseStatsData[0];
  const activeShot = ICONIC_HELICOPTER_SHOTS[selectedShotIndex];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-none overflow-y-auto"
          >
            <div className="relative w-full max-w-4xl rounded-3xl bg-surface-raised border border-csk-gold/40 p-5 sm:p-7 text-left shadow-glow-gold overflow-hidden my-auto max-h-[92vh] flex flex-col pointer-events-auto">
              
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-gradient-to-b from-csk-gold/25 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-4 pr-10">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-csk-yellow animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-csk-gold font-bold">
                    SIGNATURE WEAPON IN ACTION
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span>3D HELICOPTER SHOT</span>
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  The physics, signature whiplash, and match-winning legacy of MS Dhoni&apos;s trademark stroke.
                </p>
              </div>

              {/* Two-Column Grid: Video on Left / Details on Right */}
              <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden mb-3">
                
                {/* Left: Video Showcase */}
                <div className="lg:w-1/2 flex flex-col gap-2.5">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-csk-gold/40 shadow-inner group">
                    <video
                      ref={videoRef}
                      src="/videos/helicopter.webm"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />

                    {/* Video Overlay Controls */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="p-1.5 rounded-lg bg-csk-gold text-black hover:scale-105 transition-transform cursor-pointer"
                          aria-label={isPlaying ? "Pause Video" : "Play Video"}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={handleReplay}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                          aria-label="Replay Video"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-csk-yellow uppercase tracking-wider">
                        Helicopter Shot ⚡
                      </span>
                    </div>
                  </div>

                  {/* 3 Biomechanical Mini-Badges */}
                  <div className="grid grid-cols-3 gap-2 font-mono">
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="text-[10px] text-csk-gold uppercase font-bold flex items-center justify-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Origins</span>
                      </div>
                      <div className="text-[11px] font-black text-white mt-0.5">&ldquo;Thappad&rdquo; Shot</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="text-[10px] text-csk-gold uppercase font-bold flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-sky-400" />
                        <span>Speed</span>
                      </div>
                      <div className="text-[11px] font-black text-white mt-0.5">140+ km/h</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="text-[10px] text-csk-gold uppercase font-bold flex items-center justify-center gap-1">
                        <Target className="w-3 h-3 text-emerald-400" />
                        <span>Target</span>
                      </div>
                      <div className="text-[11px] font-black text-white mt-0.5">Yorker Killer</div>
                    </div>
                  </div>
                </div>

                {/* Right: Hall of Immortal Helicopter Shots & Facts */}
                <div className="lg:w-1/2 flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                  
                  {/* Hall of Iconic Helicopter Shots */}
                  <div className="p-3.5 rounded-2xl bg-surface/90 border border-csk-gold/30 shadow-inner">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-csk-yellow font-bold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        <span>HALL OF IMMORTAL HELICOPTERS</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {selectedShotIndex + 1} of {ICONIC_HELICOPTER_SHOTS.length}
                      </span>
                    </div>

                    {/* Shot Selectors */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {ICONIC_HELICOPTER_SHOTS.map((shot, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedShotIndex(idx)}
                          className={cn(
                            "px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer",
                            selectedShotIndex === idx
                              ? "bg-csk-gold text-black shadow-glow-gold"
                              : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                          )}
                        >
                          {shot.year} · {shot.distance}
                        </button>
                      ))}
                    </div>

                    {/* Active Shot Details */}
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-tight">
                          {activeShot.match}
                        </h4>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-csk-gold/20 text-csk-yellow border border-csk-gold/40 font-bold">
                          {activeShot.distance}
                        </span>
                      </div>

                      <div className="text-[10px] font-mono text-slate-400 flex flex-wrap gap-2.5">
                        <span>Venue: <strong className="text-slate-200">{activeShot.venue}</strong></span>
                        <span>Bowler: <strong className="text-slate-200">{activeShot.bowler}</strong></span>
                      </div>

                      <p className="text-[11px] text-slate-200 font-sans leading-snug">
                        {activeShot.impact}
                      </p>

                      <p className="text-[10px] text-csk-gold/90 font-mono italic">
                        {activeShot.quote}
                      </p>
                    </div>
                  </div>

                  {/* Fact Box */}
                  <div className="p-3.5 rounded-2xl bg-surface/70 border border-white/10">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-csk-gold font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-csk-yellow" />
                        <span>DHONI FACT ARCHIVE</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">#{currentStat.id}</span>
                    </div>

                    <h5 className="text-xs font-black uppercase text-white mb-1.5">
                      {currentStat.headline}
                    </h5>

                    <div className="mb-1.5 p-2 rounded-xl bg-gradient-to-r from-csk-gold/20 via-csk-yellow/15 to-transparent border border-csk-gold/30 text-csk-yellow font-mono font-black text-xs">
                      {currentStat.stat_box}
                    </div>

                    <p className="text-[11px] text-slate-300 font-sans leading-snug">
                      {currentStat.story}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={handleNextStat}
                  className="px-4 py-2 rounded-xl bg-csk-gold/20 hover:bg-csk-gold/30 border border-csk-gold/50 text-csk-yellow font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Dices className="w-4 h-4" />
                  <span>Next Fact ⚡</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
