"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SceneTransitionProps {
  children: React.ReactNode;
  type?: "fade" | "slide" | "scale" | "wipe" | "matchCut";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

const transitionVariants = {
  fade: {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    enter: { x: "100%" },
    center: { x: 0 },
    exit: { x: "-100%" },
  },
  scale: {
    enter: { scale: 0.8, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  },
  wipe: {
    enter: { clipPath: "inset(0 100% 0 0)" },
    center: { clipPath: "inset(0 0% 0 0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  },
  matchCut: {
    enter: { scale: 1.1, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
};

/**
 * SceneTransition - Cinematic transition between scenes
 * Supports multiple transition types for visual continuity
 */
export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  type = "fade",
  direction = "up",
  duration = 0.8,
  className,
}) => {
  const variants = transitionVariants[type];

  const getDirectionVariants = () => {
    if (type !== "slide") return variants;
    
    const directionMap = {
      up: { enter: { y: "100%" }, center: { y: 0 }, exit: { y: "-100%" } },
      down: { enter: { y: "-100%" }, center: { y: 0 }, exit: { y: "100%" } },
      left: { enter: { x: "100%" }, center: { x: 0 }, exit: { x: "-100%" } },
      right: { enter: { x: "-100%" }, center: { x: 0 }, exit: { x: "100%" } },
    };
    
    return directionMap[direction];
  };

  const finalVariants = getDirectionVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn("absolute inset-0", className)}
        variants={finalVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * ColorTransition - Background color transition between scenes
 */
interface ColorTransitionProps {
  from: string;
  to: string;
  progress: number;
  className?: string;
}

export const ColorTransition: React.FC<ColorTransitionProps> = ({
  from,
  to,
  progress,
  className,
}) => {
  return (
    <motion.div
      className={cn("absolute inset-0", className)}
      style={{
        backgroundColor: from,
      }}
      animate={{
        backgroundColor: to,
      }}
      transition={{
        duration: 0,
      }}
    />
  );
};

/**
 * MatchCut - Visual match cut transition
 * Transforms one visual element into another with shape/color continuity
 */
interface MatchCutProps {
  fromElement: React.ReactNode;
  toElement: React.ReactNode;
  trigger: boolean;
  className?: string;
}

export const MatchCut: React.FC<MatchCutProps> = ({
  fromElement,
  toElement,
  trigger,
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      {!trigger ? (
        <motion.div
          key="from"
          className={cn("absolute inset-0", className)}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {fromElement}
        </motion.div>
      ) : (
        <motion.div
          key="to"
          className={cn("absolute inset-0", className)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {toElement}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
