"use client";

import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
  direction?: "y" | "x";
  isInView?: boolean;
}

/**
 * ParallaxImage - Image with scroll-based parallax movement
 * Creates depth effect by moving image at different speed than scroll
 */
export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  intensity = 0.5,
  direction = "y",
  isInView = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [intensity * 100, -intensity * 100]);
  const x = useTransform(scrollYProgress, [0, 1], [intensity * 100, -intensity * 100]);

  const transform = direction === "y" ? { y } : { x };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={transform} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        />
      </motion.div>
    </div>
  );
};

/**
 * ParallaxLayer - Multiple parallax layers for depth
 */
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("absolute inset-0", className)}>
      {children}
    </motion.div>
  );
};
