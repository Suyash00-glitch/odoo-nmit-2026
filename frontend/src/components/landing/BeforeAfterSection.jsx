import React from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Clock,
  FileSpreadsheet,
  Zap,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function BeforeAfterSection() {
  const comparisonItems = [
    {
      metric: "Employee Onboarding",
      before: "3+ days of back-and-forth emails to assign employee codes and credentials",
      after: "Instant algorithmic Login ID generated live upon registration",
    },
    {
      metric: "Daily Attendance",
      before: "Manual biometric logs with disputed hours and zero floor visibility",
      after: "1-click live Check-In / Check-Out with real-time active duration tracker",
    },
    {
      metric: "Leave Approvals",
      before: "Requests lost in email inboxes with unclear remaining quota",
      after: "1-click Approve / Reject workflow with live balance updates and reviewer notes",
    },
    {
      metric: "Payroll & Deductions",
      before: "Complex spreadsheets prone to calculation mistakes on HRA, PF, and Tax",
      after: "Transparent salary structure breakdown (Base + Allowances - Deductions)",
    },
    {
      metric: "Executive Analytics",
      before: "Hours spent compiling manual headcount reports at month-end",
      after: "Interactive real-time dashboards with Recharts attendance trends",
    },
  ];

  return (
    <section id="transformation" className="py-24 px-6 bg-black text-white border-t border-neutral-900">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <span>The Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Before vs. After Dayflow HRMS
          </h2>
          <p className="text-neutral-400 text-sm">
            See the measurable impact of replacing disjointed tools with a unified HR workspace.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="space-y-3">
          {comparisonItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-xl bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-all items-center"
            >
              {/* Category */}
              <div className="md:col-span-3">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  {item.metric}
                </span>
              </div>

              {/* Before */}
              <div className="md:col-span-4 flex items-start gap-2.5 text-xs text-neutral-400 bg-red-950/10 p-3 rounded-lg border border-red-900/20">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{item.before}</span>
              </div>

              {/* After */}
              <div className="md:col-span-5 flex items-start gap-2.5 text-xs text-neutral-100 bg-emerald-950/10 p-3 rounded-lg border border-emerald-500/20">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white">
            Ready to upgrade your workforce operations?
          </h3>
          <p className="text-xs text-neutral-400">
            Join modern organizations managing headcount, leaves, attendance, and payroll in one place.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/signin"
              className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
            >
              Test with Demo Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
