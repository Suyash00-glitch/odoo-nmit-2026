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
import { CalendarDays, Plus, Loader2 } from 'lucide-react';

const schema = z.object({
  leaveType: z.enum(['PAID', 'SICK', 'UNPAID']),
  startDate: z.string().min(1, 'Start date required'),
  endDate: z.string().min(1, 'End date required'),
  remarks: z.string().max(500).optional(),
});

const EmployeeLeaves = () => {
  const qc = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['leaves-me'],
    queryFn: () => leavesApi.getMyLeaves().then(r => r.data.data),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { leaveType: 'PAID' },
  });

  const mutation = useMutation({
    mutationFn: (values) => leavesApi.apply(values),
    onSuccess: () => {
      toast.success('Leave request submitted!');
      qc.invalidateQueries({ queryKey: ['leaves-me'] });
      setShowModal(false);
      reset();
    },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Submission failed'),
  });

  const leaves = data?.leaves ?? [];

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Leave Management</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Apply for leave and track your quota status</p>
        </div>
        <button id="apply-leave-btn" onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-1.5 py-2.5 px-5 text-xs font-bold shadow-sm">
          <Plus size={16} />
          <span>Apply for Leave</span>
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Apply for Leave">
        <form onSubmit={handleSubmit(v => mutation.mutate(v))} className="space-y-4" id="leave-form">
          <div>
            <label className="label text-xs font-bold text-neutral-700">Leave Type</label>
            <select {...register('leaveType')} className="input-field text-xs" id="leave-type">
              <option value="PAID">Paid Leave (Annual Quota)</option>
              <option value="SICK">Sick / Medical Leave</option>
              <option value="UNPAID">Unpaid Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-xs font-bold text-neutral-700">Start Date</label>
              <input type="date" {...register('startDate')} className="input-field text-xs" id="leave-start" />
              {errors.startDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="label text-xs font-bold text-neutral-700">End Date</label>
              <input type="date" {...register('endDate')} className="input-field text-xs" id="leave-end" />
              {errors.endDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.endDate.message}</p>}
            </div>
          </div>
          <div>
            <label className="label text-xs font-bold text-neutral-700">Reason / Remarks (optional)</label>
            <textarea {...register('remarks')} rows={3} placeholder="Provide details regarding your leave request..." className="input-field text-xs resize-none" id="leave-remarks" />
          </div>
          <button type="submit" disabled={isSubmitting || mutation.isPending} className="btn-primary w-full py-3 text-xs font-bold shadow-sm" id="submit-leave-btn">
            {mutation.isPending ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> : 'Submit Leave Request'}
          </button>
        </form>
      </Modal>

      <div className="card">
        <h2 className="text-lg font-black text-neutral-950 mb-4">My Leave History</h2>
        {isLoading ? <SkeletonRow rows={5} /> : isError ? (
          <ErrorState onRetry={refetch} />
        ) : leaves.length === 0 ? (
          <EmptyState
            icon={<CalendarDays size={28} />}
            title="No leave requests"
            description="You haven't applied for any leave yet."
            action={<button onClick={() => setShowModal(true)} className="btn-primary text-xs font-bold py-2.5 px-4 mt-2">Apply for Leave</button>}
          />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => {
                  const days = Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / 86400000) + 1;
                  return (
                    <tr key={leave.id}>
                      <td>{leaveTypeBadge(leave.leaveType)}</td>
                      <td className="text-neutral-950 font-mono text-xs font-semibold">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="text-neutral-950 font-mono text-xs font-semibold">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td><span className="badge-gray font-bold">{days}d</span></td>
                      <td>{leaveStatusBadge(leave.status)}</td>
                      <td className="text-gray-500 text-xs max-w-xs truncate">{leave.remarks ?? '—'}</td>
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

export default EmployeeLeaves;
