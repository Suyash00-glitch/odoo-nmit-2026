import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Shield, ArrowRight, Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Attendance & Leaves", href: "#workflow" },
    { label: "Payroll & Analytics", href: "#analytics" },
    { label: "Transformation", href: "#transformation" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "py-2.5 bg-black/80 backdrop-blur-xl border-b border-neutral-900" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/35 transition-all duration-300">
            <div className="w-full h-full bg-[#0d111d] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">
                Dayflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">HRMS</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                v2.4
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-xs font-semibold text-neutral-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-white/5 transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-neutral-400 hover:text-white p-1.5 rounded-lg bg-neutral-900 border border-neutral-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mx-4 mt-3 bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col gap-3 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-300 hover:text-white py-1.5 border-b border-neutral-900"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/signin"
              className="text-center py-2 text-xs font-semibold text-neutral-300 rounded-lg bg-neutral-900 border border-neutral-800"
              onClick={() => setMenuOpen(false)}
            >
              Sign In to Portal
            </Link>
            <Link
              to="/signup"
              className="text-center py-2 text-xs font-semibold text-white bg-purple-600 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Register Workspace
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
