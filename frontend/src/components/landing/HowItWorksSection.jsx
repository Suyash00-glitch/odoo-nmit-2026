import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, UserCheck, Clock, Calendar, DollarSign } from "lucide-react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      title: "Create your workforce",
      desc: "Add employees and establish their profiles, roles, and access.",
      icon: UserCheck,
    },
    {
      step: "02",
      title: "Track attendance",
      desc: "Employees check in and check out while HR gets a centralized view of attendance.",
      icon: Clock,
    },
    {
      step: "03",
      title: "Manage time off",
      desc: "Employees submit paid, sick, or unpaid leave requests. HR reviews, approves, or rejects them.",
      icon: Calendar,
    },
    {
      step: "04",
      title: "Keep payroll visible",
      desc: "Employees access their salary information while administrators maintain salary structures and payroll accuracy.",
      icon: DollarSign,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F8F9FD] text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight">
            How Dayflow Works
          </h2>
          <p className="text-gray-500 text-sm">
            4 simple automated steps from onboarding to active workforce management.
          </p>
        </div>

        {/* 2-Column: Left 3D Layered Cards / Right 4 Purple Step Pills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 3D Stacked Card Effect */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-8">
            {/* Layer 3 */}
            <div className="absolute w-72 h-44 rounded-3xl bg-purple-200/50 -rotate-6 transform translate-x-4 translate-y-4 shadow-md" />
            {/* Layer 2 */}
            <div className="absolute w-80 h-52 rounded-3xl bg-purple-300/40 rotate-3 transform -translate-x-2 -translate-y-2 shadow-lg" />
            {/* Layer 1 (Active Card) */}
            <div className="relative w-full max-w-md p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xl space-y-4 z-10">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-bold text-neutral-900">Step Execution</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6B42EF] text-[10px] font-extrabold font-mono">
                  {steps[activeStep].step} OF 04
                </span>
              </div>
              <h4 className="text-base font-bold text-neutral-900">{steps[activeStep].title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{steps[activeStep].desc}</p>
              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="text-[11px] font-semibold text-neutral-800">
                  Fully automated with zero manual spreadsheet clutter
                </span>
              </div>
            </div>
          </div>

          {/* Right: 4 Step Pills (Matching Screenshot with Purple Glow) */}
          <div className="lg:col-span-6 space-y-3.5">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#6B42EF] to-[#7D56F5] text-white shadow-lg shadow-purple-600/20 scale-[1.01]"
                      : "bg-white border border-gray-200/80 hover:border-gray-300 text-neutral-900 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                        isSelected ? "bg-white/20 text-white" : "bg-purple-100 text-[#6B42EF]"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold ${isSelected ? "text-white" : "text-neutral-900"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#D4FF00] text-black" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <CheckCircle2 size={14} className={isSelected ? "text-black stroke-[2.5]" : "text-gray-400"} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
