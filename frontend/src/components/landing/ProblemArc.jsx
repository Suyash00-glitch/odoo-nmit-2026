import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
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
    <section id="workflow" className="py-24 px-6 bg-white text-neutral-900 border-t border-gray-200/80">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
            <span>Workforce Challenges vs Dayflow Modern Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
            Built to replace broken HR spreadsheets.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Every HR process is streamlined into an intuitive, high-speed dashboard designed for both employees and HR leaders.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto p-1 rounded-2xl bg-gray-100 border border-gray-200">
          {problems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[150px] py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center ${
                activeTab === idx
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-gray-600 hover:text-neutral-950 hover:bg-white/60"
              }`}
            >
              {item.id === "identity" && "01. Onboarding & IDs"}
              {item.id === "attendance" && "02. Live Attendance"}
              {item.id === "leaves-payroll" && "03. Leaves & Payroll"}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Left: The Old Broken Way */}
          <div className="p-8 rounded-2xl bg-[#F7F7F5] border border-gray-200/90 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>{current.problemTag}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-950 leading-snug">
                {current.problemTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {current.problemDesc}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gray-200">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Common Pain Points:</p>
              {current.badPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Dayflow Solution */}
          <div className="p-8 rounded-2xl bg-white border border-gray-300 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>{current.solutionTag}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-950 leading-snug">
                {current.solutionTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {current.solutionDesc}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              <p className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider">Dayflow Advantage:</p>
              {current.goodPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA bar */}
        <div className="text-center pt-2">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-black transition-colors"
          >
            <span>Experience the workflow in action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
