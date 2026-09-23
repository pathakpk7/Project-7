"use client";

import React, { useEffect, useState } from "react";

export const CinematicCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursor === "interactive"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ${
          isHovered
            ? "w-10 h-10 bg-csk-gold/20 border border-csk-yellow/60 scale-125 backdrop-blur-[1px]"
            : "w-4 h-4 bg-sky-400/20 border border-sky-300/40"
        }`}
      />
    </div>
  );
};
