import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '../../api/notifications.api.js';
import {
  LayoutDashboard, User, Clock, CalendarDays, DollarSign,
  Users, CheckSquare, BarChart3, LogOut, Bell, ChevronLeft, ChevronRight,
  Zap
} from 'lucide-react';

const employeeLinks = [
  { to: '/employee/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employee/profile', icon: User, label: 'My Profile' },
  { to: '/employee/attendance', icon: Clock, label: 'Attendance' },
  { to: '/employee/leaves', icon: CalendarDays, label: 'Leaves' },
  { to: '/employee/payroll', icon: DollarSign, label: 'Payroll' },
];

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/employees', icon: Users, label: 'Employees' },
  { to: '/admin/leaves', icon: CheckSquare, label: 'Leave Approvals' },
  { to: '/admin/payroll', icon: DollarSign, label: 'Payroll' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
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
  const unread = notifData?.unreadCount ?? 0;

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : user?.email;

  return (
    <aside
      className={`flex flex-col bg-surface-100 border-r border-white/5 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen shrink-0`}
    >
      <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-white text-base leading-tight block">Dayflow</span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">HRMS</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4.5 h-4.5 shrink-0" size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-white/5 space-y-1">
        <NavLink
          to={role === 'ADMIN' ? '/admin/dashboard' : '/employee/dashboard'}
          className={`sidebar-link ${collapsed ? 'justify-center px-2' : ''} relative`}
          title={collapsed ? 'Notifications' : undefined}
          onClick={(e) => { e.preventDefault(); }}
        >
          <Bell size={18} className="shrink-0" />
          {unread > 0 && (
            <span className="absolute top-1.5 left-6 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
          {!collapsed && <span>Notifications</span>}
          {!collapsed && unread > 0 && (
            <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unread}
            </span>
          )}
        </NavLink>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`sidebar-link w-full ${collapsed ? 'justify-center px-2' : ''}`}
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
        </button>

        {!collapsed && (
          <div className="px-3 py-3 rounded-xl bg-surface-300/50 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary-600/40 flex items-center justify-center text-primary-300 font-bold text-xs">
                {displayName?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                <p className="text-[11px] text-white/40 capitalize">{user?.role?.toLowerCase()}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors w-full">
              <LogOut size={13} /> Sign out
            </button>
          </div>
        )}
        {collapsed && (
          <button onClick={handleLogout} className="sidebar-link w-full justify-center px-2 text-red-400/60 hover:text-red-400" title="Sign out">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
