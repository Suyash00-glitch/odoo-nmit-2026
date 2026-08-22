import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F9FD] border-t border-gray-200 text-gray-600 pt-20 pb-14 px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-xs">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
                  <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
                  <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
                  <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-neutral-950">
                DAYFLOW
              </span>
            </Link>

            <p className="text-sm text-gray-500 max-w-sm leading-relaxed font-medium">
              Future ready HR, attendance, leave governance, and payroll software built for high-performance businesses.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-neutral-800 shadow-2xs">
                <Globe size={14} className="text-gray-400" />
                <span>English</span>
                <ChevronDown size={13} className="text-gray-400" />
              </div>

              <Link
                to="/signup"
                className="btn-lime px-5 py-2.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-lime"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={14} className="text-black stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-neutral-950 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#features" className="hover:text-neutral-950 transition-colors">Employee Onboarding</a></li>
              <li><a href="#solution" className="hover:text-neutral-950 transition-colors">Time & Attendance</a></li>
              <li><a href="#solution" className="hover:text-neutral-950 transition-colors">Leave Governance</a></li>
              <li><a href="#solution" className="hover:text-neutral-950 transition-colors">Payroll & Taxes</a></li>
              <li><a href="#features" className="hover:text-neutral-950 transition-colors">Executive Analytics</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-neutral-950 uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Enterprise HR</Link></li>
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Fast Startups</Link></li>
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Tech Companies</Link></li>
              <li><Link to="/signup" className="hover:text-neutral-950 transition-colors">Remote Teams</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-neutral-950 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#how-it-works" className="hover:text-neutral-950 transition-colors">Documentation</a></li>
              <li><a href="#integrations" className="hover:text-neutral-950 transition-colors">API & Webhooks</a></li>
              <li><a href="#proof" className="hover:text-neutral-950 transition-colors">Customer Stories</a></li>
              <li><Link to="/signin" className="hover:text-neutral-950 transition-colors">Demo Login</Link></li>
            </ul>
          </div>

          {/* App Store / Google Play Badges */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-neutral-950 uppercase tracking-wider">Get The App</h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-neutral-950 text-white flex items-center gap-2.5 cursor-pointer hover:bg-neutral-800 transition-colors shadow-xs">
                <div className="w-6 h-6 flex items-center justify-center font-bold text-lg"></div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 leading-none">Download on the</p>
                  <p className="text-xs font-extrabold leading-tight mt-0.5">App Store</p>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 text-white flex items-center gap-2.5 cursor-pointer hover:bg-neutral-800 transition-colors shadow-xs">
                <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">▶</div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 leading-none">Get it on</p>
                  <p className="text-xs font-extrabold leading-tight mt-0.5">Google Play</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-semibold">
          <p>© {new Date().getFullYear()} Dayflow HRMS Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 font-bold text-gray-500">
            <a href="#" className="hover:text-neutral-950">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-950">Terms of Service</a>
            <a href="#" className="hover:text-neutral-950">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
