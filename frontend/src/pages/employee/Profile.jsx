import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authApi } from '../../api/auth.api.js';
import { employeesApi } from '../../api/employees.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  User,
  Edit3,
  Save,
  X,
  Loader2,
  Mail,
  Building,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  FileText,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const schema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
  profilePictureUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const EmployeeProfile = () => {
  const { updateUser } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.getMe().then((r) => r.data.data),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { phone: data?.profile?.phone ?? '', address: data?.profile?.address ?? '' },
  });

  const mutation = useMutation({
    mutationFn: (values) => employeesApi.updateMe(values),
    onSuccess: (res) => {
      toast.success('Profile updated!');
      updateUser(res.data.data);
      qc.invalidateQueries({ queryKey: ['me'] });
      setEditing(false);
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Update failed'),
  });

  if (isLoading) return <Loader text="Loading profile..." />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const profile = data?.profile;
  const payroll = data?.payroll;
  const documents = profile?.documents || [];
  const displayName = profile ? `${profile.firstName} ${profile.lastName}` : data?.email;

  const onEdit = () => {
    reset({
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
      profilePictureUrl: profile?.profilePictureUrl ?? '',
    });
    setEditing(true);
  };

  const fmt = (v) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
      Number(v || 0)
    );

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Personal Profile</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Manage your personal credentials, contact details, and documents
          </p>
        </div>
        {!editing && (
          <button
            onClick={onEdit}
            className="btn-secondary flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold shadow-2xs"
            id="edit-profile-btn"
          >
            <Edit3 size={15} /> <span>Edit Details</span>
          </button>
        )}
      </div>

      {/* 1. Header & Identity Card */}
      <div className="card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              {profile?.profilePictureUrl ? (
                <img
                  src={profile.profilePictureUrl}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-slate-950 text-[#D4FF00] flex items-center justify-center font-black text-2xl shadow-xs">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-950">{displayName}</h2>
                <ShieldCheck size={18} className="text-emerald-600" title="Verified Employee" />
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{profile?.jobTitle ?? 'Employee'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge-blue text-xs font-mono font-bold">{data?.employeeId}</span>
                {profile?.department && <span className="badge-gray text-xs font-bold">{profile.department}</span>}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase">
                  Active Member
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form or Information Grid */}
        {editing ? (
          <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-4" id="profile-form">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs font-semibold text-amber-800">
              Note: Per Dayflow HR policy, Job title, Department, and Date of Joining are managed directly by your HR Administrator.
            </div>
            <div>
              <label className="label text-xs font-bold text-slate-700">Phone Number</label>
              <input
                {...register('phone')}
                placeholder="+1-555-0100"
                className="input-field text-xs"
                id="profile-phone"
              />
              {errors.phone && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="label text-xs font-bold text-slate-700">Residential Address</label>
              <input
                {...register('address')}
                placeholder="123 Main St, City, State"
                className="input-field text-xs"
                id="profile-address"
              />
            </div>
            <div>
              <label className="label text-xs font-bold text-slate-700">Profile Picture URL</label>
              <input
                {...register('profilePictureUrl')}
                placeholder="https://images.unsplash.com/..."
                className="input-field text-xs"
                id="profile-picture-url"
              />
              {errors.profilePictureUrl && (
                <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.profilePictureUrl.message}</p>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary py-2.5 px-5 text-xs font-bold shadow-xs"
                disabled={isSubmitting}
                id="save-profile-btn"
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <Save size={14} className="mr-1.5" />} Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn-secondary py-2.5 px-4 text-xs font-bold"
                id="cancel-edit-btn"
              >
                <X size={14} className="mr-1" /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Mail, label: 'Work Email', value: data?.email },
              { icon: Phone, label: 'Phone Contact', value: profile?.phone ?? '—' },
              { icon: Building, label: 'Department', value: profile?.department ?? 'General' },
              { icon: Briefcase, label: 'Employment Type', value: profile?.employmentType ?? 'Full Time' },
              {
                icon: Calendar,
                label: 'Date of Joining',
                value: profile?.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : '—',
              },
              { icon: MapPin, label: 'Residential Address', value: profile?.address ?? '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-800 shadow-2xs">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wide">{label}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-950 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Salary Structure Preview & Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* Left: Salary Structure Summary (6 cols) */}
        <div className="lg:col-span-6 card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-2xs">
                <DollarSign size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950">Salary Structure Overview</h3>
                <p className="text-[11px] text-slate-400 font-medium">Transparent monthly compensation</p>
              </div>
            </div>
            <Link
              to="/employee/payroll"
              className="text-xs font-extrabold text-slate-900 hover:text-slate-700 flex items-center gap-1"
            >
              <span>Full Payslips</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {payroll ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Base Salary</p>
                  <p className="text-lg font-black text-slate-950 font-mono mt-0.5">{fmt(payroll.baseSalary)}</p>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Net Monthly</p>
                  <p className="text-lg font-black text-emerald-700 font-mono mt-0.5">{fmt(payroll.netSalary)}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Effective since {new Date(payroll.effectiveDate).toLocaleDateString()}. Includes active HRA, medical allowance, PF & tax deductions.
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-3">Salary structure pending configuration by HR admin.</p>
          )}
        </div>

        {/* Right: Documents Section (6 cols) */}
        <div className="lg:col-span-6 card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shadow-2xs">
                <FileText size={16} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950">Documents & Records</h3>
                <p className="text-[11px] text-slate-400 font-medium">Verified onboarding credentials</p>
              </div>
            </div>
            <span className="badge-gray text-[11px] font-mono font-bold">{documents.length} Files</span>
          </div>

          <div className="space-y-2.5">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText size={16} className="text-slate-900 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-slate-950 truncate">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary py-1 px-2.5 text-[11px] font-bold flex items-center gap-1 shadow-2xs shrink-0"
                  >
                    <span>View</span>
                    <ExternalLink size={11} />
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
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText size={16} className="text-slate-900 shrink-0" />
                      <div>
                        <p className="text-xs font-extrabold text-slate-950">{item.name}</p>
                        <p className="text-[10px] text-emerald-600 font-bold">Verified on File</p>
                      </div>
                    </div>
                    <span className="badge-gray text-[10px] font-bold">Verified</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeProfile;
