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

  if (isLoading) return <Loader text="Loading payroll..." />;
  if (isError) return <ErrorState message="Payroll record not found or not yet set up by admin." onRetry={refetch} />;

  const allowances = data.allowances ?? {};
  const deductions = data.deductions ?? {};
  const totalAllowances = Object.values(allowances).reduce((s, v) => s + v, 0);
  const totalDeductions = Object.values(deductions).reduce((s, v) => s + v, 0);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Payroll</h1>
        <p className="text-white/50 text-sm mt-1">Your current salary structure (read-only)</p>
      </div>

      <div className="card bg-gradient-to-br from-emerald-900/30 to-surface-200 border-emerald-500/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
            <DollarSign size={28} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white/50 text-sm">Net Monthly Salary</p>
            <p className="text-4xl font-bold text-white">{fmt(Number(data.netSalary))}</p>
            <p className="text-white/40 text-xs mt-1">Effective: {new Date(data.effectiveDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Base Salary</p>
          <p className="text-2xl font-bold text-white">{fmt(Number(data.baseSalary))}</p>
        </div>
        <div className="stat-card border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-emerald-400 mb-2">
            <TrendingUp size={14} />
            <span className="text-xs uppercase tracking-wider">Total Allowances</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">+{fmt(totalAllowances)}</p>
        </div>
        <div className="stat-card border-red-500/20">
          <div className="flex items-center gap-1.5 text-red-400 mb-2">
            <TrendingDown size={14} />
            <span className="text-xs uppercase tracking-wider">Total Deductions</span>
          </div>
          <p className="text-2xl font-bold text-red-400">-{fmt(totalDeductions)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(allowances).length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-emerald-400" /> Allowances</h3>
            <div className="space-y-2">
              {Object.entries(allowances).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/60 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-emerald-400 font-medium">+{fmt(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {Object.keys(deductions).length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><TrendingDown size={16} className="text-red-400" /> Deductions</h3>
            <div className="space-y-2">
              {Object.entries(deductions).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/60 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-red-400 font-medium">-{fmt(val)}</span>
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
