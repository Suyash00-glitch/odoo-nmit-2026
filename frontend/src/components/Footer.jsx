import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-neutral-900 bg-white dark:bg-black text-slate-600 dark:text-neutral-400 py-12 px-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1px]">
            <div className="w-full h-full bg-[#0d111d] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Dayflow HRMS</span>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400">Intelligent Workforce Management System</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-neutral-400">
          <Link to="/signin" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Employee Portal
          </Link>
          <Link to="/signup" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Register Workspace
          </Link>
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#workflow" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Attendance & Leaves
          </a>
        </div>

        {/* Security & Copyright */}
        <div className="text-xs text-slate-500 dark:text-neutral-400 text-center md:text-right space-y-1">
          <p className="flex items-center justify-center md:justify-end gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Enterprise-Grade Data Security
          </p>
          <p>© {new Date().getFullYear()} Dayflow HRMS. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
