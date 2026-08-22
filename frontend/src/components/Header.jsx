import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#solution" },
    { label: "Attendance", href: "#solution" },
    { label: "Leave Management", href: "#how-it-works" },
    { label: "Payroll", href: "#features" },
    { label: "Analytics", href: "#integrations" },
    { label: "Resources", href: "#reviews" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-5 px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo (Matching SAASI Style from Screenshot) */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
            {/* 4-part geometric cross icon matching screenshot */}
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-wider text-white">
            DAYFLOW
          </span>
        </Link>

        {/* Center Translucent Pill Capsule Navbar */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill shadow-lg shadow-black/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/85 hover:text-white hover:bg-white/15 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button: Lime Pill with Arrow */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-xs font-bold text-white/90 hover:text-white px-3 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="btn-lime px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lime"
          >
            <span>Start Free</span>
            <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-3 h-3 text-black stroke-[2.5]" />
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full glass-pill text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto p-5 rounded-3xl bg-neutral-950/95 backdrop-blur-2xl border border-white/10 text-white space-y-3 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              className="text-center py-2.5 text-xs font-bold text-white bg-white/10 rounded-full"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="btn-lime text-center py-2.5 text-xs font-bold rounded-full flex items-center justify-center gap-1"
            >
              <span>Start Free</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
