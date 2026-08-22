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
    <section id="proof" className="py-24 px-6 bg-white text-neutral-900 border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
            Loved by HR leaders and employees alike.
          </h2>
          <p className="text-gray-500 text-sm">
            Empowering modern high-performance organizations to manage their human capital with confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F7F7F5] border border-gray-200/90 flex flex-col justify-between space-y-5 shadow-2xs hover:border-gray-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  “{item.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.name}</p>
                  <p className="text-[11px] text-gray-500">{item.role} • {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
