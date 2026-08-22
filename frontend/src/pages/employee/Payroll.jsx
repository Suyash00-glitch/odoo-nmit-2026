import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { payrollApi } from '../../api/payroll.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import Modal from '../../components/common/Modal.jsx';
import { DollarSign, TrendingUp, TrendingDown, Printer, FileText, CheckCircle2, Building2 } from 'lucide-react';

const EmployeePayroll = () => {
  const [showSlip, setShowSlip] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['payroll-me'],
    queryFn: () => payrollApi.getMyPayroll().then(r => r.data.data),
  });

  if (isLoading) return <Loader text="Loading payroll structure..." />;
  if (isError) return <ErrorState message="Payroll structure has not yet been configured by HR." onRetry={refetch} />;

  const allowances = data.allowances ?? {};
  const deductions = data.deductions ?? {};
  const totalAllowances = Object.values(allowances).reduce((s, v) => s + Number(v), 0);
  const totalDeductions = Object.values(deductions).reduce((s, v) => s + Number(v), 0);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(v));

  const employeeName = data.employee?.profile
    ? `${data.employee.profile.firstName} ${data.employee.profile.lastName}`
    : 'Employee';
  const employeeId = data.employee?.employeeId || 'EMP-001';
  const department = data.employee?.profile?.department || 'General Operations';
  const jobTitle = data.employee?.profile?.jobTitle || 'Team Member';

  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Compensation & Payroll</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">Itemized transparent breakdown of salary, allowances, and statutory deductions</p>
        </div>
        <button
          onClick={() => setShowSlip(true)}
          className="btn-primary flex items-center gap-2 py-2.5 px-5 text-xs font-bold shadow-xs"
          id="view-salary-slip-btn"
        >
          <FileText size={15} />
          <span>View Official Payslip</span>
        </button>
      </div>

      {/* Hero Net Salary Card */}
      <div className="card">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center shadow-2xs">
              <DollarSign size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Monthly Take-Home Pay</p>
              <p className="text-4xl font-black text-slate-950 font-mono mt-0.5">{fmt(data.netSalary)}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Effective Date: {new Date(data.effectiveDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={() => setShowSlip(true)}
            className="btn-secondary text-xs font-bold py-2.5 px-4 flex items-center gap-1.5 shadow-2xs"
          >
            <Printer size={14} />
            <span>Print Payslip</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="stat-card">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Base Monthly Salary</p>
          <p className="text-2xl font-black text-slate-950 font-mono">{fmt(data.baseSalary)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingUp size={15} />
            <span>Total Allowances</span>
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">+{fmt(totalAllowances)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingDown size={15} />
            <span>Statutory Deductions</span>
          </div>
          <p className="text-2xl font-black text-rose-600 font-mono">-{fmt(totalDeductions)}</p>
        </div>
      </div>

      {/* Allowances & Deductions Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(allowances).length > 0 && (
          <div className="card space-y-3">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" /> Allowances Breakdown
            </h3>
            <div className="space-y-2 pt-2 divide-y divide-slate-100">
              {Object.entries(allowances).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-slate-600 font-bold capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-emerald-700 font-extrabold font-mono text-sm">+{fmt(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(deductions).length > 0 && (
          <div className="card space-y-3">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <TrendingDown size={18} className="text-rose-600" /> Statutory Deductions
            </h3>
            <div className="space-y-2 pt-2 divide-y divide-slate-100">
              {Object.entries(deductions).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-slate-600 font-bold capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-rose-600 font-extrabold font-mono text-sm">-{fmt(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Printable Salary Slip Modal */}
      <Modal isOpen={showSlip} onClose={() => setShowSlip(false)} title={`Salary Slip — ${currentMonthYear}`} size="lg">
        <div className="p-6 bg-white space-y-6 text-slate-900 font-sans printable-slip">
          {/* Slip Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-950">
            <div>
              <h2 className="text-xl font-black text-slate-950 tracking-tight">DAYFLOW HRMS</h2>
              <p className="text-xs text-slate-500 font-semibold">Human Resource & Compensation Division</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-[#D4FF00] text-black font-black text-xs rounded-full">OFFICIAL PAYSLIP</span>
              <p className="text-xs font-mono font-bold text-slate-600 mt-1">Period: {currentMonthYear}</p>
            </div>
          </div>

          {/* Employee Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Employee Name</p>
              <p className="font-extrabold text-slate-950 mt-0.5">{employeeName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Employee ID</p>
              <p className="font-mono font-bold text-slate-950 mt-0.5">{employeeId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Department</p>
              <p className="font-bold text-slate-950 mt-0.5">{department}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[10px]">Designation</p>
              <p className="font-bold text-slate-950 mt-0.5">{jobTitle}</p>
            </div>
          </div>

          {/* Earnings vs Deductions Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Earnings */}
            <div className="border border-slate-200 rounded-2xl p-4 space-y-2.5">
              <p className="text-xs font-black text-emerald-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Earnings (Gross)
              </p>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-600">Base Salary</span>
                <span className="font-mono font-bold text-slate-950">{fmt(data.baseSalary)}</span>
              </div>
              {Object.entries(allowances).map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs py-1 border-t border-slate-50">
                  <span className="text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                  <span className="font-mono font-bold text-slate-950">{fmt(v)}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs pt-2 border-t border-slate-200 font-black text-emerald-700">
                <span>Total Earnings</span>
                <span>{fmt(Number(data.baseSalary) + totalAllowances)}</span>
              </div>
            </div>

            {/* Deductions */}
            <div className="border border-slate-200 rounded-2xl p-4 space-y-2.5">
              <p className="text-xs font-black text-rose-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Deductions (Statutory)
              </p>
              {Object.entries(deductions).map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs py-1 border-t first:border-0 border-slate-50">
                  <span className="text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                  <span className="font-mono font-bold text-slate-950">{fmt(v)}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs pt-2 border-t border-slate-200 font-black text-rose-600">
                <span>Total Deductions</span>
                <span>{fmt(totalDeductions)}</span>
              </div>
            </div>
          </div>

          {/* Net Salary Total */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-emerald-900 uppercase tracking-wide">Net Take-Home Pay</p>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">Disbursed directly via Direct Bank Deposit</p>
            </div>
            <p className="text-3xl font-black text-emerald-700 font-mono">{fmt(data.netSalary)}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="btn-primary flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Printer size={15} />
              <span>Print Official Payslip</span>
            </button>
            <button
              onClick={() => setShowSlip(false)}
              className="btn-secondary py-3 px-5 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeePayroll;
