import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { payrollApi } from '../../api/payroll.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const EmployeePayroll = () => {
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

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">My Compensation & Payroll</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Itemized transparent breakdown of salary and deductions</p>
      </div>

      {/* Hero Net Salary Card */}
      <div className="card bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-100 text-[#6B42EF] rounded-2xl flex items-center justify-center shadow-2xs">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Monthly Salary</p>
            <p className="text-4xl font-black text-neutral-950 font-mono mt-0.5">{fmt(Number(data.netSalary))}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Effective Date: {new Date(data.effectiveDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="stat-card">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Base Salary</p>
          <p className="text-2xl font-black text-neutral-950 font-mono">{fmt(Number(data.baseSalary))}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingUp size={15} />
            <span>Total Allowances</span>
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">+{fmt(totalAllowances)}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingDown size={15} />
            <span>Total Deductions</span>
          </div>
          <p className="text-2xl font-black text-red-600 font-mono">-{fmt(totalDeductions)}</p>
        </div>
      </div>

      {/* Allowances & Deductions Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(allowances).length > 0 && (
          <div className="card space-y-3">
            <h3 className="text-base font-extrabold text-neutral-950 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" /> Allowances
            </h3>
            <div className="space-y-2 pt-2 divide-y divide-gray-100">
              {Object.entries(allowances).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-gray-600 font-bold capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-emerald-700 font-extrabold font-mono text-sm">+{fmt(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(deductions).length > 0 && (
          <div className="card space-y-3">
            <h3 className="text-base font-extrabold text-neutral-950 flex items-center gap-2">
              <TrendingDown size={18} className="text-red-600" /> Deductions
            </h3>
            <div className="space-y-2 pt-2 divide-y divide-gray-100">
              {Object.entries(deductions).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2.5 text-xs">
                  <span className="text-gray-600 font-bold capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-red-600 font-extrabold font-mono text-sm">-{fmt(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePayroll;
