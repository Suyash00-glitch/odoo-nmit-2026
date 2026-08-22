import React from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

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
    <section id="transformation" className="py-24 px-6 bg-[#F7F7F5] text-neutral-900 border-t border-gray-200/80">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <span>The Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
            Before vs. After Dayflow HRMS
          </h2>
          <p className="text-gray-500 text-sm">
            See the measurable impact of replacing disjointed tools with a unified HR workspace.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="space-y-3">
          {comparisonItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs items-center"
            >
              {/* Category */}
              <div className="md:col-span-3">
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  {item.metric}
                </span>
              </div>

              {/* Before */}
              <div className="md:col-span-4 flex items-start gap-2.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200/60">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{item.before}</span>
              </div>

              {/* After */}
              <div className="md:col-span-5 flex items-start gap-2.5 text-xs text-neutral-900 font-medium bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/70">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="p-8 rounded-2xl bg-white border border-gray-200/90 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <h3 className="text-xl font-bold text-neutral-950">
            Ready to upgrade your workforce operations?
          </h3>
          <p className="text-xs text-gray-500">
            Join modern organizations managing headcount, leaves, attendance, and payroll in one place.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/signin"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-colors shadow-xs active:scale-95"
            >
              Test with Demo Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
