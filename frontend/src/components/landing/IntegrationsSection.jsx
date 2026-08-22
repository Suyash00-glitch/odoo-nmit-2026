import React from "react";
import { Sparkles, Users, Clock, Calendar, DollarSign, CheckCircle2, BarChart3, Bell } from "lucide-react";

export default function IntegrationsSection() {
  const modules = [
    { name: "Employees", icon: Users, color: "text-sky-400 bg-white/10" },
    { name: "Attendance", icon: Clock, color: "text-emerald-400 bg-white/10" },
    { name: "Leave", icon: Calendar, color: "text-amber-400 bg-white/10" },
    { name: "Payroll", icon: DollarSign, color: "text-white bg-white/10" },
    { name: "Approvals", icon: CheckCircle2, color: "text-indigo-400 bg-white/10" },
    { name: "Analytics", icon: BarChart3, color: "text-orange-400 bg-white/10" },
    { name: "Notifications", icon: Bell, color: "text-blue-400 bg-white/10" },
  ];

  return (
    <section id="integrations" className="py-28 px-6 bg-purple-section text-white relative overflow-hidden">
      
      {/* Cloud & Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-14">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#D4FF00]" />
            <span>Connected Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything HR needs. Connected in one workspace.
          </h2>
          <p className="text-white/80 text-sm">
            From employee records to attendance, leave, approvals, and payroll visibility, Dayflow keeps your workforce operations connected.
          </p>
        </div>

        {/* Orbit Arc Graphic matching Screenshot */}
        <div className="relative py-12 flex items-center justify-center min-h-[320px]">
          
          {/* Central Dayflow Core Logo */}
          <div className="relative z-20 w-20 h-20 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-2xl shadow-[#D4FF00]/40 animate-pulse-glow">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-3 h-3 bg-black rounded-xs rotate-45" />
              <div className="w-3 h-3 bg-black rounded-xs rotate-45" />
              <div className="w-3 h-3 bg-black rounded-xs rotate-45" />
              <div className="w-3 h-3 bg-black rounded-xs rotate-45" />
            </div>
          </div>

          {/* Concentric Orbit Rings */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/20 pointer-events-none" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/25 pointer-events-none" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-white/10 pointer-events-none" />

          {/* Orbiting Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl absolute inset-0 m-auto pointer-events-none">
            {modules.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`pointer-events-auto p-3 rounded-full glass-card flex items-center justify-center shadow-xl hover:scale-110 transition-transform ${item.color}`}
                  style={{
                    transform: `translate(${Math.cos((idx * 2 * Math.PI) / 7) * 160}px, ${
                      Math.sin((idx * 2 * Math.PI) / 7) * 90
                    }px)`,
                  }}
                  title={item.name}
                >
                  <Icon size={20} className="text-neutral-900" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
