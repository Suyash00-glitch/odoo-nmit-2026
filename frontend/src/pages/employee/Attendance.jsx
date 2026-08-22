import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceApi } from '../../api/attendance.api.js';
import { SkeletonRow } from '../../components/common/Loader.jsx';
import { ErrorState, EmptyState } from '../../components/common/ErrorState.jsx';
import { attendanceStatusBadge } from '../../components/common/Badge.jsx';
import toast from 'react-hot-toast';
import { Clock, CheckCircle2, XCircle, Loader2, Calendar } from 'lucide-react';

const EmployeeAttendance = () => {
  const qc = useQueryClient();
  const [view, setView] = useState('weekly');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['attendance-me', view],
    queryFn: () => attendanceApi.getMyAttendance({ view }).then(r => r.data.data),
  });

  const checkInMut = useMutation({
    mutationFn: () => attendanceApi.checkIn(),
    onSuccess: () => { toast.success('Checked in!'); qc.invalidateQueries({ queryKey: ['attendance-me'] }); },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Failed'),
  });

  const checkOutMut = useMutation({
    mutationFn: () => attendanceApi.checkOut(),
    onSuccess: () => { toast.success('Checked out!'); qc.invalidateQueries({ queryKey: ['attendance-me'] }); },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Failed'),
  });

  const today = data?.todayRecord;
  const isCheckedIn = !!today?.checkIn;
  const isCheckedOut = !!today?.checkOut;

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-white">Attendance</h1>
        <p className="text-white/50 text-sm mt-1">Track your daily check-ins and check-outs</p>
      </div>

      <div className="card bg-gradient-to-br from-primary-900/30 to-surface-200 border-primary-500/20">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1">
            <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Today</p>
            <p className="font-semibold text-white">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            {today ? (
              <div className="flex gap-6 mt-2 text-sm">
                <span className="text-white/60">In: <span className="text-white">{today.checkIn ? new Date(today.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}</span></span>
                <span className="text-white/60">Out: <span className="text-white">{today.checkOut ? new Date(today.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'}</span></span>
              </div>
            ) : (
              <p className="text-white/40 text-sm mt-1">No attendance record yet today</p>
            )}
          </div>
          <div className="flex gap-3">
            <button id="attendance-checkin" onClick={() => checkInMut.mutate()} disabled={checkInMut.isPending || isCheckedIn} className="btn-success">
              {checkInMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Check In
            </button>
            <button id="attendance-checkout" onClick={() => checkOutMut.mutate()} disabled={checkOutMut.isPending || !isCheckedIn || isCheckedOut} className="btn-danger">
              {checkOutMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />} Check Out
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white">History</h2>
        <div className="flex gap-1 bg-surface-300 rounded-xl p-1">
          {['daily', 'weekly'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === v ? 'bg-primary-600 text-white' : 'text-white/50 hover:text-white'}`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {isLoading ? <SkeletonRow rows={7} /> : isError ? (
          <ErrorState onRetry={refetch} />
        ) : data?.records?.length === 0 ? (
          <EmptyState icon={<Calendar size={24} />} title="No records" description="No attendance records found for this period" />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.records?.map((record) => {
                  const duration = record.checkIn && record.checkOut
                    ? Math.round((new Date(record.checkOut).getTime() - new Date(record.checkIn).getTime()) / 3600000 * 10) / 10
                    : null;
                  return (
                    <tr key={record.id}>
                      <td className="text-white">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                      <td>{record.checkIn ? <span className="flex items-center gap-1.5 text-emerald-400"><Clock size={12} />{new Date(record.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span> : '—'}</td>
                      <td>{record.checkOut ? <span className="text-red-400">{new Date(record.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span> : '—'}</td>
                      <td>{duration ? <span className="text-white/70">{duration}h</span> : '—'}</td>
                      <td>{attendanceStatusBadge(record.status)}</td>
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

export default EmployeeAttendance;
