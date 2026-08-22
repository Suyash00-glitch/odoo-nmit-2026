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
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Leave Approvals</h1>
        <p className="text-white/50 text-sm mt-1">Review and action employee leave requests</p>
      </div>

      <div className="flex gap-1 bg-surface-300 rounded-xl p-1 w-fit">
        {[
          { value: 'PENDING', label: '⏳ Pending' },
          { value: 'APPROVED', label: '✅ Approved' },
          { value: 'REJECTED', label: '❌ Rejected' },
          { value: '', label: 'All' },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === opt.value ? 'bg-primary-600 text-white' : 'text-white/50 hover:text-white'}`}
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
            <div className="p-4 bg-surface-300/50 rounded-xl space-y-2">
              <p className="text-white font-medium">{selectedLeave.employee.profile?.firstName} {selectedLeave.employee.profile?.lastName}</p>
              <p className="text-white/50 text-sm">{selectedLeave.leaveType} leave · {new Date(selectedLeave.startDate).toLocaleDateString()} → {new Date(selectedLeave.endDate).toLocaleDateString()}</p>
              {selectedLeave.remarks && <p className="text-white/40 text-sm italic">"{selectedLeave.remarks}"</p>}
            </div>
            <form onSubmit={handleSubmit(onDecisionSubmit)} className="space-y-4" id="decision-form">
              <div>
                <label className="label">Comments (optional)</label>
                <textarea {...register('reviewComments')} rows={3} placeholder="Add a comment for the employee..." className="input-field resize-none" id="review-comments" />
              </div>
              <button
                type="submit"
                id="confirm-decision-btn"
                disabled={isSubmitting || decisionMut.isPending}
                className={decisionType === 'APPROVED' ? 'btn-success w-full' : 'btn-danger w-full'}
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
          <EmptyState icon={<CheckSquare size={24} />} title="No leave requests" description={`No ${statusFilter.toLowerCase() || ''} leave requests found`} />
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
                          <p className="text-white font-medium">{leave.employee.profile?.firstName} {leave.employee.profile?.lastName}</p>
                          <p className="text-white/40 text-xs">{leave.employee.profile?.department}</p>
                        </div>
                      </td>
                      <td>{leaveTypeBadge(leave.leaveType)}</td>
                      <td className="text-white/60 text-xs">
                        {new Date(leave.startDate).toLocaleDateString()} →<br/>{new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td><span className="badge-gray">{days}d</span></td>
                      <td>{leaveStatusBadge(leave.status)}</td>
                      <td className="text-white/50 text-xs max-w-xs truncate">{leave.remarks ?? '—'}</td>
                      <td>
                        {leave.status === 'PENDING' && (
                          <div className="flex gap-1.5">
                            <button id={`approve-${leave.id}`} onClick={() => openDecision(leave, 'APPROVED')} className="btn-success px-2.5 py-1.5 text-xs">
                              <CheckCircle2 size={12} />
                            </button>
                            <button id={`reject-${leave.id}`} onClick={() => openDecision(leave, 'REJECTED')} className="btn-danger px-2.5 py-1.5 text-xs">
                              <XCircle size={12} />
                            </button>
                          </div>
                        )}
                        {leave.status !== 'PENDING' && <span className="text-white/30 text-xs">—</span>}
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
