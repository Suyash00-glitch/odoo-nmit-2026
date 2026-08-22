import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
  message = 'Something went wrong.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center border border-red-200">
      <AlertCircle className="w-6 h-6 text-red-600" />
    </div>
    <div>
      <p className="text-neutral-900 font-bold text-sm">Unable to load data</p>
      <p className="text-xs text-gray-500 mt-1">{message}</p>
    </div>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary text-xs">
        <RefreshCw size={13} /> Retry
      </button>
    )}
  </div>
);

export const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    {icon && (
      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-200 mx-auto">
        {icon}
      </div>
    )}
    <div>
      <p className="text-neutral-900 font-semibold text-sm">{title}</p>
      {description && <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">{description}</p>}
    </div>
    {action}
  </div>
);

export default ErrorState;
