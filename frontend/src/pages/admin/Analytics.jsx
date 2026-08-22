import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../api/analytics.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, CalendarDays, BarChart3, PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#6B42EF', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-xl">
      <p className="text-gray-400 text-xs font-bold mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-extrabold" style={{ color: p.color }}>
          {p.name}: {p.value}{p.name === 'rate' || p.name === 'Attendance %' ? '%' : ''}
        </p>
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

  if (isLoading) return <Loader text="Loading workforce analytics..." />;
  if (isError) return <ErrorState onRetry={() => { aRefetch(); lRefetch(); }} />;

  const attendanceChartData = (attendanceData?.chartData ?? []).slice(-14).map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  const leaveTypeData = leaveData?.typeBreakdown ?? [];
  const leaveStatusData = leaveData?.statusBreakdown ?? [];
  const monthlyData = leaveData?.monthlyData ?? [];

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Analytics & Reports</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Real-time attendance rates, leave quotas, and workforce trends</p>
      </div>

      {/* 1. Line Chart: 14-Day Attendance Rate */}
      <div className="card space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 text-[#6B42EF] rounded-2xl flex items-center justify-center shadow-2xs">
            <TrendingUp size={18} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-neutral-950">Attendance Rate (Last 14 Days)</h2>
            <p className="text-xs text-gray-400 font-medium">Organization-wide daily attendance percentage</p>
          </div>
        </div>

        <div className="h-72 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#475569', fontSize: 12, fontWeight: 700 }} />
              <Line type="monotone" dataKey="rate" name="Attendance %" stroke="#6B42EF" strokeWidth={3} dot={{ fill: '#6B42EF', r: 4 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Bar Chart: Daily Attendance Breakdown */}
      <div className="card space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shadow-2xs">
            <BarChart3 size={18} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-neutral-950">Daily Attendance Breakdown</h2>
            <p className="text-xs text-gray-400 font-medium">Present, Absent, and Half-Day status distribution</p>
          </div>
        </div>

        <div className="h-64 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#475569', fontSize: 12, fontWeight: 700 }} />
              <Bar dataKey="present" name="Present" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="halfDay" name="Half Day" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Grid: Pie Chart & Leave Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pie: Leave Type Distribution */}
        <div className="card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center shadow-2xs">
              <PieIcon size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-950">Leave Type Distribution</h2>
              <p className="text-xs text-gray-400 font-medium">Paid vs. Sick vs. Unpaid</p>
            </div>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveTypeData.filter((d) => d.count > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  nameKey="type"
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                >
                  {leaveTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [val, name]} contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, fontWeight: 700 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-5 pt-2">
            {leaveTypeData.map((d, i) => (
              <div key={d.type} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span>{d.type}: {d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar: Leave Status */}
        <div className="card space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center shadow-2xs">
              <CalendarDays size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-950">Leave Status (Last 90 Days)</h2>
              <p className="text-xs text-gray-400 font-medium">Resolution breakdown</p>
            </div>
          </div>

          <div className="h-56 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaveStatusData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="status" tick={{ fill: '#64748B', fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Total Requests" fill="#6B42EF" radius={[0, 8, 8, 0]}>
                  {leaveStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.status === 'APPROVED' ? '#10B981' : entry.status === 'REJECTED' ? '#EF4444' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. Monthly Leave Trends */}
      {monthlyData.length > 0 && (
        <div className="card space-y-4">
          <h2 className="text-base font-extrabold text-neutral-950">Monthly Leave Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#475569', fontSize: 12, fontWeight: 700 }} />
                <Bar dataKey="PAID" name="Paid" fill="#10B981" stackId="a" />
                <Bar dataKey="SICK" name="Sick" fill="#F59E0B" stackId="a" />
                <Bar dataKey="UNPAID" name="Unpaid" fill="#6B42EF" stackId="a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
