import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { employeesApi } from '../../api/employees.api.js';
import { SkeletonRow } from '../../components/common/Loader.jsx';
import { ErrorState, EmptyState } from '../../components/common/ErrorState.jsx';
import { Link } from 'react-router-dom';
import { Users, Search, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

const AdminEmployeeList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('');
  const [debouncedSearch, setDebSearch] = useState('');

  React.useEffect(() => {
    const t = setTimeout(() => setDebSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['employees', page, debouncedSearch, dept],
    queryFn: () => employeesApi.getAll({ page, limit: 10, search: debouncedSearch || undefined, department: dept || undefined })
      .then(r => r.data.data),
  });

  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Employees Directory</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Manage, search, and view employee profiles and records</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            id="employee-search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, email, Employee ID..."
            className="input-field pl-10 text-xs"
          />
        </div>
        <select
          id="dept-filter"
          value={dept}
          onChange={e => { setDept(e.target.value); setPage(1); }}
          className="input-field w-auto text-xs font-bold"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="card">
        {isLoading ? <SkeletonRow rows={10} /> : isError ? (
          <ErrorState onRetry={refetch} />
        ) : data?.employees?.length === 0 ? (
          <EmptyState icon={<Users size={28} />} title="No employees found" description="Try adjusting your search query or department filter." />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Employment Type</th>
                  <th>Joined Date</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-[#6B42EF] font-black text-xs shrink-0 shadow-2xs">
                          {emp.profile?.firstName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-neutral-950">{emp.profile?.firstName} {emp.profile?.lastName}</p>
                          <p className="text-gray-400 text-xs font-mono">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-gray font-mono text-xs font-bold">{emp.employeeId}</span></td>
                    <td className="text-gray-700 font-semibold text-xs">{emp.profile?.department ?? 'General'}</td>
                    <td className="text-gray-700 font-semibold text-xs">{emp.profile?.jobTitle ?? 'Staff'}</td>
                    <td className="text-gray-600 text-xs font-medium">{emp.profile?.employmentType ?? 'Full Time'}</td>
                    <td className="text-gray-500 text-xs font-mono">{emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toLocaleDateString() : '—'}</td>
                    <td className="text-right">
                      <Link
                        to={`/admin/employees/${emp.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <span>Details</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500 font-semibold">
            <p>Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total} employees</p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="btn-secondary py-1.5 px-3 text-xs font-bold"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="btn-secondary py-1.5 px-3 text-xs font-bold"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeList;
