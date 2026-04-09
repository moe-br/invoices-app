'use client';

import { outfit } from '@/app/ui/fonts';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { 
  CheckIcon, 
  TrashIcon, 
  EyeIcon, 
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { markInvoiceAsPaid, deleteInvoice } from '@/app/lib/actions';
import Link from 'next/link';
import ConfirmationModal from '@/app/ui/confirmation-modal';

export default function FinancialOperations({ 
  invoices 
}: { 
  invoices: any[] 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(invoice => 
    invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to format invoice number Fac_001, Fac_002, etc.
  // We'll use a slice of the ID or a padded version of the list index if we want it to be "001"
  // Let's use the ID to keep it unique but format it as Fac_XXXX
  const formatInvoiceId = (id: string | number) => {
    const rawId = id.toString();
    // If it's a numeric ID, pad it. If it's a UUID/Hash, take a slice.
    if(/^\d+$/.test(rawId)) {
        return `Fac_${rawId.padStart(3, '0')}`;
    }
    return `Fac_${rawId.substring(0, 4).toUpperCase()}`;
  };

  return (
    <div className={`${outfit.className} bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 h-full flex flex-col transition-all duration-500`}>
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">Financial Operations</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Manage client billing and invoices.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-tunisia-red transition-all duration-300" />
            <input 
              type="text" 
              placeholder="Search invoices..."
              className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red/50 transition-all duration-300 w-64 shadow-sm dark:shadow-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="px-3 py-1.5 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black text-slate-500 dark:text-slate-400 shadow-sm dark:shadow-none transition-all">
            {filteredInvoices.length} of {invoices.length}
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-white/5 mb-2 transition-all">
        <div className="col-span-2">Invoice Info</div>
        <div className="col-span-2 text-center">Client</div>
        <div className="col-span-1 text-center">Date</div>
        <div className="col-span-2 text-center">Amount</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-3 text-right pr-4">Control</div>
      </div>

      {/* Invoice List */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-slate-200 dark:hover:border-white/5">
            {/* Invoice Info */}
            <div className="col-span-2">
              <span className="text-[10px] font-black text-tunisia-red uppercase tracking-wider block mb-0.5 transition-colors group-hover:text-tunisia-red">
                {formatInvoiceId(invoice.id)}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white block truncate transition-colors group-hover:translate-x-1 duration-300">
                {invoice.name || 'Untitled Invoice'}
              </span>
            </div>

            {/* Client */}
            <div className="col-span-2 text-center px-1">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate block">{invoice.name}</span>
            </div>

            {/* Date */}
            <div className="col-span-1 text-center text-[10px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
               {formatDateToLocal(invoice.date)}
            </div>

            {/* Amount */}
            <div className="col-span-2 text-center px-1">
              <span className="text-sm font-black text-slate-900 dark:text-white truncate block">{formatCurrency(invoice.amount)}</span>
            </div>

            {/* Status */}
            <div className="col-span-2 flex justify-center">
              <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                invoice.status === 'paid' 
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 shadow-sm shadow-green-500/10' 
                : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shadow-sm shadow-orange-500/10'
              }`}>
                {invoice.status}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-3 flex justify-end items-center gap-2 pr-2">
              <Link 
                href={`/dashboard/invoices/${invoice.id}/view`}
                className="flex items-center justify-center w-9 h-9 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm dark:shadow-none active:scale-90"
                title="View Invoice"
              >
                <EyeIcon className="w-4.5 h-4.5" />
              </Link>
              
              {invoice.status !== 'paid' ? (
                <button 
                  onClick={() => markInvoiceAsPaid(invoice.id)}
                  className="h-9 px-4 bg-green-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 active:scale-90 flex items-center justify-center gap-1.5 group/btn whitespace-nowrap min-w-[95px]"
                >
                  <CheckIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                  Mark Paid
                </button>
              ) : (
                <div className="flex items-center justify-center w-9 h-9 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl transition-all animate-in zoom-in-50 duration-500">
                  <CheckIcon className="w-4.5 h-4.5" />
                </div>
              )}

              <button 
                onClick={() => {
                  setSelectedInvoiceId(invoice.id);
                  setModalOpen(true);
                }}
                className="flex items-center justify-center w-9 h-9 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shadow-sm dark:shadow-none active:scale-90"
                title="Delete Invoice"
              >
                <TrashIcon className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedInvoiceId) {
            deleteInvoice(selectedInvoiceId);
            setSelectedInvoiceId(null);
          }
        }}
        title="Delete Invoice?"
        message="This action cannot be undone. All data associated with this invoice will be permanently removed."
        confirmLabel="Delete Invoice"
        cancelLabel="Keep Invoice"
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); }
      `}</style>
    </div>
  );
}
