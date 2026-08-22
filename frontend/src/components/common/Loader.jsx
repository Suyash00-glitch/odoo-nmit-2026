import React from 'react';
import { Loader2 } from 'lucide-react';

const sizeMap = { sm: 16, md: 24, lg: 40 };

export const Loader = ({ text = 'Loading...', size = 'md' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-white/40">
    <Loader2 size={sizeMap[size]} className="animate-spin text-primary-400" />
    <span className="text-sm">{text}</span>
  </div>
);

export const SkeletonRow = ({ rows = 5, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="skeleton h-12 rounded-xl" />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`card space-y-3 ${className}`}>
    <div className="skeleton h-4 w-1/3 rounded-lg" />
    <div className="skeleton h-8 w-2/3 rounded-lg" />
    <div className="skeleton h-4 w-1/2 rounded-lg" />
  </div>
);

export default Loader;
