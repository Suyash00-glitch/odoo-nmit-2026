"use client";

import React, { useState, useEffect } from "react";
import AppLogo from "@/components/ui/AppLogo";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Problem", href: "#problem" },
    { label: "How It Works", href: "#solution" },
    { label: "Results", href: "#proof" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-panel py-3 mx-4 md:mx-8" : "py-0"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          aria-label="Ledger home"
        >
          <AppLogo
            text="Ledger"
            iconName="BookOpenIcon"
            size={36}
            className="text-ledger-white"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ledger-white/60 hover:text-ledger-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className="text-sm font-semibold text-purple-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="btn-purple-gradient px-5 py-2.5 text-sm font-bold rounded-lg"
          >
            Sign Up (HR)
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-ledger-white/70 hover:text-ledger-white transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mx-4 mt-2 glass-panel rounded-xl p-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ledger-white/70 hover:text-sky py-2 border-b border-ledger-white/5 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <a
              href="/login"
              className="text-center py-2.5 text-sm font-semibold text-purple-300 hover:text-white rounded-lg bg-white/5"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="btn-purple-gradient px-6 py-2.5 text-sm font-bold rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up (HR)
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
