import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { attendanceApi } from '../../api/attendance.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { attendanceStatusBadge } from '../../components/common/Badge.jsx';
import toast from 'react-hot-toast';
import {
  Clock, CalendarDays, TrendingUp, CheckCircle2, XCircle,
  User, Loader2, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['employee-dashboard'],
    queryFn: () => dashboardApi.getEmployeeDashboard().then(r => r.data.data),
  });

  const checkInMut = useMutation({
    mutationFn: () => attendanceApi.checkIn(),
    onSuccess: () => {
      toast.success('Checked in! Have a great day.');
      qc.invalidateQueries({ queryKey: ['employee-dashboard'] });
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Check-in failed'),
  });

  const checkOutMut = useMutation({
    mutationFn: () => attendanceApi.checkOut(),
    onSuccess: () => {
      toast.success('Checked out! See you tomorrow.');
      qc.invalidateQueries({ queryKey: ['employee-dashboard'] });
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Check-out failed'),
  });

  const firstName = user?.profile?.firstName ?? user?.email?.split('@')[0] ?? 'there';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }
  if (isError) return <ErrorState message="Could not load dashboard" onRetry={refetch} />;

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">{greeting}, {firstName} 👋</h1>
        <p className="text-white/50 text-sm mt-1">
          {now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="card bg-gradient-to-br from-primary-900/40 to-surface-200 border-primary-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-white/50 mb-1">Today's Attendance</p>
            <div className="flex items-center gap-3">
              {data.todayAttendance ? (
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium">
                    Check-in: {data.todayAttendance.checkIn
                      ? new Date(data.todayAttendance.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                      : '—'}
                  </span>
                  {data.todayAttendance.checkOut && (
                    <span className="text-white/60 text-sm">
                      Check-out: {new Date(data.todayAttendance.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-white/50">Not checked in yet</span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              id="checkin-btn"
              onClick={() => checkInMut.mutate()}
              disabled={checkInMut.isPending || data.isCheckedIn}
              className="btn-success"
            >
              {checkInMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              Check In
            </button>
            <button
              id="checkout-btn"
              onClick={() => checkOutMut.mutate()}
              disabled={checkOutMut.isPending || !data.isCheckedIn || data.isCheckedOut}
              className="btn-danger"
            >
              {checkOutMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
              Check Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Attendance Rate', value: `${data.attendanceRate}%`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Pending Leaves', value: data.pendingLeaves, icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Total Leaves', value: data.totalLeaves, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Notifications', value: data.unreadNotifications, icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/50 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Recent Attendance</h2>
          <Link to="/employee/attendance" className="text-sm text-primary-400 hover:text-primary-300">View all →</Link>
        </div>
        {data.recentAttendance.length === 0 ? (
          <p className="text-white/40 text-sm text-center py-8">No attendance records yet</p>
        ) : (
          <div className="space-y-2">
            {data.recentAttendance.slice(0, 7).map((record) => (
              <div key={record.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-white/70 text-sm">
                  {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <div className="flex items-center gap-4">
                  {record.checkIn && <span className="text-white/50 text-xs">{new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>}
                  {attendanceStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: '/employee/profile', icon: User, label: 'My Profile' },
          { to: '/employee/attendance', icon: Clock, label: 'Attendance' },
          { to: '/employee/leaves', icon: CalendarDays, label: 'Apply Leave' },
          { to: '/employee/payroll', icon: TrendingUp, label: 'Payroll' },
        ].map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className="card-hover flex flex-col items-center gap-3 py-5 text-center cursor-pointer">
            <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center">
              <Icon size={18} className="text-primary-400" />
            </div>
            <span className="text-sm font-medium text-white/80">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
