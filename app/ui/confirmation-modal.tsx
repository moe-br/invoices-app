'use client';

import { outfit } from '@/app/ui/fonts';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
}: ConfirmationModalProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = 'auto';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className={`relative w-full max-w-sm glass-card p-0 overflow-hidden transform transition-all duration-300 shadow-2xl ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} ${outfit.className}`}>
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3 rounded-2xl ${variant === 'danger' ? 'bg-rose-500/10 text-rose-500' : 'bg-orange-500/10 text-orange-500'}`}>
              <ExclamationTriangleIcon className="w-6 h-6" />
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            {title}
          </h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-lg ${
                variant === 'danger' 
                ? 'bg-tunisia-red text-white shadow-red-500/20 hover:bg-red-700' 
                : 'bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600'
              }`}
            >
              {confirmLabel}
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
