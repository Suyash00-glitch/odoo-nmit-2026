import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  Users,
  Building2,
  TrendingUp,
  Hash,
} from "lucide-react";

const TYPEWRITER_TEXTS = [
  "Automated Login ID Provisioning.",
  "Real-Time Attendance & Leave Governance.",
  "Transparent Compensation & Payroll Breakdown.",
  "Executive Workforce Intelligence.",
];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeCheckIn, setActiveCheckIn] = useState(false);

  useEffect(() => {
    const current = TYPEWRITER_TEXTS[textIndex];
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(current.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden bg-black text-white">
      {/* Subtle Background Radial Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-neutral-300">Intelligent Workforce Operating System</span>
          <span className="text-neutral-500">•</span>
          <span className="text-purple-400 font-semibold">PostgreSQL & Neon Cloud</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Manage your workforce with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400">
              effortless clarity.
            </span>
          </h1>

          {/* Typewriter Subheading */}
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto h-8 font-mono">
            {displayText}
            <span className="animate-pulse text-purple-400">|</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/signin"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Launch Employee Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/signup"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>Create HR Workspace</span>
          </Link>
        </div>

        {/* Key Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-left">
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
            <p className="text-2xl font-bold text-white font-mono">100%</p>
            <p className="text-xs text-neutral-400 mt-0.5">Automated Login ID Provisioning</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
            <p className="text-2xl font-bold text-emerald-400 font-mono">1-Click</p>
            <p className="text-xs text-neutral-400 mt-0.5">Live Attendance Check-In</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
            <p className="text-2xl font-bold text-indigo-400 font-mono">Real-Time</p>
            <p className="text-xs text-neutral-400 mt-0.5">Leave Approvals & Comments</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
            <p className="text-2xl font-bold text-purple-400 font-mono">Transparent</p>
            <p className="text-xs text-neutral-400 mt-0.5">Salary, Allowances & PF Deductions</p>
          </div>
        </div>

        {/* Interactive Interactive HR Visual Dashboard Card */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#0d1017] border border-neutral-800 shadow-2xl text-left space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-neutral-400 font-mono pl-2">dayflow.internal/hrms/live-control</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 8 Seeded Employees Online
                </span>
              </div>
            </div>

            {/* 3 Live Control Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Attendance Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Attendance Action
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-3">
                    Daily check-in / check-out with automatic duration calculation.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCheckIn(!activeCheckIn)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    activeCheckIn
                      ? "bg-emerald-600 text-white shadow-emerald-600/20 shadow-md"
                      : "bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeCheckIn ? "Checked In (09:00 AM)" : "Click to Check In"}</span>
                </button>
              </div>

              {/* Dynamic Login ID Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-purple-400" /> Auto-Generated ID
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      Standard
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-2">
                    Zero collision deterministic format based on company & name codes.
                  </p>
                </div>
                <div className="bg-black/60 p-2 rounded-lg border border-purple-500/20 font-mono text-xs text-center text-purple-300 font-bold tracking-wider">
                  EMP2026-IT-0042
                </div>
              </div>

              {/* Leave Balances Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Leave Balances
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      2026 Quota
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-300 pt-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Paid Leaves:</span>
                      <span className="font-mono text-emerald-400 font-semibold">14 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Sick Leaves:</span>
                      <span className="font-mono text-yellow-400 font-semibold">7 Days</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-neutral-500 text-right">
                  1-click instant approval flow
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
