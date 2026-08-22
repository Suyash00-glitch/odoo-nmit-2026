import React, { useState } from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Building } from "lucide-react";
import toast from "react-hot-toast";

export default function LeadGenSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success("Thank you! Our workforce specialist will reach out within 2 hours.");
  };

  return (
    <section id="analytics" className="py-24 px-6 bg-[#F7F7F5] text-neutral-900 border-t border-gray-200/80">
      <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-gray-200/90 shadow-md text-center space-y-8 relative overflow-hidden">
        
        <div className="space-y-3 max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
            <span>Launch Your Workspace in Minutes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
            Transform how your company works.
          </h2>

          <p className="text-gray-500 text-sm">
            Instant deployment with automated seed data, multi-role access control, and real-time database synchronisation.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-neutral-950">Workspace Request Received</h3>
            <p className="text-xs text-gray-600">
              We've sent an access token and setup guide to <span className="text-emerald-700 font-mono font-semibold">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 relative z-10">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter work email (e.g. you@company.com)"
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder-gray-400 focus:outline-none focus:border-neutral-900 shadow-2xs"
              />
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors shadow-xs whitespace-nowrap active:scale-95"
              >
                Request Enterprise Demo
              </button>
            </div>
            <p className="text-[11px] text-gray-400 text-center">
              Instant demo accounts pre-loaded: <span className="font-mono text-gray-600 font-medium">admin@dayflow.dev</span> / <span className="font-mono text-gray-600 font-medium">password123</span>
            </p>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-gray-500 border-t border-gray-100 relative z-10 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-neutral-900" /> PostgreSQL & Neon Database
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> JWT Token Session Refresh
          </span>
          <span className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-neutral-900" /> Multi-Tenant Role Isolation
          </span>
        </div>
      </div>
    </section>
  );
}
