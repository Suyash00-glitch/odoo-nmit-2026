"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthHeader from "./AuthHeader";
import IdBreakdownTooltip from "./IdBreakdownTooltip";
import CredentialSuccessModal from "./CredentialSuccessModal";
import HrEmployeeCreateModal from "./HrEmployeeCreateModal";
import {
  generateLoginId,
  generateSystemPassword,
  calculatePasswordStrength,
  IdBreakdown,
} from "@/utils/idGenerator";

interface AuthPageProps {
  initialMode?: "signin" | "signup";
}

export default function AuthPage({ initialMode = "signin" }: AuthPageProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  
  // Sign In Form States
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInFeedback, setSignInFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Sign Up Form States
  const [companyName, setCompanyName] = useState("Odoo India");
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@odoo.in");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{
    idInfo: IdBreakdown;
    tempPass?: string;
    email: string;
  } | null>(null);
  const [showHrToolModal, setShowHrToolModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // Live Digital Clock for Left Dashboard Widget
  const [currentTime, setCurrentTime] = useState<string>("");
  const [attendanceCheckedIn, setAttendanceCheckedIn] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live Auto-Generated Login ID for the Sign Up form
  const dynamicIdInfo = generateLoginId(
    companyName || "Odoo India",
    fullName || "John Doe",
    2026,
    1
  );

  const pwdStrength = calculatePasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Demo Login fill helper
  const handleQuickDemoFill = (id: string, pass: string) => {
    setLoginIdentifier(id);
    setLoginPassword(pass);
    setSignInFeedback({
      type: "success",
      message: `Demo credentials loaded for ${id}. Click SIGN IN to enter.`,
    });
    setTimeout(() => setSignInFeedback(null), 3500);
  };

  // Sign In submit handler
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setSignInFeedback({
        type: "error",
        message: "Please enter your Login ID / Email and password.",
      });
      return;
    }

    setIsSigningIn(true);
    setSignInFeedback(null);

    // Simulate authentication
    setTimeout(() => {
      setIsSigningIn(false);
      setSignInFeedback({
        type: "success",
        message: `Welcome back, ${loginIdentifier}! Authenticated successfully.`,
      });
    }, 1000);
  };

  // Sign Up submit handler
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match! Please check and retry.");
      return;
    }

    setIsSigningUp(true);

    setTimeout(() => {
      setIsSigningUp(false);
      setCreatedCredentials({
        idInfo: dynamicIdInfo,
        tempPass: password,
        email: email,
      });
      setShowSuccessModal(true);
    }, 1100);
  };

  // Callback when user clicks "Proceed to Sign In" in success modal
  const handleProceedToLogin = (loginId: string, pass?: string) => {
    setShowSuccessModal(false);
    setMode("signin");
    setLoginIdentifier(loginId);
    if (pass) setLoginPassword(pass);
    setSignInFeedback({
      type: "success",
      message: `New Login ID ${loginId} auto-populated! Enter password to sign in.`,
    });
  };

  // Detect if identifier looks like generated ID vs email
  const isGeneratedIdFormat = /^[A-Z]{6}\d{8}$/i.test(loginIdentifier.trim());
  const isEmailFormat = loginIdentifier.includes("@");

  return (
    <div className="min-h-screen auth-bg text-gray-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* Background ambient lighting effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Header */}
      <AuthHeader />

      {/* Main Split Layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 z-10 max-w-7xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: Modern SaaS HR Showcase & Metrics
             ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold purple-glow-badge mb-4">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                <span>Dayflow NextGen HRMS</span>
              </div>

              {/* Title & description */}
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Intelligent Workforce Management &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300">
                  Automated HR Operations
                </span>
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Streamline employee onboarding, attendance tracking with auto-generated enterprise IDs, leave approvals, and payroll in one dark-mode SaaS dashboard.
              </p>
            </div>

            {/* Live Interactive HR Dashboard Preview Widgets */}
            <div className="space-y-4">
              
              {/* Widget 1: Live Punch In / Punch Out Card */}
              <div className="auth-glass-card p-4 rounded-xl border border-purple-500/20 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Live Attendance Punch</h4>
                      <p className="text-[10px] text-gray-400">Biometric & Geo-fenced</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-purple-300 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                    {currentTime || "10:45:00 AM"}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-black/40 rounded-lg p-2.5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${attendanceCheckedIn ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`}></span>
                    <span className="text-xs font-medium text-gray-200">
                      {attendanceCheckedIn ? "Status: Checked In (09:02 AM)" : "Status: Checked Out"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttendanceCheckedIn(!attendanceCheckedIn)}
                    className="text-[11px] px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 font-medium transition-colors border border-purple-500/30"
                  >
                    {attendanceCheckedIn ? "Punch Out" : "Punch In"}
                  </button>
                </div>
              </div>

              {/* Widget 2: Live ID Generation Feature Highlight */}
              <div className="auth-glass-card p-4 rounded-xl border border-indigo-500/20 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    Smart Auto-ID Provisioning
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide">Format Rule</span>
                </div>
                <div className="p-2.5 bg-black/40 rounded-lg border border-white/5 font-mono text-xs text-purple-200 flex justify-between items-center">
                  <span>[OI] [JODO] [2026] [0001]</span>
                  <span className="text-[10px] text-emerald-400 font-sans">✓ Auto Generated</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  Employees never manually create accounts. HR Admins provision team IDs with automatically generated secure initial passwords.
                </p>
              </div>

              {/* Widget 3: Key Stats & Security Proof */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="text-base font-bold text-white font-mono">99.4%</div>
                  <div className="text-[10px] text-gray-400">Attendance Uptime</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="text-base font-bold text-purple-300 font-mono">&lt; 1 sec</div>
                  <div className="text-[10px] text-gray-400">Auto-ID Generation</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="text-base font-bold text-emerald-400 font-mono">256-bit</div>
                  <div className="text-[10px] text-gray-400">JWT Encryption</div>
                </div>
              </div>

            </div>

            {/* Quick HR Admin Feature Note Link */}
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span className="text-xs text-gray-300 font-medium">HR Admin creating an employee?</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHrToolModal(true)}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline"
              >
                Open Generator Tool →
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: Dribbble-Style SaaS Dark Auth Form
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-lg auth-glass-card rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              {/* App / Web Logo & Heading */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1.5px] shadow-lg shadow-purple-500/30">
                  <div className="w-full h-full bg-[#0d111d] rounded-[14px] flex items-center justify-center">
                    {companyLogo && mode === "signup" ? (
                      <img src={companyLogo} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
                    ) : (
                      <svg className="w-7 h-7 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {mode === "signin" ? "Sign In to Your Workspace" : "Register Your Organization"}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {mode === "signin"
                    ? "Enter your system-generated Login ID or email to access HR portal"
                    : "Create company workspace & auto-generate primary Admin Login ID"}
                </p>
              </div>

              {/* Mode Toggle Switch Pills */}
              <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl border border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setSignInFeedback(null);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    mode === "signin"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/50"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setSignInFeedback(null);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    mode === "signup"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/50"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign Up (Company)
                </button>
              </div>

              {/* Feedback banner */}
              {signInFeedback && (
                <div
                  className={`mb-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
                    signInFeedback.type === "success"
                      ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-300"
                      : "bg-rose-950/50 border border-rose-500/40 text-rose-300"
                  }`}
                >
                  <span>{signInFeedback.type === "success" ? "✓" : "⚠"}</span>
                  <span>{signInFeedback.message}</span>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  VIEW A: SIGN IN FORM
                 ───────────────────────────────────────────────────────────── */}
              {mode === "signin" ? (
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  {/* Login ID / Email Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-gray-300">
                        Login ID / Email <span className="text-purple-400">*</span>
                      </label>
                      {isGeneratedIdFormat && (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Generated Employee ID Format Detected
                        </span>
                      )}
                      {isEmailFormat && (
                        <span className="text-[10px] text-purple-400 font-mono">
                          Corporate Email Login
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. OIJODO20260001 or admin@dayflow.dev"
                        className="auth-input pl-10 text-xs sm:text-sm font-sans"
                        required
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Supports both system-generated Login IDs (e.g. <span className="font-mono text-gray-400">OIJODO20260001</span>) and email addresses.
                    </p>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-gray-300">
                        Password <span className="text-purple-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="auth-input pl-10 pr-10 text-xs sm:text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200"
                        title={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded bg-black/40 border-white/20 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 w-4 h-4"
                      />
                      <span className="text-xs text-gray-400">Remember this device</span>
                    </label>
                  </div>

                  {/* SIGN IN BUTTON */}
                  <button
                    type="submit"
                    disabled={isSigningIn}
                    className="w-full py-3.5 btn-purple-gradient text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 mt-2"
                  >
                    {isSigningIn ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>SIGN IN</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Switch to Sign Up */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="text-xs text-gray-400 hover:text-purple-300 transition-colors"
                    >
                      Don't have an Account? <span className="text-purple-400 font-semibold underline">Sign Up</span>
                    </button>
                  </div>

                  {/* ─────────────────────────────────────────────────────────
                      Fast Hackathon Demo Login Buttons
                     ───────────────────────────────────────────────────────── */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                        ⚡ Quick Demo Logins:
                      </span>
                      <span className="text-[10px] text-purple-400">1-Click Auto-Fill</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoFill("admin@dayflow.dev", "password123")}
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-purple-900/30 border border-white/10 hover:border-purple-500/40 text-left transition-all text-xs group"
                      >
                        <div className="font-bold text-purple-300 group-hover:text-purple-200">👑 Admin</div>
                        <div className="text-[10px] text-gray-500 truncate">admin@dayflow.dev</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickDemoFill("alice.johnson@dayflow.dev", "password123")}
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-purple-900/30 border border-white/10 hover:border-purple-500/40 text-left transition-all text-xs group"
                      >
                        <div className="font-bold text-sky-300 group-hover:text-sky-200">👤 Employee</div>
                        <div className="text-[10px] text-gray-500 truncate">alice.johnson@dayflow.dev</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickDemoFill("OIJODO20260001", "password123")}
                        className="p-2 rounded-lg bg-white/[0.03] hover:bg-purple-900/30 border border-white/10 hover:border-purple-500/40 text-left transition-all text-xs group"
                      >
                        <div className="font-bold text-emerald-300 group-hover:text-emerald-200">🆔 Login ID</div>
                        <div className="text-[10px] text-gray-500 truncate">OIJODO20260001</div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* ─────────────────────────────────────────────────────────────
                    VIEW B: SIGN UP FORM (With Live System ID Breakdown)
                   ───────────────────────────────────────────────────────────── */
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                  
                  {/* Row 1: Company Name + Upload Logo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300">
                      Company Name <span className="text-purple-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Odoo India"
                          className="auth-input pl-9 text-xs sm:text-sm"
                          required
                        />
                      </div>

                      {/* Upload Logo Button */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-[#141a2e] hover:bg-purple-900/40 border border-purple-500/30 rounded-lg text-purple-300 hover:text-purple-200 text-xs font-medium flex items-center gap-1.5 transition-colors flex-shrink-0"
                        title="Upload Company Logo"
                      >
                        {companyLogo ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            ✓ <span className="hidden sm:inline">Uploaded</span>
                          </span>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="hidden sm:inline">Upload Logo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Full Name (First & Last name for Initial calculation) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Full Name (Admin / HR Lead) <span className="text-purple-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. John Doe (First & Last Name)"
                        className="auth-input pl-9 text-xs sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Work Email <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@company.com"
                        className="auth-input text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Phone Number <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="auth-input text-xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 4: Password + Confirm Password with View toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Password <span className="text-purple-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 8 characters"
                          className="auth-input pr-8 text-xs"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-200"
                        >
                          {showPassword ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Confirm Password <span className="text-purple-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="auth-input pr-8 text-xs"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-200"
                        >
                          {showConfirmPassword ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password strength & match indicator */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-400">Strength: {pwdStrength.label}</span>
                        {confirmPassword && (
                          <span className={passwordsMatch ? "text-emerald-400" : "text-rose-400"}>
                            {passwordsMatch ? "✓ Passwords Match" : "✕ Passwords Do Not Match"}
                          </span>
                        )}
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                          style={{ width: `${pwdStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* ─────────────────────────────────────────────────────────
                      LIVE AUTO-GENERATED LOGIN ID COMPONENT (WIRE-FRAME FEATURE)
                     ───────────────────────────────────────────────────────── */}
                  <div className="pt-2">
                    <IdBreakdownTooltip idInfo={dynamicIdInfo} />
                  </div>

                  {/* SIGN UP BUTTON */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-3.5 btn-purple-gradient text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 mt-3"
                  >
                    {isSigningUp ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Provisioning Account & Generating ID...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign Up</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Switch to Sign In */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="text-xs text-gray-400 hover:text-purple-300 transition-colors"
                    >
                      Already have an account ? <span className="text-purple-400 font-semibold underline">Sign In</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          MODALS & DRAWERS
         ───────────────────────────────────────────────────────────── */}
      
      {/* 1. Account Created Credential Success Modal */}
      {createdCredentials && (
        <CredentialSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          idInfo={createdCredentials.idInfo}
          generatedPassword={createdCredentials.tempPass}
          email={createdCredentials.email}
          onProceedToLogin={handleProceedToLogin}
        />
      )}

      {/* 2. HR Admin "Create Employee" Simulator Modal (Note Specification) */}
      <HrEmployeeCreateModal
        isOpen={showHrToolModal}
        onClose={() => setShowHrToolModal(false)}
        onEmployeeCreated={(newEmp) => {
          // Can auto populate login if desired
        }}
      />

      {/* 3. Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#0d111f] border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Reset Password</h3>
            <p className="text-xs text-gray-400 mb-4">
              Enter your corporate email or Login ID to receive a secure recovery code.
            </p>

            {forgotSent ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 mb-4">
                ✓ A reset link has been dispatched to {forgotEmail || "your registered email address"}.
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your Login ID (e.g. OIJODO20260001) or Email"
                  className="auth-input text-xs"
                />
              </div>
            )}

            <div className="flex gap-2">
              {!forgotSent ? (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="flex-1 btn-purple-gradient py-2 text-xs font-bold"
                >
                  Send Recovery Link
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setForgotSent(false);
                  }}
                  className="flex-1 btn-purple-gradient py-2 text-xs font-bold"
                >
                  Done
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setForgotSent(false);
                }}
                className="px-3 py-2 rounded-lg border border-white/10 text-xs text-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-white/5 bg-[#07090e]/60 z-10">
        Dayflow HRMS • Secure Enterprise Authentication System • Hackathon Edition 2026
      </footer>
    </div>
  );
}
