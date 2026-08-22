import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeesApi } from '../../api/employees.api.js';
import { payrollApi } from '../../api/payroll.api.js';
import { SkeletonRow } from '../../components/common/Loader.jsx';
import { ErrorState, EmptyState } from '../../components/common/ErrorState.jsx';
import Modal from '../../components/common/Modal.jsx';
import toast from 'react-hot-toast';
import { DollarSign, Edit3, Loader2, Save, Search, FileText, Printer } from 'lucide-react';

const payrollSchema = z.object({
  baseSalary: z.coerce.number().positive('Base salary must be positive'),
  effectiveDate: z.string().min(1),
  hra: z.coerce.number().min(0).optional(),
  transport: z.coerce.number().min(0).optional(),
  medical: z.coerce.number().min(0).optional(),
  tax: z.coerce.number().min(0).optional(),
  pf: z.coerce.number().min(0).optional(),
});

const AdminPayroll = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);
  const [slipEmployee, setSlipEmployee] = useState(null);

  React.useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['employees-payroll', debouncedSearch],
    queryFn: () => employeesApi.getAll({ limit: 20, search: debouncedSearch || undefined }).then(r => r.data.data),
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(payrollSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ id, values }) =>
      payrollApi.updatePayroll(id, {
        baseSalary: values.baseSalary,
        effectiveDate: values.effectiveDate,
        allowances: { hra: values.hra ?? 0, transport: values.transport ?? 0, medical: values.medical ?? 0 },
        deductions: { tax: values.tax ?? 0, pf: values.pf ?? 0 },
      }),
    onSuccess: () => {
      toast.success('Payroll updated successfully!');
      qc.invalidateQueries({ queryKey: ['employees-payroll'] });
      setEditEmployee(null);
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Update failed'),
  });

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(v || 0));

  const openEdit = (emp) => {
    setEditEmployee(emp);
    const p = emp.payroll;
    const allowances = p?.allowances ?? {};
    const deductions = p?.deductions ?? {};
    reset({
      baseSalary: Number(p?.baseSalary ?? 5000),
      effectiveDate: p?.effectiveDate ? new Date(p.effectiveDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      hra: allowances.hra ?? 800,
      transport: allowances.transport ?? 300,
      medical: allowances.medical ?? 200,
      tax: deductions.tax ?? 400,
      pf: deductions.pf ?? 150,
    });
  };

  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">Payroll & Compensation</h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">Configure and inspect salary structures across all employees</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input id="payroll-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." className="input-field pl-10 text-xs" />
      </div>

      {/* Edit Payroll Modal */}
      <Modal isOpen={!!editEmployee} onClose={() => setEditEmployee(null)} title={`Edit Payroll — ${editEmployee?.profile?.firstName} ${editEmployee?.profile?.lastName}`} size="lg">
        <form onSubmit={handleSubmit(v => mutation.mutate({ id: editEmployee.id, values: v }))} id="admin-payroll-form" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label text-xs font-bold text-slate-700">Base Monthly Salary ($)</label><input type="number" {...register('baseSalary')} className="input-field text-xs" id="admin-base-salary" /></div>
            <div><label className="label text-xs font-bold text-slate-700">Effective Date</label><input type="date" {...register('effectiveDate')} className="input-field text-xs" /></div>
          </div>
          
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pt-1">Allowances (Monthly)</p>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="label text-xs font-bold text-slate-600">HRA ($)</label><input type="number" {...register('hra')} className="input-field text-xs" /></div>
            <div><label className="label text-xs font-bold text-slate-600">Transport ($)</label><input type="number" {...register('transport')} className="input-field text-xs" /></div>
            <div><label className="label text-xs font-bold text-slate-600">Medical ($)</label><input type="number" {...register('medical')} className="input-field text-xs" /></div>
          </div>

          <p className="text-xs font-extrabold uppercase tracking-wider text-rose-600 pt-1">Deductions (Monthly)</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label text-xs font-bold text-slate-600">Tax ($)</label><input type="number" {...register('tax')} className="input-field text-xs" /></div>
            <div><label className="label text-xs font-bold text-slate-600">Provident Fund ($)</label><input type="number" {...register('pf')} className="input-field text-xs" /></div>
          </div>

          <button type="submit" disabled={isSubmitting || mutation.isPending} className="btn-primary w-full py-3 text-xs font-bold shadow-xs mt-2" id="save-admin-payroll-btn">
            {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payroll Structure
          </button>
        </form>
      </Modal>

      {/* View Payslip Modal */}
      <Modal isOpen={!!slipEmployee} onClose={() => setSlipEmployee(null)} title={`Salary Slip — ${slipEmployee?.profile?.firstName} ${slipEmployee?.profile?.lastName}`} size="lg">
        {slipEmployee && (
          <div className="p-6 bg-white space-y-6 text-slate-900 font-sans">
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-950">
              <div>
                <h2 className="text-xl font-black text-slate-950 tracking-tight">DAYFLOW HRMS</h2>
                <p className="text-xs text-slate-500 font-semibold">Compensation & Benefits Administration</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-[#D4FF00] text-black font-black text-xs rounded-full">OFFICIAL PAYSLIP</span>
                <p className="text-xs font-mono font-bold text-slate-600 mt-1">Period: {currentMonthYear}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Employee</p>
                <p className="font-extrabold text-slate-950 mt-0.5">{slipEmployee.profile?.firstName} {slipEmployee.profile?.lastName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Employee ID</p>
                <p className="font-mono font-bold text-slate-950 mt-0.5">{slipEmployee.employeeId}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Department</p>
                <p className="font-bold text-slate-950 mt-0.5">{slipEmployee.profile?.department || 'General'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Designation</p>
                <p className="font-bold text-slate-950 mt-0.5">{slipEmployee.profile?.jobTitle || 'Staff'}</p>
              </div>
            </div>

            {slipEmployee.payroll ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
                    <p className="text-xs font-black text-emerald-800 uppercase tracking-wider border-b border-slate-100 pb-2">Earnings (Gross)</p>
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-600">Base Salary</span>
                      <span className="font-mono font-bold text-slate-950">{fmt(slipEmployee.payroll.baseSalary)}</span>
                    </div>
                    {Object.entries(slipEmployee.payroll.allowances || {}).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs py-1 border-t border-slate-50">
                        <span className="text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                        <span className="font-mono font-bold text-slate-950">{fmt(v)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
                    <p className="text-xs font-black text-rose-700 uppercase tracking-wider border-b border-slate-100 pb-2">Deductions (Statutory)</p>
                    {Object.entries(slipEmployee.payroll.deductions || {}).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs py-1 border-t first:border-0 border-slate-50">
                        <span className="text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                        <span className="font-mono font-bold text-slate-950">{fmt(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-emerald-900 uppercase tracking-wide">Net Disbursed Pay</p>
                    <p className="text-xs text-emerald-700 font-semibold">Direct Deposit • Authorized by HR Director</p>
                  </div>
                  <p className="text-3xl font-black text-emerald-700 font-mono">{fmt(slipEmployee.payroll.netSalary)}</p>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">No payroll structure configured for this employee.</p>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={() => window.print()} className="btn-primary flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2">
                <Printer size={15} />
                <span>Print Official Payslip</span>
              </button>
              <button onClick={() => setSlipEmployee(null)} className="btn-secondary py-3 px-5 text-xs font-bold">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <div className="card">
        {isLoading ? <SkeletonRow rows={8} /> : isError ? <ErrorState onRetry={refetch} /> : data?.employees?.length === 0 ? (
          <EmptyState icon={<DollarSign size={28} />} title="No employees found" />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Base Salary</th>
                  <th>Net Monthly Salary</th>
                  <th>Effective Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <p className="text-sm font-extrabold text-slate-950">{emp.profile?.firstName} {emp.profile?.lastName}</p>
                      <p className="text-slate-400 text-xs font-mono">{emp.employeeId}</p>
                    </td>
                    <td className="text-slate-600 text-xs font-medium">{emp.profile?.department ?? '—'}</td>
                    <td className="text-slate-950 font-bold text-xs">{emp.payroll ? fmt(emp.payroll.baseSalary) : <span className="text-slate-400">Not set</span>}</td>
                    <td>{emp.payroll ? <span className="text-emerald-700 font-extrabold text-sm font-mono">{fmt(emp.payroll.netSalary)}</span> : '—'}</td>
                    <td className="text-slate-500 text-xs font-mono">{emp.payroll ? new Date(emp.payroll.effectiveDate).toLocaleDateString() : '—'}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button id={`edit-payroll-${emp.id}`} onClick={() => openEdit(emp)} className="btn-secondary text-xs px-3 py-1.5 font-bold flex items-center gap-1">
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        {emp.payroll && (
                          <button onClick={() => setSlipEmployee(emp)} className="btn-secondary text-xs px-2.5 py-1.5 font-bold flex items-center gap-1" title="View Payslip">
                            <FileText size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayroll;
