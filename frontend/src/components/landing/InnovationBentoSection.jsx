import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Smartphone, Sparkles, PieChart, Network, BarChart2, CheckCircle2 } from "lucide-react";

export default function InnovationBentoSection() {
  return (
    <section id="features" className="py-24 px-6 bg-white text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Innovative Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight">
            Innovative Technology That Drives Results
          </h2>
          <p className="text-gray-500 text-sm">
            High-performance modular architecture built for fast-scaling organizations.
          </p>
        </div>

        {/* Bento Grid (Matching Screenshot Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Donut Retention Rate (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-[#F8F9FD] border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B42EF]">One Employee Record</span>
              <h3 className="text-lg font-bold text-neutral-900">Every employee. One source of truth.</h3>
              <p className="text-xs text-gray-500">
                Profiles, job details, salary structure, documents, and personal information organized in one place.
              </p>
            </div>

            {/* Donut Chart Visual */}
            <div className="p-4 rounded-2xl bg-white border border-gray-100 flex items-center justify-around shadow-2xs">
              <div className="relative w-20 h-20 rounded-full border-8 border-[#6B42EF] border-t-cyan-400 flex items-center justify-center">
                <span className="text-base font-extrabold text-neutral-900 font-mono">96%</span>
              </div>
              <div className="text-xs space-y-1.5 font-medium">
                <p className="text-neutral-900 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B42EF]" /> Complete Profiles (96%)
                </p>
                <p className="text-gray-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> In Review (4%)
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Centralized Node Hub (4 cols) */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-[#F8F9FD] border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B42EF]">Real-Time HR Operations</span>
              <h3 className="text-lg font-bold text-neutral-900">Know what's happening across your workforce.</h3>
              <p className="text-xs text-gray-500">
                Monitor attendance, leave requests, approvals, and employee activity from one centralized workspace.
              </p>
            </div>

            {/* Orbit Node Illustration */}
            <div className="p-5 rounded-2xl bg-white border border-gray-100 flex items-center justify-center relative shadow-2xs h-32">
              <div className="w-12 h-12 rounded-2xl bg-[#6B42EF] flex items-center justify-center shadow-lg shadow-purple-600/30 z-10">
                <Network className="w-6 h-6 text-[#D4FF00]" />
              </div>
              {/* Concentric Orbit Rings */}
              <div className="absolute w-24 h-24 rounded-full border border-purple-200 animate-pulse" />
              <div className="absolute w-32 h-32 rounded-full border border-dashed border-purple-200" />
            </div>
          </div>

          {/* Card 4 (Right Span): Hand-Held Mobile App Card (4 cols, 2 rows height) */}
          <div className="md:col-span-4 md:row-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#6B42EF] to-[#582BD6] text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4FF00]">Role-Based Access</span>
              <h3 className="text-xl font-bold text-white leading-snug">The right access for the right person.</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Employees access their own information while HR and administrators get the controls needed to manage the workforce.
              </p>
            </div>

            {/* Smartphone UI Mockup inside card */}
            <div className="relative mx-auto w-56 rounded-3xl bg-neutral-950 p-2.5 shadow-2xl border-4 border-white/20">
              <div className="w-full rounded-2xl bg-white text-neutral-900 p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-[10px] font-bold text-neutral-900">Dayflow Employee Portal</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-center">
                  <p className="text-[10px] text-gray-400">Today's Attendance</p>
                  <p className="text-xs font-bold text-[#6B42EF]">Checked In (09:02 AM)</p>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-medium px-1">
                  <span>Paid Leave Balance</span>
                  <span className="font-bold text-neutral-900">14 Days</span>
                </div>
              </div>
            </div>

            {/* Lime CTA Button on Mobile Card */}
            <Link
              to="/signup"
              className="btn-lime w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lime relative z-10"
            >
              <span>Explore Employee Portal</span>
              <ArrowUpRight size={14} className="text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Card 3 (Bottom-Left): Analytics Bar Chart with Lime Button (8 cols) */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#F8F9FD] border border-gray-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B42EF]">Payroll Visibility</span>
              <h3 className="text-xl font-bold text-neutral-950">Make salary information easier to understand.</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Employees can view their salary information while administrators manage salary structures and payroll details.
              </p>
              <Link
                to="/signup"
                className="btn-lime inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-lime mt-2"
              >
                <span>View Salary Structure</span>
                <ArrowUpRight size={14} className="text-black stroke-[2.5]" />
              </Link>
            </div>

            {/* Chart Visual on Right */}
            <div className="w-full sm:w-64 p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-3">
              <div className="flex justify-between text-xs font-bold text-neutral-900">
                <span>Payroll Processing</span>
                <span className="text-emerald-600">100% Verified</span>
              </div>
              <div className="h-20 flex items-end justify-between gap-1.5 pt-2">
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
