import React, { useState } from "react";
import { Sparkles, CheckCircle2, UserCheck, Clock, Calendar, DollarSign } from "lucide-react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      title: "Automated Login ID & Role Assignment",
      desc: "New employees are instantly provisioned with a deterministic, zero-collision Login ID (e.g. OIJODO20260001) upon registration.",
      icon: UserCheck,
    },
    {
      step: "02",
      title: "1-Click Attendance & Real-Time Presence",
      desc: "Employees clock in with 1 tap. Active hours, overtime, and floor presence are calculated live and streamed to the dashboard.",
      icon: Clock,
    },
    {
      step: "03",
      title: "Instant Leave Governance & Quota Balances",
      desc: "Apply for Paid, Sick, or Unpaid leaves with remaining balances updated in real-time. Admins approve/reject in 1 click.",
      icon: Calendar,
    },
    {
      step: "04",
      title: "Transparent Salary Breakdown & Deductions",
      desc: "Clear itemization of Base Salary, HRA allowances, Provident Fund, and Tax deductions visible to employees.",
      icon: DollarSign,
    },
  ];

  return (
    <section id="how-it-works" className="py-28 px-6 bg-[#F8F9FD] text-neutral-900">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-sm font-extrabold uppercase tracking-wider">
            <Sparkles size={15} />
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 tracking-tight leading-tight">
            How Our HR Software Works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            4 simple automated steps from employee onboarding to monthly executive reporting.
          </p>
        </div>

        {/* 2-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 3D Stacked Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-8">
            <div className="absolute w-80 h-48 rounded-3xl bg-purple-200/60 -rotate-6 transform translate-x-4 translate-y-4 shadow-md" />
            <div className="absolute w-88 h-56 rounded-3xl bg-purple-300/50 rotate-3 transform -translate-x-2 -translate-y-2 shadow-lg" />
            
            <div className="relative w-full max-w-lg p-8 rounded-3xl bg-white border border-gray-200/90 shadow-2xl space-y-5 z-10">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
                <span className="text-sm font-extrabold text-neutral-950">Step Execution</span>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-[#6B42EF] text-xs font-black font-mono">
                  {steps[activeStep].step} OF 04
                </span>
              </div>
              <h4 className="text-xl font-bold text-neutral-950">{steps[activeStep].title}</h4>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">{steps[activeStep].desc}</p>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  Fully automated with zero manual spreadsheet entries
                </span>
              </div>
            </div>
          </div>

          {/* Right: 4 Step Pills */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#6B42EF] to-[#7D56F5] text-white shadow-xl shadow-purple-600/20 scale-[1.01]"
                      : "bg-white border border-gray-200/80 hover:border-gray-300 text-neutral-900 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm ${
                        isSelected ? "bg-white/20 text-white" : "bg-purple-100 text-[#6B42EF]"
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className={`text-sm sm:text-base font-extrabold ${isSelected ? "text-white" : "text-neutral-950"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs sm:text-sm font-medium line-clamp-1 mt-0.5 ${isSelected ? "text-white/90" : "text-gray-500"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#D4FF00] text-black" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <CheckCircle2 size={16} className={isSelected ? "text-black stroke-[3]" : "text-gray-400"} />
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
