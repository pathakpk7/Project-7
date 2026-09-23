"use client";

import React from "react";
import { AggregatedStat } from "@/analytics/types";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronRight, MapPin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatrixTableProps {
  stats: AggregatedStat[];
  onSelect: (stat: AggregatedStat) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  entityTitle?: string;
}

export const MatrixTable: React.FC<MatrixTableProps> = ({
  stats,
  onSelect,
  sortField,
  sortDirection,
  onSort,
  entityTitle = "Entity / Name",
}) => {
  const columns = [
    { key: "name", label: entityTitle, align: "text-left", sortable: true },
    { key: "matches", label: "M", align: "text-right", sortable: true },
    { key: "innings", label: "Inns", align: "text-right", sortable: true },
    { key: "runs", label: "Runs", align: "text-right", sortable: true },
    { key: "highest_score", label: "HS", align: "text-right", sortable: true },
    { key: "average", label: "Avg", align: "text-right", sortable: true },
    { key: "strike_rate", label: "SR", align: "text-right", sortable: true },
    { key: "hundreds", label: "100s", align: "text-right", sortable: true },
    { key: "fifties", label: "50s", align: "text-right", sortable: true },
    { key: "sixes", label: "6s", align: "text-right", sortable: true },
    { key: "catches", label: "Ct", align: "text-right", sortable: true },
    { key: "stumpings", label: "St", align: "text-right", sortable: true },
    { key: "dismissals_wk", label: "Dis", align: "text-right", sortable: true },
  ];

  const renderSortIcon = (colKey: string) => {
    if (sortField !== colKey) {
      return <ArrowUpDown className="w-3 h-3 text-slate-600 group-hover:text-slate-400 ml-1 inline shrink-0" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3 h-3 text-csk-yellow ml-1 inline shrink-0" />
    ) : (
      <ArrowDown className="w-3 h-3 text-csk-yellow ml-1 inline shrink-0" />
    );
  };

  if (stats.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-surface/80 border border-white/10 font-mono">
        <div className="text-sm font-bold text-white uppercase">No Recorded Innings Match This Filter</div>
        <p className="text-xs text-slate-400 mt-1">Try switching format or clearing search query.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface/90 border border-white/10 shadow-xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400 select-none">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && onSort(col.key)}
                  className={cn(
                    "py-3.5 px-3 uppercase tracking-wider font-semibold whitespace-nowrap group transition-colors",
                    col.align,
                    col.sortable && "cursor-pointer hover:text-white"
                  )}
                >
                  <div className={cn("inline-flex items-center gap-0.5", col.align === "text-right" && "justify-end")}>
                    <span>{col.label}</span>
                    {col.sortable && renderSortIcon(col.key)}
                  </div>
                </th>
              ))}
              <th className="py-3.5 px-3 text-center text-slate-500 uppercase tracking-wider">Log</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {stats.map((row, idx) => (
              <tr
                key={row.id || idx}
                onClick={() => onSelect(row)}
                className="hover:bg-white/5 transition-colors cursor-pointer group"
              >
                {/* Entity Name */}
                <td className="py-3 px-3 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[10px] w-4">{idx + 1}</span>
                    <div>
                      <div className="font-bold text-white group-hover:text-csk-yellow transition-colors line-clamp-1">
                        {row.name}
                      </div>
                      {row.subtext && (
                        <div className="text-[10px] text-slate-400 line-clamp-1 font-sans">
                          {row.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Metrics */}
                <td className="py-3 px-3 text-right text-slate-300">{row.matches}</td>
                <td className="py-3 px-3 text-right text-slate-300">{row.innings}</td>
                <td className="py-3 px-3 text-right font-bold text-white">{row.runs.toLocaleString()}</td>
                <td className="py-3 px-3 text-right text-slate-200">{row.highest_score}</td>
                <td className="py-3 px-3 text-right font-bold text-csk-yellow">{row.average}</td>
                <td className="py-3 px-3 text-right text-sky-400">{row.strike_rate}</td>
                <td className="py-3 px-3 text-right text-amber-400 font-bold">{row.hundreds}</td>
                <td className="py-3 px-3 text-right text-slate-300">{row.fifties}</td>
                <td className="py-3 px-3 text-right text-csk-gold font-bold">{row.sixes}</td>
                <td className="py-3 px-3 text-right text-purple-300">{row.catches || 0}</td>
                <td className="py-3 px-3 text-right text-sky-300 font-bold">{row.stumpings || 0}</td>
                <td className="py-3 px-3 text-right text-emerald-400 font-black">
                  {(row.catches || 0) + (row.stumpings || 0)}
                </td>

                {/* Drilldown Arrow */}
                <td className="py-3 px-3 text-center">
                  <span className="inline-flex p-1 rounded-lg bg-white/5 text-slate-500 group-hover:text-csk-yellow group-hover:bg-csk-gold/20 transition-all">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
