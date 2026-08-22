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
import toast from 'react-hot-toast';
import { User, Edit3, Save, X, Loader2, Mail, Building, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

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
    queryFn: () => authApi.getMe().then(r => r.data.data),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
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
  const displayName = profile ? `${profile.firstName} ${profile.lastName}` : data?.email;

  const onEdit = () => {
    reset({ phone: profile?.phone ?? '', address: profile?.address ?? '', profilePictureUrl: profile?.profilePictureUrl ?? '' });
    setEditing(true);
  };

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Personal Profile</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Manage your employee information and contact details</p>
        </div>
        {!editing && (
          <button onClick={onEdit} className="btn-secondary flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold" id="edit-profile-btn">
            <Edit3 size={15} /> <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="card space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
          <div className="relative">
            {profile?.profilePictureUrl ? (
              <img src={profile.profilePictureUrl} alt={displayName} className="w-20 h-20 rounded-2xl object-cover border border-gray-200" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-purple-100 text-[#6B42EF] flex items-center justify-center font-black text-2xl shadow-xs">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral-950">{displayName}</h2>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{profile?.jobTitle ?? 'Employee'}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-blue text-xs font-mono font-bold">{data?.employeeId}</span>
              {profile?.department && <span className="badge-gray text-xs font-bold">{profile.department}</span>}
            </div>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-4" id="profile-form">
            <div>
              <label className="label text-xs font-bold text-neutral-700">Phone Number</label>
              <input {...register('phone')} placeholder="+1-555-0100" className="input-field text-xs" id="profile-phone" />
              {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="label text-xs font-bold text-neutral-700">Residential Address</label>
              <input {...register('address')} placeholder="123 Main St, City, State" className="input-field text-xs" id="profile-address" />
            </div>
            <div>
              <label className="label text-xs font-bold text-neutral-700">Profile Picture URL</label>
              <input {...register('profilePictureUrl')} placeholder="https://..." className="input-field text-xs" id="profile-picture-url" />
              {errors.profilePictureUrl && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.profilePictureUrl.message}</p>}
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary py-2.5 px-5 text-xs font-bold" disabled={isSubmitting} id="save-profile-btn">
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary py-2.5 px-4 text-xs font-bold" id="cancel-edit-btn">
                <X size={14} /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Mail, label: 'Email Address', value: data?.email },
              { icon: Phone, label: 'Phone', value: profile?.phone ?? '—' },
              { icon: Building, label: 'Department', value: profile?.department ?? '—' },
              { icon: Briefcase, label: 'Employment Type', value: profile?.employmentType ?? 'Full Time' },
              { icon: Calendar, label: 'Date of Joining', value: profile?.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : '—' },
              { icon: MapPin, label: 'Address', value: profile?.address ?? '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 text-[#6B42EF] shadow-2xs">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide">{label}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-neutral-950 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
