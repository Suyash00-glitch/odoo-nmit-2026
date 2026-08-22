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
      toast.success('Employee profile updated!');
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
      employmentType: emp.profile?.employmentType ?? 'Full Time',
    });
    setEditingProfile(true);
  };

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div className="flex items-center gap-3">
        <Link to="/admin/employees" className="btn-secondary p-2.5 rounded-2xl shadow-2xs"><ArrowLeft size={16} /></Link>
        <div>
          <h1 className="text-3xl font-black text-neutral-950 tracking-tight">{emp.profile?.firstName} {emp.profile?.lastName}</h1>
          <p className="text-gray-500 font-mono text-xs mt-0.5">{emp.employeeId} · {emp.email}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="card space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-base font-extrabold text-neutral-950 flex items-center gap-2">
            <User size={18} className="text-[#6B42EF]" /> Profile Information
          </h2>
          {!editingProfile && (
            <button onClick={startEditProfile} className="btn-secondary text-xs font-bold py-1.5 px-3 flex items-center gap-1">
              <Edit3 size={13} /> Edit Profile
            </button>
          )}
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
                <label className="label text-xs font-bold text-neutral-700">{label}</label>
                <input {...empForm.register(name)} className="input-field text-xs" />
              </div>
            ))}
            <div className="col-span-2">
              <label className="label text-xs font-bold text-neutral-700">Address</label>
              <input {...empForm.register('address')} className="input-field text-xs" />
            </div>
            <div className="col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={empMut.isPending} className="btn-primary py-2 px-4 text-xs font-bold" id="admin-save-emp">
                {empMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Profile
              </button>
              <button type="button" onClick={() => setEditingProfile(false)} className="btn-secondary py-2 px-4 text-xs font-bold"><X size={14} /> Cancel</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ['Job Title', emp.profile?.jobTitle],
              ['Department', emp.profile?.department],
              ['Phone', emp.profile?.phone],
              ['Employment Type', emp.profile?.employmentType ?? 'Full Time'],
              ['Date of Joining', emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toLocaleDateString() : '—'],
              ['Address', emp.profile?.address],
            ].map(([label, value]) => (
              <div key={label} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide">{label}</p>
                <p className="text-xs sm:text-sm font-extrabold text-neutral-950 mt-0.5">{value ?? '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payroll Card */}
      <div className="card space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-base font-extrabold text-neutral-950 flex items-center gap-2">
            <DollarSign size={18} className="text-emerald-600" /> Payroll & Salary Structure
          </h2>
          {!editingPayroll && (
            <button
              onClick={() => {
                const allowances = payrollData?.allowances ?? {};
                const deductions = payrollData?.deductions ?? {};
                payrollForm.reset({
                  baseSalary: Number(payrollData?.baseSalary ?? 5000),
                  effectiveDate: payrollData?.effectiveDate?.split('T')[0] ?? new Date().toISOString().split('T')[0],
                  hra: allowances.hra ?? 800,
                  transport: allowances.transport ?? 300,
                  medical: allowances.medical ?? 200,
                  tax: deductions.tax ?? 400,
                  pf: deductions.pf ?? 150,
                });
                setEditingPayroll(true);
              }}
              className="btn-secondary text-xs font-bold py-1.5 px-3 flex items-center gap-1"
            >
              <Edit3 size={13} /> Edit Payroll
            </button>
          )}
        </div>

        {editingPayroll ? (
          <form onSubmit={payrollForm.handleSubmit(v => payrollMut.mutate(v))} className="space-y-4" id="payroll-form">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label text-xs font-bold text-neutral-700">Base Salary ($)</label>
                <input type="number" {...payrollForm.register('baseSalary')} className="input-field text-xs" id="base-salary" />
              </div>
              <div>
                <label className="label text-xs font-bold text-neutral-700">Effective Date</label>
                <input type="date" {...payrollForm.register('effectiveDate')} className="input-field text-xs" id="effective-date" />
              </div>
              <div><label className="label text-xs font-bold text-neutral-700">HRA ($)</label><input type="number" {...payrollForm.register('hra')} className="input-field text-xs" /></div>
              <div><label className="label text-xs font-bold text-neutral-700">Transport ($)</label><input type="number" {...payrollForm.register('transport')} className="input-field text-xs" /></div>
              <div><label className="label text-xs font-bold text-neutral-700">Medical ($)</label><input type="number" {...payrollForm.register('medical')} className="input-field text-xs" /></div>
              <div><label className="label text-xs font-bold text-neutral-700">Tax ($)</label><input type="number" {...payrollForm.register('tax')} className="input-field text-xs" /></div>
              <div><label className="label text-xs font-bold text-neutral-700">PF ($)</label><input type="number" {...payrollForm.register('pf')} className="input-field text-xs" /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={payrollMut.isPending} className="btn-primary py-2 px-4 text-xs font-bold" id="save-payroll-btn">
                {payrollMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Payroll
              </button>
              <button type="button" onClick={() => setEditingPayroll(false)} className="btn-secondary py-2 px-4 text-xs font-bold"><X size={14} /> Cancel</button>
            </div>
          </form>
        ) : payrollData ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Base Salary</p>
              <p className="text-2xl font-black text-neutral-950 font-mono mt-1">{fmt(Number(payrollData.baseSalary))}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Net Monthly Salary</p>
              <p className="text-2xl font-black text-emerald-700 font-mono mt-1">{fmt(Number(payrollData.netSalary))}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Effective Date</p>
              <p className="text-sm font-bold text-neutral-800 mt-1">{new Date(payrollData.effectiveDate).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-xs font-medium">No payroll record yet. Click Edit Payroll to configure compensation.</p>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeDetail;
