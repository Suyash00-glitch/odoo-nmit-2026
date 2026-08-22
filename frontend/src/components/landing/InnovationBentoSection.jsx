import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Network } from "lucide-react";

export default function InnovationBentoSection() {
  return (
    <section id="features" className="py-28 px-6 bg-white text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-sm font-extrabold uppercase tracking-wider">
            <Sparkles size={15} />
            <span>Innovative Technology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-tight">
            Innovative Technology That Drives Results
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            High-performance modular architecture built for fast-scaling organizations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Donut Retention Rate (4 cols) */}
          <div className="md:col-span-4 p-7 rounded-3xl bg-[#F8F9FD] border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B42EF]">Workforce Stability</span>
              <h3 className="text-xl font-black text-neutral-950">Employee Retention & Morale</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Track engagement, satisfaction metrics, and team stability over time.
              </p>
            </div>

            {/* Donut Chart Visual */}
            <div className="p-5 rounded-2xl bg-white border border-gray-100 flex items-center justify-around shadow-2xs">
              <div className="relative w-22 h-22 rounded-full border-8 border-[#6B42EF] border-t-cyan-400 flex items-center justify-center">
                <span className="text-lg font-black text-neutral-950 font-mono">94%</span>
              </div>
              <div className="text-xs space-y-2 font-bold">
                <p className="text-neutral-950 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#6B42EF]" /> Retained (94%)
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" /> Turnover (6%)
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Centralized Node Hub (4 cols) */}
          <div className="md:col-span-4 p-7 rounded-3xl bg-[#F8F9FD] border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B42EF]">Unified Hub</span>
              <h3 className="text-xl font-black text-neutral-950">Real-Time Sync Engine</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Seamless synchronization between employees, payroll, and department leads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 flex items-center justify-center relative shadow-2xs h-36">
              <div className="w-14 h-14 rounded-2xl bg-[#6B42EF] flex items-center justify-center shadow-lg shadow-purple-600/30 z-10">
                <Network className="w-7 h-7 text-[#D4FF00]" />
              </div>
              <div className="absolute w-28 h-28 rounded-full border border-purple-200 animate-pulse" />
              <div className="absolute w-36 h-36 rounded-full border border-dashed border-purple-200" />
            </div>
          </div>

          {/* Card 4 (Right Span): Mobile App Card */}
          <div className="md:col-span-4 md:row-span-2 p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#6B42EF] to-[#582BD6] text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-2.5 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF00]">Mobile Ready</span>
              <h3 className="text-2xl font-black text-white leading-snug">Instant Mobile Access & 1-Tap Attendance</h3>
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                Allow your workforce to clock in, apply for leaves, and view payslips straight from their smartphone.
              </p>
            </div>

            {/* Smartphone UI Mockup inside card */}
            <div className="relative mx-auto w-60 rounded-3xl bg-neutral-950 p-3 shadow-2xl border-4 border-white/20">
              <div className="w-full rounded-2xl bg-white text-neutral-900 p-4 space-y-3.5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-neutral-950">Dayflow Mobile</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-center">
                  <p className="text-[11px] text-gray-400 font-medium">Current Status</p>
                  <p className="text-sm font-extrabold text-[#6B42EF]">Checked In (09:14 AM)</p>
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-semibold px-1">
                  <span>Paid Leaves</span>
                  <span className="font-extrabold text-neutral-950">14 Days</span>
                </div>
              </div>
            </div>

            <Link
              to="/signup"
              className="btn-lime w-full py-3.5 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-lime relative z-10"
            >
              <span>Get Mobile App</span>
              <ArrowUpRight size={16} className="text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Card 3 (Bottom-Left): Analytics Bar Chart (8 cols) */}
          <div className="md:col-span-8 p-7 sm:p-9 rounded-3xl bg-[#F8F9FD] border border-gray-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B42EF]">Compensation Scaling</span>
              <h3 className="text-2xl font-black text-neutral-950">Automated Payroll & Tax Compliance</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Calculate base salaries, dynamic allowances, and deductions automatically with zero manual calculation errors.
              </p>
              <Link
                to="/signup"
                className="btn-lime inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold shadow-lime mt-2"
              >
                <span>Explore Platform</span>
                <ArrowUpRight size={16} className="text-black stroke-[2.5]" />
              </Link>
            </div>

            {/* Chart Visual on Right */}
            <div className="w-full sm:w-72 p-5 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-3.5">
              <div className="flex justify-between text-sm font-extrabold text-neutral-950">
                <span>Disbursed Payroll</span>
                <span className="text-emerald-600 font-mono font-bold">$184.2k</span>
              </div>
              <div className="h-24 flex items-end justify-between gap-2 pt-2">
                {[40, 65, 55, 80, 70, 95, 88].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t-sm ${
                        i === 5 ? "bg-[#D4FF00] border border-black" : "bg-[#6B42EF]"
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
