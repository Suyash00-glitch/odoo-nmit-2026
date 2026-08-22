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
          
          <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-neutral-800 shadow-2xs relative">
            <Bell size={18} />
            {data.unreadNotifications > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
            )}
          </div>

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
          
          {/* 3 Pastel Gradient Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Card 1: Lavender (Net Salary) */}
            <Link
              to="/employee/payroll"
              className="p-6 rounded-3xl bg-[#DDD6FE]/70 border border-[#C4B5FD]/60 shadow-2xs flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Net Monthly Salary</span>
                </div>
                <DollarSign size={16} className="text-neutral-900" />
              </div>
              <div>
                <p className="text-4xl font-black text-neutral-950 font-mono tracking-tight">{netSalaryFormatted}</p>
                <p className="text-xs text-neutral-700 font-semibold mt-1">Disbursed on 1st of month</p>
              </div>
            </Link>

            {/* Card 2: Sky Blue (Attendance Rate) */}
            <Link
              to="/employee/attendance"
              className="p-6 rounded-3xl bg-[#BFDBFE]/70 border border-[#93C5FD]/60 shadow-2xs flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Attendance Rate</span>
                </div>
                <Clock size={16} className="text-neutral-900" />
              </div>
              <div>
                <p className="text-4xl font-black text-neutral-950 font-mono tracking-tight">{data.attendanceRate}%</p>
                <p className="text-xs text-neutral-700 font-semibold mt-1">Last 30-day tracking</p>
              </div>
            </Link>

            {/* Card 3: Mint Green (Pending Leaves) */}
            <Link
              to="/employee/leaves"
              className="p-6 rounded-3xl bg-[#BBF7D0]/70 border border-[#86EFAC]/60 shadow-2xs flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">My Leave Requests</span>
                </div>
                <CalendarDays size={16} className="text-neutral-900" />
              </div>
              <div>
                <p className="text-4xl font-black text-neutral-950 font-mono tracking-tight">{data.pendingLeaves}</p>
                <p className="text-xs text-emerald-900 font-bold mt-1">{data.totalLeaves} total applied in 2026</p>
              </div>
            </Link>

          </div>

          {/* Working Hours Dual Chart & Live Clock Action Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Dual Bar Chart (7 cols) */}
            <div className="md:col-span-7 p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-neutral-950">Logged Working Hours</h3>
                  <p className="text-xs text-gray-400 font-medium">Daily check-in activity</p>
                </div>
                <Link
                  to="/employee/attendance"
                  className="px-4 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-xs font-black shadow-2xs transition-colors"
                >
                  History
                </Link>
              </div>

              {/* Dual Bar Chart */}
              <div className="relative pt-2">
                <div className="flex justify-between items-end h-44 pb-6 border-b border-gray-100 px-2">
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
                          className="w-2.5 rounded-t-full bg-[#C4B5FD]"
                          style={{ height: `${bar.h1}%` }}
                        />
                        <div
                          className="w-2.5 rounded-t-full bg-[#86EFAC]"
                          style={{ height: `${bar.h2}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#C4B5FD]" /> Regular (8h)
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#86EFAC]" /> Overtime Log
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live Clock Action Widget (5 cols) */}
            <div className="md:col-span-5 p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-neutral-950">Daily Attendance</h3>
                <p className="text-xs text-gray-400 font-semibold">1-click clock action</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-bold">Status:</span>
                  <span className={`font-black px-2.5 py-1 rounded-full text-xs ${
                    isCheckedIn ? 'bg-emerald-100 text-emerald-800' : isCheckedOut ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {isCheckedIn ? 'Checked In' : isCheckedOut ? 'Checked Out' : 'Not Checked In'}
                  </span>
                </div>

                {today?.checkIn && (
                  <p className="text-xs font-mono text-neutral-900 font-bold">
                    In Time: {new Date(today.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
                {today?.checkOut && (
                  <p className="text-xs font-mono text-neutral-900 font-bold">
                    Out Time: {new Date(today.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>

              <div>
                {isCheckedIn ? (
                  <button
                    onClick={() => checkOutMutation.mutate()}
                    disabled={checkOutMutation.isPending}
                    className="w-full py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs shadow-xs transition-all active:scale-98"
                  >
                    {checkOutMutation.isPending ? 'Checking Out...' : 'Check Out Now'}
                  </button>
                ) : (
                  <button
                    onClick={() => checkInMutation.mutate()}
                    disabled={checkInMutation.isPending || isCheckedOut}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-lime transition-all active:scale-98 ${
                      isCheckedOut
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
          <div className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-neutral-950">Recent Attendance History</h3>
                <p className="text-xs text-gray-400 font-medium">Your recent check-in and check-out logs</p>
              </div>
              <Link to="/employee/attendance" className="px-4 py-2 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-xs font-extrabold shadow-2xs transition-colors">
                View All Logs
              </Link>
            </div>

            {recentLogs.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">No attendance history records yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-400 font-bold border-b border-gray-100 pb-3">
                      <th className="py-3 font-bold">Date</th>
                      <th className="py-3 font-bold">Check-In</th>
                      <th className="py-3 font-bold">Check-Out</th>
                      <th className="py-3 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {recentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 font-extrabold text-neutral-950">
                          {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-3.5 text-gray-600 font-mono">
                          {log.checkIn ? new Date(log.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                        <td className="py-3.5 text-gray-600 font-mono">
                          {log.checkOut ? new Date(log.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                        </td>
                        <td className="py-3.5 text-right font-semibold">
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
          
          {/* Widget 1: Leave Application Banner */}
          <div className="p-7 rounded-3xl bg-[#0D7477] text-white shadow-md relative overflow-hidden space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D4FF00]">Leave Quota Active</span>
              <h3 className="text-xl font-black text-white">Apply for Time Off</h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                Submit your Paid, Sick, or Unpaid leave request in 1 click with automated notifications.
              </p>
            </div>
            <Link
              to="/employee/leaves"
              className="inline-flex w-full py-3 rounded-2xl bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-black text-xs shadow-lime justify-center items-center gap-1.5 transition-all"
            >
              <span>Apply for Leave</span>
              <Plus size={15} />
            </Link>
          </div>

          {/* Widget 2: Standup Meeting */}
          <div className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B42EF] flex items-center justify-center shadow-2xs">
                <Video size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black text-neutral-950 leading-tight">Daily Standup</h4>
                <p className="text-xs text-gray-400 font-semibold">10:00 AM • Google Meet</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Join your team's sync call to coordinate daily tasks and blockers.
            </p>

            <button className="w-full py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs shadow-xs transition-colors">
              Click for Meeting Link
            </button>
          </div>

          {/* Widget 3: Quick Navigation Shortcuts */}
          <div className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <h4 className="text-base font-black text-neutral-950">Quick Portals</h4>

            <div className="space-y-2.5">
              <Link
                to="/employee/profile"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs font-bold text-neutral-900 transition-colors group"
              >
                <span>My Profile & Documents</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/employee/payroll"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs font-bold text-neutral-900 transition-colors group"
              >
                <span>View Monthly Payslips</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/employee/leaves"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs font-bold text-neutral-900 transition-colors group"
              >
                <span>Leave Balance Quotas</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;
