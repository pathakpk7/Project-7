"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  isInView?: boolean;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * RevealText - Cinematic text reveal animation
 * Supports multiple directions with clip-path style reveals
 */
export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
  isInView = true,
}) => {
  const variant = variants[direction];

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * LineReveal - Text reveals line by line
 */
interface LineRevealProps {
  lines: string[];
  className?: string;
  stagger?: number;
  isInView?: boolean;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  lines,
  className,
  stagger = 0.1,
  isInView = true,
}) => {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <RevealText
          key={index}
          direction="up"
          delay={index * stagger}
          isInView={isInView}
          className="block"
        >
          {line}
        </RevealText>
      ))}
    </div>
  );
};

/**
 * ClipReveal - Text reveals with clip-path mask
 */
export const ClipReveal: React.FC<RevealTextProps> = ({
  children,
  className,
  delay = 0,
  duration = 1,
  isInView = true,
}) => {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: duration * 0.8, delay: delay + 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
