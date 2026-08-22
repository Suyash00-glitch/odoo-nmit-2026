import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";

export function AuthUI({
  isSignIn = true,
  children,
  title = isSignIn ? "Sign In to Account" : "Create New Account",
  subtitle = isSignIn ? "Welcome back! Access your enterprise workforce portal." : "Sign up and get a 30-day free trial with full HR tools.",
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#EDF3EF] flex items-center justify-center p-4 sm:p-8 font-sans">
      
      {/* Outer Floating Modal Card */}
      <div className="w-full max-w-5xl rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#E6F8EE] via-[#F4F7FE] to-[#E9EFF8] border border-white/80 shadow-2xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Top-Right Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-sm flex items-center justify-center transition-all hover:scale-105 border border-gray-100"
          title="Return to Home"
        >
          <X size={18} className="stroke-[2.5]" />
        </button>

        {/* Left Side: Form Area (6 cols) */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 relative z-10">
          
          {/* Brand Header */}
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-2xs">
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
          </div>

          {/* Form Content */}
          <div className="space-y-6 max-w-md w-full">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {subtitle}
              </p>
            </div>

            {children}
          </div>

          {/* Bottom Footer Links */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-4">
            <div>
              {isSignIn ? (
                <span>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-neutral-950 font-black hover:underline">
                    Sign up
                  </Link>
                </span>
              ) : (
                <span>
                  Have any account?{" "}
                  <Link to="/signin" className="text-neutral-950 font-black hover:underline">
                    Sign in
                  </Link>
                </span>
              )}
            </div>
            <a href="#" className="hover:text-neutral-950 hover:underline">
              Terms & Conditions
            </a>
          </div>

        </div>

        {/* Right Side: Professional Visual with Floating Widgets (6 cols) */}
        <div className="hidden lg:block lg:col-span-6 p-4 sm:p-5 relative">
          <div className="w-full h-full rounded-[32px] sm:rounded-[36px] overflow-hidden relative shadow-lg">
            
            {/* Background High-Res Office Photo */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
              alt="Professional collaborative workplace"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

            {/* 1. Top Floating Yellow & Dark Task Pill */}
            <div className="absolute top-6 left-8 z-20 space-y-1.5 animate-slide-up">
              <div className="px-4 py-2.5 rounded-2xl bg-[#D4FF00] text-black shadow-xl flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black leading-tight">Task Review With Team</p>
                  <p className="text-[10px] font-bold opacity-80 font-mono mt-0.5">09:30am - 10:00am</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-black" />
              </div>
              <div className="px-3.5 py-1 rounded-xl bg-neutral-950/90 text-white text-[10px] font-mono font-bold shadow-md w-fit backdrop-blur-sm">
                09:30am - 10:00am
              </div>
            </div>

            {/* 2. Middle Floating Glass Calendar Widget */}
            <div className="absolute right-8 top-1/2 -translate-y-6 z-20 p-5 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/40 text-white shadow-2xl space-y-2.5 max-w-xs">
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-white/90">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-black font-mono">
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span className="p-1 rounded-lg bg-[#D4FF00] text-black font-bold">25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
              </div>
              {/* Pattern Bar */}
              <div className="h-4 rounded-xl bg-white/20 border border-white/30 w-full" />
            </div>

            {/* 3. Bottom Floating White Meeting Card */}
            <div className="absolute bottom-8 left-8 z-20 p-4 rounded-2xl bg-white text-neutral-900 shadow-2xl border border-gray-100 space-y-2.5 max-w-[260px] animate-slide-up">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-neutral-950">Daily Meeting</h4>
                  <p className="text-[11px] text-gray-500 font-mono font-semibold">12:00pm - 01:00pm</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] ring-2 ring-black" />
              </div>

              <div className="flex items-center -space-x-2 pt-1">
                <img
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="avatar"
                />
                <img
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="avatar"
                />
                <img
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80"
                  alt="avatar"
                />
                <div className="w-7 h-7 rounded-full bg-neutral-950 text-[#D4FF00] font-black text-[9px] flex items-center justify-center border-2 border-white">
                  +4
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export function CustomPillInput({
  label,
  error,
  type = "text",
  placeholder,
  ...props
}) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      {label && <label className="text-xs font-bold text-gray-600 pl-3">{label}</label>}
      <div className="relative">
        <input
          type={isPassword ? (showPwd ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full px-6 py-3.5 rounded-full bg-white text-sm text-neutral-900 placeholder:text-gray-400 border border-gray-200/80 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#6B42EF]/40 font-medium transition-all"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neutral-700 transition-colors focus:outline-none"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs pl-3 font-semibold">{error}</p>}
    </div>
  );
}
