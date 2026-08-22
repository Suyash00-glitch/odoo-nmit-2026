import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
  message = 'Something went wrong.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center">
      <AlertCircle className="w-7 h-7 text-red-400" />
    </div>
    <div>
      <p className="text-white/70 font-medium">Error</p>
      <p className="text-sm text-white/40 mt-1">{message}</p>
    </div>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary text-sm">
        <RefreshCw size={14} /> Retry
      </button>
    )}
  </div>
);

export const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    {icon && (
      <div className="w-14 h-14 bg-surface-300 rounded-2xl flex items-center justify-center text-white/30">
        {icon}
      </div>
    )}
    <div>
      <p className="text-white/70 font-medium">{title}</p>
      {description && <p className="text-sm text-white/40 mt-1">{description}</p>}
    </div>
    {action}
  </div>
);

export default ErrorState;
