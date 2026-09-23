"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrubRenderProps = { progress: number; scrollYProgress: MotionValue<number> };

interface ScrollScrubProps {
  children: React.ReactNode | ((props: ScrubRenderProps) => React.ReactNode);
  className?: string;
  frames?: number;
  scrub?: boolean;
  onProgress?: (progress: number) => void;
}

/**
 * ScrollScrub - Scroll-scrubbed animation control
 * Maps scroll position to animation progress (0-1)
 */
export const ScrollScrub: React.FC<ScrollScrubProps> = ({
  children,
  className,
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
    <div ref={containerRef} className={cn("relative", className)}>
      {typeof children === "function"
        ? (children as (props: ScrubRenderProps) => React.ReactNode)({ progress, scrollYProgress })
        : React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            progress,
            scrollYProgress,
          })
        : children}
    </div>
  );
};

/**
 * ScrubVideo - Video playback controlled by scroll position
 */
interface ScrubVideoProps {
  src: string;
  className?: string;
  poster?: string;
  onProgress?: (progress: number) => void;
}

export const ScrubVideo: React.FC<ScrubVideoProps> = ({
  src,
  className,
  poster,
  onProgress,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration) {
        video.currentTime = latest * video.duration;
      }
      if (onProgress) onProgress(latest);
    });

    return unsubscribe;
  }, [scrollYProgress, onProgress]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        muted
        playsInline
      />
    </div>
  );
};

/**
 * ScrubFrameSequence - Frame sequence scrubbing
 * For frame-by-frame animation control
 */
interface ScrubFrameSequenceProps {
  frames: string[];
  className?: string;
  onProgress?: (progress: number) => void;
}

export const ScrubFrameSequence: React.FC<ScrubFrameSequenceProps> = ({
  frames,
  className,
  onProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.floor(latest * (frames.length - 1));
      setCurrentFrame(frameIndex);
      if (onProgress) onProgress(latest);
    });

    return unsubscribe;
  }, [scrollYProgress, frames.length, onProgress]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <img
        src={frames[currentFrame]}
        alt={`Frame ${currentFrame}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
