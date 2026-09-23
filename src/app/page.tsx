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

// V2 Global Cinematic Infrastructure
import { SmoothScrollProvider } from "@/components/cinematic/SmoothScrollProvider";
import { CinemaModeProvider, useCinemaMode } from "@/components/cinematic/CinemaModeProvider";
import { CinematicCursor } from "@/components/cinematic/CinematicCursor";
import { AskMahiModal } from "@/components/cinematic/AskMahiModal";
import { MatchCutTransition } from "@/components/cinematic/MatchCutTransition";
import { useStadiumAudio } from "@/components/cinematic/useStadiumAudio";

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

function MainAppContent() {
  const [isNo7Open, setIsNo7Open] = useState(false);
  const [isBadgeOpen, setIsBadgeOpen] = useState(false);
  const [isCinematicModalOpen, setIsCinematicModalOpen] = useState(false);
  const [isAskMahiOpen, setIsAskMahiOpen] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>(INITIAL_QUESTIONS);
  const [answeredLevels, setAnsweredLevels] = useState<number[]>([]);
  const [unlockedList, setUnlockedList] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeId, chapter, scrolled } = useActiveStoryChapter();
  const { isCinemaMode } = useCinemaMode();
  const { playImpactSound } = useStadiumAudio();

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
    playImpactSound(280);
    if (!unlockedList.includes("timeline")) {
      setUnlockedList((prev) => [...prev, "timeline"]);
    }
  };

  const handleTriviaCorrect = (questionId: number) => {
    const levelNumber = Math.floor(questionId / 100);
    playImpactSound(360);

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

  return (
    <main className="min-h-screen bg-surface-dark text-slate-100 selection:bg-csk-gold selection:text-black relative overflow-x-hidden">
      <CinematicBackground />
      <CinematicCursor />

      <StoryChapterSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        activeId={activeId}
      />

      <Navbar
        onTriggerNo7={() => setIsNo7Open(true)}
        onTrigger3DHelicopter={() => setIsCinematicModalOpen(true)}
        onTriggerBadge={() => setIsBadgeOpen(true)}
        onOpenAskMahi={() => setIsAskMahiOpen(true)}
        unlockedAchievementsCount={answeredLevels.length}
        activeChapter={chapter}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        scrolled={scrolled}
      />

      {/* Hero / Prologue Section */}
      <HeroSection 
        onEnterJourney={handleEnterJourney} 
        onTriggerNo7={() => setIsNo7Open(true)}
        onOpenAskMahi={() => setIsAskMahiOpen(true)}
      />

      <StoryBridge label="First turn">
        The tale opens in December 2004—before the hair was cut, before the trophies filled the shelf.
      </StoryBridge>

      <StoryActOpener act={STORY_ACTS[0]} />

      {/* Trivia Checkpoint 1 (Debut & Roots) */}
      {activeQuestions[0] && (
        <TriviaCheckpoint
          question={activeQuestions[0]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(1)}
        />
      )}

      {/* Chapter 1: The Timeline */}
      <CareerTimelineSection />

      {/* Match Cut: Archival Roots to The Blade */}
      <MatchCutTransition
        fromTheme="dark"
        toTheme="navy"
        metaphor="Kharagpur Rail Pitch → Sawai Mansingh Stadium"
        subtext="183* off 145 balls in Jaipur. The blade redefined wicketkeeper batting in world cricket."
      />

      {/* Trivia Checkpoint 2 (The Blade & 183* Jaipur) */}
      {activeQuestions[1] && (
        <TriviaCheckpoint
          question={activeQuestions[1]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(2)}
        />
      )}

      <StoryActOpener act={STORY_ACTS[1]} />

      {/* Chapter 2: The Batsman & Position Deconstruction */}
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

      {/* Chapter 3: The Gloves & Wicketkeeping */}
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

      {/* Chapter 4: The Captain & Tactical Masterclass */}
      <TheCaptainSection />

      {/* Trivia Checkpoint 5 (The Immortal Finisher & 2011 WC Final) */}
      {activeQuestions[4] && (
        <TriviaCheckpoint
          question={activeQuestions[4]}
          onAnswerCorrect={handleTriviaCorrect}
          isAnsweredCorrect={answeredLevels.includes(5)}
        />
      )}

      {/* Chapter 5: The Finisher & Death Overs Engine */}
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

      {/* Chapter 6: The Trophy Cabinet & Silverware Vault */}
      <TrophyCabinetSection />

      {/* Chapter 7: Iconic Moments Reel */}
      <IconicMomentsSection />

      {/* Match Cut: Blue Nation to Yellow Dynasty */}
      <MatchCutTransition
        fromTheme="navy"
        toTheme="gold"
        metaphor="Tricolour No. 7 → Canary Yellow Kingdom"
        subtext="One heartbeat, two immortal jerseys. The calm never wavers."
      />

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

      {/* Chapter 8: India vs CSK Identity Comparison */}
      <IndiaCsSection />

      <StoryActOpener act={STORY_ACTS[4]} />

      {/* Chapter 9: The Archive & Multi-Dimensional Matrix */}
      <CareerMatrixSection />

      {/* Chapter 10: Dhoni vs Era Neutral Matrix */}
      <DhoniVsEraSection />

      <StoryActOpener act={STORY_ACTS[5]} />

      {/* Chapter 11: Personal Fan Tribute */}
      <PersonalTributeSection />

      {/* Epilogue: The Legacy & Final Number 7 Manifesto */}
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

      {/* 3D Cinematic Helicopter Shot Modal with Native Video & Biomechanics */}
      <CinematicHelicopterModal
        isOpen={isCinematicModalOpen}
        onClose={() => setIsCinematicModalOpen(false)}
      />

      {/* Ask Mahi Data-Grounded Query Modal */}
      <AskMahiModal
        isOpen={isAskMahiOpen}
        onClose={() => setIsAskMahiOpen(false)}
      />
    </main>
  );
}

export default function Home() {
  return (
    <CinemaModeProvider>
      <SmoothScrollProvider>
        <MainAppContent />
      </SmoothScrollProvider>
    </CinemaModeProvider>
  );
}
