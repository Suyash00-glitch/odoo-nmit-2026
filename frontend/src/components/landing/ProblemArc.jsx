"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage.jsx";

// Calendar data for March (tax season)
const MarchCalendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const busyDays = [
    3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28,
    31,
  ];
  const freeDays = [1, 2];

  return (
    <div className="glass-panel rounded-2xl p-5 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-ledger-white/60">
          March 2026
        </span>
        <span className="text-xs text-red-400 font-semibold">Tax Season</span>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div
            key={d}
            className="text-center text-[9px] font-bold text-ledger-white/30 uppercase pb-1"
          >
            {d}
          </div>
        ))}
      </div>
      {/* offset for March 2026 starting on Sunday */}
      <div className="grid grid-cols-7 gap-1">
        {[0, 1].map((i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const cls = busyDays.includes(day)
            ? "busy"
            : freeDays.includes(day)
              ? "free"
              : "neutral";
          return (
            <div key={day} className={`calendar-cell ${cls}`}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-ledger-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm bg-red-500/40" />
          <span className="text-[10px] text-ledger-white/40">
            14-hr client days
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm bg-sky/30" />
          <span className="text-[10px] text-ledger-white/40">Available</span>
        </div>
      </div>
    </div>
  );
};

// Competitor feed vs blank feed
const FeedComparison = () => (
  <div className="flex gap-4 w-full max-w-sm mx-auto">
    {/* Competitor — active */}
    <div className="flex-1 glass-panel rounded-xl p-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-sky/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-sky" />
        </div>
        <div>
          <div className="text-[10px] font-semibold text-ledger-white">
            Summit CPA
          </div>
          <div className="text-[9px] text-sky">3 posts this week</div>
        </div>
      </div>
      {[
        {
          h: "3 Tax Mistakes to Avoid",
          likes: "142 likes",
          img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=100&auto=format&fit=crop",
        },
        {
          h: "Q1 Planning Guide",
          likes: "89 likes",
          img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=100&auto=format&fit=crop",
        },
      ].map((p, i) => (
        <div key={i} className="flex gap-2 mb-2 last:mb-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
            <AppImage
              src={p.img}
              alt={`${p.h} post thumbnail`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-ledger-white leading-tight">
              {p.h}
            </p>
            <p className="text-[9px] text-sky/70">{p.likes}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Your firm — blank */}
    <div className="flex-1 glass-panel rounded-xl p-3 opacity-60">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-ledger-white/5 border border-ledger-white/10" />
        <div>
          <div className="text-[10px] font-semibold text-ledger-white/40">
            Your Firm
          </div>
          <div className="text-[9px] text-red-400/70">0 posts this quarter</div>
        </div>
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-2 mb-2 last:mb-0">
          <div className="w-10 h-10 rounded-lg bg-ledger-white/5 border border-dashed border-ledger-white/10 flex-shrink-0" />
          <div className="flex-1">
            <div className="h-2 rounded bg-ledger-white/8 mb-1.5 w-3/4" />
            <div className="h-1.5 rounded bg-ledger-white/5 w-1/2" />
          </div>
        </div>
      ))}
      <p className="text-[9px] text-ledger-white/20 mt-3 text-center italic">
        No recent activity
      </p>
    </div>
  </div>
);

// Content calendar solution visual
const ContentCalendarVisual = () => (
  <div className="glass-panel rounded-2xl p-5 w-full max-w-sm mx-auto">
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-bold text-ledger-white">
        Your Content Calendar
      </span>
      <span className="text-[10px] text-sky font-semibold bg-sky/10 px-2 py-0.5 rounded-full">
        Managed by Ledger
      </span>
    </div>
    {[
      {
        day: "Mon",
        platform: "LinkedIn",
        topic: "Spring tax filing checklist for S-corps",
        color: "bg-sky/20 border-sky/30",
      },
      {
        day: "Wed",
        platform: "Instagram",
        topic: "5 deductions most small businesses miss",
        color: "bg-purple-500/15 border-purple-500/25",
      },
      {
        day: "Fri",
        platform: "Google",
        topic: "Response to 5-star review from new client",
        color: "bg-emerald-500/15 border-emerald-500/25",
      },
      {
        day: "Tue",
        platform: "LinkedIn",
        topic: "Q2 estimated tax deadline reminder",
        color: "bg-sky/20 border-sky/30",
      },
    ].map((item, i) => (
      <div
        key={i}
        className={`flex items-start gap-3 mb-3 last:mb-0 p-2.5 rounded-lg border ${item.color}`}
      >
        <span className="text-[10px] font-bold text-ledger-white/50 w-6 flex-shrink-0 mt-0.5">
          {item.day}
        </span>
        <div>
          <span className="text-[10px] font-bold text-ledger-white/60 uppercase tracking-wide">
            {item.platform}
          </span>
          <p className="text-xs text-ledger-white/80 leading-tight mt-0.5">
            {item.topic}
          </p>
        </div>
      </div>
    ))}
  </div>
);

// Analytics before/after
const AnalyticsDashboard = () => {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFilled(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      label: "Profile Views",
      before: "12/mo",
      after: "340/mo",
      pct: 0.82,
      color: "bg-sky",
    },
    {
      label: "Post Impressions",
      before: "0",
      after: "4,200/mo",
      pct: 0.91,
      color: "bg-sky",
    },
    {
      label: "Inbound Inquiries",
      before: "0",
      after: "6/mo",
      pct: 0.68,
      color: "bg-emerald-400",
    },
  ];

  return (
    <div
      ref={ref}
      className="glass-panel rounded-2xl p-5 w-full max-w-sm mx-auto"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-sky animate-pulse-sky" />
        <span className="text-xs font-bold text-ledger-white">
          LinkedIn Analytics — After 90 Days
        </span>
      </div>
      {metrics.map((m) => (
        <div key={m.label} className="mb-4 last:mb-0">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-ledger-white/60">{m.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-ledger-white/30 line-through">
                {m.before}
              </span>
              <span className="text-xs font-bold text-sky">{m.after}</span>
            </div>
          </div>
          <div className="analytics-bar">
            <div
              className={`analytics-bar-fill ${m.color} ${filled ? "filled" : ""}`}
              style={{ width: `${m.pct * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const problems = [
  {
    id: "invisibility",
    tag: "Problem 01 — Invisibility",
    headline: "A prospective client Googled your firm",
    headlineItalic: "and found nothing.",
    body: "Your competitors' partners are publishing LinkedIn articles, collecting 5-star Google reviews, and showing up in local searches. You're showing up on page 3 — below a firm that closed in 2021.",
    visual: (
      <div className="glass-panel rounded-2xl p-5 w-full max-w-sm mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ledger-white/40 mb-3">
          Google Search Results
        </p>
        {[
          {
            name: "Summit CPA Group",
            reviews: "47 reviews • 4.9★",
            active: true,
            posts: "12 posts/month",
          },
          {
            name: "Meridian Tax Advisors",
            reviews: "31 reviews • 4.7★",
            active: true,
            posts: "8 posts/month",
          },
          {
            name: "Your Firm Name",
            reviews: "2 reviews • 3.5★",
            active: false,
            posts: "Last post: 2019",
          },
        ].map((r, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-3 rounded-lg mb-2 last:mb-0 border ${
              r.active
                ? "border-sky/15 bg-sky/5"
                : "border-red-500/15 bg-red-500/5 opacity-60"
            }`}
          >
            <div>
              <p
                className={`text-xs font-semibold ${r.active ? "text-sky" : "text-ledger-white/40"}`}
              >
                {r.name}
              </p>
              <p className="text-[10px] text-ledger-white/40">{r.reviews}</p>
            </div>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${r.active ? "bg-sky/15 text-sky" : "bg-red-500/15 text-red-400"}`}
            >
              {r.posts}
            </span>
          </div>
        ))}
      </div>
    ),

    solutionTag: "Solution",
    solutionHeadline: "We make you the obvious choice.",
    solutionBody:
      "Ledger publishes keyword-rich LinkedIn articles, responds to every Google review within 24 hours, and keeps your profiles updated — so you rank above competitors who aren't posting.",
    solutionVisual: <ContentCalendarVisual />,
    bgDarken: "rgba(20,24,26,0.0)",
  },
  {
    id: "time",
    tag: "Problem 02 — Time",
    headline: "March has 31 days.",
    headlineItalic: "You have zero free ones.",
    body: "Tax season means 14-hour days, back-to-back client calls, and extension requests. The last thing you have time for is writing a LinkedIn post about depreciation schedules — even if it would bring in new clients.",
    visual: <MarchCalendar />,
    solutionTag: "Solution",
    solutionHeadline: "We post when you can't.",
    solutionBody:
      "Ledger batches your content 30 days in advance. You spend 20 minutes in January reviewing your calendar. We handle everything else — writing, designing, scheduling, and publishing — all year.",
    solutionVisual: <AnalyticsDashboard />,
    bgDarken: "rgba(18,22,24,0.3)",
  },
  {
    id: "trust",
    tag: "Problem 03 — Trust Gap",
    headline: "Your competitors look polished.",
    headlineItalic: "You look unavailable.",
    body: "A partner at a competing firm has 2,400 LinkedIn followers, a consistent posting schedule, and a feed that makes them look like the go-to expert in your city. Your profile photo is from 2016.",
    visual: <FeedComparison />,
    solutionTag: "Solution",
    solutionHeadline: "Your expertise, finally visible.",
    solutionBody:
      "We turn your existing knowledge — the tax advice you give clients daily — into a consistent stream of polished content. Your voice, your expertise, our execution.",
    solutionVisual: (
      <div className="glass-panel rounded-2xl p-5 w-full max-w-sm mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1dcb2b288-1772174159855.png"
              alt="Professional CPA partner headshot, man in suit with confident expression"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-ledger-white">
              Daniel Hartley, CPA
            </p>
            <p className="text-xs text-sky">
              Managing Partner · 1,847 followers
            </p>
          </div>
        </div>
        <div className="bg-sky/8 border border-sky/15 rounded-xl p-3 mb-3">
          <p className="text-xs text-ledger-white/80 leading-relaxed">
            "Most small business owners overpay on estimated taxes because they
            don't know this one rule. Here's what your CPA should be telling you
            every Q1..."
          </p>
          <div className="flex gap-4 mt-3 text-[10px] text-ledger-white/40">
            <span>👍 214 reactions</span>
            <span>💬 38 comments</span>
            <span>🔁 61 reposts</span>
          </div>
        </div>
        <p className="text-[9px] text-sky/60 text-center">
          Posted by Ledger · 2 days ago
        </p>
      </div>
    ),

    bgDarken: "rgba(14,18,22,0.5)",
  },
];

const ProblemArc = () => {
  const [revealed, setRevealed] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observers = [];
    problems.forEach(({ id }) => {
      const el = refs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => ({ ...prev, [id]: true }));
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="problem" className="relative">
      {problems.map((problem, idx) => (
        <div
          key={problem.id}
          ref={(el) => {
            refs.current[problem.id] = el;
          }}
          className="relative py-24 md:py-32 px-6"
          style={{
            background: `linear-gradient(180deg, #1A1E1F 0%, ${problem.bgDarken} 100%)`,
          }}
        >
          {/* Ruled line top */}
          {idx > 0 && <hr className="ruled-line mb-20 max-w-6xl mx-auto" />}

          <div className="max-w-6xl mx-auto">
            {/* Problem Panel */}
            <div
              className={`problem-panel grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-16 ${revealed[problem.id] ? "revealed" : ""}`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80 block mb-4">
                  {problem.tag}
                </span>
                <h2
                  className="font-display mb-5 text-ledger-white"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    lineHeight: "1.1",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {problem.headline}
                  {problem.headlineItalic && (
                    <span className="block italic text-ledger-white/50 font-light">
                      {problem.headlineItalic}
                    </span>
                  )}
                </h2>
                <p className="text-ledger-white/50 text-base md:text-lg leading-relaxed">
                  {problem.body}
                </p>
              </div>
              <div>{problem.visual}</div>
            </div>

            {/* Solution Card — rises beneath */}
            <div
              className={`solution-card glass-panel rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center border border-sky/15 ${revealed[problem.id] ? "revealed" : ""}`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(30,34,36,0.9) 0%, rgba(26,50,80,0.6) 100%)",
              }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky block mb-3">
                  {problem.solutionTag}
                </span>
                <h3
                  className="font-display text-ledger-white mb-3"
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    lineHeight: "1.2",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {problem.solutionHeadline}
                </h3>
                <p className="text-ledger-white/60 text-sm md:text-base leading-relaxed">
                  {problem.solutionBody}
                </p>
              </div>
              <div>{problem.solutionVisual}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProblemArc;

