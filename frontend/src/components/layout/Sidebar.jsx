import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '../../api/notifications.api.js';
import {
  LayoutDashboard,
  BarChart2,
  Receipt,
  Users,
  FileCheck2,
  Settings,
  LogOut,
  User,
  Clock,
  CalendarDays,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const employeeLinks = [
  { to: '/employee/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employee/attendance', icon: Clock, label: 'Attendance' },
  { to: '/employee/leaves', icon: CalendarDays, label: 'Leave Requests' },
  { to: '/employee/payroll', icon: Receipt, label: 'Payroll & Slips' },
  { to: '/employee/profile', icon: User, label: 'My Profile' },
];

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/employees', icon: Users, label: 'Employees' },
  { to: '/admin/leaves', icon: FileCheck2, label: 'Leave Approvals' },
  { to: '/admin/payroll', icon: Receipt, label: 'Payroll' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Analytics & Reports' },
];

const Sidebar = ({ role }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const { data: notifData } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.getAll().then(r => r.data.data),
    refetchInterval: 30000,
  });

  const links = role === 'ADMIN' ? adminLinks : employeeLinks;

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : (user?.email?.split('@')[0] || 'User');

  const displayRole = user?.profile?.jobTitle || (user?.role === 'ADMIN' ? 'HR Administrator' : 'Team Member');

  return (
    <aside
      className={`flex flex-col bg-white border-r border-slate-200/80 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen shrink-0 p-5 justify-between select-none z-30 shadow-[1px_0_10px_rgba(15,23,42,0.02)]`}
    >
      {/* Top Logo & Navigation */}
      <div className="space-y-8">
        
        {/* Brand Logo */}
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-2'}`}>
          <div className="w-8 h-8 rounded-full bg-[#D4FF00] flex items-center justify-center text-black shadow-xs">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rounded-xs rotate-45" />
            </div>
          </div>
          {!collapsed && (
            <span className="text-xl font-black tracking-tight text-slate-950">
              DAYFLOW
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D4FF00] text-black shadow-xs font-black scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0 stroke-[2.2]" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom User Info & Logout */}
      <div className="pt-5 border-t border-slate-100 space-y-3.5">
        
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors w-full ${
            collapsed ? 'justify-center' : 'px-2'
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>

        {/* User Card */}
        {!collapsed && (
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-[#D4FF00] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-extrabold text-slate-950 truncate leading-tight">
                {displayName}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                {displayRole}
              </p>
            </div>
          </div>
        )}

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut size={16} className="shrink-0 stroke-[2]" />
          {!collapsed && <span>Log Out</span>}
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;
