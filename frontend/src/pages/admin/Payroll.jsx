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
      toast.success('Payroll updated!');
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
      baseSalary: Number(p?.baseSalary ?? 0),
      effectiveDate: p?.effectiveDate ? new Date(p.effectiveDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      hra: allowances.hra ?? 0,
      transport: allowances.transport ?? 0,
      medical: allowances.medical ?? 0,
      tax: deductions.tax ?? 0,
      pf: deductions.pf ?? 0,
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Payroll Management</h1>
        <p className="text-white/50 text-sm mt-1">View and edit employee salary structures</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
        <input id="payroll-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." className="input-field pl-9" />
      </div>

      <Modal isOpen={!!editEmployee} onClose={() => setEditEmployee(null)} title={`Edit Payroll — ${editEmployee?.profile?.firstName} ${editEmployee?.profile?.lastName}`} size="lg">
        <form onSubmit={handleSubmit(v => mutation.mutate({ id: editEmployee.id, values: v }))} id="admin-payroll-form" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Base Salary ($)</label><input type="number" {...register('baseSalary')} className="input-field" id="admin-base-salary" /></div>
            <div><label className="label">Effective Date</label><input type="date" {...register('effectiveDate')} className="input-field" /></div>
          </div>
          <p className="text-white/50 text-xs uppercase tracking-wider">Allowances</p>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="label">HRA ($)</label><input type="number" {...register('hra')} className="input-field" /></div>
            <div><label className="label">Transport ($)</label><input type="number" {...register('transport')} className="input-field" /></div>
            <div><label className="label">Medical ($)</label><input type="number" {...register('medical')} className="input-field" /></div>
          </div>
          <p className="text-white/50 text-xs uppercase tracking-wider">Deductions</p>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Tax ($)</label><input type="number" {...register('tax')} className="input-field" /></div>
            <div><label className="label">PF ($)</label><input type="number" {...register('pf')} className="input-field" /></div>
          </div>
          <button type="submit" disabled={isSubmitting || mutation.isPending} className="btn-primary w-full" id="save-admin-payroll-btn">
            {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payroll
          </button>
        </form>
      </Modal>

      <div className="card">
        {isLoading ? <SkeletonRow rows={8} /> : isError ? <ErrorState onRetry={refetch} /> : data?.employees?.length === 0 ? (
          <EmptyState icon={<DollarSign size={24} />} title="No employees found" />
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
                      <p className="text-white font-medium">{emp.profile?.firstName} {emp.profile?.lastName}</p>
                      <p className="text-white/40 text-xs">{emp.employeeId}</p>
                    </td>
                    <td className="text-white/60">{emp.profile?.department ?? '—'}</td>
                    <td className="text-white">{emp.payroll ? fmt(emp.payroll.baseSalary) : <span className="text-white/30">Not set</span>}</td>
                    <td>{emp.payroll ? <span className="text-emerald-400 font-semibold">{fmt(emp.payroll.netSalary)}</span> : '—'}</td>
                    <td className="text-white/50 text-xs">{emp.payroll ? new Date(emp.payroll.effectiveDate).toLocaleDateString() : '—'}</td>
                    <td>
                      <button id={`edit-payroll-${emp.id}`} onClick={() => openEdit(emp)} className="btn-secondary text-xs px-3 py-1.5">
                        <Edit3 size={12} /> Edit
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
