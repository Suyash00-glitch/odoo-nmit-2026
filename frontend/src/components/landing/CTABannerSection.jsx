import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function CTABannerSection() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${encodeURIComponent(email)}`);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto p-8 sm:p-14 rounded-4xl bg-gradient-to-r from-[#6B42EF] via-[#5D33E6] to-[#7950F8] text-white text-center space-y-8 shadow-2xl shadow-purple-600/30 relative overflow-hidden">
        
        {/* Glow backdrop circles */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#D4FF00]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-3 max-w-xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Bring your entire workforce into one flow.
          </h2>
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            Simplify employee management, attendance, leave, approvals, and payroll visibility with Dayflow.
          </p>
        </div>

        {/* Pill Email Input + Lime Button */}
        <div className="max-w-md mx-auto relative z-10 space-y-3">
          <form onSubmit={handleSubmit} className="p-1.5 rounded-full bg-white shadow-xl flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 pl-5 pr-2 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="btn-lime px-5 py-3 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-lime"
            >
              <span>Get Started</span>
              <ArrowUpRight size={13} className="text-black stroke-[2.5]" />
            </button>
          </form>
          <p className="text-xs text-white/70 font-medium">
            Start managing your workforce in one place.
          </p>
        </div>

      </div>
    </section>
  );
}
