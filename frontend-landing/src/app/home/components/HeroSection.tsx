"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";

const TYPEWRITER_TEXT = "Your expertise is real. Your online presence isn't.";

const channelPanels = [
  {
    channel: "LinkedIn",
    handle: "@MercerCPAGroup",
    stat: "0 posts this quarter",
    statLabel: "Last active: Q3 2023",
    icon: (
      <svg
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-[#74B9FF]"
      >
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),

    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_184282c67-1772174157546.png",
    imageAlt:
      "Professional accountant headshot, man in navy suit with neutral expression",
    accentColor: "rgba(116, 185, 255, 0.12)",
    rotate: "-4deg",
    delay: "0s",
    floatClass: "animate-float-slow",
    badge: {
      text: "0 posts",
      color: "bg-red-500/20 text-red-300 border-red-500/30",
    },
  },
  {
    channel: "Instagram",
    handle: "@hartford_tax_advisors",
    stat: "12 stock photos",
    statLabel: "Last post: 847 days ago",
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="text-[#74B9FF]"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),

    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_13e809c13-1772174157370.png",
    imageAlt: "Generic stock photo of a calculator and spreadsheet on a desk",
    accentColor: "rgba(116, 185, 255, 0.08)",
    rotate: "2deg",
    delay: "0.15s",
    floatClass: "animate-float-mid",
    badge: {
      text: "847 days",
      color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
  },
  {
    channel: "Google Business",
    handle: "Pinnacle Financial CPA",
    stat: "2 reviews • 3.5★",
    statLabel: "No response to reviews",
    icon: (
      <svg
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-[#74B9FF]"
      >
        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
      </svg>
    ),

    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1371b5e66-1772174156975.png",
    imageAlt:
      "Empty office lobby with no signage, beige walls and a reception desk",
    accentColor: "rgba(116, 185, 255, 0.06)",
    rotate: "-1deg",
    delay: "0.3s",
    floatClass: "animate-float-fast",
    badge: {
      text: "3.5★ only",
      color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    },
  },
];

const HeroSection: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Trigger hero entrance
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!heroVisible) return;
    // Start typewriter after panels animate in
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayedText(TYPEWRITER_TEXT.slice(0, indexRef.current));
        if (indexRef.current >= TYPEWRITER_TEXT.length) {
          clearInterval(interval);
          setTypewriterDone(true);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 900);
    return () => clearTimeout(startDelay);
  }, [heroVisible]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-ledger-black" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(116,185,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,250,250,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,250,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Overline */}
        <div
          className="flex items-center justify-center gap-3 mb-10"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span className="w-6 h-px bg-sky" />
          <span className="text-sky text-xs font-bold uppercase tracking-[0.3em]">
            Social Media for Accounting Firms
          </span>
          <span className="w-6 h-px bg-sky" />
        </div>

        {/* Headline with typewriter */}
        <h1
          className="font-display text-center mb-4 text-ledger-white"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
            lineHeight: "1.08",
            letterSpacing: "-0.03em",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <span className={!typewriterDone ? "typewriter-cursor" : ""}>
            {displayedText}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-center text-ledger-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            opacity: typewriterDone ? 1 : 0,
            transform: typewriterDone ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Ledger writes, schedules, and publishes your firm's content across
          LinkedIn, Instagram, and Google Business — while you focus on billable
          hours.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          style={{
            opacity: typewriterDone ? 1 : 0,
            transform: typewriterDone ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <a
            href="#audit"
            className="btn-sky px-8 py-4 text-base font-bold rounded-lg text-center"
          >
            Get Your Free Content Audit →
          </a>
          <a
            href="#problem"
            className="btn-outline-sky px-8 py-4 text-base rounded-lg text-center"
          >
            See the Problem First
          </a>
        </div>

        {/* Three floating glass channel panels */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-5 w-full">
          {channelPanels.map((panel, i) => (
            <div
              key={panel.channel}
              className={`channel-card glass-panel rounded-2xl p-5 w-full md:w-72 flex-shrink-0 ${panel.floatClass}`}
              style={{
                transform: `rotate(${panel.rotate})`,
                opacity: heroVisible ? 1 : 0,
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${parseFloat(panel.delay) + 0.6}s`,
                background: `linear-gradient(135deg, rgba(30,34,36,0.85) 0%, ${panel.accentColor} 100%)`,
              }}
              aria-label={`${panel.channel} profile panel`}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {panel.icon}
                  <span className="text-sm font-semibold text-ledger-white">
                    {panel.channel}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${panel.badge.color}`}
                >
                  {panel.badge.text}
                </span>
              </div>

              {/* Profile Image */}
              <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
                <AppImage
                  src={panel.image}
                  alt={panel.imageAlt}
                  className="w-full h-full object-cover grayscale opacity-60"
                />
              </div>

              {/* Handle & Stats */}
              <p className="text-xs font-mono text-ledger-white/40 mb-1">
                {panel.handle}
              </p>
              <p className="text-sm font-semibold text-ledger-white/80 mb-1">
                {panel.stat}
              </p>
              <p className="text-xs text-ledger-white/30">{panel.statLabel}</p>

              {/* Sky blue edge glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(116,185,255,0.15), 0 0 20px rgba(116,185,255,0.08)",
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="flex flex-col items-center gap-2 mt-14"
          style={{
            opacity: typewriterDone ? 0.5 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
          aria-hidden="true"
        >
          <span className="text-xs text-ledger-white/40 uppercase tracking-[0.25em] font-medium">
            Scroll to see the gap
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-sky/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
