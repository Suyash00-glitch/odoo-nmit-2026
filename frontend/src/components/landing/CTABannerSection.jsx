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
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto p-10 sm:p-16 rounded-4xl bg-gradient-to-r from-[#6B42EF] via-[#5D33E6] to-[#7950F8] text-white text-center space-y-9 shadow-2xl shadow-purple-600/30 relative overflow-hidden">
        
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#D4FF00]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Transform The Way Your Team Works Starting Now
          </h2>
          <p className="text-white/90 text-sm sm:text-base font-semibold">
            Join thousands of modern enterprises running their HR, attendance, and payroll on Dayflow.
          </p>
        </div>

        {/* Pill Email Input + Lime Button */}
        <div className="max-w-lg mx-auto relative z-10">
          <form onSubmit={handleSubmit} className="p-2 rounded-full bg-white shadow-xl flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="flex-1 pl-6 pr-3 py-3 text-sm text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none font-bold"
            />
            <button
              type="submit"
              className="btn-lime px-7 py-3.5 rounded-full text-sm font-extrabold whitespace-nowrap flex items-center gap-2 shadow-lime"
            >
              <span>Get Started Free</span>
              <ArrowUpRight size={15} className="text-black stroke-[2.5]" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
