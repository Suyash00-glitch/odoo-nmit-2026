import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Solution", href: "#solution" },
    { label: "Features", href: "#features" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Workflows", href: "#how-it-works" },
    { label: "Integrations", href: "#integrations" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm py-3 px-6"
          : "bg-transparent pt-5 pb-3 px-6"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-black rounded-xs rotate-45" />
              <div className="w-2 h-2 bg-black rounded-xs rotate-45" />
              <div className="w-2 h-2 bg-black rounded-xs rotate-45" />
              <div className="w-2 h-2 bg-black rounded-xs rotate-45" />
            </div>
          </div>
          <span
            className={`text-xl font-extrabold tracking-wider transition-colors ${
              scrolled ? "text-neutral-950" : "text-white"
            }`}
          >
            DAYFLOW
          </span>
        </Link>

        {/* Center Pill Capsule Navbar */}
        <nav
          className={`hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all ${
            scrolled
              ? "bg-gray-100/90 border border-gray-200/80 shadow-xs"
              : "glass-pill shadow-lg shadow-black/5"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                scrolled
                  ? "text-neutral-700 hover:text-neutral-950 hover:bg-white shadow-2xs"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/signin"
            className={`text-sm font-bold px-3 py-2 transition-colors ${
              scrolled
                ? "text-neutral-700 hover:text-neutral-950"
                : "text-white/90 hover:text-white"
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="btn-lime px-5 py-2.5 rounded-full text-sm font-extrabold flex items-center gap-1.5 shadow-lime"
          >
            <span>Claim Free Trial</span>
            <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            </div>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2.5 rounded-full transition-colors ${
            scrolled
              ? "bg-gray-100 text-neutral-900 border border-gray-200"
              : "glass-pill text-white"
          }`}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto p-5 rounded-3xl bg-white text-neutral-900 border border-gray-200 shadow-2xl space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-bold text-neutral-700 hover:text-neutral-950 hover:bg-gray-50 rounded-2xl"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              className="text-center py-2.5 text-sm font-bold text-neutral-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="btn-lime text-center py-3 text-sm font-bold rounded-full flex items-center justify-center gap-1.5 shadow-lime"
            >
              <span>Claim Free Trial</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
