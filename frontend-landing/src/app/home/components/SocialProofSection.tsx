"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  firm: string;
  location: string;
  metric: string;
  metricLabel: string;
  avatar: string;
  avatarAlt: string;
  accentColor: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I hadn't touched our firm's LinkedIn in four years. Ledger took it over in January and by March 15th — the middle of tax season — I had two prospective clients reach out saying they found me through a post. That's never happened before.",
    name: "Patricia Okonkwo",
    title: "Managing Partner",
    firm: "Okonkwo & Reed CPA",
    location: "Atlanta, GA",
    metric: "2 leads",
    metricLabel: "in first tax season",
    avatar:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1e558c20a-1772174157801.png",
    avatarAlt:
      "Professional woman CPA partner, dark blazer, confident smile in office setting",
    accentColor: "border-sky/25",
  },
  {
    quote:
      "My Google Business page had 2 reviews from 2018. Ledger got us to 19 reviews and a 4.8 rating in 8 weeks. We now rank above two larger firms in local search. I couldn't have done that in a year on my own.",
    name: "James Kowalczyk",
    title: "Sole Practitioner",
    firm: "Kowalczyk Tax & Accounting",
    location: "Milwaukee, WI",
    metric: "19 reviews",
    metricLabel: "4.8★ in 8 weeks",
    avatar:
      "https://img.rocket.new/generatedImages/rocket_gen_img_10728a72a-1763293360537.png",
    avatarAlt:
      "Male accountant in his 50s with glasses, professional headshot against neutral background",
    accentColor: "border-emerald-500/25",
  },
  {
    quote:
      "As a fractional CFO, my entire pipeline is referral-based. Ledger turned my LinkedIn into a consistent proof-of-expertise machine. I've had three CFO engagements start with 'I saw your post about cash flow forecasting.'",
    name: "Sunita Mehrotra",
    title: "Fractional CFO",
    firm: "Mehrotra Financial Strategy",
    location: "Austin, TX",
    metric: "3 engagements",
    metricLabel: "sourced from LinkedIn",
    avatar:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1f953953d-1763294126115.png",
    avatarAlt:
      "South Asian woman financial professional, formal attire, warm professional smile",
    accentColor: "border-purple-500/25",
  },
];

const SocialProofSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 sky-bleed-section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`reveal-up mb-16 ${inView ? "in-view" : ""}`}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky block mb-4">
            Client Results
          </span>
          <h2
            className="font-display text-ledger-white mb-4"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            Loved by CPAs who were{" "}
            <span className="italic font-light">tired of being invisible.</span>
          </h2>
          <p className="text-ledger-white/50 text-lg max-w-xl">
            From solo practitioners to 8-partner firms — here's what happens
            when your expertise finally has a platform.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal-up glass-panel rounded-2xl p-6 flex flex-col border ${t.accentColor} ${inView ? "in-view" : ""} reveal-up-delay-${i + 1}`}
            >
              {/* Quote marks */}
              <div
                className="text-sky/30 text-5xl font-display leading-none mb-3 select-none"
                aria-hidden="true"
              >
                "
              </div>

              {/* Quote */}
              <p className="text-sm text-ledger-white/70 leading-relaxed flex-1 mb-5">
                {t.quote}
              </p>

              {/* Metric */}
              <div className="bg-sky/8 border border-sky/15 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
                <div>
                  <p className="text-xl font-bold text-sky metric-num">
                    {t.metric}
                  </p>
                  <p className="text-[10px] text-ledger-white/40 uppercase tracking-wide">
                    {t.metricLabel}
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-ledger-white/5">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={t.avatar}
                    alt={t.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ledger-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-ledger-white/40">
                    {t.title} · {t.firm}
                  </p>
                  <p className="text-[10px] text-ledger-white/25">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          className={`reveal-up mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 ${inView ? "in-view" : ""} reveal-up-delay-4`}
        >
          {[
            { label: "CPA firms served", value: "40+" },
            { label: "Avg. Google rating increase", value: "+1.3★" },
            { label: "Posts published", value: "2,800+" },
            { label: "Inbound leads generated", value: "180+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-sky metric-num">
                {stat.value}
              </p>
              <p className="text-xs text-ledger-white/40 uppercase tracking-[0.15em] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
