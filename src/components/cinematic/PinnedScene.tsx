"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type RenderProps = { progress: number; scrollYProgress: MotionValue<number> };

interface PinnedSceneProps {
  children: React.ReactNode | ((props: RenderProps) => React.ReactNode);
  className?: string;
  height?: string | number;
  pinSpacing?: boolean;
  onProgress?: (progress: number) => void;
}

/**
 * PinnedScene - Creates a sticky/pinned scroll scene
 * The viewport stays on the scene while user scrolls through content
 * Progress (0-1) can be used to drive animations
 */
export const PinnedScene: React.FC<PinnedSceneProps> = ({
  children,
  className,
  height = "200vh",
  pinSpacing = true,
  onProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(latest);
      if (onProgress) onProgress(latest);
    });
    return unsubscribe;
  }, [scrollYProgress, onProgress]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          position: pinSpacing ? "sticky" : "fixed",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
        className="overflow-hidden"
      >
        {typeof children === "function"
          ? (children as (props: RenderProps) => React.ReactNode)({ progress, scrollYProgress })
          : children}
      </motion.div>
    </div>
  );
};

/**
 * Hook to access scroll progress in child components
 */
export const usePinnedProgress = (containerRef: React.RefObject<HTMLDivElement>) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return scrollYProgress;
};
