import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import { leaveStatusBadge } from '../../components/common/Badge.jsx';
import { Link } from 'react-router-dom';
import { Users, CalendarDays, Clock, TrendingUp, Building2, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => dashboardApi.getAdminDashboard().then(r => r.data.data),
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">Overview of your organization today</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: data.totalEmployees, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', to: '/admin/employees' },
          { label: 'Pending Leaves', value: data.pendingLeaves, icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10', to: '/admin/leaves' },
          { label: "Today's Check-ins", value: data.todayCheckIns, icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Attendance Rate', value: `${data.todayAttendanceRate}%`, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', to: '/admin/analytics' },
        ].map((stat) => (
          <Link key={stat.label} to={stat.to ?? '#'} className={`stat-card ${stat.to ? 'cursor-pointer hover:border-white/10 transition-all' : ''}`}>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/50 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {data.departmentCounts?.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 size={16} className="text-primary-400" /> Headcount by Department
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.departmentCounts.map((d) => (
              <div key={d.department} className="bg-surface-300/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-white">{d.count}</p>
                <p className="text-[11px] text-white/50 mt-1 truncate">{d.department}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Pending Leave Requests</h2>
          <Link to="/admin/leaves" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {data.recentLeaves?.length === 0 ? (
          <p className="text-white/40 text-sm text-center py-8">No pending leave requests 🎉</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.recentLeaves?.map((leave) => (
                  <tr key={leave.id}>
                    <td>
                      <div>
                        <p className="text-white font-medium">{leave.employee.profile?.firstName} {leave.employee.profile?.lastName}</p>
                        <p className="text-white/40 text-xs">{leave.employee.employeeId}</p>
                      </div>
                    </td>
                    <td className="text-white/60">{leave.employee.profile?.department ?? '—'}</td>
                    <td>{leave.leaveType}</td>
                    <td className="text-white/60 text-xs">
                      {new Date(leave.startDate).toLocaleDateString()} → {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td>{leaveStatusBadge(leave.status)}</td>
                    <td>
                      <Link to="/admin/leaves" className="text-primary-400 hover:text-primary-300 text-xs">Review →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
