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
import { CareerMatrixSection } from "@/components/sections/CareerMatrixSection";
import { DhoniVsEraSection } from "@/components/sections/DhoniVsEraSection";
import { PersonalTributeSection } from "@/components/sections/PersonalTributeSection";
import { TheLegacySection } from "@/components/sections/TheLegacySection";

import { TriviaCheckpoint, TriviaQuestion } from "@/components/interactive/TriviaCheckpoint";
import { Number7Modal } from "@/components/easter-eggs/Number7Modal";
import { MahiFanBadgeModal } from "@/components/easter-eggs/MahiFanBadgeModal";
import { CinematicHelicopterModal } from "@/components/easter-eggs/CinematicHelicopterModal";
import { StoryActOpener } from "@/components/story/StoryActOpener";
import { StoryBridge } from "@/components/story/StoryBridge";
import { StoryChapterSidebar } from "@/components/story/StoryChapterSidebar";
import { STORY_ACTS } from "@/config/storySpine";
import { useActiveStoryChapter } from "@/hooks/useActiveStoryChapter";
import triviaBankData from "@/data/trivia_bank.json";

// Default initial question set for SSR hydration
const INITIAL_QUESTIONS: TriviaQuestion[] = triviaBankData.map((levelGroup) => {
  const q = levelGroup.questions[0];
  return {
    id: q.id,
    level: `Level ${levelGroup.level} / 7`,
    difficulty: q.difficulty as "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "LEGENDARY",
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation
  };
});

export default function Home() {
  const [isNo7Open, setIsNo7Open] = useState(false);
  const [isBadgeOpen, setIsBadgeOpen] = useState(false);
  const [isCinematicModalOpen, setIsCinematicModalOpen] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>(INITIAL_QUESTIONS);
  const [answeredLevels, setAnsweredLevels] = useState<number[]>([]);
  const [unlockedList, setUnlockedList] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeId, chapter, scrolled } = useActiveStoryChapter();

  // On client mount, randomly sample 1 question per level from the 42+ question bank
  useEffect(() => {
    try {
      localStorage.removeItem("captain_cool_badges");
      localStorage.removeItem("captain_cool_trivia");
    } catch {}

    if (triviaBankData && triviaBankData.length > 0) {
      const sampled = triviaBankData.map((levelGroup) => {
        const randomIndex = Math.floor(Math.random() * levelGroup.questions.length);
        const q = levelGroup.questions[randomIndex];
        return {
          id: q.id,
          level: `Level ${levelGroup.level} / 7`,
          difficulty: q.difficulty as "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "LEGENDARY",
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        };
      });
      setActiveQuestions(sampled);
    }
  }, []);

  const handleEnterJourney = () => {
    if (!unlockedList.includes("timeline")) {
      setUnlockedList((prev) => [...prev, "timeline"]);
    }
  };

  const handleHelicopterShot = () => {
    setIsCinematicModalOpen(true);
  };

  const handleTriviaCorrect = (questionId: number) => {
    const levelNumber = Math.floor(questionId / 100);

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#FDB913", "#0081E9", "#FFFFFF"]
      });
    } catch {}

    setAnsweredLevels((prev) => {
      if (prev.includes(levelNumber)) return prev;
      const updated = [...prev, levelNumber];
      
      // If all 7 are answered, trigger full 7-level mastery celebration & badge modal!
      if (updated.length === 7) {
        try {
          confetti({
            particleCount: 160,
            spread: 110,
            origin: { y: 0.6 },
            colors: ["#FDB913", "#FFD700", "#0081E9", "#FFFFFF"]
          });
        } catch {}
        setTimeout(() => {
          setIsBadgeOpen(true);
        }, 600);
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    if (confirm("Reset all exploration badges and trivia answers?")) {
      const resetBadges: string[] = [];
      setUnlockedList(resetBadges);
      setAnsweredLevels([]);
      try {
        localStorage.removeItem("captain_cool_badges");
        localStorage.removeItem("captain_cool_trivia");
      } catch {}
    }
  };

  return (
    <main className="min-h-screen bg-surface-dark text-slate-100 selection:bg-csk-gold selection:text-black relative overflow-x-hidden">
      <CinematicBackground />

      <StoryChapterSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        activeId={activeId}
      />

      <Navbar
        onTriggerNo7={() => setIsNo7Open(true)}
        onTrigger3DHelicopter={() => setIsCinematicModalOpen(true)}
        onTriggerBadge={() => setIsBadgeOpen(true)}
        unlockedAchievementsCount={answeredLevels.length}
        activeChapter={chapter}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        scrolled={scrolled}
      />

      <HeroSection 
        onEnterJourney={handleEnterJourney} 
        onTriggerNo7={() => setIsNo7Open(true)} 
      />

      <StoryBridge label="First turn">
        The tale opens in December 2004—before the hair was cut, before the trophies filled the shelf.
      </StoryBridge>

      <StoryActOpener act={STORY_ACTS[0]} />

      {activeQuestions[0] && (
        <TriviaCheckpoint
          question={activeQuestions[0]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(1)}
        />
      )}

      <CareerTimelineSection />

      {/* Trivia Checkpoint 2 (The Blade & 183* Jaipur) */}
      {activeQuestions[1] && (
        <TriviaCheckpoint
          question={activeQuestions[1]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(2)}
        />
      )}

      <StoryActOpener act={STORY_ACTS[1]} />

      <TheBatsmanSection />

      {/* Trivia Checkpoint 3 (Lightning Gloves & 0.08s Reflexes) */}
      {activeQuestions[2] && (
        <TriviaCheckpoint
          question={activeQuestions[2]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(3)}
        />
      )}

      <StoryBridge label="Behind the stumps">
        The bat speaks loudly; the gloves answer in milliseconds.
      </StoryBridge>

      <TheKeeperSection />

      {/* Trivia Checkpoint 4 (Captain Cool's Mind & 2007 T20 WC) */}
      {activeQuestions[3] && (
        <TriviaCheckpoint
          question={activeQuestions[3]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(4)}
        />
      )}

      <StoryActOpener act={STORY_ACTS[2]} />

      <TheCaptainSection />

      {/* Trivia Checkpoint 5 (The Immortal Finisher & 2011 WC Final) */}
      {activeQuestions[4] && (
        <TriviaCheckpoint
          question={activeQuestions[4]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(5)}
        />
      )}

      <TheFinisherSection />

      {/* Trivia Checkpoint 6 (White-Ball Emperor & ICC Trifecta) */}
      {activeQuestions[5] && (
        <TriviaCheckpoint
          question={activeQuestions[5]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(6)}
        />
      )}

      <StoryActOpener act={STORY_ACTS[3]} />

      <TrophyCabinetSection />

      {/* Section 8: Iconic Moments */}
      <IconicMomentsSection />

      {/* Trivia Checkpoint 7 (07 Mahi Legend & 5x IPL Titles) */}
      {activeQuestions[6] && (
        <TriviaCheckpoint
          question={activeQuestions[6]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(7)}
        />
      )}

      <StoryBridge label="Two jerseys">
        Same composure—nation on his chest, yellow in his veins.
      </StoryBridge>

      <IndiaCsSection />

      <StoryActOpener act={STORY_ACTS[4]} />

      <CareerMatrixSection />

      {/* Section 11: Dhoni vs Era Neutral Comparison */}
      <DhoniVsEraSection />

      <StoryActOpener act={STORY_ACTS[5]} />

      <PersonalTributeSection />

      <TheLegacySection />

      {/* Footer */}
      <Footer onTriggerNo7={() => setIsNo7Open(true)} />

      {/* Easter Egg 1: Number 7 Complete-Player Surprise Station Modal */}
      <Number7Modal
        isOpen={isNo7Open}
        onClose={() => setIsNo7Open(false)}
      />

      {/* 7 Stage Career Badges Progress Modal (Triggered by 0/7 on Navbar) */}
      <MahiFanBadgeModal
        isOpen={isBadgeOpen}
        onClose={() => setIsBadgeOpen(false)}
        answeredTriviaIds={answeredLevels}
        unlockedCount={answeredLevels.length}
      />

      {/* 3D Cinematic Helicopter Shot Modal with Interactive Three.js Scene */}
      <CinematicHelicopterModal
        isOpen={isCinematicModalOpen}
        onClose={() => setIsCinematicModalOpen(false)}
      />
    </main>
  );
}
