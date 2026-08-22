import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Building, Mail, User } from "lucide-react";
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
    <section id="analytics" className="py-24 px-6 bg-black text-white border-t border-neutral-900">
      <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-950 to-[#0c0f18] border border-neutral-800 shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Your Workspace in Minutes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Transform how your company works.
          </h2>

          <p className="text-neutral-400 text-sm">
            Instant deployment with automated seed data, multi-role access control, and real-time database synchronisation.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 max-w-md mx-auto text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Workspace Request Received</h3>
            <p className="text-xs text-neutral-300">
              We've sent an access token and setup guide to <span className="text-emerald-400 font-mono">{email}</span>.
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
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-lg whitespace-nowrap"
              >
                Request Enterprise Demo
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 text-center">
              Instant demo accounts pre-loaded: <span className="font-mono text-neutral-400">admin@dayflow.dev</span> / <span className="font-mono text-neutral-400">password123</span>
            </p>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-neutral-400 border-t border-neutral-900 relative z-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> PostgreSQL & Neon Database
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> JWT Token Session Refresh
          </span>
          <span className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-indigo-400" /> Multi-Tenant Role Isolation
          </span>
        </div>
      </div>
    </section>
  );
}
