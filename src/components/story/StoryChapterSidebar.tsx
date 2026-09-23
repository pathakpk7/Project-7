"use client";

import React, { useEffect } from "react";
import { X, BookOpen, ChevronLeft } from "lucide-react";
import { STORY_CHAPTERS } from "@/config/storySpine";
import { cn } from "@/lib/utils";

interface StoryChapterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeId: string;
}

export const StoryChapterSidebar: React.FC<StoryChapterSidebarProps> = ({
  open,
  onOpenChange,
  activeId,
}) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close chapter menu"
          className="fixed inset-0 z-[55] bg-black/60 lg:bg-black/40"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-[60] h-full w-[min(100vw-3rem,18rem)] flex flex-col",
          "bg-[#0a0b0f] border-r border-white/10 shadow-2xl",
          "transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-4 border-b border-white/10 pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 text-csk-gold shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">Chapters</p>
              <p className="font-display text-sm text-white truncate">Captain Cool</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            aria-label="Collapse sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-3 space-y-0.5">
          {STORY_CHAPTERS.map((ch) => {
            const isActive = ch.id === activeId;
            return (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "block rounded-xl px-3 py-2.5 border transition-colors",
                  isActive
                    ? "bg-csk-gold/12 border-csk-gold/35 text-csk-yellow"
                    : "border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                )}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-slate-600 w-6 shrink-0">{ch.index}</span>
                  <span className="text-xs font-mono uppercase tracking-wide">{ch.title}</span>
                </div>
                <p className="text-[11px] font-story italic text-slate-500 mt-0.5 pl-8 line-clamp-2">{ch.tagline}</p>
              </a>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400 hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
            Collapse
          </button>
        </div>
      </aside>

      {!open && (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="fixed left-0 top-[calc(50%+2rem)] -translate-y-1/2 z-40 py-3 pl-1 pr-2 rounded-r-lg bg-black/80 border border-white/10 border-l-0 text-csk-gold hover:bg-black hover:pl-2 transition-[padding,background]"
          aria-label="Open chapter sidebar"
          title="Open chapters"
        >
          <BookOpen className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
