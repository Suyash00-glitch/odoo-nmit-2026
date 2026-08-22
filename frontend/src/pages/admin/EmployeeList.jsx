import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { employeesApi } from '../../api/employees.api.js';
import { SkeletonRow } from '../../components/common/Loader.jsx';
import { ErrorState, EmptyState } from '../../components/common/ErrorState.jsx';
import { Link } from 'react-router-dom';
import { Users, Search, ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-neutral-950">Employees</h1>
        <p className="text-gray-500 text-xs mt-0.5">Manage all employees in your organization</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            id="employee-search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, email, ID..."
            className="input-field pl-9"
          />
        </div>
        <select
          id="dept-filter"
          value={dept}
          onChange={e => { setDept(e.target.value); setPage(1); }}
          className="input-field w-auto"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="card">
        {isLoading ? <SkeletonRow rows={10} /> : isError ? (
          <ErrorState onRetry={refetch} />
        ) : data?.employees?.length === 0 ? (
          <EmptyState icon={<Users size={24} />} title="No employees found" description="Try adjusting your search or filters" />
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
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-neutral-900 font-bold text-xs shrink-0">
                          {emp.profile?.firstName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-neutral-900 font-medium text-xs">{emp.profile?.firstName} {emp.profile?.lastName}</p>
                          <p className="text-gray-400 text-[11px]">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-gray font-mono text-[11px]">{emp.employeeId}</span></td>
                    <td className="text-gray-600 text-xs">{emp.profile?.department ?? '—'}</td>
                    <td className="text-gray-600 text-xs">{emp.profile?.jobTitle ?? '—'}</td>
                    <td className="text-gray-600 text-xs">{emp.profile?.employmentType ?? '—'}</td>
                    <td className="text-gray-500 text-xs font-mono">{emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toLocaleDateString() : '—'}</td>
                    <td>
                      <Link to={`/admin/employees/${emp.id}`} className="text-neutral-900 font-semibold hover:underline text-xs">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
            <p>Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total}</p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="btn-secondary py-1.5 px-3 text-xs"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage(p => p + 1)}
                className="btn-secondary py-1.5 px-3 text-xs"
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
