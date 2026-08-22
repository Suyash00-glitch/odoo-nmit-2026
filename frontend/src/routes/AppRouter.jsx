import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

import LandingPage from '../pages/landing/LandingPage.jsx';
import SignIn from '../pages/auth/SignIn.jsx';
import SignUp from '../pages/auth/SignUp.jsx';
import VerifyEmail from '../pages/auth/VerifyEmail.jsx';
import ActivateAccount from '../pages/auth/ActivateAccount.jsx';

import ProtectedRoute from '../components/layout/ProtectedRoute.jsx';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';

import EmployeeDashboard from '../pages/employee/Dashboard.jsx';
import EmployeeProfile from '../pages/employee/Profile.jsx';
import EmployeeAttendance from '../pages/employee/Attendance.jsx';
import EmployeeLeaves from '../pages/employee/Leaves.jsx';
import EmployeePayroll from '../pages/employee/Payroll.jsx';

import AdminDashboard from '../pages/admin/Dashboard.jsx';
import AdminEmployeeList from '../pages/admin/EmployeeList.jsx';
import AdminEmployeeDetail from '../pages/admin/EmployeeDetail.jsx';
import AdminLeaveApprovals from '../pages/admin/LeaveApprovals.jsx';
import AdminPayroll from '../pages/admin/Payroll.jsx';
import AdminAnalytics from '../pages/admin/Analytics.jsx';

const RoleRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/employee/dashboard" replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing & Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/activate-account" element={<ActivateAccount />} />

        {/* Protected Employee Portal Routes */}
        <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
          <Route element={<DashboardLayout role="EMPLOYEE" />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/profile" element={<EmployeeProfile />} />
            <Route path="/employee/attendance" element={<EmployeeAttendance />} />
            <Route path="/employee/leaves" element={<EmployeeLeaves />} />
            <Route path="/employee/payroll" element={<EmployeePayroll />} />
          </Route>
        </Route>

        {/* Protected Admin Portal Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<DashboardLayout role="ADMIN" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<AdminEmployeeList />} />
            <Route path="/admin/employees/:id" element={<AdminEmployeeDetail />} />
            <Route path="/admin/leaves" element={<AdminLeaveApprovals />} />
            <Route path="/admin/payroll" element={<AdminPayroll />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
          </Route>
        </Route>

        {/* Role-based Dashboard Redirection */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<RoleRedirect />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
