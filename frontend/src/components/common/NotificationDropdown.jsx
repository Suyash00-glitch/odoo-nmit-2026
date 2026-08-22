import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../../api/notifications.api.js';
import { Bell, CheckCheck, Check, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.getAll().then((r) => r.data.data),
    refetchInterval: 15000,
  });

  const markReadMut = useMutation({
    mutationFn: (id) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllMut = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      toast.success('All notifications marked as read');
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-800 shadow-2xs transition-colors relative"
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-2.5 right-2.5 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white border border-slate-200/90 shadow-2xl z-50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-extrabold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllMut.mutate()}
                disabled={markAllMut.isPending}
                className="text-[11px] font-bold text-slate-900 hover:underline flex items-center gap-1"
              >
                <CheckCheck size={13} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="py-8 text-center space-y-1">
                <p className="text-xs font-bold text-slate-500">No notifications</p>
                <p className="text-[11px] text-slate-400">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && markReadMut.mutate(n.id)}
                  className={`p-3.5 hover:bg-slate-50/80 transition-colors flex items-start justify-between gap-3 cursor-pointer ${
                    !n.isRead ? 'bg-indigo-50/30' : ''
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />}
                      <h4 className="text-xs font-extrabold text-slate-950 truncate">
                        {n.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 pt-0.5">
                      <Clock size={10} />
                      <span>
                        {new Date(n.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </p>
                  </div>
                  {!n.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markReadMut.mutate(n.id);
                      }}
                      className="p-1 rounded-lg hover:bg-white text-slate-400 hover:text-slate-900 transition-colors shrink-0"
                      title="Mark as read"
                    >
                      <Check size={13} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
