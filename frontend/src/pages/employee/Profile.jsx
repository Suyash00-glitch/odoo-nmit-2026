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
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-white/50 text-sm mt-1">View and edit your personal information</p>
        </div>
        {!editing && (
          <button onClick={onEdit} className="btn-secondary" id="edit-profile-btn">
            <Edit3 size={14} /> Edit Profile
          </button>
        )}
      </div>

      <div className="card">
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            {profile?.profilePictureUrl ? (
              <img src={profile.profilePictureUrl} alt={displayName} className="w-20 h-20 rounded-2xl object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-primary-600/30 flex items-center justify-center">
                <User size={32} className="text-primary-300" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{displayName}</h2>
            <p className="text-white/50 text-sm">{profile?.jobTitle ?? 'Employee'}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-blue text-[11px]">{data?.employeeId}</span>
              {profile?.department && <span className="badge-gray text-[11px]">{profile.department}</span>}
            </div>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-4" id="profile-form">
            <div>
              <label className="label">Phone</label>
              <input {...register('phone')} placeholder="+1-555-0100" className="input-field" id="profile-phone" />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="label">Address</label>
              <input {...register('address')} placeholder="123 Main St, City, State" className="input-field" id="profile-address" />
            </div>
            <div>
              <label className="label">Profile Picture URL</label>
              <input {...register('profilePictureUrl')} placeholder="https://..." className="input-field" id="profile-picture-url" />
              {errors.profilePictureUrl && <p className="text-red-400 text-xs mt-1">{errors.profilePictureUrl.message}</p>}
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary" disabled={isSubmitting} id="save-profile-btn">
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary" id="cancel-edit-btn">
                <X size={14} /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Mail, label: 'Email', value: data?.email },
              { icon: Phone, label: 'Phone', value: profile?.phone ?? '—' },
              { icon: Building, label: 'Department', value: profile?.department ?? '—' },
              { icon: Briefcase, label: 'Employment Type', value: profile?.employmentType ?? '—' },
              { icon: Calendar, label: 'Date of Joining', value: profile?.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : '—' },
              { icon: MapPin, label: 'Address', value: profile?.address ?? '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-surface-300/50">
                <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-white/80 mt-0.5">{value}</p>
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
