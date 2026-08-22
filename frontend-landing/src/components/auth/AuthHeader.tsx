"use client";

import React from "react";
import Link from "next/link";

interface AuthHeaderProps {
  showBackHome?: boolean;
}

export default function AuthHeader({ showBackHome = true }: AuthHeaderProps) {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-purple-500/10 bg-[#07090e]/80 backdrop-blur-xl sticky top-0 z-50">
      {/* Brand Logo & Tagline */}
      <Link href="/home" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
          <div className="w-full h-full bg-[#0d111d] rounded-[11px] flex items-center justify-center">
            {/* Custom SVG Modern HR Sparkle Logo */}
            <svg
              className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white tracking-tight font-sans">
              Dayflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">HRMS</span>
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full purple-glow-badge">
              Enterprise
            </span>
          </div>
          <p className="text-[11px] text-gray-400 font-medium">
            Human Resource Management System
          </p>
        </div>
      </Link>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>System Status: Online (v2.4)</span>
        </div>

        {showBackHome && (
          <Link
            href="/home"
            className="text-xs font-medium text-gray-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Landing
          </Link>
        )}
      </div>
    </header>
  );
}
