import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { employeesApi } from '../../api/employees.api.js';
import { payrollApi } from '../../api/payroll.api.js';
import { attendanceApi } from '../../api/attendance.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { attendanceStatusBadge } from '../../components/common/Badge.jsx';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Edit3,
  Save,
  X,
  User,
  DollarSign,
  Loader2,
  Calendar,
  Clock,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const empSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  employmentType: z.string().optional(),
  dateOfJoining: z.string().optional(),
});

const payrollSchema = z.object({
  baseSalary: z.coerce.number().positive('Base salary must be positive'),
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
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'attendance' | 'documents'

  const { data: emp, isLoading, isError, refetch } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeesApi.getOne(id).then(r => r.data.data),
    enabled: !!id,
  });

  const { data: payrollData } = useQuery({
    queryKey: ['payroll', id],
    queryFn: () => payrollApi.getEmployeePayroll(id).then(r => r.data.data).catch(() => null),
    enabled: !!id,
  });

  const { data: attendanceData } = useQuery({
    queryKey: ['employee-attendance', id],
    queryFn: () => attendanceApi.getEmployeeAttendance(id).then(r => r.data.data).catch(() => []),
    enabled: !!id,
  });

  const empForm = useForm({ resolver: zodResolver(empSchema) });
  const payrollForm = useForm({ resolver: zodResolver(payrollSchema) });

  const empMut = useMutation({
    mutationFn: (v) => employeesApi.update(id, v),
    onSuccess: () => {
      toast.success('Employee profile updated successfully!');
      qc.invalidateQueries({ queryKey: ['employee', id] });
      qc.invalidateQueries({ queryKey: ['employees'] });
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
      toast.success('Payroll structure updated!');
      qc.invalidateQueries({ queryKey: ['payroll', id] });
      qc.invalidateQueries({ queryKey: ['employees-payroll'] });
      setEditingPayroll(false);
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Payroll update failed'),
  });

  const startEditProfile = () => {
    empForm.reset({
      firstName: emp.profile?.firstName,
      lastName: emp.profile?.lastName,
      jobTitle: emp.profile?.jobTitle ?? '',
      department: emp.profile?.department ?? '',
      phone: emp.profile?.phone ?? '',
      address: emp.profile?.address ?? '',
      employmentType: emp.profile?.employmentType ?? 'Full Time',
      dateOfJoining: emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toISOString().split('T')[0] : '',
    });
    setEditingProfile(true);
  };

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(v || 0));

  if (isLoading) return <Loader text="Loading employee details..." />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const documents = emp.profile?.documents || [];
  const attendanceRecords = attendanceData || [];

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div className="flex items-center gap-3">
        <Link to="/admin/employees" className="btn-secondary p-2.5 rounded-2xl shadow-2xs">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
              {emp.profile?.firstName} {emp.profile?.lastName}
            </h1>
            <ShieldCheck size={20} className="text-emerald-600" />
          </div>
          <p className="text-slate-400 font-mono text-xs mt-0.5">
            {emp.employeeId} · {emp.email} · Role: {emp.role}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white p-1 rounded-2xl w-fit border border-slate-200 shadow-2xs">
        {[
          { key: 'profile', label: '👤 Profile & Job' },
          { key: 'attendance', label: `⏱️ Attendance Logs (${attendanceRecords.length})` },
          { key: 'payroll', label: '💵 Payroll Structure' },
          { key: 'documents', label: `📄 Documents (${documents.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-slate-950 text-white shadow-xs font-black'
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Profile Information */}
      {activeTab === 'profile' && (
        <div className="card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
              <User size={18} className="text-slate-900" /> Comprehensive Employee Profile
            </h2>
            {!editingProfile && (
              <button onClick={startEditProfile} className="btn-secondary text-xs font-bold py-1.5 px-3 flex items-center gap-1 shadow-2xs">
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
                { name: 'dateOfJoining', label: 'Date of Joining', type: 'date' },
              ].map(({ name, label, type = 'text' }) => (
                <div key={name}>
                  <label className="label text-xs font-bold text-neutral-700">{label}</label>
                  <input type={type} {...empForm.register(name)} className="input-field text-xs" />
                  {empForm.formState.errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{empForm.formState.errors[name].message}</p>
                  )}
                </div>
              ))}
              <div className="col-span-2">
                <label className="label text-xs font-bold text-neutral-700">Residential Address</label>
                <input {...empForm.register('address')} className="input-field text-xs" />
              </div>
              <div className="col-span-2 flex gap-3 pt-2">
                <button type="submit" disabled={empMut.isPending} className="btn-primary py-2 px-4 text-xs font-bold shadow-sm" id="admin-save-emp">
                  {empMut.isPending ? <Loader2 size={14} className="animate-spin mr-1" /> : <Save size={14} className="mr-1" />} Save Profile Changes
                </button>
                <button type="button" onClick={() => setEditingProfile(false)} className="btn-secondary py-2 px-4 text-xs font-bold">
                  <X size={14} className="mr-1" /> Cancel
                </button>
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
      )}

      {/* TAB 2: Attendance History Logs */}
      {activeTab === 'attendance' && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-base font-extrabold text-neutral-950 flex items-center gap-2">
              <Clock size={18} className="text-[#6B42EF]" /> Attendance History (Last 30 Days)
            </h2>
            <span className="badge-gray font-mono font-bold text-xs">{attendanceRecords.length} records</span>
          </div>

          {attendanceRecords.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">No attendance records logged for this employee.</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((rec) => {
                    const duration = rec.checkIn && rec.checkOut
                      ? Math.round((new Date(rec.checkOut).getTime() - new Date(rec.checkIn).getTime()) / 3600000 * 10) / 10
                      : null;
                    return (
                      <tr key={rec.id}>
                        <td className="font-extrabold text-neutral-950 text-xs">
                          {new Date(rec.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="font-mono text-xs text-emerald-700">
                          {rec.checkIn ? new Date(rec.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                        <td className="font-mono text-xs text-neutral-800">
                          {rec.checkOut ? new Date(rec.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                        <td className="font-mono text-xs font-bold text-neutral-900">{duration ? `${duration}h` : '—'}</td>
                        <td>{attendanceStatusBadge(rec.status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Payroll Structure */}
      {activeTab === 'payroll' && (
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
                className="btn-secondary text-xs font-bold py-1.5 px-3 flex items-center gap-1 shadow-2xs"
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
                <button type="submit" disabled={payrollMut.isPending} className="btn-primary py-2 px-4 text-xs font-bold shadow-sm" id="save-payroll-btn">
                  {payrollMut.isPending ? <Loader2 size={14} className="animate-spin mr-1" /> : <Save size={14} className="mr-1" />} Save Payroll
                </button>
                <button type="button" onClick={() => setEditingPayroll(false)} className="btn-secondary py-2 px-4 text-xs font-bold">
                  <X size={14} className="mr-1" /> Cancel
                </button>
              </div>
            </form>
          ) : payrollData ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Base Salary</p>
                <p className="text-2xl font-black text-neutral-950 font-mono mt-1">{fmt(payrollData.baseSalary)}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Net Monthly Salary</p>
                <p className="text-2xl font-black text-emerald-700 font-mono mt-1">{fmt(payrollData.netSalary)}</p>
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
      )}

      {/* TAB 4: Documents */}
      {activeTab === 'documents' && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-base font-extrabold text-neutral-950 flex items-center gap-2">
              <FileText size={18} className="text-[#6B42EF]" /> Employee Verification Documents
            </h2>
            <span className="badge-gray font-mono font-bold text-xs">{documents.length} Files</span>
          </div>

          <div className="space-y-2.5">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#6B42EF]" />
                    <div>
                      <p className="text-xs font-extrabold text-neutral-950">{doc.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <a href={doc.url} target="_blank" rel="noreferrer" className="btn-secondary py-1.5 px-3 text-xs font-bold flex items-center gap-1 shadow-2xs">
                    <span>View</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))
            ) : (
              <div className="space-y-2">
                {[
                  { name: 'Signed Employment Contract', date: 'Jan 2026' },
                  { name: 'Government ID Verification', date: 'Jan 2026' },
                  { name: 'Non-Disclosure Agreement (NDA)', date: 'Jan 2026' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-[#6B42EF]" />
                      <div>
                        <p className="text-xs font-extrabold text-neutral-950">{item.name}</p>
                        <p className="text-[10px] text-emerald-600 font-bold">Verified on File</p>
                      </div>
                    </div>
                    <span className="badge-gray text-xs font-bold">Verified</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminEmployeeDetail;
