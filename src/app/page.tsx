"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CinematicBackground } from "@/components/layout/CinematicBackground";

import { HeroSection } from "@/components/sections/HeroSection";
import { CareerTimelineSection } from "@/components/sections/CareerTimelineSection";
import { TheBatsmanSection } from "@/components/sections/TheBatsmanSection";
import { TheKeeperSection } from "@/components/sections/TheKeeperSection";
import { TheCaptainSection } from "@/components/sections/TheCaptainSection";
import { TheFinisherSection } from "@/components/sections/TheFinisherSection";
import { TrophyCabinetSection } from "@/components/sections/TrophyCabinetSection";
import { IconicMomentsSection } from "@/components/sections/IconicMomentsSection";
import { IndiaCsSection } from "@/components/sections/IndiaCsSection";
import { HeatmapVenuesSection } from "@/components/sections/HeatmapVenuesSection";
import { DhoniVsEraSection } from "@/components/sections/DhoniVsEraSection";
import { MahiLabSection } from "@/components/sections/MahiLabSection";
import { GamificationSection } from "@/components/sections/GamificationSection";
import { AskMahiSection } from "@/components/sections/AskMahiSection";
import { PersonalTributeSection } from "@/components/sections/PersonalTributeSection";
import { DataTransparencySection } from "@/components/sections/DataTransparencySection";
import { TheLegacySection } from "@/components/sections/TheLegacySection";

import { TriviaCheckpoint, TriviaQuestion } from "@/components/interactive/TriviaCheckpoint";
import { Number7Modal } from "@/components/easter-eggs/Number7Modal";
import { HelicopterAnimation } from "@/components/easter-eggs/HelicopterAnimation";

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    level: "1 / 7",
    difficulty: "EASY",
    question: "Which country did MS Dhoni make his international debut against in December 2004?",
    options: ["Pakistan", "Bangladesh", "Sri Lanka", "Zimbabwe"],
    correctAnswer: "Bangladesh",
    explanation: "Dhoni made his ODI debut on December 23, 2004 vs Bangladesh at Chattogram."
  },
  {
    id: 2,
    level: "2 / 7",
    difficulty: "EASY",
    question: "Against which team did MS Dhoni score his career-highest ODI score of 183* (145 balls) in 2005?",
    options: ["Sri Lanka", "Pakistan", "Australia", "England"],
    correctAnswer: "Sri Lanka",
    explanation: "Scored at Jaipur on October 31, 2005 — the highest individual ODI score by a wicketkeeper in cricket history."
  },
  {
    id: 3,
    level: "3 / 7",
    difficulty: "MEDIUM",
    question: "In the 2016 T20 World Cup 1-run thriller in Bengaluru, whom did Dhoni run out on the final ball after sprinting 25m with his glove off?",
    options: ["Mushfiqur Rahim", "Mahmudullah", "Mustafizur Rahman", "Shakib Al Hasan"],
    correctAnswer: "Mustafizur Rahman",
    explanation: "Dhoni removed his right glove beforehand and broke the stumps by inches to seal a 1-run victory."
  },
  {
    id: 4,
    level: "4 / 7",
    difficulty: "HARD",
    question: "Whom did MS Dhoni hand the ball to for the final over of the 2007 ICC World Twenty20 Final in Johannesburg?",
    options: ["Harbhajan Singh", "Joginder Sharma", "RP Singh", "S. Sreesanth"],
    correctAnswer: "Joginder Sharma",
    explanation: "Joginder Sharma dismissed Misbah-ul-Haq (caught by Sreesanth) to win India the inaugural T20 World Cup."
  },
  {
    id: 5,
    level: "5 / 7",
    difficulty: "HARD",
    question: "In the iconic 2011 ICC Cricket World Cup Final at Wankhede, whom did MS Dhoni promote himself ahead of in the batting order to counter Muralitharan?",
    options: ["Suresh Raina", "Yuvraj Singh", "Virat Kohli", "Harbhajan Singh"],
    correctAnswer: "Yuvraj Singh",
    explanation: "Dhoni promoted himself to No. 5 to maintain a right-left combination and scored 91* to win Player of the Match."
  },
  {
    id: 6,
    level: "6 / 7",
    difficulty: "EXPERT",
    question: "MS Dhoni completed the unprecedented ICC White-Ball Trophy Trifecta by winning the 2013 Champions Trophy in which English city?",
    options: ["London (Lord's)", "Birmingham (Edgbaston)", "Manchester (Old Trafford)", "Cardiff (Sophia Gardens)"],
    correctAnswer: "Birmingham (Edgbaston)",
    explanation: "India defended 129 in a rain-reduced 20-over final against England at Edgbaston, Birmingham."
  },
  {
    id: 7,
    level: "7 / 7",
    difficulty: "LEGENDARY",
    question: "In the dramatic 3:00 AM rain-affected IPL 2023 Final in Ahmedabad, how many runs did CSK need off the final 2 balls before Jadeja hit a 6 and 4?",
    options: ["8 runs", "10 runs", "12 runs", "6 runs"],
    correctAnswer: "10 runs",
    explanation: "CSK needed 10 runs off 2 balls off Mohit Sharma; Jadeja smashed a straight 6 followed by a fine-leg 4 to seal CSK's 5th title!"
  }
];

const QUESTION_BADGE_MAP: Record<number, string> = {
  1: "timeline",
  2: "batsman",
  3: "keeper",
  4: "captain",
  5: "finisher",
  6: "csk",
  7: "trivia_master"
};

export default function Home() {
  const [isNo7Open, setIsNo7Open] = useState(false);
  const [isHelicopterActive, setIsHelicopterActive] = useState(false);
  const [answeredTriviaIds, setAnsweredTriviaIds] = useState<number[]>([]);
  const [unlockedList, setUnlockedList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persistence from localStorage on mount
  useEffect(() => {
    try {
      const savedBadges = localStorage.getItem("captain_cool_badges");
      const savedTrivia = localStorage.getItem("captain_cool_trivia");

      if (savedBadges) {
        setUnlockedList(JSON.parse(savedBadges));
      } else {
        // Initial exploration badges
        const initialBadges = ["timeline", "batsman", "keeper"];
        setUnlockedList(initialBadges);
        localStorage.setItem("captain_cool_badges", JSON.stringify(initialBadges));
      }

      if (savedTrivia) {
        setAnsweredTriviaIds(JSON.parse(savedTrivia));
      }
    } catch {
      setUnlockedList(["timeline", "batsman", "keeper"]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save badges to localStorage whenever unlockedList changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        localStorage.setItem("captain_cool_badges", JSON.stringify(unlockedList));
      } catch (e) {
        console.error("Failed to save badges to localStorage", e);
      }
    }
  }, [unlockedList, isLoaded]);

  // Save trivia to localStorage whenever answeredTriviaIds changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        localStorage.setItem("captain_cool_trivia", JSON.stringify(answeredTriviaIds));
      } catch (e) {
        console.error("Failed to save trivia to localStorage", e);
      }
    }
  }, [answeredTriviaIds, isLoaded]);

  const handleEnterJourney = () => {
    if (!unlockedList.includes("timeline")) {
      setUnlockedList((prev) => [...prev, "timeline"]);
    }
  };

  const handleHelicopterShot = () => {
    setIsHelicopterActive(true);
  };

  const handleTriviaCorrect = (questionId: number) => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#FDB913", "#0081E9", "#FFFFFF"]
      });
    } catch {}

    setAnsweredTriviaIds((prev) => {
      if (prev.includes(questionId)) return prev;
      const updated = [...prev, questionId];
      
      // Auto-unlock corresponding badge for this question
      const mappedBadge = QUESTION_BADGE_MAP[questionId];
      setUnlockedList((uPrev) => {
        const nextList = new Set(uPrev);
        if (mappedBadge) nextList.add(mappedBadge);

        // If all 7 are answered, unlock the 7th crown badge!
        if (updated.length === TRIVIA_QUESTIONS.length) {
          nextList.add("trivia_master");
          try {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 },
              colors: ["#FDB913", "#FFD700", "#0081E9", "#FFFFFF"]
            });
          } catch {}
        }
        return Array.from(nextList);
      });

      return updated;
    });
  };

  const handleResetProgress = () => {
    if (confirm("Reset all exploration badges and trivia answers?")) {
      const resetBadges: string[] = [];
      setUnlockedList(resetBadges);
      setAnsweredTriviaIds([]);
      try {
        localStorage.removeItem("captain_cool_badges");
        localStorage.removeItem("captain_cool_trivia");
      } catch {}
    }
  };

  return (
    <main className="relative min-h-screen text-slate-100 selection:bg-csk-gold selection:text-black overflow-x-hidden">
      {/* Ambient Lighting & Particles Background */}
      <CinematicBackground />

      {/* Navigation Bar */}
      <Navbar
        onTriggerNo7={() => setIsNo7Open(true)}
        unlockedAchievementsCount={unlockedList.length}
      />

      {/* Section 1: Hero Section */}
      <HeroSection
        onEnterJourney={handleEnterJourney}
        onTriggerNo7={() => setIsNo7Open(true)}
      />

      {/* Section 2: Career Journey */}
      <CareerTimelineSection />

      {/* Trivia Checkpoint 1 (Debut / Roots) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[0]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(1)}
      />

      {/* Section 3: The Batsman */}
      <TheBatsmanSection />

      {/* Trivia Checkpoint 2 (183* Breakthrough) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[1]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(2)}
      />

      {/* Section 4: The Keeper */}
      <TheKeeperSection />

      {/* Trivia Checkpoint 3 (0.08s Stumping & 2016 Sprint) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[2]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(3)}
      />

      {/* Section 5: The Captain */}
      <TheCaptainSection />

      {/* Trivia Checkpoint 4 (2007 T20 World Cup Final) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[3]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(4)}
      />

      {/* Section 6: The Finisher */}
      <TheFinisherSection />

      {/* Trivia Checkpoint 5 (2011 Final Promotion 91*) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[4]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(5)}
      />

      {/* Section 7: Trophy Cabinet */}
      <TrophyCabinetSection />

      {/* Trivia Checkpoint 6 (2013 Champions Trophy Trifecta) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[5]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(6)}
      />

      {/* Section 8: Iconic Moments */}
      <IconicMomentsSection />

      {/* Trivia Checkpoint 7 (2023 IPL Final 3:00 AM Thriller) */}
      <TriviaCheckpoint
        question={TRIVIA_QUESTIONS[6]}
        onAnswerCorrect={handleTriviaCorrect}
        isAnsweredCorrect={answeredTriviaIds.includes(7)}
      />

      {/* Section 9: India × CSK Dual Universe */}
      <IndiaCsSection />

      {/* Section 10: Global Venues Heatmap */}
      <HeatmapVenuesSection />

      {/* Section 11: Dhoni vs Era Neutral Comparison */}
      <DhoniVsEraSection />

      {/* Section 12: Mahi Tactical Lab */}
      <MahiLabSection />

      {/* Section 13: Gamification & Badges Showcase */}
      <GamificationSection
        unlockedList={unlockedList}
        onResetProgress={handleResetProgress}
      />

      {/* Section 14: Ask Mahi AI Natural Language Query */}
      <AskMahiSection />

      {/* Section 15: Personal Tribute */}
      <PersonalTributeSection />

      {/* Section 16: The Legacy & Career Summary */}
      <TheLegacySection />

      {/* Section 17: Data Engineering Architecture & Automated Pipeline Audit (Placed right before Footer) */}
      <DataTransparencySection />

      {/* Footer */}
      <Footer onTriggerNo7={() => setIsNo7Open(true)} />

      {/* Easter Egg 1: Number 7 Experience Modal */}
      <Number7Modal
        isOpen={isNo7Open}
        onClose={() => setIsNo7Open(false)}
        onTriggerHelicopter={handleHelicopterShot}
      />

      {/* Easter Egg 2: Helicopter Shot Fireworks Canvas */}
      <HelicopterAnimation
        isActive={isHelicopterActive}
        onComplete={() => setIsHelicopterActive(false)}
      />
    </main>
  );
}
