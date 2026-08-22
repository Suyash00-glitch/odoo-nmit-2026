import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-slate-900 text-[#D4FF00] rounded-2xl flex items-center justify-center shadow-xs">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
          <p className="text-slate-500 text-xs font-bold tracking-wide">Loading Dayflow...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="card text-center max-w-md w-full shadow-lg border border-slate-200">
          <p className="text-4xl mb-3">🚫</p>
          <h1 className="text-lg font-black text-slate-950 mb-1.5">Access Denied</h1>
          <p className="text-xs text-slate-500 font-medium">You don't have permission to view this portal.</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
