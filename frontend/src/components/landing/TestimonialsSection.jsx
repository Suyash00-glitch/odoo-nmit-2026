import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowUpRight, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      quote:
        "A centralized workspace for managing employees, attendance, leave requests, approvals, and payroll information.",
      name: "HR Teams",
      role: "Administration & Operations",
      company: "Workforce Governance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote:
        "Everything employees need to manage their profile, attendance, leave requests, and salary information.",
      name: "Employees",
      role: "Self-Service Access",
      company: "Daily Operations",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote:
        "Clear workforce visibility without relying on disconnected spreadsheets and manual HR processes.",
      name: "Business Leaders",
      role: "Leadership & Management",
      company: "Strategic Oversight",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section id="reviews" className="py-24 px-6 bg-[#F8F9FD] text-neutral-900 border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header with Top-Right Lime Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[#6B42EF] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Built For Every Role</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight">
              Value for your entire organization
            </h2>
          </div>

          <Link
            to="/signup"
            className="btn-lime px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lime self-start md:self-auto"
          >
            <span>Start Free</span>
            <ArrowUpRight size={14} className="text-black stroke-[2.5]" />
          </Link>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                  “{r.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{r.name}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">{r.role} • {r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
