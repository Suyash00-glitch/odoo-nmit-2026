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
import { DollarSign, Edit3, Loader2, Save, Search } from 'lucide-react';

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

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(v));

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

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Payroll & Compensation</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Configure and view salary structures across all employees</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input id="payroll-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." className="input-field pl-10 text-xs" />
      </div>

      <Modal isOpen={!!editEmployee} onClose={() => setEditEmployee(null)} title={`Edit Payroll — ${editEmployee?.profile?.firstName} ${editEmployee?.profile?.lastName}`} size="lg">
        <form onSubmit={handleSubmit(v => mutation.mutate({ id: editEmployee.id, values: v }))} id="admin-payroll-form" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label text-xs font-bold text-neutral-700">Base Monthly Salary ($)</label><input type="number" {...register('baseSalary')} className="input-field text-xs" id="admin-base-salary" /></div>
            <div><label className="label text-xs font-bold text-neutral-700">Effective Date</label><input type="date" {...register('effectiveDate')} className="input-field text-xs" /></div>
          </div>
          
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#6B42EF] pt-1">Allowances (Monthly)</p>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="label text-xs font-bold text-neutral-600">HRA ($)</label><input type="number" {...register('hra')} className="input-field text-xs" /></div>
            <div><label className="label text-xs font-bold text-neutral-600">Transport ($)</label><input type="number" {...register('transport')} className="input-field text-xs" /></div>
            <div><label className="label text-xs font-bold text-neutral-600">Medical ($)</label><input type="number" {...register('medical')} className="input-field text-xs" /></div>
          </div>

          <p className="text-xs font-extrabold uppercase tracking-wider text-red-600 pt-1">Deductions (Monthly)</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label text-xs font-bold text-neutral-600">Tax ($)</label><input type="number" {...register('tax')} className="input-field text-xs" /></div>
            <div><label className="label text-xs font-bold text-neutral-600">Provident Fund ($)</label><input type="number" {...register('pf')} className="input-field text-xs" /></div>
          </div>

          <button type="submit" disabled={isSubmitting || mutation.isPending} className="btn-primary w-full py-3 text-xs font-bold shadow-sm mt-2" id="save-admin-payroll-btn">
            {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payroll Structure
          </button>
        </form>
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
                  <th>Net Salary</th>
                  <th>Effective Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <p className="text-sm font-extrabold text-neutral-950">{emp.profile?.firstName} {emp.profile?.lastName}</p>
                      <p className="text-gray-400 text-xs font-mono">{emp.employeeId}</p>
                    </td>
                    <td className="text-gray-600 text-xs font-medium">{emp.profile?.department ?? '—'}</td>
                    <td className="text-neutral-950 font-bold text-xs">{emp.payroll ? fmt(emp.payroll.baseSalary) : <span className="text-gray-400">Not set</span>}</td>
                    <td>{emp.payroll ? <span className="text-emerald-700 font-extrabold text-sm font-mono">{fmt(emp.payroll.netSalary)}</span> : '—'}</td>
                    <td className="text-gray-500 text-xs font-mono">{emp.payroll ? new Date(emp.payroll.effectiveDate).toLocaleDateString() : '—'}</td>
                    <td>
                      <button id={`edit-payroll-${emp.id}`} onClick={() => openEdit(emp)} className="btn-secondary text-xs px-3 py-1.5 font-bold flex items-center gap-1">
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
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
