import React from "react";
import { Users, Clock, Calendar, DollarSign, ShieldCheck, CheckCircle2, BarChart3 } from "lucide-react";

export default function MarqueeBar() {
  const capabilities = [
    { name: "Employee Management", icon: Users },
    { name: "Attendance Tracking", icon: Clock },
    { name: "Leave Management", icon: Calendar },
    { name: "Payroll Visibility", icon: DollarSign },
    { name: "Role-Based Access", icon: ShieldCheck },
    { name: "Approval Workflows", icon: CheckCircle2 },
    { name: "HR Analytics", icon: BarChart3 },
  ];

  return (
    <div className="py-8 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {capabilities.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50/80 border border-purple-100 text-[#6B42EF] text-xs font-bold hover:bg-purple-100 transition-colors shadow-2xs cursor-default"
              >
                <div className="w-4 h-4 rounded-full bg-[#6B42EF] flex items-center justify-center text-white">
                  <Icon size={10} />
                </div>
                <span>{p.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
