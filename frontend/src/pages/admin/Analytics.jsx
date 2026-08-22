import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../api/analytics.api.js';
import { Loader } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  CalendarDays,
  BarChart3,
  PieChart as PieIcon,
  Printer,
  Users,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const COLORS = ['#0F172A', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xl font-sans">
      <p className="text-slate-400 text-xs font-bold mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 text-xs font-extrabold py-0.5">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}:
          </span>
          <span className="text-slate-950 font-mono">
            {p.value}{p.name === 'rate' || p.name === 'Attendance Rate' ? '%' : ''}
          </span>
        </div>
      ))}
    </div>
  );
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('14');

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

  if (isLoading) return <Loader text="Loading workforce analytics suite..." />;
  if (isError) return <ErrorState onRetry={() => { aRefetch(); lRefetch(); }} />;

  const rawChartData = attendanceData?.chartData ?? [];
  const limitDays = timeRange === '7' ? -7 : -14;
  const attendanceChartData = rawChartData.slice(limitDays).map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  const leaveTypeData = leaveData?.typeBreakdown ?? [];
  const leaveStatusData = leaveData?.statusBreakdown ?? [];
  const monthlyData = leaveData?.monthlyData ?? [];

  // Calculate high-level summary KPIs
  const metrics = attendanceData?.metrics ?? {};
  const avgRate = metrics.averageRate ?? 0;

  const totalLeaves = leaveTypeData.reduce((acc, curr) => acc + (curr.count || 0), 0);

  return (
    <div className="space-y-8 animate-slide-up pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">Workforce Analytics</h1>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-black flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Real-time workforce presence, attendance curves, and leave distribution metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
            {['7', '14'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  timeRange === range
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                Last {range} Days
              </button>
            ))}
          </div>
          <button
            onClick={() => window.print()}
            className="btn-secondary py-2 px-3.5 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            id="export-analytics-btn"
          >
            <Printer size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 White KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Avg Attendance Rate */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg. Presence Rate</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-950 font-mono tracking-tight">{avgRate}%</p>
            <div className="flex items-center gap-1.5 mt-1.5"><span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">From recorded attendance</span></div>
          </div>
        </div>

        {/* Metric 2: Organization Headcount */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Staff</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-950 font-mono tracking-tight">{attendanceData?.totalEmployees ?? 0}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">Active employee records</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Total Leave Applications */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Leave Requests</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-2xs">
              <CalendarDays size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-950 font-mono tracking-tight">{metrics.pendingLeaves ?? 0}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Currently awaiting review</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Punctuality Index */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Punctuality Score</span>
            <div className="w-9 h-9 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-2xs">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-950 font-mono tracking-tight">{metrics.onTimeRate ?? 0}%</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[11px] font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">{metrics.recordedCheckIns ?? 0} recorded check-ins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Section: Smooth Area Chart */}
      <div className="card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xs">
              <TrendingUp size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-950">Daily Attendance Rate Curve</h2>
              <p className="text-xs text-slate-400 font-medium">Daily workforce attendance percentage trajectory</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-900" /> Organization Presence %
            </span>
          </div>
        </div>

        <div className="h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={attendanceChartData} margin={{ top: 10, right: 15, bottom: 5, left: -10 }}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F172A" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#0F172A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rate"
                name="Attendance Rate"
                stroke="#0F172A"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#attendanceGradient)"
                dot={{ fill: '#0F172A', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 7, fill: '#0F172A' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Daily Breakdown & Leave Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left: Daily Status Breakdown Bars (7 cols) */}
        <div className="lg:col-span-7 card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center shadow-2xs border border-emerald-100">
              <BarChart3 size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-950">Daily Attendance Breakdown</h2>
              <p className="text-xs text-slate-400 font-medium">Present, Absent, and Half-Day status headcount</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceChartData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
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

        {/* Right: Leave Type Distribution Donut (5 cols) */}
        <div className="lg:col-span-5 card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center shadow-2xs border border-amber-100">
              <PieIcon size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-950">Leave Type Distribution</h2>
              <p className="text-xs text-slate-400 font-medium">Paid vs Sick vs Unpaid shares</p>
            </div>
          </div>

          <div className="h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveTypeData.filter((d) => d.count > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="type"
                >
                  {leaveTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, fontWeight: 700, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Donut Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-950 font-mono">{totalLeaves}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Requests</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-1">
            {leaveTypeData.map((d, i) => (
              <div key={d.type} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span>{d.type}: {d.count}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Monthly Trends & Status Resolutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        
        {/* Leave Status Resolution */}
        <div className="card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center shadow-2xs border border-indigo-100">
              <CalendarDays size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-950">Leave Resolution Status</h2>
              <p className="text-xs text-slate-400 font-medium">Approved vs Rejected vs Pending requests</p>
            </div>
          </div>

          <div className="h-60 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaveStatusData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="status" tick={{ fill: '#64748B', fontSize: 12, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Total" fill="#0F172A" radius={[0, 8, 8, 0]}>
                  {leaveStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.status === 'APPROVED' ? '#10B981' : entry.status === 'REJECTED' ? '#EF4444' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Leave Requests Stacked Bars */}
        <div className="card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center shadow-2xs border border-purple-100">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-950">Monthly Quota Utilization</h2>
              <p className="text-xs text-slate-400 font-medium">Paid vs Sick vs Unpaid time-off breakdown</p>
            </div>
          </div>

          <div className="h-60">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 15, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#475569', fontSize: 12, fontWeight: 700 }} />
                  <Bar dataKey="PAID" name="Paid" fill="#10B981" stackId="a" />
                  <Bar dataKey="SICK" name="Sick" fill="#F59E0B" stackId="a" />
                  <Bar dataKey="UNPAID" name="Unpaid" fill="#0F172A" stackId="a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs font-semibold">
                No historical monthly records available
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
