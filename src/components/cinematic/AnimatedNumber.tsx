"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isInView?: boolean;
}

/**
 * AnimatedNumber - Count-up animation for statistics
 * Smoothly interpolates from 0 to target value
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  isInView = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || !inView) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, inView, value, duration]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

/**
 * CounterWithSpring - Number counter with spring physics
 */
export const CounterWithSpring: React.FC<AnimatedNumberProps> = ({
  value,
  className,
  decimals = 0,
  prefix = "",
  suffix = "",
  isInView = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [formatted, setFormatted] = useState("0");
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 20, stiffness: 100 });
  const display = useTransform(springValue, (latest) => {
    return decimals > 0 
      ? latest.toFixed(decimals) 
      : Math.floor(latest).toLocaleString();
  });

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setFormatted(latest);
    });
    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (isInView && inView) {
      motionValue.set(value);
    }
  }, [isInView, inView, motionValue, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
