import React, { useState } from "react";
import { Clock, DollarSign, Calendar, Sparkles } from "lucide-react";

export default function ProductivitySection() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Real-Time Attendance & Duration",
      description: "Automated 1-click check-in with live floor presence sync, overtime logs, and daily hour calculations.",
      icon: Clock,
    },
    {
      title: "Automated Payroll & Salary Slips",
      description: "Transparent breakdown of Base salary, HRA, transport allowances, PF, and tax deductions.",
      icon: DollarSign,
    },
    {
      title: "1-Click Leave Governance",
      description: "Seamless Paid, Sick, and Unpaid leave workflows with instant reviewer notes and real-time quota tracking.",
      icon: Calendar,
    },
  ];

  return (
    <section id="solution" className="py-28 px-6 bg-[#F8F9FD] text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-sm font-extrabold uppercase tracking-wider">
            <Sparkles size={15} />
            <span>Smart Workflows</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-tight">
            Simplify Tasks Boost Productivity
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Everything your HR, managers, and employee teams need to operate at peak efficiency.
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
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#6B42EF] text-white shadow-xl shadow-purple-600/25 scale-[1.02]"
                      : "bg-white text-neutral-900 border border-gray-200/90 hover:border-gray-300 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/20 text-white" : "bg-purple-100 text-[#6B42EF]"
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className={`text-base font-bold ${isActive ? "text-white" : "text-neutral-950"}`}>
                        {f.title}
                      </h3>
                      <p className={`text-sm leading-relaxed font-medium ${isActive ? "text-white/90" : "text-gray-500"}`}>
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Floating UI Analytics Dashboard */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xl space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h4 className="text-lg font-bold text-neutral-950">Workforce Analytics & Performance</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">Real-time attendance & output statistics</p>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                  +24% Productivity
                </div>
              </div>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200/60">
                  <p className="text-xs text-gray-400 font-semibold">On-Floor Present</p>
                  <p className="text-xl font-black text-neutral-950 font-mono mt-0.5">96.4%</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200/60">
                  <p className="text-xs text-gray-400 font-semibold">Avg Hours</p>
                  <p className="text-xl font-black text-[#6B42EF] font-mono mt-0.5">8.4h</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200/60">
                  <p className="text-xs text-gray-400 font-semibold">Leaves Done</p>
                  <p className="text-xl font-black text-emerald-600 font-mono mt-0.5">100%</p>
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 font-bold">
                  <span>Weekly Output (Mon – Fri)</span>
                  <span className="text-[#6B42EF]">Active Cycle</span>
                </div>
                <div className="h-36 bg-gradient-to-t from-purple-50 to-transparent rounded-2xl border border-purple-100/60 flex items-end justify-between px-4 pb-2 pt-4">
                  {[
                    { day: "Mon", h: "60%" },
                    { day: "Tue", h: "85%" },
                    { day: "Wed", h: "75%" },
                    { day: "Thu", h: "95%" },
                    { day: "Fri", h: "90%" },
                    { day: "Sat", h: "45%" },
                    { day: "Sun", h: "30%" },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className={`w-6 rounded-t-md transition-all duration-500 ${
                          i === 3 ? "bg-[#6B42EF] shadow-md shadow-purple-500/30" : "bg-purple-300"
                        }`}
                        style={{ height: bar.h }}
                      />
                      <span className="text-xs font-bold text-gray-400">{bar.day}</span>
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
