"use client";

import React, { useRef, useEffect, Children, cloneElement } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicSceneProps {
  children: React.ReactNode;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * CinematicScene - A wrapper component for scroll-triggered scenes
 * Uses Framer Motion's useInView for intersection detection
 * Automatically triggers animations when scene enters viewport
 */
export const CinematicScene: React.FC<CinematicSceneProps> = ({
  children,
  className,
  triggerOnce = true,
  threshold = 0.3,
  onEnter,
  onLeave,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  useEffect(() => {
    if (isInView && onEnter) {
      onEnter();
    } else if (!isInView && onLeave && !triggerOnce) {
      onLeave();
    }
  }, [isInView, onEnter, onLeave, triggerOnce]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      data-cinematic-scene={isInView ? "active" : "inactive"}
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, { isInView } as any);
        }
        return child;
      })}
    </div>
  );
};
