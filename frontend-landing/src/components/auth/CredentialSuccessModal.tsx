"use client";

import React, { useState } from "react";
import { IdBreakdown } from "@/utils/idGenerator";

interface CredentialSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  idInfo: IdBreakdown;
  generatedPassword?: string;
  email: string;
  role?: string;
  onProceedToLogin: (loginId: string, password?: string) => void;
}

export default function CredentialSuccessModal({
  isOpen,
  onClose,
  idInfo,
  generatedPassword,
  email,
  role = "Administrator / HR Officer",
  onProceedToLogin,
}: CredentialSuccessModalProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPwd, setCopiedPwd] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: "id" | "pwd") => {
    navigator.clipboard?.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPwd(true);
      setTimeout(() => setCopiedPwd(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0d111f] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Success Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-center text-white mb-1">
          Account Created Successfully!
        </h3>
        <p className="text-xs text-center text-gray-400 mb-6">
          Your organization and primary login credentials have been provisioned by Dayflow HRMS.
        </p>

        {/* Credentials Card */}
        <div className="space-y-3.5 bg-black/40 border border-white/10 rounded-xl p-4 mb-6">
          {/* Organization & User */}
          <div className="flex justify-between items-center text-xs pb-2.5 border-b border-white/5">
            <span className="text-gray-400">Company & Role</span>
            <span className="font-medium text-purple-300">
              {idInfo.companyName} ({role})
            </span>
          </div>

          {/* Generated Login ID */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Auto-Generated Login ID
              </span>
              <span className="text-[11px] text-purple-400 font-mono">Formula Applied</span>
            </div>
            <div className="flex items-center justify-between bg-[#141b2d] border border-purple-500/30 rounded-lg px-3 py-2 font-mono text-purple-200 text-sm font-bold">
              <span>{idInfo.fullId}</span>
              <button
                onClick={() => copyToClipboard(idInfo.fullId, "id")}
                className="px-2 py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-sans transition-colors"
              >
                {copiedId ? "Copied! ✓" : "Copy ID"}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Registered Email</span>
            <span className="font-mono text-gray-300">{email}</span>
          </div>

          {/* Auto-Generated Temporary Password (if provided) */}
          {generatedPassword && (
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  System-Generated Temporary Password
                </span>
                <span className="text-[10px] text-amber-400">Change on first login</span>
              </div>
              <div className="flex items-center justify-between bg-[#141b2d] border border-amber-500/30 rounded-lg px-3 py-2 font-mono text-amber-200 text-sm font-bold">
                <span>{generatedPassword}</span>
                <button
                  onClick={() => copyToClipboard(generatedPassword, "pwd")}
                  className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-sans transition-colors"
                >
                  {copiedPwd ? "Copied! ✓" : "Copy Password"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Note from specification */}
        <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-lg text-[11px] text-gray-300 mb-6 flex gap-2.5">
          <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <strong className="text-purple-300">System Policy:</strong> You can log in using either your generated <span className="font-mono text-purple-300">{idInfo.fullId}</span> or your registered email address.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onProceedToLogin(idInfo.fullId, generatedPassword)}
            className="flex-1 btn-purple-gradient py-3 text-sm font-bold flex items-center justify-center gap-2"
          >
            <span>Proceed to Sign In</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
