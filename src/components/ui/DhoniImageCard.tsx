"use client";

import React, { useState } from "react";
import { DhoniImage } from "@/data/dhoniImages";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DhoniImageCardProps {
  image: DhoniImage;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  showOverlay?: boolean;
  priority?: boolean;
}

export const DhoniImageCard: React.FC<DhoniImageCardProps> = ({
  image,
  className,
  aspectRatio = "video",
  showOverlay = true,
}) => {
  const [src, setSrc] = useState<string>(image.url);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  const handleError = () => {
    if (!hasError && image.fallbackUrl) {
      setSrc(image.fallbackUrl);
      setHasError(true);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-surface-raised border border-white/10 shadow-2xl transition-all duration-500 hover:border-csk-gold/50 hover:shadow-glow-gold",
        aspectClasses,
        className
      )}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-surface animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-slate-600 animate-bounce" />
        </div>
      )}

      {/* Image Element */}
      <img
        src={src}
        alt={image.title}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-csk-gold/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Tags / Year Badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        {image.year && (
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-csk-yellow flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-csk-gold" />
            {image.year}
          </span>
        )}

        {image.tags && image.tags.length > 0 && (
          <div className="flex gap-1">
            {image.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-[10px] font-mono text-slate-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Overlay Text */}
      {showOverlay && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-left">
          <h4 className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-csk-yellow transition-colors line-clamp-1">
            {image.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {image.caption}
          </p>
        </div>
      )}
    </div>
  );
};
