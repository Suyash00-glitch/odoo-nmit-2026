import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, ChevronDown, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F9FD] border-t border-gray-200 text-gray-600 pt-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info & Contact Button */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-xs">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1 h-1 bg-black rounded-xs rotate-45" />
                  <div className="w-1 h-1 bg-black rounded-xs rotate-45" />
                  <div className="w-1 h-1 bg-black rounded-xs rotate-45" />
                  <div className="w-1 h-1 bg-black rounded-xs rotate-45" />
                </div>
              </div>
              <span className="text-lg font-extrabold tracking-wider text-neutral-950">
                DAYFLOW
              </span>
            </Link>

            <p className="text-xs font-semibold text-neutral-900">
              Dayflow — Every workday, perfectly aligned.
            </p>

            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Modern human resource management, attendance tracking, leave governance, and payroll visibility in one unified workspace.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-neutral-800 shadow-2xs">
                <Globe size={13} className="text-gray-400" />
                <span>English</span>
                <ChevronDown size={12} className="text-gray-400" />
              </div>

              <Link
                to="/signup"
                className="btn-lime px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-lime"
              >
                <span>Start Free</span>
                <ArrowUpRight size={13} className="text-black stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-neutral-950 transition-colors">Employee Management</a></li>
              <li><a href="#solution" className="hover:text-neutral-950 transition-colors">Attendance</a></li>
              <li><a href="#solution" className="hover:text-neutral-950 transition-colors">Leave Management</a></li>
              <li><a href="#solution" className="hover:text-neutral-950 transition-colors">Payroll</a></li>
              <li><a href="#features" className="hover:text-neutral-950 transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">HR Teams</Link></li>
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Employees</Link></li>
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Growing Businesses</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="hover:text-neutral-950 transition-colors">Documentation</a></li>
              <li><a href="#how-it-works" className="hover:text-neutral-950 transition-colors">Help Center</a></li>
              <li><Link to="/signin" className="hover:text-neutral-950 transition-colors">Demo</Link></li>
              <li><a href="#reviews" className="hover:text-neutral-950 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">About Dayflow</Link></li>
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-neutral-950 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-neutral-950 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-neutral-950 transition-colors">Terms</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Dayflow HRMS Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-neutral-950">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-950">Terms of Service</a>
            <a href="#" className="hover:text-neutral-950">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
