import React from "react";
import { Sparkles, Database, Slack, Cloud, Github, CreditCard, Layers, MessageSquare } from "lucide-react";

export default function IntegrationsSection() {
  const integrations = [
    { name: "PostgreSQL", icon: Database, color: "text-sky-400 bg-white/10" },
    { name: "Neon Cloud", icon: Cloud, color: "text-emerald-400 bg-white/10" },
    { name: "Slack", icon: Slack, color: "text-amber-400 bg-white/10" },
    { name: "GitHub", icon: Github, color: "text-white bg-white/10" },
    { name: "Stripe", icon: CreditCard, color: "text-indigo-400 bg-white/10" },
    { name: "AWS", icon: Layers, color: "text-orange-400 bg-white/10" },
    { name: "Teams", icon: MessageSquare, color: "text-blue-400 bg-white/10" },
  ];

  return (
    <section id="integrations" className="py-32 px-6 bg-purple-section text-white relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-sm font-extrabold uppercase tracking-wider">
            <Sparkles size={15} className="text-[#D4FF00]" />
            <span>Seamless Ecosystem</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Unlock The Power Of Your Tool With Easy Integrations
          </h2>
          <p className="text-white/90 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Connect Dayflow seamlessly with your database, messaging, payroll, and identity providers.
          </p>
        </div>

        {/* Orbit Arc Graphic */}
        <div className="relative py-14 flex items-center justify-center min-h-[340px]">
          
          <div className="relative z-20 w-24 h-24 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-2xl shadow-[#D4FF00]/40 animate-pulse-glow">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="w-3.5 h-3.5 bg-black rounded-xs rotate-45" />
              <div className="w-3.5 h-3.5 bg-black rounded-xs rotate-45" />
              <div className="w-3.5 h-3.5 bg-black rounded-xs rotate-45" />
              <div className="w-3.5 h-3.5 bg-black rounded-xs rotate-45" />
            </div>
          </div>

          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/25 pointer-events-none" />
          <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-white/30 pointer-events-none" />
          <div className="absolute w-[620px] h-[620px] rounded-full border border-white/15 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl absolute inset-0 m-auto pointer-events-none">
            {integrations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`pointer-events-auto p-4 rounded-full glass-card flex items-center justify-center shadow-xl hover:scale-110 transition-transform ${item.color}`}
                  style={{
                    transform: `translate(${Math.cos((idx * 2 * Math.PI) / 7) * 170}px, ${
                      Math.sin((idx * 2 * Math.PI) / 7) * 95
                    }px)`,
                  }}
                  title={item.name}
                >
                  <Icon size={22} className="text-neutral-950" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
