import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

const DashboardLayout = ({ role }) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 selection:bg-[#D4FF00] selection:text-black">
      <Sidebar role={role} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-8 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
