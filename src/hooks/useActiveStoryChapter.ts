"use client";

import { useEffect, useRef, useState } from "react";
import { STORY_CHAPTERS, type StoryChapter } from "@/config/storySpine";

export function useActiveStoryChapter() {
  const [activeId, setActiveId] = useState(STORY_CHAPTERS[0].id);
  const [scrolled, setScrolled] = useState(false);
  const activeRef = useRef(activeId);

  useEffect(() => {
    const chapterIds = STORY_CHAPTERS.map((c) => c.id);
    const marker = () => window.innerHeight * 0.35;

    const pickActive = () => {
      let current = chapterIds[0];
      for (const id of chapterIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker()) current = id;
      }
      if (current !== activeRef.current) {
        activeRef.current = current;
        setActiveId(current);
      }
      const nextScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        pickActive();
      });
    };

    pickActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const chapter: StoryChapter =
    STORY_CHAPTERS.find((c) => c.id === activeId) ?? STORY_CHAPTERS[0];

  return { activeId, chapter, scrolled };
};
