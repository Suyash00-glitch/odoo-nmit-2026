import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { attendanceApi } from '../../api/attendance.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
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
  Share2,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['employee-dashboard'],
    queryFn: () => dashboardApi.getEmployeeDashboard().then(r => r.data.data),
    refetchInterval: 30000,
  });

  const checkInMutation = useMutation({
    mutationFn: () => attendanceApi.checkIn(),
    onSuccess: () => {
      toast.success('Successfully Checked In! Have a productive day.');
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
    : 'Nora Watson';
  const displayRole = user?.profile?.jobTitle || 'Sales Manager';

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
  const isCheckedIn = today?.checkIn && !today?.checkOut;

  const teamMembers = [
    { name: 'Mahid Ahmed', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Daniel Karl', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { name: 'Elena Michel', role: 'HR Specialist', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  ];

  const recentLogs = [
    { date: 'Today, 22 Aug', inTime: today?.checkIn ? new Date(today.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '09:02 AM', outTime: 'Present', duration: '7.4 Hrs' },
    { date: 'Yesterday, 21 Aug', inTime: '09:00 AM', outTime: '06:15 PM', duration: '9.25 Hrs' },
    { date: 'Wed, 20 Aug', inTime: '08:55 AM', outTime: '05:45 PM', duration: '8.83 Hrs' },
    { date: 'Tue, 19 Aug', inTime: '09:10 AM', outTime: '06:30 PM', duration: '9.33 Hrs' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Top-Right Header Actions */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-2xl bg-white border border-gray-200/80 hover:bg-gray-50 flex items-center justify-center text-neutral-800 shadow-2xs transition-colors">
            <MessageSquare size={17} />
          </button>
          
          <button className="w-10 h-10 rounded-2xl bg-white border border-gray-200/80 hover:bg-gray-50 flex items-center justify-center text-neutral-800 shadow-2xs transition-colors relative">
            <Bell size={17} />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2.5 right-2.5" />
          </button>

          <div className="flex items-center gap-3 pl-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-2xs"
            />
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-extrabold text-neutral-950 leading-tight">{displayName}</h4>
              <p className="text-[11px] text-gray-400 font-medium">{displayRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left & Center (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 3 Pastel Gradient Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: Lavender (Monthly Pay) */}
            <div className="p-5 rounded-3xl bg-[#DDD6FE]/70 border border-[#C4B5FD]/50 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-800">Net Salary</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">$8,450</p>
                <p className="text-[11px] text-neutral-600 font-medium mt-1">Disbursed on 1st of month</p>
              </div>
            </div>

            {/* Card 2: Sky Blue (Paid Leave Balance) */}
            <div className="p-5 rounded-3xl bg-[#BFDBFE]/70 border border-[#93C5FD]/50 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-800">Paid Leaves</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">14 Days</p>
                <p className="text-[11px] text-neutral-600 font-medium mt-1">Available in 2026 quota</p>
              </div>
            </div>

            {/* Card 3: Mint Green (Attendance Score) */}
            <div className="p-5 rounded-3xl bg-[#BBF7D0]/70 border border-[#86EFAC]/50 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-800">Attendance Rate</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">98.4%</p>
                <p className="text-[10px] text-emerald-800 font-bold mt-1">On-time streak active</p>
              </div>
            </div>

          </div>

          {/* Chart & Live Check-in Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left: Dual Bar Chart (7 cols) */}
            <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-neutral-950">Logged Working Hours</h3>
                <button className="px-3 py-1 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-[11px] font-bold shadow-2xs transition-colors">
                  This Week
                </button>
              </div>

              {/* Dual Bar Chart */}
              <div className="relative pt-2">
                <div className="flex justify-between items-end h-44 pb-6 border-b border-gray-100 px-2">
                  {[
                    { day: 'Mon', h: 85, h2: 70 },
                    { day: 'Tue', h: 95, h2: 80 },
                    { day: 'Wed', h: 90, h2: 75 },
                    { day: 'Thu', h: 100, h2: 85 },
                    { day: 'Fri', h: 80, h2: 60 },
                    { day: 'Sat', h: 30, h2: 0 },
                    { day: 'Sun', h: 0, h2: 0 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-1.5 h-32">
                        <div
                          className="w-2 rounded-t-full bg-[#C4B5FD]"
                          style={{ height: `${bar.h}%` }}
                        />
                        <div
                          className="w-2 rounded-t-full bg-[#86EFAC]"
                          style={{ height: `${bar.h2}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-[11px] font-bold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4B5FD]" /> Regular Hours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#86EFAC]" /> Overtime
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live Clock Action Widget (5 cols) */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-neutral-950">Daily Attendance</h3>
                <p className="text-xs text-gray-400 font-medium">1-click clock action</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-semibold">Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${isCheckedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                    {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                  </span>
                </div>
                {today?.checkIn && (
                  <p className="text-xs font-mono text-neutral-900 font-bold">
                    In: {new Date(today.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>

              <div>
                {isCheckedIn ? (
                  <button
                    onClick={() => checkOutMutation.mutate()}
                    disabled={checkOutMutation.isPending}
                    className="w-full py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    Check Out Now
                  </button>
                ) : (
                  <button
                    onClick={() => checkInMutation.mutate()}
                    disabled={checkInMutation.isPending}
                    className="w-full py-3 rounded-2xl bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-extrabold text-xs shadow-lime transition-all active:scale-98"
                  >
                    Check In Now
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Table: Recent Logs */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-neutral-950">Recent Logs</h3>
              <Link to="/employee/attendance" className="px-4 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-xs font-bold shadow-2xs transition-colors">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100 pb-3">
                    <th className="py-2.5 font-bold">Date</th>
                    <th className="py-2.5 font-bold">In Time</th>
                    <th className="py-2.5 font-bold">Out Time</th>
                    <th className="py-2.5 font-bold text-right">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {recentLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 font-extrabold text-neutral-900">{log.date}</td>
                      <td className="py-3 text-gray-500 font-mono">{log.inTime}</td>
                      <td className="py-3 text-neutral-800 font-semibold">{log.outTime}</td>
                      <td className="py-3 text-neutral-950 font-extrabold text-right font-mono">{log.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Widget 1: Leave Quick Action Banner */}
          <div className="p-6 rounded-3xl bg-[#0D7477] text-white shadow-md relative overflow-hidden space-y-4">
            <h3 className="text-lg font-extrabold text-white">Need Time Off?</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Submit your Paid or Sick leave request in 1 click with instant manager notifications.
            </p>
            <Link
              to="/employee/leaves"
              className="inline-flex w-full py-2.5 rounded-xl bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-extrabold text-xs shadow-lime justify-center items-center gap-1.5 transition-all"
            >
              <span>Apply for Leave</span>
              <Plus size={14} />
            </Link>
          </div>

          {/* Widget 2: Daily Standup */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6B42EF] flex items-center justify-center">
                <Video size={16} />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-neutral-950 leading-tight">Daily Standup</h4>
                <p className="text-[10px] text-gray-400 font-semibold">Engineering & Product • 10:00 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {teamMembers.map((m, i) => (
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 font-medium">Team leads attending</span>
            </div>

            <button className="w-full py-2.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors">
              Click for meeting link
            </button>
          </div>

          {/* Widget 3: Colleagues */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <h4 className="text-sm font-extrabold text-neutral-950">Team Member</h4>

            <div className="space-y-3">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h5 className="text-xs font-extrabold text-neutral-900 leading-tight">{member.name}</h5>
                      <p className="text-[10px] text-gray-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;
