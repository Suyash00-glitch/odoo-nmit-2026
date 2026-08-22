import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeesApi } from '../../api/employees.api.js';
import { SkeletonRow } from '../../components/common/Loader.jsx';
import { ErrorState, EmptyState } from '../../components/common/ErrorState.jsx';
import { Link } from 'react-router-dom';
import { Users, Search, ChevronLeft, ChevronRight, ArrowUpRight, UserPlus, Loader2, Trash2, AlertTriangle } from 'lucide-react';
import Modal from '../../components/common/Modal.jsx';
import toast from 'react-hot-toast';

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

const AdminEmployeeList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('');
  const [debouncedSearch, setDebSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const queryClient = useQueryClient();

  const inviteEmployee = useMutation({
    mutationFn: (payload) => employeesApi.create(payload),
    onSuccess: () => {
      toast.success('Employee added and invitation email sent.');
      setShowInvite(false);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message || 'Could not create employee.'),
    onSettled: () => setInviting(false),
  });

  const deleteEmployeeMut = useMutation({
    mutationFn: (id) => employeesApi.delete(id),
    onSuccess: () => {
      toast.success('Employee deleted successfully');
      setEmployeeToDelete(null);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error?.message || 'Failed to delete employee');
    },
  });

  React.useEffect(() => {
    const t = setTimeout(() => setDebSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['employees', page, debouncedSearch, dept],
    queryFn: () =>
      employeesApi
        .getAll({ page, limit: 10, search: debouncedSearch || undefined, department: dept || undefined })
        .then((r) => r.data.data),
  });

  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Employees Directory</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">Manage, search, and view employee profiles and records</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="btn-primary py-2.5 px-4 text-xs font-black shrink-0 flex items-center gap-2"
        >
          <UserPlus size={16} />
          Add employee
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            id="employee-search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, Employee ID..."
            className="input-field pl-10 text-xs"
          />
        </div>
        <select
          id="dept-filter"
          value={dept}
          onChange={(e) => {
            setDept(e.target.value);
            setPage(1);
          }}
          className="input-field w-auto text-xs font-bold"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="card p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : isError ? (
          <ErrorState message="Could not load employee directory." onRetry={refetch} />
        ) : !data?.employees?.length ? (
          <EmptyState
            icon={Users}
            title="No employees found"
            description="Try changing your search term or add a new team member."
            action={{ label: 'Add Employee', onClick: () => setShowInvite(true) }}
          />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Employment Type</th>
                  <th>Joined Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-950 text-[#D4FF00] flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                          {emp.profile?.firstName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-950">
                            {emp.profile?.firstName} {emp.profile?.lastName}
                          </p>
                          <p className="text-slate-400 text-xs font-mono">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-gray font-mono text-xs font-bold">{emp.employeeId}</span>
                    </td>
                    <td className="text-slate-700 font-semibold text-xs">{emp.profile?.department ?? 'General'}</td>
                    <td className="text-slate-700 font-semibold text-xs">{emp.profile?.jobTitle ?? 'Staff'}</td>
                    <td className="text-slate-600 text-xs font-medium">{emp.profile?.employmentType ?? 'Full Time'}</td>
                    <td className="text-slate-500 text-xs font-mono">
                      {emp.profile?.dateOfJoining ? new Date(emp.profile.dateOfJoining).toLocaleDateString() : '—'}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/employees/${emp.id}`}
                          className="btn-primary py-1.5 px-3 text-xs font-bold inline-flex items-center gap-1 shadow-2xs"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight size={13} />
                        </Link>
                        <button
                          onClick={() => setEmployeeToDelete(emp)}
                          className="p-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-2xs"
                          title="Delete employee"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 pb-4 px-6 border-t border-slate-100 text-xs text-slate-500 font-semibold">
            <p>
              Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, pagination.total)} of {pagination.total} employees
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-secondary py-1.5 px-3 text-xs font-bold"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-secondary py-1.5 px-3 text-xs font-bold"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {employeeToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setEmployeeToDelete(null)}
          title="Confirm Employee Deletion"
        >
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-800 space-y-1">
                <p className="font-bold">Are you sure you want to delete this employee?</p>
                <p>
                  This action will permanently delete{' '}
                  <strong className="text-rose-950">
                    {employeeToDelete.profile?.firstName} {employeeToDelete.profile?.lastName}
                  </strong>{' '}
                  ({employeeToDelete.employeeId}), along with their attendance logs, leave records, and payroll data.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEmployeeToDelete(null)}
                className="btn-secondary py-2 px-4 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteEmployeeMut.isPending}
                onClick={() => deleteEmployeeMut.mutate(employeeToDelete.id)}
                className="btn-danger py-2 px-4 text-xs font-extrabold flex items-center gap-1.5"
              >
                {deleteEmployeeMut.isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>Delete Employee</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add / Invite Employee Modal */}
      {showInvite && (
        <Modal isOpen={showInvite} onClose={() => setShowInvite(false)} title="Add New Employee">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.target);
              setInviting(true);
              inviteEmployee.mutate({
                firstName: f.get('firstName'),
                lastName: f.get('lastName'),
                email: f.get('email'),
                jobTitle: f.get('jobTitle') || undefined,
                department: f.get('department') || undefined,
                employmentType: f.get('employmentType') || 'Full-time',
                phone: f.get('phone') || undefined,
                address: f.get('address') || undefined,
                dateOfJoining: f.get('dateOfJoining') || undefined,
              });
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">First Name *</label>
                <input name="firstName" required placeholder="Jane" className="input-field" />
              </div>
              <div>
                <label className="label">Last Name *</label>
                <input name="lastName" required placeholder="Doe" className="input-field" />
              </div>
            </div>
            <div>
              <label className="label">Company Email *</label>
              <input name="email" type="email" required placeholder="jane.doe@dayflow.dev" className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Department</label>
                <select name="department" className="input-field">
                  <option value="">Select...</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Job Title</label>
                <input name="jobTitle" placeholder="Software Engineer" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Employment Type</label>
                <select name="employmentType" defaultValue="Full-time" className="input-field">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="label">Joining Date</label>
                <input name="dateOfJoining" type="date" className="input-field" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                className="btn-secondary py-2 px-4 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={inviting}
                className="btn-primary py-2 px-4 text-xs font-black flex items-center gap-1.5"
              >
                {inviting && <Loader2 size={13} className="animate-spin" />}Create and invite
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminEmployeeList;
