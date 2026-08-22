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
    onSuccess: () => { toast.success('Checked in successfully!'); qc.invalidateQueries({ queryKey: ['attendance-me'] }); },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Check-in failed'),
  });

  const checkOutMut = useMutation({
    mutationFn: () => attendanceApi.checkOut(),
    onSuccess: () => { toast.success('Checked out successfully!'); qc.invalidateQueries({ queryKey: ['attendance-me'] }); },
    onError: (err) => toast.error(err?.response?.data?.error?.message ?? 'Check-out failed'),
  });

  const today = data?.todayRecord;
  const isCheckedIn = !!today?.checkIn;
  const isCheckedOut = !!today?.checkOut;

  return (
    <div className="space-y-6 animate-slide-up pb-12 font-sans">
      <div>
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">Attendance Tracking</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Daily clock-in and weekly working hours history</p>
      </div>

      {/* Action Banner */}
      <div className="card bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#6B42EF]">Today's Shift</p>
            <p className="text-lg font-black text-neutral-950">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            {today ? (
              <div className="flex gap-6 pt-1 text-xs sm:text-sm font-semibold">
                <span className="text-gray-500">In: <span className="text-neutral-950 font-mono font-bold">{today.checkIn ? new Date(today.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span></span>
                <span className="text-gray-500">Out: <span className="text-neutral-950 font-mono font-bold">{today.checkOut ? new Date(today.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span></span>
              </div>
            ) : (
              <p className="text-xs text-gray-400 font-medium">No clock-in record for today yet.</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              id="attendance-checkin"
              onClick={() => checkInMut.mutate()}
              disabled={checkInMut.isPending || isCheckedIn}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition-all ${
                isCheckedIn
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {checkInMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              <span>{isCheckedIn ? 'Checked In' : 'Check In'}</span>
            </button>
            <button
              id="attendance-checkout"
              onClick={() => checkOutMut.mutate()}
              disabled={checkOutMut.isPending || !isCheckedIn || isCheckedOut}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition-all ${
                !isCheckedIn || isCheckedOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              {checkOutMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
              <span>{isCheckedOut ? 'Checked Out' : 'Check Out'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-neutral-950">Attendance History</h2>
        <div className="flex gap-1.5 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          {['daily', 'weekly'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                view === v ? 'bg-white text-neutral-950 shadow-xs' : 'text-gray-500 hover:text-neutral-950'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)} Log
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {isLoading ? <SkeletonRow rows={7} /> : isError ? (
          <ErrorState onRetry={refetch} />
        ) : data?.records?.length === 0 ? (
          <EmptyState icon={<Calendar size={28} />} title="No records found" description="No attendance records for this period." />
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
                      <td className="font-extrabold text-neutral-950 text-sm">
                        {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="text-xs font-mono font-semibold text-emerald-700">
                        {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="text-xs font-mono font-semibold text-neutral-800">
                        {record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="text-xs font-mono font-bold text-neutral-900">{duration ? `${duration}h` : '—'}</td>
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
