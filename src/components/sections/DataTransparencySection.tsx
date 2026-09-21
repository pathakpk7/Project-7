"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import validationData from "@/data/validation_report.json";
import { Database, FileText, CheckCircle2, AlertTriangle, XCircle, ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const DataTransparencySection: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PASS" | "WARNING" | "FAIL">("ALL");

  const passes = validationData.filter((v) => v.status === "PASS").length;
  const warnings = validationData.filter((v) => v.status === "WARNING").length;
  const fails = validationData.filter((v) => v.status === "FAIL").length;

  const filteredValidation = validationData.filter((v) => {
    if (filterStatus === "ALL") return true;
    return v.status === filterStatus;
  });

  return (
    <section id="data-sources" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeader
        badge="TRANSPARENCY & METHODOLOGY"
        title="DATA ENGINEERING & AUDIT REPORT"
        subtitle="Full statistical verification, pipeline architecture, reproducible scripts, and open Cricsheet attribution."
        accentColor="silver"
      />

      {/* Audit Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 font-mono">
        <div className="p-4 rounded-2xl bg-surface/80 border border-white/10">
          <div className="text-xs text-slate-400 uppercase">Total Validation Checks</div>
          <div className="text-3xl font-extrabold text-white mt-1">{validationData.length}</div>
          <div className="text-[10px] text-slate-500 mt-1">Cross-checked against ICC/Cricinfo</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
          <div className="text-xs text-emerald-400 uppercase">Passed Verifications</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{passes}</div>
          <div className="text-[10px] text-slate-400 mt-1">Exact & tight margin matches</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
          <div className="text-xs text-amber-400 uppercase">Documented Variances</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{warnings}</div>
          <div className="text-[10px] text-slate-400 mt-1">Cricsheet historical coverage</div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-raised border border-white/10 flex flex-col justify-between">
          <div className="text-xs text-slate-400 uppercase">Primary Source</div>
          <a
            href="https://cricsheet.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-csk-yellow font-bold hover:underline"
          >
            <span>Cricsheet Open Data</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="text-[10px] text-slate-500">License: CC BY 4.0 / ODbL</div>
        </div>
      </div>

      {/* Validation Table */}
      <div className="rounded-3xl bg-surface/80 border border-white/10 p-6 backdrop-blur-md mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
            AUTOMATED PIPELINE AUDIT REPORT (data/validation/validation_report.csv)
          </h4>

          {/* Filter Status Buttons */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            {(["ALL", "PASS", "WARNING", "FAIL"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={cn(
                  "px-3 py-1 rounded-lg transition-all",
                  filterStatus === st ? "bg-white/20 text-white font-bold" : "bg-white/5 text-slate-400 hover:text-white"
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase">
                <th className="py-2.5 px-3">Metric</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3">Our Value</th>
                <th className="py-2.5 px-3">Official Ref</th>
                <th className="py-2.5 px-3">Difference</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Audit Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredValidation.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-white font-semibold">{row.metric}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.format}</td>
                  <td className="py-2.5 px-3 text-csk-yellow font-bold">{row.our_value}</td>
                  <td className="py-2.5 px-3 text-slate-300">{row.reference_value}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.difference}</td>
                  <td className="py-2.5 px-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      row.status === "PASS" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                      row.status === "WARNING" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                      "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px] font-sans max-w-xs truncate" title={row.notes}>
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
