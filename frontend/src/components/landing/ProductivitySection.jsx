import React, { useState } from "react";
import { Clock, DollarSign, Calendar, BarChart3, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

export default function ProductivitySection() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Attendance, without the spreadsheets",
      description: "Track daily and weekly attendance with simple check-in and check-out workflows while HR gets a centralized view of employee attendance.",
      icon: Clock,
      color: "bg-[#6B42EF] text-white",
    },
    {
      title: "Leave requests that move instantly",
      description: "Employees can request paid, sick, or unpaid leave, select a date range, add remarks, and track whether their request is pending, approved, or rejected.",
      icon: Calendar,
      color: "bg-emerald-600 text-white",
    },
    {
      title: "Salary information, clearly organized",
      description: "Employees can securely view their salary information while administrators maintain salary structures and payroll accuracy.",
      icon: DollarSign,
      color: "bg-blue-600 text-white",
    },
  ];

  return (
    <section id="solution" className="py-24 px-6 bg-[#F8F9FD] text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Smart Workflows</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight">
            Simplify Tasks Boost Productivity
          </h2>
          <p className="text-gray-500 text-sm">
            Everything your HR team and employees need to operate seamlessly every day.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3 Stacked Interactive Feature Cards */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              const isActive = activeTab === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#6B42EF] text-white shadow-xl shadow-purple-600/25 scale-[1.02]"
                      : "bg-white text-neutral-900 border border-gray-200/90 hover:border-gray-300 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/20 text-white" : "bg-purple-100 text-[#6B42EF]"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <h3 className={`text-sm font-bold ${isActive ? "text-white" : "text-neutral-900"}`}>
                        {f.title}
                      </h3>
                      <p className={`text-xs leading-relaxed ${isActive ? "text-white/85" : "text-gray-500"}`}>
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Floating UI Analytics Dashboard (Matching Screenshot) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xl space-y-6 relative overflow-hidden">
              
              {/* Header inside right mockup */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h4 className="text-base font-bold text-neutral-900">Workforce Snapshot</h4>
                  <p className="text-xs text-gray-400">Real-time attendance &amp; leave visibility</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                  94% Attendance Rate
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-200/60">
                  <p className="text-[11px] text-gray-400 font-medium">Present Today</p>
                  <p className="text-lg font-bold text-neutral-900 font-mono">114 / 128</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-200/60">
                  <p className="text-[11px] text-gray-400 font-medium">On Leave</p>
                  <p className="text-lg font-bold text-[#6B42EF] font-mono">8 Active</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-200/60">
                  <p className="text-[11px] text-gray-400 font-medium">Pending Approvals</p>
                  <p className="text-lg font-bold text-amber-600 font-mono">6 Requests</p>
                </div>
              </div>

              {/* Bar Chart Visual (CSS Styled) */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>Weekly Attendance Trend (Mon – Fri)</span>
                  <span className="text-[#6B42EF] font-semibold">Active Cycle</span>
                </div>
                <div className="h-32 bg-gradient-to-t from-purple-50 to-transparent rounded-2xl border border-purple-100/60 flex items-end justify-between px-4 pb-2 pt-4">
                  {[
                    { day: "Mon", h: "78%" },
                    { day: "Tue", h: "94%" },
                    { day: "Wed", h: "88%" },
                    { day: "Thu", h: "96%" },
                    { day: "Fri", h: "92%" },
                    { day: "Sat", h: "35%" },
                    { day: "Sun", h: "20%" },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className={`w-5 rounded-t-md transition-all duration-500 ${
                          i === 3 ? "bg-[#6B42EF] shadow-md shadow-purple-500/30" : "bg-purple-300"
                        }`}
                        style={{ height: bar.h }}
                      />
                      <span className="text-[10px] text-gray-400 font-medium">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
