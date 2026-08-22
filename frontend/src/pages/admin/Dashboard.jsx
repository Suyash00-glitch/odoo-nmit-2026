import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard.api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SkeletonCard } from '../../components/common/Loader.jsx';
import { ErrorState } from '../../components/common/ErrorState.jsx';
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
  Download,
  Users,
  Building2,
  Calendar,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => dashboardApi.getAdminDashboard().then(r => r.data.data),
    refetchInterval: 60000,
  });

  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : 'Nora Watson';
  const displayRole = user?.profile?.jobTitle || 'HR & Sales Director';

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

  const teamMembers = [
    { name: 'Mahid Ahmed', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Daniel Karl', role: 'Lead Architect', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { name: 'Elena Michel', role: 'HR Specialist', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { name: 'Salina Mitso', role: 'Operations Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
  ];

  const stores = [
    { name: 'Solaris Sparkle', location: 'Miami, Florida', sell: '102 Employees', amount: '$12.50K' },
    { name: 'Crimson Dusk', location: 'Denver, Colorado', sell: '214 Employees', amount: '$07.85K' },
    { name: 'Indigo Zephyr', location: 'Orlando, Florida', sell: '143 Employees', amount: '$16.40K' },
    { name: 'Roseate Crest', location: 'Las Vegas, Nevada', sell: '185 Employees', amount: '$23.64K' },
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
          {/* Chat Icon Button */}
          <button className="w-10 h-10 rounded-2xl bg-white border border-gray-200/80 hover:bg-gray-50 flex items-center justify-center text-neutral-800 shadow-2xs transition-colors">
            <MessageSquare size={17} />
          </button>
          
          {/* Bell Icon Button */}
          <button className="w-10 h-10 rounded-2xl bg-white border border-gray-200/80 hover:bg-gray-50 flex items-center justify-center text-neutral-800 shadow-2xs transition-colors relative">
            <Bell size={17} />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2.5 right-2.5" />
          </button>

          {/* User Profile Pill */}
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

      {/* Main Grid: Left & Center (8 cols) + Right Widgets (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left & Center Main Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 3 Pastel Gradient Metric Cards (Exact Match to Screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: Lavender / Purple Pastel */}
            <div className="p-5 rounded-3xl bg-[#DDD6FE]/70 border border-[#C4B5FD]/50 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-800">Total Earning</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">242.65K</p>
                <p className="text-[11px] text-neutral-600 font-medium mt-1">From the running month</p>
              </div>
            </div>

            {/* Card 2: Sky Blue Pastel */}
            <div className="p-5 rounded-3xl bg-[#BFDBFE]/70 border border-[#93C5FD]/50 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-800">Average Earning</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">17.347K</p>
                <p className="text-[11px] text-neutral-600 font-medium mt-1">Daily tracking of this month</p>
              </div>
            </div>

            {/* Card 3: Mint Green Pastel */}
            <div className="p-5 rounded-3xl bg-[#BBF7D0]/70 border border-[#86EFAC]/50 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-800">Conversation Rate</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-neutral-950 font-mono tracking-tight">74.86%</p>
                <p className="text-[10px] text-emerald-800 font-bold mt-1">+6.04% greater than last month</p>
              </div>
            </div>

          </div>

          {/* Chart & More Analysis Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left: Dual Bar Chart "Regular Sell" (7 cols) */}
            <div className="md:col-span-7 p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-neutral-950">Regular Sell</h3>
                <button className="px-3 py-1 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-[11px] font-bold shadow-2xs transition-colors">
                  Export
                </button>
              </div>

              {/* Dual Bar Chart Graphic */}
              <div className="relative pt-2">
                {/* Y-axis labels */}
                <div className="flex justify-between items-end h-44 pb-6 border-b border-gray-100 px-2">
                  {[
                    { day: 'Sun', purple: 60, green: 40 },
                    { day: 'Mon', purple: 80, green: 55 },
                    { day: 'Tue', purple: 100, green: 75 },
                    { day: 'Wed', purple: 65, green: 45 },
                    { day: 'Thu', purple: 50, green: 30 },
                    { day: 'Fri', purple: 70, green: 50 },
                    { day: 'Sat', purple: 90, green: 65 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-1.5 h-32">
                        {/* Purple Bar */}
                        <div
                          className="w-2 rounded-t-full bg-[#C4B5FD] transition-all"
                          style={{ height: `${bar.purple}%` }}
                        />
                        {/* Green Bar */}
                        <div
                          className="w-2 rounded-t-full bg-[#86EFAC] transition-all"
                          style={{ height: `${bar.green}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 pt-3 text-[11px] font-bold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4B5FD]" /> Morning Shift
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#86EFAC]" /> Evening Shift
                  </span>
                </div>
              </div>
            </div>

            {/* Right: "More Analysis" Widget (5 cols) */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-neutral-950">More Analysis</h3>
                <p className="text-xs text-gray-400 font-medium">There are more to view</p>
              </div>

              <div className="space-y-2.5">
                {/* Pill 1 */}
                <Link
                  to="/admin/analytics"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs font-bold text-neutral-900 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-neutral-700 shadow-2xs">
                      <TrendingUp size={14} />
                    </div>
                    <span>Store Sell Ratio</span>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Pill 2 */}
                <Link
                  to="/admin/leaves"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs font-bold text-neutral-900 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-neutral-700 shadow-2xs">
                      <Users size={14} />
                    </div>
                    <span>Top item sold</span>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Created By Footer */}
              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                <span>Analysis created by</span>
                <div className="w-4 h-4 rounded-full bg-neutral-950 flex items-center justify-center text-[#D4FF00]">
                  <div className="w-1.5 h-1.5 bg-[#D4FF00] rounded-xs rotate-45" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Table: "Top Store" (Exact Match to Screenshot) */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-neutral-950">Top Store</h3>
              <button className="px-4 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors">
                <Share2 size={13} />
                <span>Share</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100 pb-3">
                    <th className="py-2.5 font-bold">Store Name</th>
                    <th className="py-2.5 font-bold">Location</th>
                    <th className="py-2.5 font-bold">Sell</th>
                    <th className="py-2.5 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {stores.map((s, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 font-extrabold text-neutral-900">{s.name}</td>
                      <td className="py-3 text-gray-500">{s.location}</td>
                      <td className="py-3 text-neutral-800 font-semibold">{s.sell}</td>
                      <td className="py-3 text-neutral-950 font-extrabold text-right font-mono">{s.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: 3 Stacked Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Widget 1: Upgrade to Pro (Deep Teal Container) */}
          <div className="p-6 rounded-3xl bg-[#0D7477] text-white shadow-md relative overflow-hidden space-y-5">
            {/* Background Doodles */}
            <div className="absolute top-3 right-3 opacity-15 pointer-events-none text-white text-5xl font-mono">
              ✎
            </div>
            
            <div className="space-y-1 relative z-10">
              <h3 className="text-lg font-extrabold text-white">Upgrade to Pro</h3>
              <p className="text-3xl font-extrabold text-white font-mono mt-2">
                $4.20 <span className="text-xs font-normal text-white/70">/ Month</span>
              </p>
              <p className="text-[11px] text-white/70 font-semibold">$50 Billed Annually</p>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-extrabold text-xs shadow-lime transition-all active:scale-98 relative z-10">
              Upgrade Now
            </button>
          </div>

          {/* Widget 2: Daily Meeting Card */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6B42EF] flex items-center justify-center">
                  <Video size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-neutral-950 leading-tight">Daily Meeting</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">12+ Person • 9:30 PM</p>
                </div>
              </div>
            </div>

            {/* Overlapping Avatars */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {teamMembers.slice(0, 3).map((m, i) => (
                  <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 font-medium">They will conduct the meeting</span>
            </div>

            <button className="w-full py-2.5 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-colors">
              Click for meeting link
            </button>
          </div>

          {/* Widget 3: Team Member Card */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
            <h4 className="text-sm font-extrabold text-neutral-950">Team Member</h4>

            <div className="space-y-3">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
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

            <Link
              to="/admin/employees"
              className="w-full py-2.5 rounded-2xl bg-blue-50/80 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus size={14} />
              <span>Add more member</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
