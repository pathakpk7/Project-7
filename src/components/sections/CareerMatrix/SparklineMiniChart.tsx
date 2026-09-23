"use client";

import React from "react";
import { SparklinePoint } from "@/analytics/types";

interface SparklineMiniChartProps {
  data: SparklinePoint[];
  color?: string;
  height?: number;
  showLabels?: boolean;
}

export const SparklineMiniChart: React.FC<SparklineMiniChartProps> = ({
  data,
  color = "#F9CD05",
  height = 48,
  showLabels = true,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-12 flex items-center justify-center text-[10px] font-mono text-slate-500">
        Single Match Data
      </div>
    );
  }

  const maxRuns = Math.max(...data.map((d) => d.runs), 1);
  const minYear = data[0]?.year || 2004;
  const maxYear = data[data.length - 1]?.year || 2024;

  const width = 200;
  const paddingY = 6;
  const chartHeight = height - (showLabels ? 14 : 0);

  // Compute SVG points
  const points = data.map((d, idx) => {
    const x = data.length === 1 ? width / 2 : (idx / (data.length - 1)) * (width - 16) + 8;
    const y = chartHeight - paddingY - (d.runs / maxRuns) * (chartHeight - paddingY * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const firstPoint = points.split(" ")[0];
  const lastPoint = points.split(" ")[points.split(" ").length - 1];

  const areaPoints = `${firstPoint?.split(",")[0]},${chartHeight} ${points} ${lastPoint?.split(",")[0]},${chartHeight}`;

  return (
    <div className="w-full flex flex-col justify-end">
      <svg
        viewBox={`0 0 ${width} ${chartHeight}`}
        className="w-full overflow-visible"
        style={{ height: `${chartHeight}px` }}
      >
        <defs>
          <linearGradient id={`sparkGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradient Fill Under Curve */}
        {data.length > 1 && (
          <polygon
            points={areaPoints}
            fill={`url(#sparkGrad-${color.replace('#', '')})`}
          />
        )}

        {/* Polyline Curve */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Highlight Circles for Data Points */}
        {data.map((d, idx) => {
          const x = data.length === 1 ? width / 2 : (idx / (data.length - 1)) * (width - 16) + 8;
          const y = chartHeight - paddingY - (d.runs / maxRuns) * (chartHeight - paddingY * 2);
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="2.5"
              fill="#0F172A"
              stroke={color}
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {showLabels && (
        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-1 px-1">
          <span>{minYear}</span>
          <span className="text-[8px] text-slate-500 uppercase tracking-widest">YEARLY RUNS</span>
          <span>{maxYear}</span>
        </div>
      )}
    </div>
  );
};
