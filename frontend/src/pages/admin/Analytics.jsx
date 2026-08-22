import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../api/analytics.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, CalendarDays, BarChart3 } from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-200 border border-white/10 rounded-xl p-3 shadow-2xl">
      <p className="text-white/60 text-xs mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: p.color }}>{p.name}: {p.value}{p.name === 'rate' ? '%' : ''}</p>
      ))}
    </div>
  );
};

const AdminAnalytics = () => {
  const { data: attendanceData, isLoading: aLoading, isError: aError, refetch: aRefetch } = useQuery({
    queryKey: ['analytics-attendance'],
    queryFn: () => analyticsApi.getAttendanceSummary().then(r => r.data.data),
  });

  const { data: leaveData, isLoading: lLoading, isError: lError, refetch: lRefetch } = useQuery({
    queryKey: ['analytics-leave'],
    queryFn: () => analyticsApi.getLeaveSummary().then(r => r.data.data),
  });

  const isLoading = aLoading || lLoading;
  const isError = aError || lError;

  if (isLoading) return <Loader text="Loading analytics..." />;
  if (isError) return <ErrorState onRetry={() => { aRefetch(); lRefetch(); }} />;

  const attendanceChartData = (attendanceData?.chartData ?? []).slice(-14).map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  const leaveTypeData = leaveData?.typeBreakdown ?? [];
  const leaveStatusData = leaveData?.statusBreakdown ?? [];
  const monthlyData = leaveData?.monthlyData ?? [];

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-white/50 text-sm mt-1">Attendance and leave trends across your organization</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary-600/20 rounded-xl flex items-center justify-center">
            <TrendingUp size={16} className="text-primary-400" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Attendance Rate — Last 14 Days</h2>
            <p className="text-white/40 text-xs">Daily attendance % across all employees</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
              <Line type="monotone" dataKey="rate" name="Attendance %" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <BarChart3 size={16} className="text-emerald-400" />
          </div>
          <h2 className="font-semibold text-white">Daily Attendance Breakdown</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
              <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="halfDay" name="Half Day" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <CalendarDays size={16} className="text-amber-400" />
            </div>
            <h2 className="font-semibold text-white">Leave Type Distribution</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leaveTypeData.filter((d) => d.count > 0)} cx="50%" cy="50%" outerRadius={80} dataKey="count" nameKey="type" label={(props) => `${props.type} ${((props.percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {leaveTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [val, name]} contentStyle={{ background: '#1e1e30', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {leaveTypeData.map((d, i) => (
              <div key={d.type} className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.type}: {d.count}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="font-semibold text-white">Leave Status (Last 90 Days)</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaveStatusData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="status" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Count" fill="#6366f1" radius={[0, 6, 6, 0]}>
                  {leaveStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.status === 'APPROVED' ? '#10b981' : entry.status === 'REJECTED' ? '#ef4444' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {monthlyData.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-white mb-6">Monthly Leave Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Bar dataKey="PAID" name="Paid" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="SICK" name="Sick" fill="#f59e0b" stackId="a" />
                <Bar dataKey="UNPAID" name="Unpaid" fill="#6366f1" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
