import React from "react";
import { Star } from "lucide-react";

export default function SocialProofSection() {
  const testimonials = [
    {
      quote:
        "Switching our 60+ member team to Dayflow cut our leave approval delays from 48 hours to under 2 minutes. The dynamic Login ID provisioning eliminated onboarding confusion completely.",
      name: "Siddharth Rao",
      role: "VP of People Operations",
      company: "Nexus Technologies",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "The salary structure breakdown is completely transparent. Our engineers can see their base salary, HRA, PF, and tax deductions clearly without having to message HR every month.",
      name: "Meera Nair",
      role: "HR Director",
      company: "Aura Fintech",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "As a fast-growing startup founder, the executive analytics dashboard gives me instant headcount and attendance insights on my phone without needing manual spreadsheets.",
      name: "Kabir Mehta",
      role: "Co-Founder & CEO",
      company: "Lumina Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section id="proof" className="py-24 px-6 bg-white dark:bg-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-neutral-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold uppercase tracking-wider">
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Loved by HR leaders and employees alike.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm">
            Empowering modern high-performance organizations to manage their human capital with confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-6 hover:border-slate-300 dark:hover:border-neutral-700 transition-all shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400 dark:text-yellow-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 dark:fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
                  “{item.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-neutral-900">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-neutral-700"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400">{item.role} • {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
