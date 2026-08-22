import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeesApi } from '../../api/employees.api.js';
import { payrollApi } from '../../api/payroll.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit3, Save, X, User, DollarSign, Loader2 } from 'lucide-react';

const empSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  employmentType: z.string().optional(),
});

const payrollSchema = z.object({
  baseSalary: z.coerce.number().positive(),
  effectiveDate: z.string().min(1),
  hra: z.coerce.number().min(0).optional(),
  transport: z.coerce.number().min(0).optional(),
  medical: z.coerce.number().min(0).optional(),
  tax: z.coerce.number().min(0).optional(),
  pf: z.coerce.number().min(0).optional(),
});

const AdminEmployeeDetail = () => {
  const { id } = useParams();
  const qc = useQueryClient();
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(false);

  const { data: emp, isLoading, isError, refetch } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeesApi.getOne(id).then(r => r.data.data),
    enabled: !!id,
  });

  const { data: payrollData } = useQuery({
    queryKey: ['payroll', id],
    queryFn: () => payrollApi.getEmployeePayroll(id).then(r => r.data.data),
    enabled: !!id,
  });

  const empForm = useForm({ resolver: zodResolver(empSchema) });
  const payrollForm = useForm({ resolver: zodResolver(payrollSchema) });

  const empMut = useMutation({
    mutationFn: (v) => employeesApi.update(id, v),
    onSuccess: () => {
      toast.success('Employee updated!');
      qc.invalidateQueries({ queryKey: ['employee', id] });
      setEditingProfile(false);
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Update failed'),
  });

  const payrollMut = useMutation({
    mutationFn: (v) => payrollApi.updatePayroll(id, {
      baseSalary: v.baseSalary,
      effectiveDate: v.effectiveDate,
      allowances: { hra: v.hra ?? 0, transport: v.transport ?? 0, medical: v.medical ?? 0 },
      deductions: { tax: v.tax ?? 0, pf: v.pf ?? 0 },
    }),
    onSuccess: () => {
      toast.success('Payroll updated!');
      qc.invalidateQueries({ queryKey: ['payroll', id] });
      setEditingPayroll(false);
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Payroll update failed'),
  });

  const startEditProfile = () => {
    empForm.reset({
      firstName: emp.profile?.firstName,
      lastName: emp.profile?.lastName,
      jobTitle: emp.profile?.jobTitle,
      department: emp.profile?.department,
      phone: emp.profile?.phone ?? '',
      address: emp.profile?.address ?? '',
      employmentType: emp.profile?.employmentType ?? '',
    });
    setEditingProfile(true);
  };

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <Link to="/admin/employees" className="btn-secondary px-3 py-2"><ArrowLeft size={16} /></Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{emp.profile?.firstName} {emp.profile?.lastName}</h1>
          <p className="text-white/50 text-sm">{emp.employeeId} · {emp.email}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white flex items-center gap-2"><User size={16} className="text-primary-400" /> Profile Information</h2>
          {!editingProfile && <button onClick={startEditProfile} className="btn-secondary text-sm"><Edit3 size={13} /> Edit</button>}
        </div>

        {editingProfile ? (
          <form onSubmit={empForm.handleSubmit(v => empMut.mutate(v))} className="grid grid-cols-2 gap-4" id="admin-edit-form">
            {[
              { name: 'firstName', label: 'First Name' },
              { name: 'lastName', label: 'Last Name' },
              { name: 'jobTitle', label: 'Job Title' },
              { name: 'department', label: 'Department' },
              { name: 'phone', label: 'Phone' },
              { name: 'employmentType', label: 'Employment Type' },
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="label">{label}</label>
                <input {...empForm.register(name)} className="input-field" />
              </div>
            ))}
            <div className="col-span-2">
              <label className="label">Address</label>
              <input {...empForm.register('address')} className="input-field" />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" disabled={empMut.isPending} className="btn-primary" id="admin-save-emp">
                {empMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
              </button>
              <button type="button" onClick={() => setEditingProfile(false)} className="btn-secondary"><X size={14} /> Cancel</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ['Job Title', emp.profile?.jobTitle],
              ['Department', emp.profile?.department],
              ['Phone', emp.profile?.phone],
              ['Employment Type', emp.profile?.employmentType],
              ['Date of Joining', emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toLocaleDateString() : '—'],
              ['Address', emp.profile?.address],
            ].map(([label, value]) => (
              <div key={label} className="p-3 bg-surface-300/50 rounded-xl">
                <p className="text-[11px] text-white/40 uppercase tracking-wide">{label}</p>
                <p className="text-sm text-white/80 mt-0.5">{value ?? '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white flex items-center gap-2"><DollarSign size={16} className="text-emerald-400" /> Payroll</h2>
          {!editingPayroll && (
            <button
              onClick={() => {
                const allowances = payrollData?.allowances ?? {};
                const deductions = payrollData?.deductions ?? {};
                payrollForm.reset({
                  baseSalary: Number(payrollData?.baseSalary ?? 0),
                  effectiveDate: payrollData?.effectiveDate?.split('T')[0] ?? new Date().toISOString().split('T')[0],
                  hra: allowances.hra ?? 0,
                  transport: allowances.transport ?? 0,
                  medical: allowances.medical ?? 0,
                  tax: deductions.tax ?? 0,
                  pf: deductions.pf ?? 0,
                });
                setEditingPayroll(true);
              }}
              className="btn-secondary text-sm"
            >
              <Edit3 size={13} /> Edit Payroll
            </button>
          )}
        </div>

        {editingPayroll ? (
          <form onSubmit={payrollForm.handleSubmit(v => payrollMut.mutate(v))} className="space-y-4" id="payroll-form">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Base Salary ($)</label>
                <input type="number" {...payrollForm.register('baseSalary')} className="input-field" id="base-salary" />
              </div>
              <div>
                <label className="label">Effective Date</label>
                <input type="date" {...payrollForm.register('effectiveDate')} className="input-field" id="effective-date" />
              </div>
              <div><label className="label">HRA ($)</label><input type="number" {...payrollForm.register('hra')} className="input-field" /></div>
              <div><label className="label">Transport ($)</label><input type="number" {...payrollForm.register('transport')} className="input-field" /></div>
              <div><label className="label">Medical ($)</label><input type="number" {...payrollForm.register('medical')} className="input-field" /></div>
              <div><label className="label">Tax ($)</label><input type="number" {...payrollForm.register('tax')} className="input-field" /></div>
              <div><label className="label">PF ($)</label><input type="number" {...payrollForm.register('pf')} className="input-field" /></div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={payrollMut.isPending} className="btn-primary" id="save-payroll-btn">
                {payrollMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payroll
              </button>
              <button type="button" onClick={() => setEditingPayroll(false)} className="btn-secondary"><X size={14} /> Cancel</button>
            </div>
          </form>
        ) : payrollData ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-surface-300/50 rounded-xl">
              <p className="text-xs text-white/40">Base Salary</p>
              <p className="text-xl font-bold text-white mt-1">{fmt(Number(payrollData.baseSalary))}</p>
            </div>
            <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/10">
              <p className="text-xs text-emerald-400/70">Net Salary</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">{fmt(Number(payrollData.netSalary))}</p>
            </div>
            <div className="p-4 bg-surface-300/50 rounded-xl">
              <p className="text-xs text-white/40">Effective</p>
              <p className="text-sm text-white/70 mt-1">{new Date(payrollData.effectiveDate).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-white/40 text-sm">No payroll record yet. Click Edit Payroll to set up.</p>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeDetail;
