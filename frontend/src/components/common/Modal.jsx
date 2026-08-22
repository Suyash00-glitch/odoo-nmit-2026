import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const sizeMap = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-2xl' };

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs" onClick={onClose} />
      <div className={`relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full ${sizeMap[size] || 'max-w-md'} animate-slide-up`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-neutral-950">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500 hover:text-neutral-900"
          >
            <X size={15} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
