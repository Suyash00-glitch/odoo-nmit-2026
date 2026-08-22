import React from 'react';

const variantClass = {
  green: 'badge-green',
  amber: 'badge-amber',
  red: 'badge-red',
  gray: 'badge-gray',
  blue: 'badge-blue',
  purple: 'badge-purple',
};

const dotClass = {
  green: 'bg-emerald-400',
  amber: 'bg-amber-400',
  red: 'bg-red-400',
  gray: 'bg-white/40',
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
};

const Badge = ({ variant, children, dot = true }) => (
  <span className={variantClass[variant] || 'badge-gray'}>
    {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotClass[variant] || 'bg-white/40'}`} />}
    {children}
  </span>
);

export const leaveStatusBadge = (status) => {
  const map = {
    PENDING: 'amber',
    APPROVED: 'green',
    REJECTED: 'red',
  };
  return <Badge variant={map[status] || 'gray'}>{status}</Badge>;
};

export const attendanceStatusBadge = (status) => {
  const map = {
    PRESENT: 'green',
    ABSENT: 'red',
    HALF_DAY: 'amber',
    LEAVE: 'blue',
  };
  const label = {
    PRESENT: 'Present',
    ABSENT: 'Absent',
    HALF_DAY: 'Half Day',
    LEAVE: 'On Leave',
  };
  return <Badge variant={map[status] || 'gray'}>{label[status] || status}</Badge>;
};

export const leaveTypeBadge = (type) => {
  const map = {
    PAID: 'green',
    SICK: 'amber',
    UNPAID: 'gray',
  };
  return <Badge variant={map[type] || 'gray'} dot={false}>{type}</Badge>;
};

export default Badge;
