import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Clock,
  Calendar,
  CreditCard,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Shield,
  Hash,
  Activity,
  FileSpreadsheet,
} from "lucide-react";

const problems = [
  {
    id: "identity",
    problemTag: "Challenge 01 • Onboarding & Identity",
    problemTitle: "Manual spreadsheets and duplicate employee IDs slow down new hires.",
    problemDesc:
      "When onboarding is handled across manual files and disconnected chats, credential assignment takes days, duplicate codes occur, and access permissions become a security hazard.",
    badPoints: [
      "Manual email exchanges for assigning credentials",
      "Confusing employee code collisions",
      "No automated role-based access control",
    ],
    solutionTag: "Dayflow Solution",
    solutionTitle: "Deterministic, Zero-Collision Login ID Provisioning",
    solutionDesc:
      "Dayflow dynamically generates a permanent system Login ID at registration (e.g. OIJODO20260001) with cryptographic password strength and instant role assignment (Employee vs. HR Admin).",
    goodPoints: [
      "Instant algorithmic ID calculation based on company & name codes",
      "Seamless single sign-on across all workspace modules",
      "Strict role enforcement with protected routes",
    ],
  },
  {
    id: "attendance",
    problemTag: "Challenge 02 • Attendance & Time Tracking",
    problemTitle: "Ghost hours, missing biometric logs, and disputed work times.",
    problemDesc:
      "Traditional biometric hardware fails, spreadsheets are prone to manual tampering, and managers waste hours reconciling working hours at month-end.",
    badPoints: [
      "Disputed check-in times and lost biometric logs",
      "Zero real-time visibility into who is active on floor",
      "Manual calculation of daily working hours",
    ],
    solutionTag: "Dayflow Solution",
    solutionTitle: "1-Click Real-Time Attendance with Automated Duration Tracking",
    solutionDesc:
      "Employees check-in and check-out with a single tap. Dayflow calculates precise active hours, tracks weekly logs, and streams live presence metrics directly to the Admin dashboard.",
    goodPoints: [
      "Instant 1-click Check-In / Check-Out",
      "Automated duration calculation in real time",
      "Daily and weekly attendance history logs",
    ],
  },
  {
    id: "leaves-payroll",
    problemTag: "Challenge 03 • Leaves & Payroll Transparency",
    problemTitle: "Back-and-forth email approval chains and opaque salary calculations.",
    problemDesc:
      "Employees don't know their remaining leave balances, approvals get stuck in manager inboxes, and confusing salary slips create endless payroll inquiries.",
    badPoints: [
      "Endless email threads to request 1 day off",
      "No clear visibility into Paid, Sick, and Unpaid balances",
      "Unclear deductions for tax, PF, and allowances",
    ],
    solutionTag: "Dayflow Solution",
    solutionTitle: "Unified Leave Approval System & Full Compensation Breakdown",
    solutionDesc:
      "Employees apply for Paid, Sick, or Unpaid leaves with instant status tracking. Admins approve or reject in one click with reviewer comments. Transparent breakdown of base pay, HRA, and PF deductions.",
    goodPoints: [
      "1-click Approve / Reject with reviewer feedback",
      "Automatic remaining quota calculation",
      "Transparent salary breakdown (Base + Allowances - Deductions)",
    ],
  },
];

export default function ProblemArc() {
  const [activeTab, setActiveTab] = useState(0);
  const current = problems[activeTab];

  return (
    <section id="workflow" className="py-24 px-6 bg-white dark:bg-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-neutral-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <span>Workforce Challenges vs Dayflow Modern Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Built to replace broken HR spreadsheets.
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base">
            Every HR process is streamlined into an intuitive, high-speed dashboard designed for both employees and HR leaders.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto p-1.5 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
          {problems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[160px] py-2.5 px-4 rounded-lg text-xs font-semibold transition-all text-center ${
                activeTab === idx
                  ? "bg-white dark:bg-white text-slate-900 dark:text-black shadow-md"
                  : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-900"
              }`}
            >
              {item.id === "identity" && "01. Onboarding & IDs"}
              {item.id === "attendance" && "02. Live Attendance"}
              {item.id === "leaves-payroll" && "03. Leaves & Payroll"}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: The Old Broken Way */}
          <div className="p-8 rounded-2xl bg-red-50/50 dark:bg-neutral-950/80 border border-red-200 dark:border-red-900/30 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>{current.problemTag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {current.problemTitle}
              </h3>
              <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                {current.problemDesc}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-red-100 dark:border-neutral-900">
              <p className="text-xs font-semibold text-slate-700 dark:text-neutral-400 uppercase tracking-wider">Common Pain Points:</p>
              {current.badPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-300">
                  <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Dayflow Solution */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 dark:from-neutral-950 dark:via-[#0f1422] dark:to-neutral-950 border border-purple-300 dark:border-purple-500/30 flex flex-col justify-between space-y-6 shadow-xl dark:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>{current.solutionTag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {current.solutionTitle}
              </h3>
              <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                {current.solutionDesc}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-purple-200/60 dark:border-white/10 relative z-10">
              <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Dayflow Advantage:</p>
              {current.goodPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA bar */}
        <div className="text-center pt-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <span>Experience the workflow in action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
