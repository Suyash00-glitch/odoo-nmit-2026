"use client";

import React, { useState } from "react";
import { IdBreakdown } from "@/utils/idGenerator";

interface IdBreakdownTooltipProps {
  idInfo: IdBreakdown;
  interactive?: boolean;
}

export default function IdBreakdownTooltip({ idInfo, interactive = true }: IdBreakdownTooltipProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const segments = [
    {
      key: "company",
      label: "Company Code",
      value: idInfo.companyCode,
      color: "from-purple-500 to-indigo-500",
      border: "border-purple-400/40",
      desc: `${idInfo.companyCode} → ${idInfo.companyName || "Odoo India"} (Derived from Company Name)`,
    },
    {
      key: "name",
      label: "Employee Initials",
      value: idInfo.nameCode,
      color: "from-indigo-500 to-sky-500",
      border: "border-indigo-400/40",
      desc: `${idInfo.nameCode} → First 2 letters of ${idInfo.firstName || "First"} & ${idInfo.lastName || "Last"} name`,
    },
    {
      key: "year",
      label: "Year of Joining",
      value: idInfo.year,
      color: "from-cyan-500 to-emerald-500",
      border: "border-cyan-400/40",
      desc: `${idInfo.year} → Year of registration / joining`,
    },
    {
      key: "serial",
      label: "Joining Serial #",
      value: idInfo.serialNumber,
      color: "from-amber-500 to-rose-500",
      border: "border-amber-400/40",
      desc: `${idInfo.serialNumber} → Serial Number of Joining for that Year`,
    },
  ];

  return (
    <div className="w-full bg-[#0a0e1a]/90 border border-purple-500/20 rounded-xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
            System Auto-Generated Login ID
          </span>
        </div>
        <span className="text-[11px] text-gray-400">Rule: [OI][JODO][YYYY][XXXX]</span>
      </div>

      {/* Generated ID Pill */}
      <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg p-2.5 mb-3">
        <div className="flex items-center flex-wrap gap-1 font-mono text-base sm:text-lg font-bold tracking-wider">
          {segments.map((seg) => (
            <span
              key={seg.key}
              onMouseEnter={() => interactive && setActiveSegment(seg.key)}
              onMouseLeave={() => interactive && setActiveSegment(null)}
              className={`px-2 py-0.5 rounded cursor-pointer transition-all duration-200 ${
                activeSegment === seg.key
                  ? `bg-gradient-to-r ${seg.color} text-white shadow-lg scale-105 ring-2 ring-white/40`
                  : `bg-white/5 text-gray-200 hover:bg-white/10 border ${seg.border}`
              }`}
            >
              {seg.value}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(idInfo.fullId);
            }}
            title="Copy ID"
            className="p-1.5 rounded-md hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-colors text-xs flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">Copy</span>
          </button>
        </div>
      </div>

      {/* Formula Explanation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
        {segments.map((seg) => (
          <div
            key={seg.key}
            onMouseEnter={() => interactive && setActiveSegment(seg.key)}
            onMouseLeave={() => interactive && setActiveSegment(null)}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              activeSegment === seg.key
                ? "bg-purple-950/40 border-purple-400/60 shadow-md"
                : "bg-white/[0.02] border-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between text-gray-400 mb-0.5">
              <span>{seg.label}</span>
              <span className="font-mono font-bold text-white text-xs">{seg.value}</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight truncate">{seg.desc}</p>
          </div>
        ))}
      </div>

      {/* Active detailed explanation tooltip */}
      {activeSegment && (
        <div className="mt-2.5 p-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2 animate-fadeIn">
          <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{segments.find((s) => s.key === activeSegment)?.desc}</span>
        </div>
      )}
    </div>
  );
}
