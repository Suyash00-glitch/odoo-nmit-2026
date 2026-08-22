"use client";

import React, { useEffect, useState } from "react";

const StickyCTABar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user scrolls past ~80vh (second reveal)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky-cta fixed top-0 left-0 right-0 z-[90] ${visible ? "visible" : ""}`}
      role="banner"
      aria-label="Content audit offer"
    >
      <div
        className="flex items-center justify-between gap-4 px-6 py-3 max-w-6xl mx-auto"
        style={{
          background: "rgba(26,50,80,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(116,185,255,0.2)",
        }}
      >
        <p className="text-sm text-ledger-white/70 hidden sm:block">
          <span className="text-sky font-semibold">Free for February:</span>{" "}
          We'll audit your firm's social presence in 24 hours — no pitch, no
          obligation.
        </p>
        <p className="text-sm text-ledger-white/70 sm:hidden">
          Free content audit — 24hr turnaround
        </p>
        <a
          href="#audit"
          className="btn-sky px-5 py-2 text-sm font-bold rounded-lg flex-shrink-0"
        >
          Claim Audit →
        </a>
      </div>
    </div>
  );
};

export default StickyCTABar;

