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
  { to: '/employee/attendance', icon: Clock, label: 'Statistics' },
  { to: '/employee/payroll', icon: Receipt, label: 'Transaction' },
  { to: '/employee/leaves', icon: CalendarDays, label: 'Leaves' },
  { to: '/employee/profile', icon: User, label: 'My Profile' },
];

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Statistics' },
  { to: '/admin/payroll', icon: Receipt, label: 'Transaction' },
  { to: '/admin/employees', icon: Users, label: 'My Team' },
  { to: '/admin/leaves', icon: FileCheck2, label: 'Sell Reports' },
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
    : (user?.email?.split('@')[0] || 'Nora Watson');

  const displayRole = user?.profile?.jobTitle || (user?.role === 'ADMIN' ? 'HR Director' : 'Sales Manager');

  return (
    <aside
      className={`flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen shrink-0 p-5 justify-between select-none z-30`}
    >
      {/* Top Logo & Navigation */}
      <div className="space-y-8">
        
        {/* Brand Logo matching reference */}
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-2'}`}>
          <div className="w-8 h-8 rounded-full bg-neutral-950 flex items-center justify-center text-[#D4FF00] shadow-sm">
            {/* Geometric brand stripes */}
            <div className="flex gap-1 items-center rotate-45">
              <div className="w-1 h-3.5 bg-[#D4FF00] rounded-full" />
              <div className="w-1 h-3.5 bg-white rounded-full" />
            </div>
          </div>
          {!collapsed && (
            <span className="text-xl font-extrabold tracking-tight text-neutral-950">
              Niond
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D4FF00] text-black shadow-xs font-extrabold scale-[1.02]'
                    : 'text-neutral-500 hover:text-neutral-950 hover:bg-gray-50'
                } ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0 stroke-[2.2]" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}

          {/* Settings Nav item */}
          <button
            onClick={() => {}}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold text-neutral-500 hover:text-neutral-950 hover:bg-gray-50 transition-all ${
              collapsed ? 'justify-center px-2' : ''
            }`}
          >
            <Settings size={18} className="shrink-0 stroke-[2.2]" />
            {!collapsed && <span>Settings</span>}
          </button>
        </nav>
      </div>

      {/* Bottom User Info & Logout */}
      <div className="pt-6 border-t border-gray-100 space-y-4">
        
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-neutral-950 transition-colors w-full ${
            collapsed ? 'justify-center' : 'px-2'
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>

        {/* User Card */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-2xs"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-extrabold text-neutral-950 truncate leading-tight">
                {displayName}
              </h4>
              <p className="text-[11px] text-gray-400 font-medium truncate mt-0.5">
                {displayRole}
              </p>
            </div>
          </div>
        )}

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2.5 px-2 py-1 text-xs font-bold text-neutral-700 hover:text-red-600 transition-colors w-full ${
            collapsed ? 'justify-center' : ''
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
