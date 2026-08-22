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
        <h1 className="text-2xl font-bold text-white">Employees</h1>
        <p className="text-white/50 text-sm mt-1">Manage all employees in your organization</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
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
                        <div className="w-8 h-8 rounded-xl bg-primary-600/30 flex items-center justify-center text-primary-300 font-bold text-xs shrink-0">
                          {emp.profile?.firstName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{emp.profile?.firstName} {emp.profile?.lastName}</p>
                          <p className="text-white/40 text-xs">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-gray">{emp.employeeId}</span></td>
                    <td className="text-white/60">{emp.profile?.department ?? '—'}</td>
                    <td className="text-white/60">{emp.profile?.jobTitle ?? '—'}</td>
                    <td className="text-white/60">{emp.profile?.employmentType ?? '—'}</td>
                    <td className="text-white/50 text-xs">{emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toLocaleDateString() : '—'}</td>
                    <td>
                      <Link to={`/admin/employees/${emp.id}`} className="text-primary-400 hover:text-primary-300 text-xs font-medium">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
            <span className="text-sm text-white/40">
              Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page <= 1} className="btn-secondary text-xs px-3 py-1.5">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= pagination.totalPages} className="btn-secondary text-xs px-3 py-1.5">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeList;
