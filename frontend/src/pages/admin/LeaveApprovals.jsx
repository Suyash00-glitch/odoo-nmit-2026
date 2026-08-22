import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { leavesApi } from '../../api/leaves.api.js';
import { SkeletonRow } from '../../components/common/Loader.jsx';
import { ErrorState, EmptyState } from '../../components/common/ErrorState.jsx';
import { leaveStatusBadge, leaveTypeBadge } from '../../components/common/Badge.jsx';
import Modal from '../../components/common/Modal.jsx';
import toast from 'react-hot-toast';
import { CheckSquare, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const decisionSchema = z.object({
  reviewComments: z.string().max(500).optional(),
});

const AdminLeaveApprovals = () => {
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [decisionType, setDecisionType] = useState(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-leaves', statusFilter],
    queryFn: () => leavesApi.getAllLeaves({ status: statusFilter || undefined }).then(r => r.data.data),
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(decisionSchema),
  });

  const decisionMut = useMutation({
    mutationFn: ({ id, status, reviewComments }) =>
      leavesApi.makeDecision(id, { status, reviewComments }),
    onSuccess: (_, vars) => {
      toast.success(`Leave ${vars.status === 'APPROVED' ? 'approved' : 'rejected'} successfully`);
      qc.invalidateQueries({ queryKey: ['admin-leaves'] });
      qc.invalidateQueries({ queryKey: ['admin-dashboard'] });
      setSelectedLeave(null);
      setDecisionType(null);
      reset();
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Action failed'),
  });

  const openDecision = (leave, type) => {
    setSelectedLeave(leave);
    setDecisionType(type);
    reset();
  };

  const onDecisionSubmit = (data) => {
    if (!selectedLeave || !decisionType) return;
    decisionMut.mutate({ id: selectedLeave.id, status: decisionType, reviewComments: data.reviewComments });
  };

  const leaves = data?.leaves ?? [];

  return (
    <div className="space-y-7 animate-slide-up pb-14 font-sans">
      <div>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">Leave Approvals</h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">Review and manage employee leave applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white p-1 rounded-2xl w-fit border border-slate-200 shadow-2xs">
        {[
          { value: 'PENDING', label: '⏳ Pending' },
          { value: 'APPROVED', label: '✅ Approved' },
          { value: 'REJECTED', label: '❌ Rejected' },
          { value: '', label: 'All Requests' },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === opt.value
                ? 'bg-slate-950 text-white shadow-xs font-black'
                : 'text-slate-500 hover:text-slate-950'
            }`}
            id={`filter-${opt.label.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Modal
        isOpen={!!selectedLeave && !!decisionType}
        onClose={() => { setSelectedLeave(null); setDecisionType(null); }}
        title={decisionType === 'APPROVED' ? 'Approve Leave Request' : 'Reject Leave Request'}
      >
        {selectedLeave && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <p className="text-sm font-extrabold text-slate-950">{selectedLeave.employee.profile?.firstName} {selectedLeave.employee.profile?.lastName}</p>
              <p className="text-xs text-slate-500 font-medium">{selectedLeave.leaveType} leave · {new Date(selectedLeave.startDate).toLocaleDateString()} → {new Date(selectedLeave.endDate).toLocaleDateString()}</p>
              {selectedLeave.remarks && <p className="text-xs text-slate-600 italic mt-1">"{selectedLeave.remarks}"</p>}
            </div>
            <form onSubmit={handleSubmit(onDecisionSubmit)} className="space-y-4" id="decision-form">
              <div>
                <label className="label text-xs font-bold text-slate-700">Review Comments (optional)</label>
                <textarea {...register('reviewComments')} rows={3} placeholder="Add feedback or reason for the employee..." className="input-field text-xs resize-none" id="review-comments" />
              </div>
              <button
                type="submit"
                id="confirm-decision-btn"
                disabled={isSubmitting || decisionMut.isPending}
                className={decisionType === 'APPROVED' ? 'btn-success w-full py-2.5 text-xs font-bold' : 'btn-danger w-full py-2.5 text-xs font-bold'}
              >
                {decisionMut.isPending ? <Loader2 size={14} className="animate-spin" /> : decisionType === 'APPROVED' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                {decisionType === 'APPROVED' ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </form>
          </div>
        )}
      </Modal>

      <div className="card">
        {isLoading ? <SkeletonRow rows={8} /> : isError ? (
          <ErrorState onRetry={refetch} />
        ) : leaves.length === 0 ? (
          <EmptyState icon={<CheckSquare size={28} />} title="No leave requests" description={`No ${statusFilter.toLowerCase() || ''} leave requests found`} />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => {
                  const days = Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / 86400000) + 1;
                  return (
                    <tr key={leave.id}>
                      <td>
                        <div>
                          <p className="text-sm font-extrabold text-slate-950">{leave.employee.profile?.firstName} {leave.employee.profile?.lastName}</p>
                          <p className="text-slate-400 text-xs font-mono">{leave.employee.profile?.department || leave.employee.employeeId}</p>
                        </div>
                      </td>
                      <td>{leaveTypeBadge(leave.leaveType)}</td>
                      <td className="text-slate-600 text-xs font-mono">
                        {new Date(leave.startDate).toLocaleDateString()} → {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td><span className="badge-gray font-bold">{days}d</span></td>
                      <td>{leaveStatusBadge(leave.status)}</td>
                      <td className="text-slate-500 text-xs max-w-xs truncate">{leave.remarks ?? '—'}</td>
                      <td>
                        {leave.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <button
                              id={`approve-${leave.id}`}
                              onClick={() => openDecision(leave, 'APPROVED')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                            >
                              <CheckCircle2 size={13} />
                              <span>Approve</span>
                            </button>
                            <button
                              id={`reject-${leave.id}`}
                              onClick={() => openDecision(leave, 'REJECTED')}
                              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                            >
                              <XCircle size={13} />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                        {leave.status !== 'PENDING' && (
                          <span className="text-slate-400 text-xs font-medium">
                            {leave.reviewedBy?.profile ? `By ${leave.reviewedBy.profile.firstName}` : 'Resolved'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeaveApprovals;
