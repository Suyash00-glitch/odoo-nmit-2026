import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { attendanceApi } from '../../api/attendance.api.js';
import { payrollApi } from '../../api/payroll.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { attendanceStatusBadge } from '../../components/common/Badge.jsx';
import { Link } from 'react-router-dom';
import NotificationDropdown from '../../components/common/NotificationDropdown.jsx';
import toast from 'react-hot-toast';
import {
  MessageSquare,
  Bell,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Video,
  ChevronRight,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['employee-dashboard'],
    queryFn: () => dashboardApi.getEmployeeDashboard().then(r => r.data.data),
    refetchInterval: 15000,
  });

  const { data: payrollData } = useQuery({
    queryKey: ['employee-payroll'],
    queryFn: () => payrollApi.getMyPayroll().then(r => r.data.data).catch(() => null),
  });

  const checkInMutation = useMutation({
    mutationFn: () => attendanceApi.checkIn(),
    onSuccess: () => {
      toast.success('Successfully Checked In!');
      queryClient.invalidateQueries(['employee-dashboard']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Check-in failed');
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: () => attendanceApi.checkOut(),
    onSuccess: () => {
      toast.success('Checked Out! Great work today.');
      queryClient.invalidateQueries(['employee-dashboard']);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Check-out failed');
    },
  });

  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : (user?.email?.split('@')[0] || 'Employee');
  const displayRole = user?.profile?.jobTitle || 'Team Member';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }
  if (isError) return <ErrorState onRetry={refetch} />;

  const today = data?.todayAttendance;
  const isCheckedIn = !!today?.checkIn && !today?.checkOut;
  const isCheckedOut = !!today?.checkOut;

  const netSalaryFormatted = payrollData?.netSalary
    ? `$${Number(payrollData.netSalary).toLocaleString()}`
    : '$5,800';

  const recentLogs = data?.recentAttendance || [];

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Top-Right Header Actions */}
        <div className="flex items-center gap-3.5">
          <Link
            to="/employee/leaves"
            className="w-11 h-11 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-neutral-800 shadow-2xs transition-colors relative"
            title="My Leaves"
          >
            <CalendarDays size={18} />
            {data.pendingLeaves > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
            )}
          </Link>
          
          <NotificationDropdown />

          <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
            <div className="w-11 h-11 rounded-full bg-neutral-950 text-[#D4FF00] font-black text-sm flex items-center justify-center shadow-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block text-left">
              <h4 className="text-sm font-extrabold text-neutral-950 leading-tight">{displayName}</h4>
              <p className="text-xs text-gray-400 font-medium">{displayRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        
        {/* Left & Center Main Area (8 cols) */}
        <div className="lg:col-span-8 space-y-7">
          
          {/* 3 White KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Card 1: Net Salary */}
            <Link
              to="/employee/payroll"
              className="stat-card hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Monthly Salary</span>
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <DollarSign size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-slate-950 font-mono tracking-tight">{netSalaryFormatted}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Disbursed on 1st of month
                </p>
              </div>
            </Link>

            {/* Card 2: Attendance Rate */}
            <Link
              to="/employee/attendance"
              className="stat-card hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
                <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <Clock size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-slate-950 font-mono tracking-tight">{data.attendanceRate}%</p>
                <p className="text-xs text-indigo-700 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Last 30-day tracking
                </p>
              </div>
            </Link>

            {/* Card 3: Pending Leaves */}
            <Link
              to="/employee/leaves"
              className="stat-card hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Applications</span>
                <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <CalendarDays size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-slate-950 font-mono tracking-tight">{data.pendingLeaves}</p>
                <p className="text-xs text-amber-700 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {data.totalLeaves} total applied in 2026
                </p>
              </div>
            </Link>

          </div>

          {/* Working Hours Dual Chart & Live Clock Action Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Dual Bar Chart (7 cols) */}
            <div className="md:col-span-7 card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-950">Logged Working Hours</h3>
                  <p className="text-xs text-slate-400 font-medium">Daily clock-in duration (Weekly view)</p>
                </div>
                <Link
                  to="/employee/attendance"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
                >
                  History
                </Link>
              </div>

              {/* Dual Bar Chart */}
              <div className="relative pt-2">
                <div className="flex justify-between items-end h-44 pb-6 border-b border-slate-100 px-2">
                  {[
                    { day: 'Mon', h1: 85, h2: 70 },
                    { day: 'Tue', h1: 95, h2: 80 },
                    { day: 'Wed', h1: 90, h2: 75 },
                    { day: 'Thu', h1: 100, h2: 85 },
                    { day: 'Fri', h1: 80, h2: 60 },
                    { day: 'Sat', h1: 30, h2: 0 },
                    { day: 'Sun', h1: 0, h2: 0 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-1.5 h-32">
                        <div
                          className="w-2.5 rounded-t-full bg-slate-900"
                          style={{ height: `${bar.h1}%` }}
                        />
                        <div
                          className="w-2.5 rounded-t-full bg-emerald-400"
                          style={{ height: `${bar.h2}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Regular (8h)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Overtime Log
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live Clock Action Widget (5 cols) */}
            <div className="md:col-span-5 card flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-950">Daily Shift Status</h3>
                <p className="text-xs text-slate-400 font-semibold">1-click clock action</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold">Shift:</span>
                  <span className={`font-black px-2.5 py-1 rounded-full text-xs ${
                    isCheckedIn ? 'bg-emerald-100 text-emerald-800' : isCheckedOut ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isCheckedIn ? 'Checked In' : isCheckedOut ? 'Checked Out' : 'Not Clocked In'}
                  </span>
                </div>

                {today?.checkIn && (
                  <p className="text-xs font-mono text-slate-900 font-bold">
                    Check In: {new Date(today.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
                {today?.checkOut && (
                  <p className="text-xs font-mono text-slate-900 font-bold">
                    Check Out: {new Date(today.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>

              <div>
                {isCheckedIn ? (
                  <button
                    onClick={() => checkOutMutation.mutate()}
                    disabled={checkOutMutation.isPending}
                    className="btn-primary w-full py-3.5 text-xs font-black shadow-xs"
                  >
                    {checkOutMutation.isPending ? 'Checking Out...' : 'Check Out Now'}
                  </button>
                ) : (
                  <button
                    onClick={() => checkInMutation.mutate()}
                    disabled={checkInMutation.isPending || isCheckedOut}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-xs transition-all active:scale-98 ${
                      isCheckedOut
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'btn-lime'
                    }`}
                  >
                    {isCheckedOut ? 'Shift Completed' : checkInMutation.isPending ? 'Checking In...' : 'Check In Now'}
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Table: Recent Logs */}
          <div className="card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-950">Recent Attendance Logs</h3>
                <p className="text-xs text-slate-400 font-medium">Your recent check-in and check-out logs</p>
              </div>
              <Link to="/employee/attendance" className="btn-secondary py-2 px-4 text-xs font-extrabold shadow-2xs">
                View All History
              </Link>
            </div>

            {recentLogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No attendance history records yet.</p>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th className="text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="font-extrabold text-slate-950">
                          {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="text-slate-600 font-mono">
                          {log.checkIn ? new Date(log.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                        <td className="text-slate-600 font-mono">
                          {log.checkOut ? new Date(log.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                        <td className="text-right">
                          {attendanceStatusBadge(log.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 3 Widgets */}
        <div className="lg:col-span-4 space-y-7">
          
          {/* Widget 1: Leave Application Banner in Clean White Card */}
          <div className="card space-y-4 border-slate-200">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                Leave Quota Active
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-950 tracking-tight">Apply for Time Off</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                Submit your Paid, Sick, or Unpaid leave request in 1 click with automated reviewer routing.
              </p>
            </div>
            <Link
              to="/employee/leaves"
              className="btn-primary w-full py-3 text-xs font-black flex items-center justify-center gap-1.5"
            >
              <span>Apply for Leave</span>
              <Plus size={15} />
            </Link>
          </div>

          {/* Widget 2: Standup Meeting */}
          <div className="card space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                <Video size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-950 leading-tight">Daily Standup</h4>
                <p className="text-xs text-slate-400 font-semibold">10:00 AM • Google Meet</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Join your team's sync call to coordinate daily tasks and blockers.
            </p>

            <button className="btn-secondary w-full py-2.5 text-xs font-bold">
              Meeting Link Active
            </button>
          </div>

          {/* Widget 3: Quick Navigation Shortcuts */}
          <div className="card space-y-4">
            <h4 className="text-base font-black text-slate-950">Quick Portals</h4>

            <div className="space-y-2.5">
              <Link
                to="/employee/profile"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs font-bold text-slate-900 transition-colors group"
              >
                <span>My Profile & Documents</span>
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/employee/payroll"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs font-bold text-slate-900 transition-colors group"
              >
                <span>View Monthly Payslips</span>
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/employee/leaves"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs font-bold text-slate-900 transition-colors group"
              >
                <span>Leave Balance Quotas</span>
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;
