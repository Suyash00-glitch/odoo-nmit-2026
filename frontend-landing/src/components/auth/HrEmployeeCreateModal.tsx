"use client";

import React, { useState } from "react";
import { generateLoginId, generateSystemPassword, IdBreakdown } from "@/utils/idGenerator";
import IdBreakdownTooltip from "./IdBreakdownTooltip";

interface HrEmployeeCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeCreated?: (employee: { idInfo: IdBreakdown; email: string; tempPass: string }) => void;
}

export default function HrEmployeeCreateModal({
  isOpen,
  onClose,
  onEmployeeCreated,
}: HrEmployeeCreateModalProps) {
  const [companyName, setCompanyName] = useState("Odoo India");
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@dayflow.dev");
  const [department, setDepartment] = useState("Engineering");
  const [joiningYear, setJoiningYear] = useState(2026);
  const [serialNumber, setSerialNumber] = useState(2);
  const [tempPassword, setTempPassword] = useState(() => generateSystemPassword(10));
  const [createdResult, setCreatedResult] = useState<IdBreakdown | null>(null);

  if (!isOpen) return null;

  const currentIdInfo = generateLoginId(companyName, fullName, Number(joiningYear) || 2026, Number(serialNumber) || 1);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setCreatedResult(currentIdInfo);
    if (onEmployeeCreated) {
      onEmployeeCreated({
        idInfo: currentIdInfo,
        email,
        tempPass: tempPassword,
      });
    }
  };

  const handleRegeneratePassword = () => {
    setTempPassword(generateSystemPassword(10));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d111f] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 font-semibold mb-1">
              <span>👑 HR Admin Workspace</span>
            </div>
            <h3 className="text-xl font-bold text-white">Create Employee Account</h3>
            <p className="text-xs text-gray-400">
              System generates Login ID & initial secure password per enterprise rules.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {createdResult ? (
          /* Result state */
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                ✓
              </div>
              <h4 className="text-base font-bold text-emerald-300">Employee Created & Provisioned</h4>
              <p className="text-xs text-gray-300">The employee can now sign in using these generated credentials.</p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Employee Name:</span>
                <span className="text-white font-medium">{fullName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Company & Department:</span>
                <span className="text-purple-300">{companyName} ({department})</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Generated Login ID:</span>
                <span className="font-mono font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
                  {createdResult.fullId}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Auto Password:</span>
                <span className="font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  {tempPassword}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `Login ID: ${createdResult.fullId}\nPassword: ${tempPassword}\nEmail: ${email}`
                  );
                }}
                className="flex-1 btn-purple-gradient py-2.5 text-xs font-bold"
              >
                Copy All Credentials
              </button>
              <button
                onClick={() => setCreatedResult(null)}
                className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-gray-300"
              >
                Create Another
              </button>
            </div>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="auth-input text-xs"
                  placeholder="e.g. Odoo India"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Employee Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="auth-input text-xs"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input text-xs"
                  placeholder="employee@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="auth-input text-xs"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Joining Year</label>
                <input
                  type="number"
                  value={joiningYear}
                  onChange={(e) => setJoiningYear(Number(e.target.value))}
                  className="auth-input text-xs font-mono"
                  min="2000"
                  max="2035"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Serial Number</label>
                <input
                  type="number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(Number(e.target.value))}
                  className="auth-input text-xs font-mono"
                  min="1"
                  max="9999"
                />
              </div>
            </div>

            {/* Live Auto-Generated ID Preview */}
            <div className="pt-1">
              <IdBreakdownTooltip idInfo={currentIdInfo} />
            </div>

            {/* System Generated Password */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                <span className="font-medium">System Generated Initial Password</span>
                <button
                  type="button"
                  onClick={handleRegeneratePassword}
                  className="text-purple-400 hover:text-purple-300 text-[11px] underline flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Regenerate
                </button>
              </div>
              <div className="flex items-center justify-between bg-black/50 border border-amber-500/30 rounded-lg px-3 py-2 text-xs font-mono text-amber-200">
                <span>{tempPassword}</span>
                <span className="text-[10px] text-amber-400 font-sans">1st Login Password</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 btn-purple-gradient py-2.5 text-xs font-bold"
              >
                Create Employee & Assign ID
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
