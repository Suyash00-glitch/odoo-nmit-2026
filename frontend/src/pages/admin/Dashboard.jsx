import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { employeesApi } from '../../api/employees.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { leaveStatusBadge } from '../../components/common/Badge.jsx';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Bell,
  Video,
  ChevronRight,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Share2,
  Users,
  Building2,
  CalendarDays,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => dashboardApi.getAdminDashboard().then(r => r.data.data),
    refetchInterval: 30000,
  });

  const { data: employeesData } = useQuery({
    queryKey: ['admin-top-employees'],
    queryFn: () => employeesApi.getAll({ limit: 4 }).then(r => r.data.data),
  });

  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : 'Admin User';
  const displayRole = user?.profile?.jobTitle || 'HR Director';

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

  const employeesList = employeesData?.employees || [];

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
            to="/admin/leaves"
            className="w-11 h-11 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-neutral-800 shadow-2xs transition-colors relative"
            title="Leave Approvals"
          >
            <MessageSquare size={18} />
            {data.pendingLeaves > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
            )}
          </Link>
          
          <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-neutral-800 shadow-2xs relative">
            <Bell size={18} />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
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
          
          {/* 3 Pastel Gradient Metric Cards (Exact Match to Niond style, Real Data) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Card 1: Lavender (Total Employees) */}
            <Link
              to="/admin/employees"
              className="p-6 rounded-3xl bg-[#DDD6FE]/70 border border-[#C4B5FD]/60 shadow-2xs flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Total Headcount</span>
                </div>
                <Users size={16} className="text-neutral-900" />
              </div>
              <div>
                <p className="text-4xl font-black text-neutral-950 font-mono tracking-tight">{data.totalEmployees}</p>
                <p className="text-xs text-neutral-700 font-semibold mt-1">Active registered staff</p>
              </div>
            </Link>

            {/* Card 2: Sky Blue (Today Check-Ins) */}
            <Link
              to="/admin/analytics"
              className="p-6 rounded-3xl bg-[#BFDBFE]/70 border border-[#93C5FD]/60 shadow-2xs flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Today Check-Ins</span>
                </div>
                <Clock size={16} className="text-neutral-900" />
              </div>
              <div>
                <p className="text-4xl font-black text-neutral-950 font-mono tracking-tight">{data.todayCheckIns}</p>
                <p className="text-xs text-neutral-700 font-semibold mt-1">{data.todayAttendanceRate}% attendance today</p>
              </div>
            </Link>

            {/* Card 3: Mint Green (Pending Leaves) */}
            <Link
              to="/admin/leaves"
              className="p-6 rounded-3xl bg-[#BBF7D0]/70 border border-[#86EFAC]/60 shadow-2xs flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Pending Leaves</span>
                </div>
                <CalendarDays size={16} className="text-neutral-900" />
              </div>
              <div>
                <p className="text-4xl font-black text-neutral-950 font-mono tracking-tight">{data.pendingLeaves}</p>
                <p className="text-xs text-emerald-900 font-bold mt-1">Requires HR approval</p>
              </div>
            </Link>

          </div>

          {/* Dual Bar Chart & More Analysis Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Dual Bar Attendance Activity Chart (7 cols) */}
            <div className="md:col-span-7 p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-neutral-950">Workforce Activity</h3>
                  <p className="text-xs text-gray-400 font-medium">Daily attendance & check-ins</p>
                </div>
                <Link
                  to="/admin/analytics"
                  className="px-4 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-xs font-black shadow-2xs transition-colors"
                >
                  View Trends
                </Link>
              </div>

              {/* Dual Bar Visual */}
              <div className="relative pt-2">
                <div className="flex justify-between items-end h-44 pb-6 border-b border-gray-100 px-2">
                  {[
                    { day: 'Mon', h1: 85, h2: 70 },
                    { day: 'Tue', h1: 95, h2: 80 },
                    { day: 'Wed', h1: 100, h2: 90 },
                    { day: 'Thu', h1: 90, h2: 75 },
                    { day: 'Fri', h1: 80, h2: 60 },
                    { day: 'Sat', h1: 40, h2: 20 },
                    { day: 'Sun', h1: 20, h2: 10 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-1.5 h-32">
                        <div
                          className="w-2.5 rounded-t-full bg-[#C4B5FD] transition-all"
                          style={{ height: `${bar.h1}%` }}
                        />
                        <div
                          className="w-2.5 rounded-t-full bg-[#86EFAC] transition-all"
                          style={{ height: `${bar.h2}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#C4B5FD]" /> Morning Shift
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#86EFAC]" /> Evening Shift
                  </span>
                </div>
              </div>
            </div>

            {/* Right: "More Analysis" Widget (5 cols) */}
            <div className="md:col-span-5 p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-neutral-950">Department Insights</h3>
                <p className="text-xs text-gray-400 font-semibold">Headcount breakdown</p>
              </div>

              <div className="space-y-3">
                {data.departmentCounts?.length > 0 ? (
                  data.departmentCounts.slice(0, 3).map((dept) => (
                    <div
                      key={dept.department}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-bold text-neutral-900"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-neutral-800 shadow-2xs">
                          <Building2 size={14} />
                        </div>
                        <span>{dept.department}</span>
                      </div>
                      <span className="font-mono text-neutral-950 font-black">{dept.count} Members</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No department data</p>
                )}
              </div>

              <Link
                to="/admin/analytics"
                className="pt-2 flex items-center justify-between text-xs font-extrabold text-[#6B42EF] hover:underline"
              >
                <span>Complete Analytics Report</span>
                <ChevronRight size={15} />
              </Link>
            </div>

          </div>

          {/* Bottom Table: Pending Leave Requests */}
          <div className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-neutral-950">Pending Leave Approvals</h3>
                <p className="text-xs text-gray-400 font-medium">Review and take action on employee requests</p>
              </div>
              <Link
                to="/admin/leaves"
                className="px-4 py-2 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-xs font-extrabold shadow-2xs flex items-center gap-1.5 transition-colors"
              >
                <span>Review All ({data.pendingLeaves})</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {data.recentLeaves?.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-neutral-900">All leave requests resolved!</p>
                <p className="text-xs text-gray-400">No pending employee requests in queue.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-400 font-bold border-b border-gray-100 pb-3">
                      <th className="py-3 font-bold">Employee</th>
                      <th className="py-3 font-bold">Department</th>
                      <th className="py-3 font-bold">Type</th>
                      <th className="py-3 font-bold">Duration</th>
                      <th className="py-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {data.recentLeaves?.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5">
                          <p className="font-extrabold text-neutral-950 text-sm">
                            {leave.employee.profile?.firstName} {leave.employee.profile?.lastName}
                          </p>
                          <p className="text-gray-400 font-mono text-[11px]">{leave.employee.employeeId}</p>
                        </td>
                        <td className="py-3.5 text-gray-600 font-semibold">{leave.employee.profile?.department || 'General'}</td>
                        <td className="py-3.5">
                          <span className="font-bold uppercase tracking-wider text-xs">{leave.leaveType}</span>
                        </td>
                        <td className="py-3.5 text-gray-500 font-mono">
                          {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-3.5 text-right">
                          <Link
                            to="/admin/leaves"
                            className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs"
                          >
                            <span>Review</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 3 Stacked Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-7">
          
          {/* Widget 1: System Status Banner */}
          <div className="p-7 rounded-3xl bg-[#0D7477] text-white shadow-md relative overflow-hidden space-y-5">
            <div className="space-y-2 relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D4FF00]">System Connected</span>
              <h3 className="text-xl font-black text-white">Neon PostgreSQL DB</h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                Live database synced with automated backup, cryptographic JWT auth, and active migrations.
              </p>
            </div>

            <Link
              to="/admin/analytics"
              className="w-full py-3 rounded-2xl bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-black text-xs shadow-lime transition-all flex items-center justify-center gap-1.5"
            >
              <span>Explore Analytics</span>
              <ArrowUpRight size={14} className="text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Widget 2: Daily Standup */}
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
              Daily morning check-in for department heads and workforce leads.
            </p>

            <button className="w-full py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs shadow-xs transition-colors">
              Click for Meeting Link
            </button>
          </div>

          {/* Widget 3: Team Members List (Real Seeded Employees) */}
          <div className="p-7 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-neutral-950">Team Members</h4>
              <span className="text-xs text-gray-400 font-bold">{data.totalEmployees} Active</span>
            </div>

            <div className="space-y-3.5">
              {employeesList.map((emp) => (
                <Link
                  key={emp.id}
                  to={`/admin/employees/${emp.id}`}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center font-bold text-xs text-[#6B42EF]">
                      {emp.profile?.firstName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-neutral-950 leading-tight">
                        {emp.profile?.firstName} {emp.profile?.lastName}
                      </h5>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                        {emp.profile?.jobTitle || emp.profile?.department || 'Employee'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>

            <Link
              to="/admin/employees"
              className="w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-neutral-900 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus size={15} />
              <span>View All Employees</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
