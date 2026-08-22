"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";

const BeforeAfterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const platforms = [
    {
      name: "LinkedIn",
      beforeMetric: "12 profile views/mo",
      afterMetric: "340 profile views/mo",
      growth: "+2,733%",
      pct: 0.88,
      color: "bg-sky",
    },
    {
      name: "Google Business",
      beforeMetric: "2 reviews, 3.5★",
      afterMetric: "24 reviews, 4.8★",
      growth: "+1,200%",
      pct: 0.75,
      color: "bg-emerald-400",
    },
    {
      name: "Instagram",
      beforeMetric: "0 organic reach",
      afterMetric: "1,800 reach/post",
      growth: "From zero",
      pct: 0.62,
      color: "bg-purple-400",
    },
  ];

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
      style={{
        background: "linear-gradient(180deg, #141820 0%, #1a2030 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`reveal-up mb-16 ${inView ? "in-view" : ""}`}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky block mb-4">
            Real Results
          </span>
          <h2
            className="font-display text-ledger-white mb-5"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            What 90 days of{" "}
            <span className="italic font-light text-sky sky-text-glow">
              consistent presence
            </span>
            <br />
            actually looks like.
          </h2>
          <p className="text-ledger-white/50 text-lg max-w-2xl">
            These are real numbers from CPA firms that were invisible online 3
            months ago.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Analytics bars */}
          <div
            className={`reveal-up ${inView ? "in-view" : ""} reveal-up-delay-1`}
          >
            <div className="glass-panel rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-sky" />
                <span className="text-sm font-bold text-ledger-white">
                  90-Day Performance Report
                </span>
                <span className="ml-auto text-[10px] text-sky/70 bg-sky/10 px-2 py-0.5 rounded-full">
                  Avg. across clients
                </span>
              </div>

              {platforms.map((p, i) => (
                <div key={p.name} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-ledger-white">
                      {p.name}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {p.growth}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] text-ledger-white/30 w-28 flex-shrink-0">
                      Before: {p.beforeMetric}
                    </span>
                    <div className="flex-1 analytics-bar">
                      <div
                        className={`analytics-bar-fill ${p.color} ${inView ? "filled" : ""}`}
                        style={{
                          width: `${p.pct * 100}%`,
                          transitionDelay: `${0.3 + i * 0.2}s`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-ledger-white">
                      After: {p.afterMetric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Case study card */}
          <div
            className={`reveal-up ${inView ? "in-view" : ""} reveal-up-delay-2`}
          >
            <div
              className="glass-panel rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(116,185,255,0.2)" }}
            >
              <div className="h-40 overflow-hidden relative">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1ab37400b-1772174157773.png"
                  alt="Modern CPA firm office building exterior with glass facade in downtown setting"
                  className="w-full h-full object-cover opacity-50"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ledger-black/80" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky">
                    Case Study
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="font-display text-xl text-ledger-white mb-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Whitmore & Associates CPA
                </h3>
                <p className="text-xs text-ledger-white/40 mb-4">
                  Chicago, IL · 8 Partners · Tax & Advisory
                </p>

                <p className="text-sm text-ledger-white/60 leading-relaxed mb-5">
                  "We hadn't posted on LinkedIn since 2020. Within 60 days of
                  Ledger taking over, our managing partner had 3 inbound calls
                  from prospects who found us through his articles. We've since
                  onboarded 2 as clients."
                </p>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ledger-white/5">
                  {[
                    { metric: "3", label: "Inbound calls", sub: "in 60 days" },
                    { metric: "2", label: "New clients", sub: "from LinkedIn" },
                    {
                      metric: "4.9★",
                      label: "Google rating",
                      sub: "up from 3.4★",
                    },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl font-bold text-sky metric-num">
                        {s.metric}
                      </p>
                      <p className="text-[9px] font-bold text-ledger-white/60 uppercase tracking-wide leading-tight">
                        {s.label}
                      </p>
                      <p className="text-[9px] text-ledger-white/30">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
