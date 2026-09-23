"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { BookMarked, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TriviaQuestion {
  id: number;
  level: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "LEGENDARY";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface TriviaCheckpointProps {
  question: TriviaQuestion;
  onAnswerCorrect: (questionId: number) => void;
  isAnsweredCorrect: boolean;
}

export const TriviaCheckpoint: React.FC<TriviaCheckpointProps> = ({
  question,
  onAnswerCorrect,
  isAnsweredCorrect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(isAnsweredCorrect);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSelect = (opt: string) => {
    if (hasSubmitted && isAnsweredCorrect) return;
    setSelectedOption(opt);
    setIsError(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setIsError(false);
      onAnswerCorrect(question.id);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#FFDF00", "#0077B6", "#FFFFFF"],
      });
    } else {
      setIsError(true);
    }
  };

  const difficultyColors = {
    EASY: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    MEDIUM: "border-sky-500/30 text-sky-400 bg-sky-500/10",
    HARD: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    EXPERT: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    LEGENDARY: "border-csk-gold/40 text-csk-yellow bg-csk-gold/20 shadow-glow-gold",
  };

  return (
    <div className="my-10 max-w-4xl mx-auto px-4">
      <div className="rounded-2xl bg-black/40 border border-csk-gold/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden story-chapter-frame">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-csk-gold/50 to-transparent" />
        {/* Top badge */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-csk-gold/10 text-csk-yellow border border-csk-gold/30">
              <BookMarked className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-300">
              Story beat · {question.level}
            </span>
          </div>

          <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border", difficultyColors[question.difficulty])}>
            {question.difficulty}
          </span>
        </div>

        {/* Question */}
        <h4 className="text-base sm:text-lg font-story text-slate-100 mb-5 leading-relaxed">
          {question.question}
        </h4>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = hasSubmitted && opt === question.correctAnswer;
            const isWrongSelection = hasSubmitted && isSelected && opt !== question.correctAnswer;

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={hasSubmitted && isAnsweredCorrect}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between",
                  isCorrect
                    ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold"
                    : isWrongSelection
                    ? "bg-rose-950/40 border-rose-500 text-rose-300"
                    : isSelected
                    ? "bg-csk-gold/20 border-csk-gold text-csk-yellow font-bold"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10"
                )}
              >
                <span>{opt}</span>
                {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                {isWrongSelection && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Bottom actions & Explanation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
          {hasSubmitted && isAnsweredCorrect ? (
            <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Correct! {question.explanation}</span>
            </div>
          ) : isError ? (
            <div className="text-xs text-rose-400 font-mono flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>Not quite right. Try again!</span>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-mono max-w-md">
              Solve all seven beats as you scroll the story to unlock the <strong className="text-csk-yellow/90">07 Mahi Fan</strong> moment.
            </div>
          )}

          {!isAnsweredCorrect && (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-csk-gold to-csk-yellow text-black font-mono font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-glow-gold"
            >
              Lock in answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
