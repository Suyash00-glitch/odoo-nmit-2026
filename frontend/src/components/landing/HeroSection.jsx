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
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=140&q=80",
  ];

  return (
    <section className="relative pt-36 pb-28 overflow-hidden bg-hero-gradient text-white">
      
      {/* Background Soft Cloud/Star Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-white/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4FF00]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-10">
        
        {/* 1. Customer Social Proof Pill */}
        <div className="inline-flex items-center gap-3.5 px-5 py-2 rounded-full glass-pill shadow-xl shadow-black/5">
          {/* Overlapping Avatar circles */}
          <div className="flex -space-x-2.5">
            {avatars.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Customer"
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs"
              />
            ))}
          </div>
          {/* 5 Yellow Stars + Count */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-300 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-300" />
              ))}
            </div>
            <span className="text-sm font-extrabold text-white tracking-wide">125k+ Customer</span>
          </div>
        </div>

        {/* 2. Main Headline with Floating Badges */}
        <div className="relative max-w-4xl mx-auto space-y-5">
          
          {/* Floating User Pin Left: "Employee Management" */}
          <div className="hidden lg:flex items-center gap-2.5 absolute -left-16 top-6 animate-float">
            <div className="w-12 h-12 rounded-full bg-purple-900 border-2 border-white p-0.5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-white/20 backdrop-blur-md rotate-45 absolute -left-1.5 top-3.5 border-l border-b border-white/30" />
              <div className="px-5 py-2.5 rounded-full glass-pill text-sm font-bold text-white shadow-xl whitespace-nowrap">
                Employee Management
              </div>
            </div>
          </div>

          {/* Floating User Pin Right: "Payroll And Compliance" */}
          <div className="hidden lg:flex items-center gap-2.5 absolute -right-16 top-12 animate-float-delayed flex-row-reverse">
            <div className="w-12 h-12 rounded-full bg-purple-900 border-2 border-white p-0.5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="relative">
              <div className="w-3 h-3 bg-white/20 backdrop-blur-md rotate-45 absolute -right-1.5 top-3.5 border-r border-t border-white/30" />
              <div className="px-5 py-2.5 rounded-full glass-pill text-sm font-bold text-white shadow-xl whitespace-nowrap">
                Payroll And Compliance
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-white leading-[1.12]">
            Best HR{" "}
            <span className="inline-block px-5 py-1 rounded-3xl border-2 border-white/40 bg-white/15 backdrop-blur-md font-black shadow-lg">
              Software
            </span>{" "}
            Built <br />
            For Modern Businesses
          </h1>

          <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto font-semibold leading-relaxed">
            Future Ready HR Software With Payroll And Compliance In One Place
          </p>
        </div>

        {/* 3. Hero Email Input Bar with Electric Lime Button */}
        <div className="pt-2 max-w-xl mx-auto">
          <form onSubmit={handleStart} className="p-2 rounded-full bg-white shadow-2xl flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="flex-1 pl-6 pr-3 py-3.5 text-sm sm:text-base text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none font-semibold"
            />
            <button
              type="submit"
              className="btn-lime px-7 py-4 rounded-full text-sm font-extrabold whitespace-nowrap flex items-center gap-2 shadow-lime"
            >
              <span>Get Started Free</span>
              <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
            </button>
          </form>
        </div>

        {/* 4. Large Floating Hero Dashboard Mockup */}
        <div className="pt-12 max-w-5xl mx-auto relative">
          
          {/* Main Dashboard Card */}
          <div className="rounded-3xl bg-white text-neutral-900 shadow-2xl border border-white/80 p-6 md:p-8 text-left space-y-6 relative z-10 backdrop-blur-xl">
            
            {/* Top Bar inside mockup */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#6B42EF] flex items-center justify-center shadow-xs">
                    <div className="w-3.5 h-3.5 bg-[#D4FF00] rounded-xs rotate-45" />
                  </div>
                  <span className="font-extrabold text-base tracking-wider text-neutral-950">DAYFLOW</span>
                </div>
                <h2 className="text-2xl font-extrabold text-neutral-950 hidden sm:block">Dashboard</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-400 w-64">
                  <Search size={15} />
                  <span>Search for anything...</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600">
                  <Bell size={16} />
                </div>
                <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Alex meian"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-neutral-950 leading-tight">Alex meian</p>
                    <p className="text-[11px] text-gray-400 font-medium">Product manager</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Dashboard Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Sidebar Mockup */}
              <div className="hidden md:block md:col-span-3 space-y-4 pr-3 border-r border-gray-100">
                <button className="w-full py-3 px-3.5 rounded-xl bg-[#6B42EF] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-600/20">
                  <Plus size={16} />
                  <span>Create New Project</span>
                </button>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#6B42EF] text-white text-xs font-bold">
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:text-neutral-950 text-xs font-bold">
                    <FolderKanban size={16} />
                    <span>Projects</span>
                  </div>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:text-neutral-950 text-xs font-bold">
                    <CheckSquare size={16} />
                    <span>Tasks</span>
                  </div>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:text-neutral-950 text-xs font-bold">
                    <Clock size={16} />
                    <span>Time log</span>
                  </div>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-600 hover:text-neutral-950 text-xs font-bold">
                    <Users size={16} />
                    <span>Resource mgmt</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="md:col-span-9 space-y-5">
                
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-neutral-950">Overview</h3>
                  <div className="text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1.5">
                    <span>Last 30 days</span>
                    <ChevronDown size={13} />
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-[#6B42EF] mb-2.5">
                      <TrendingUp size={16} />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Total revenue</p>
                    <p className="text-lg font-black text-neutral-950 font-mono mt-0.5">$53,00989</p>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">↗ 12% increase</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-2.5">
                      <FolderKanban size={16} />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Projects</p>
                    <p className="text-lg font-black text-neutral-950 font-mono mt-0.5">95 <span className="text-xs text-gray-400 font-normal">/100</span></p>
                    <p className="text-[11px] text-red-500 font-bold mt-1">↘ 10% decrease</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2.5">
                      <Clock size={16} />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Time spent</p>
                    <p className="text-lg font-black text-neutral-950 font-mono mt-0.5">1022 <span className="text-xs text-gray-400 font-normal">/1300 Hrs</span></p>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">↗ 8% increase</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-2.5">
                      <Users size={16} />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Resources</p>
                    <p className="text-lg font-black text-neutral-950 font-mono mt-0.5">101 <span className="text-xs text-gray-400 font-normal">/120</span></p>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">↗ 2% increase</p>
                  </div>
                </div>

                {/* Table Summary */}
                <div className="rounded-2xl border border-gray-100 overflow-hidden bg-gray-50/50">
                  <div className="p-3.5 bg-white border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-neutral-950">Project summary</span>
                    <span className="text-xs text-gray-400 font-medium">Status filters</span>
                  </div>
                  <div className="p-3.5 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 text-gray-600">
                      <span className="font-bold text-neutral-950">Nelsa web development</span>
                      <span>Om prakash sao</span>
                      <span className="text-gray-400 font-mono">May 25, 2026</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Completed</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 text-gray-600">
                      <span className="font-bold text-neutral-950">Datascale AI app</span>
                      <span>Neilsan mando</span>
                      <span className="text-gray-400 font-mono">Jun 20, 2026</span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">Delayed</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Floating Overlay Mini-Card 1 (Left) */}
          <div className="hidden lg:block absolute -left-10 -bottom-6 w-52 p-4 rounded-3xl bg-white text-neutral-900 shadow-2xl border border-gray-200/90 z-20 animate-float">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#6B42EF]">Running Project</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Spending trend</p>
            <p className="text-xl font-black text-neutral-950 font-mono mt-0.5">87% <span className="text-xs text-emerald-600 font-bold">+4.5%</span></p>
            <div className="h-12 mt-2 bg-gradient-to-t from-purple-100 to-transparent rounded-xl flex items-end justify-between px-2.5 pb-1">
              <div className="w-2 h-5 bg-purple-400 rounded-xs" />
              <div className="w-2 h-8 bg-purple-500 rounded-xs" />
              <div className="w-2 h-6 bg-purple-400 rounded-xs" />
              <div className="w-2 h-10 bg-[#6B42EF] rounded-xs" />
            </div>
          </div>

          {/* Floating Overlay Mini-Card 2 (Right) */}
          <div className="hidden lg:block absolute -right-8 -bottom-4 w-56 p-5 rounded-3xl bg-white text-neutral-900 shadow-2xl border border-gray-200/90 z-20 animate-float-delayed">
            <p className="text-xs font-extrabold text-neutral-950 mb-2.5">Employee Composition</p>
            <div className="flex items-center justify-between">
              <div className="relative w-18 h-18 rounded-full border-4 border-[#6B42EF] border-t-cyan-400 flex items-center justify-center">
                <span className="text-sm font-black text-neutral-950 font-mono">35%</span>
              </div>
              <div className="text-xs space-y-1.5 font-semibold">
                <p className="text-neutral-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B42EF]" /> Tech (65%)
                </p>
                <p className="text-gray-500 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Ops (35%)
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
