import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { employeesApi } from '../../api/employees.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { leaveStatusBadge } from '../../components/common/Badge.jsx';
import { Link } from 'react-router-dom';
import NotificationDropdown from '../../components/common/NotificationDropdown.jsx';
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
            
            {/* Card 1: Total Employees */}
            <Link
              to="/admin/employees"
              className="stat-card hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Headcount</span>
                <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <Users size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-slate-950 font-mono tracking-tight">{data.totalEmployees}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active registered staff
                </p>
              </div>
            </Link>

            {/* Card 2: Today Check-Ins */}
            <Link
              to="/admin/analytics"
              className="stat-card hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today Check-Ins</span>
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <Clock size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-slate-950 font-mono tracking-tight">{data.todayCheckIns}</p>
                <p className="text-xs text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {data.todayAttendanceRate}% attendance today
                </p>
              </div>
            </Link>

            {/* Card 3: Pending Leaves */}
            <Link
              to="/admin/leaves"
              className="stat-card hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Leaves</span>
                <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-2xs group-hover:bg-slate-950 group-hover:text-white transition-colors">
                  <CalendarDays size={16} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-black text-slate-950 font-mono tracking-tight">{data.pendingLeaves}</p>
                <p className="text-xs text-amber-700 font-bold mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Requires HR approval
                </p>
              </div>
            </Link>

          </div>

          {/* Dual Bar Chart & More Analysis Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Dual Bar Attendance Activity Chart (7 cols) */}
            <div className="md:col-span-7 card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-950">Workforce Activity</h3>
                  <p className="text-xs text-slate-400 font-medium">Daily attendance & shift check-ins</p>
                </div>
                <Link
                  to="/admin/analytics"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
                >
                  View Trends
                </Link>
              </div>

              {/* Dual Bar Visual */}
              <div className="relative pt-2">
                <div className="flex justify-between items-end h-44 pb-6 border-b border-slate-100 px-2">
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
                          className="w-2.5 rounded-t-full bg-slate-900 transition-all"
                          style={{ height: `${bar.h1}%` }}
                        />
                        <div
                          className="w-2.5 rounded-t-full bg-emerald-400 transition-all"
                          style={{ height: `${bar.h2}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Morning Shift
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Evening Shift
                  </span>
                </div>
              </div>
            </div>

            {/* Right: "More Analysis" Widget (5 cols) */}
            <div className="md:col-span-5 card flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-950">Department Breakdown</h3>
                <p className="text-xs text-slate-400 font-semibold">Headcount distribution</p>
              </div>

              <div className="space-y-3">
                {data.departmentCounts?.length > 0 ? (
                  data.departmentCounts.slice(0, 3).map((dept) => (
                    <div
                      key={dept.department}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                          <Building2 size={14} />
                        </div>
                        <span>{dept.department}</span>
                      </div>
                      <span className="font-mono text-slate-950 font-black">{dept.count} Members</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No department data</p>
                )}
              </div>

              <Link
                to="/admin/analytics"
                className="pt-2 flex items-center justify-between text-xs font-extrabold text-slate-900 hover:text-slate-700 group"
              >
                <span>Full Analytics Dashboard</span>
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Bottom Table: Pending Leave Requests */}
          <div className="card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-950">Pending Leave Approvals</h3>
                <p className="text-xs text-slate-400 font-medium">Review and take action on employee requests</p>
              </div>
              <Link
                to="/admin/leaves"
                className="btn-primary py-2 px-4 text-xs font-extrabold shadow-2xs flex items-center gap-1.5"
              >
                <span>Review Queue ({data.pendingLeaves})</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {data.recentLeaves?.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-slate-900">All leave requests resolved!</p>
                <p className="text-xs text-slate-400">No pending employee requests in queue.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentLeaves?.map((leave) => (
                      <tr key={leave.id}>
                        <td>
                          <p className="font-extrabold text-slate-950 text-sm">
                            {leave.employee.profile?.firstName} {leave.employee.profile?.lastName}
                          </p>
                          <p className="text-slate-400 font-mono text-[11px]">{leave.employee.employeeId}</p>
                        </td>
                        <td className="text-slate-600 font-semibold">{leave.employee.profile?.department || 'General'}</td>
                        <td>
                          <span className="font-bold uppercase tracking-wider text-xs">{leave.leaveType}</span>
                        </td>
                        <td className="text-slate-500 font-mono">
                          {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="text-right">
                          <Link
                            to="/admin/leaves"
                            className="btn-primary py-1.5 px-3 text-xs"
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
          
          {/* Widget 1: HR Quick Actions & Operations */}
          <div className="card space-y-4 border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-950 tracking-tight">Quick Operations</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                HR Hub
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/admin/employees"
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all flex flex-col items-center text-center gap-1.5 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users size={16} />
                </div>
                <span className="text-xs font-extrabold text-slate-800">Directory</span>
              </Link>

              <Link
                to="/admin/leaves"
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all flex flex-col items-center text-center gap-1.5 group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-extrabold text-slate-800">Leaves ({data.pendingLeaves})</span>
              </Link>
            </div>

            <Link
              to="/admin/analytics"
              className="btn-primary w-full py-2.5 text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>View Analytics & Reports</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Team Members List */}
          <div className="card space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-950">Team Members</h4>
              <span className="text-xs text-slate-400 font-bold">{data.totalEmployees} Active</span>
            </div>

            <div className="space-y-3">
              {employeesList.map((emp) => (
                <Link
                  key={emp.id}
                  to={`/admin/employees/${emp.id}`}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 text-[#D4FF00] flex items-center justify-center font-black text-xs shadow-2xs">
                      {emp.profile?.firstName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-950 leading-tight">
                        {emp.profile?.firstName} {emp.profile?.lastName}
                      </h5>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {emp.profile?.jobTitle || emp.profile?.department || 'Employee'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>

            <Link
              to="/admin/employees"
              className="btn-secondary w-full py-2.5 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-2xs"
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
