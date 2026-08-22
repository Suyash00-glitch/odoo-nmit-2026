import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Star,
  Search,
  Bell,
  Plus,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${encodeURIComponent(email)}`);
  };

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
  ];

  return (
    <section
      className="relative pt-36 pb-28 overflow-hidden bg-hero-gradient text-white"
      style={{
        background: "radial-gradient(85% 100% at 88% -8%, #5E7F91 0%, transparent 58%), radial-gradient(60% 80% at -8% 82%, #B85D45 0%, transparent 54%), linear-gradient(118deg, #15232D 0%, #1D3039 52%, #27424A 100%)",
      }}
    >
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      
      {/* Background Soft Cloud/Star Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#E9A27E]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#B8D4D5]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-8">
        <div className="hidden lg:flex absolute -left-8 top-10 flex-col items-start gap-2 text-left">
          <span className="text-[10px] tracking-[.24em] font-bold text-white/55 uppercase">Dayflow / 01</span>
          <span className="w-20 h-px bg-[#F5B38B]/70" />
          <span className="text-[10px] tracking-wider text-white/40 uppercase">People operations</span>
        </div>
        
        {/* 1. Customer Social Proof Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-pill shadow-lg shadow-black/5">
          <span className="flex w-6 h-6 rounded-full border border-[#F5B38B]/70 items-center justify-center text-[9px] font-black text-[#F5B38B]">01</span>
          <span className="text-xs font-bold text-white tracking-wide">The operating system for people work</span>
        </div>

        {/* 2. Main Headline with Floating Badges */}
        <div className="relative max-w-4xl mx-auto space-y-4">
          
          {/* Floating User Pin Left: "Attendance & Leave" */}
          <div className="hidden lg:flex items-center gap-2 absolute -left-12 top-6 animate-float">
            <div className="w-10 h-10 rounded-full bg-purple-900 border-2 border-white/80 p-0.5 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="relative">
              {/* Pointer triangle */}
              <div className="w-2.5 h-2.5 bg-white/20 backdrop-blur-md rotate-45 absolute -left-1 top-3 border-l border-b border-white/30" />
              <div className="px-4 py-2 rounded-full glass-pill text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                Attendance &amp; Leave
              </div>
            </div>
          </div>

          {/* Floating User Pin Right: "Payroll & Approvals" */}
          <div className="hidden lg:flex items-center gap-2 absolute -right-12 top-12 animate-float-delayed flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-purple-900 border-2 border-white/80 p-0.5 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="relative">
              {/* Pointer triangle */}
              <div className="w-2.5 h-2.5 bg-white/20 backdrop-blur-md rotate-45 absolute -right-1 top-3 border-r border-t border-white/30" />
              <div className="px-4 py-2 rounded-full glass-pill text-xs font-semibold text-white shadow-lg whitespace-nowrap">
                Payroll &amp; Approvals
              </div>
            </div>
          </div>

          <p className="text-xs font-bold tracking-widest text-[#F5B38B] uppercase">
            HR MANAGEMENT • ATTENDANCE • PAYROLL
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Work should feel{" "}
            <span className="inline-block px-4 py-0.5 rounded-3xl border border-white/30 bg-white/10 backdrop-blur-md font-extrabold">
              less scattered.
            </span>{" "}
            <br />
            One clear place for people.
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-medium">
            A calm, connected workspace for employee records, attendance, leave, approvals, and payroll.
          </p>
        </div>

        {/* 3. Hero Email Input Bar with Electric Lime Button */}
        <div className="pt-2 max-w-lg mx-auto">
          <form onSubmit={handleStart} className="p-1.5 rounded-full bg-white shadow-2xl flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 pl-6 pr-2 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="btn-lime px-6 py-3.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 shadow-lime"
            >
              <span>Explore Dayflow</span>
              <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 text-black stroke-[2.5]" />
              </div>
            </button>
          </form>
        </div>

        {/* 4. Large Floating Hero Dashboard Mockup (Exact Match to Screenshot) */}
        <div className="pt-10 max-w-5xl mx-auto relative">
          
          {/* Main Dashboard Card */}
          <div className="rounded-3xl bg-white/95 text-neutral-900 shadow-2xl border border-white/60 p-6 md:p-8 text-left space-y-6 relative z-10 backdrop-blur-xl">
            
            {/* Top Bar inside mockup */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div className="flex items-center gap-8">
                {/* Brand in Mockup */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#18313A] flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#E98E64] rounded-xs rotate-45" />
                  </div>
                  <span className="font-extrabold text-sm tracking-wider text-neutral-900">DAYFLOW</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 hidden sm:block">Workforce Overview</h2>
              </div>

              <div className="flex items-center gap-4">
                {/* Search in mockup */}
                <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-400 w-60">
                  <Search size={14} />
                  <span>Search employees, requests...</span>
                </div>
                {/* Bell */}
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                  <Bell size={15} />
                </div>
                {/* User */}
                <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Alex Rivera"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-neutral-900 leading-tight">Alex Rivera</p>
                    <p className="text-[10px] text-gray-400 font-medium">HR Administrator</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Dashboard Body Grid: Sidebar Mockup + Content Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Sidebar Mockup */}
              <div className="hidden md:block md:col-span-3 space-y-4 pr-3 border-r border-gray-100">
                <button className="w-full py-2.5 px-3 rounded-xl bg-[#6B42EF] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20">
                  <Plus size={15} />
                  <span>Add Employee</span>
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#6B42EF] text-white text-xs font-bold">
                    <LayoutDashboard size={15} />
                    <span>Workforce</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-500 hover:text-neutral-900 text-xs font-medium">
                    <Users size={15} />
                    <span>Employees</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-500 hover:text-neutral-900 text-xs font-medium">
                    <Clock size={15} />
                    <span>Attendance</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-500 hover:text-neutral-900 text-xs font-medium">
                    <CheckSquare size={15} />
                    <span>Leave Requests</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-500 hover:text-neutral-900 text-xs font-medium">
                    <FolderKanban size={15} />
                    <span>Payroll</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="md:col-span-9 space-y-5">
                
                {/* 4 Metric Overview Cards */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-neutral-900">Workforce Overview</h3>
                  <div className="text-[11px] font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 flex items-center gap-1">
                    <span>Today</span>
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Metric 1 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-purple-100 flex items-center justify-center text-[#6B42EF] mb-2">
                      <Users size={15} />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">Total Employees</p>
                    <p className="text-base font-extrabold text-neutral-900 font-mono">128</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">↗ 4 onboarded this month</p>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                      <CheckCircle2 size={15} />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">Present Today</p>
                    <p className="text-base font-extrabold text-neutral-900 font-mono">114 <span className="text-xs text-gray-400">/128</span></p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">↗ 89% on-time check-in</p>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                      <Clock size={15} />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">On Leave</p>
                    <p className="text-base font-extrabold text-neutral-900 font-mono">8 <span className="text-xs text-gray-400">/128</span></p>
                    <p className="text-[10px] text-blue-600 font-semibold mt-0.5">6 Planned • 2 Sick</p>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
                      <CheckSquare size={15} />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">Pending Requests</p>
                    <p className="text-base font-extrabold text-neutral-900 font-mono">6 <span className="text-xs text-gray-400">/12</span></p>
                    <p className="text-[10px] text-amber-600 font-semibold mt-0.5">4 Leaves • 2 Approvals</p>
                  </div>
                </div>

                {/* Table Summary inside Mockup */}
                <div className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50/40">
                  <div className="p-3 bg-white border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">Recent Activity</span>
                    <span className="text-[11px] text-gray-400 font-medium">Live Updates</span>
                  </div>
                  <div className="p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-gray-100 text-gray-600">
                      <span className="font-semibold text-neutral-900">Aarav Sharma</span>
                      <span>Check-in</span>
                      <span className="text-gray-400 font-mono">09:02 AM</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Present</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100 text-gray-600">
                      <span className="font-semibold text-neutral-900">Priya Nair</span>
                      <span>Leave Request</span>
                      <span className="text-gray-400 font-mono">May 25 – 27</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">Pending</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100 text-gray-600">
                      <span className="font-semibold text-neutral-900">Rahul Kumar</span>
                      <span>Check-out</span>
                      <span className="text-gray-400 font-mono">06:15 PM</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Completed</span>
                    </div>
                    <div className="flex items-center justify-between py-1 text-gray-600">
                      <span className="font-semibold text-neutral-900">Sneha Rao</span>
                      <span>Leave Request</span>
                      <span className="text-gray-400 font-mono">Sick Leave</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">Approved</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Floating Overlay Mini-Card 1 (Left): Attendance Overview */}
          <div className="hidden lg:block absolute -left-8 -bottom-6 w-48 p-3.5 rounded-2xl bg-white text-neutral-900 shadow-2xl border border-gray-200/90 z-20 animate-float">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#6B42EF]">Attendance Overview</span>
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <p className="text-[10px] text-gray-400">Today's presence rate</p>
            <p className="text-lg font-bold text-neutral-900 font-mono">92% <span className="text-[10px] text-emerald-600 font-semibold">+3.2%</span></p>
            {/* Mini chart visual */}
            <div className="h-10 mt-2 bg-gradient-to-t from-purple-100 to-transparent rounded-lg flex items-end justify-between px-2 pb-1">
              <div className="w-1.5 h-4 bg-purple-400 rounded-xs" />
              <div className="w-1.5 h-7 bg-purple-500 rounded-xs" />
              <div className="w-1.5 h-5 bg-purple-400 rounded-xs" />
              <div className="w-1.5 h-8 bg-[#6B42EF] rounded-xs" />
            </div>
          </div>

          {/* Floating Overlay Mini-Card 2 (Right): Employee Distribution Donut */}
          <div className="hidden lg:block absolute -right-6 -bottom-4 w-52 p-4 rounded-2xl bg-white text-neutral-900 shadow-2xl border border-gray-200/90 z-20 animate-float-delayed">
            <p className="text-xs font-bold text-neutral-900 mb-2">Employee Distribution</p>
            <div className="flex items-center justify-between">
              <div className="relative w-16 h-16 rounded-full border-4 border-[#6B42EF] border-t-cyan-400 flex items-center justify-center">
                <span className="text-xs font-bold text-neutral-900 font-mono">89%</span>
              </div>
              <div className="text-[10px] space-y-1">
                <p className="text-neutral-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#6B42EF]" /> Full-Time (85%)
                </p>
                <p className="text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Contract (15%)
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-center justify-center gap-5 text-[10px] font-bold tracking-[.16em] uppercase text-white/55 pt-2">
          <span>Built for the workday</span><span className="w-1 h-1 rounded-full bg-[#F5B38B]" /><span>Private by design</span><span className="w-1 h-1 rounded-full bg-[#F5B38B]" /><span>Always in sync</span>
        </div>

      </div>

      {/* Cloud Bottom Transition Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
