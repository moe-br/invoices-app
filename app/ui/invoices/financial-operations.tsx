'use client';

import { outfit } from '@/app/ui/fonts';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { 
  CheckIcon, 
  TrashIcon, 
  EyeIcon, 
  MagnifyingGlassIcon,
  ChevronRightIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { markInvoiceAsPaid, deleteInvoice } from '@/app/lib/actions';
import Link from 'next/link';
import ConfirmationModal from '@/app/ui/confirmation-modal';
import clsx from 'clsx';

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
    (invoice.formatted_number && invoice.formatted_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatInvoiceId = (id: string | number) => {
    const rawId = id.toString();
    if(/^\d+$/.test(rawId)) {
        return `Fac_${rawId.padStart(3, '0')}`;
    }
    return `Fac_${rawId.substring(0, 4).toUpperCase()}`;
  };

  return (
    <div className={`${outfit.className} bg-white rounded-[2rem] border border-slate-100 p-6 h-full flex flex-col transition-all duration-500 shadow-sm shadow-slate-100/50`}>
      {/* Premium Header Area */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-6">
        <div>
           <div className="flex items-center gap-2 mb-1.5 opacity-60">
              <div className="w-1 h-1 rounded-full bg-tunisia-red"></div>
              <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Operations List</h2>
           </div>
           <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Hub Financier</h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 group-focus-within:text-tunisia-red transition-all duration-300" />
            <input 
              type="text" 
              placeholder="Rechercher une opération..."
              className="bg-slate-50/50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-5 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/30 focus:bg-white transition-all duration-300 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-900 hover:shadow-sm transition-all active:scale-95">
             <FunnelIcon className="w-3.5 h-3.5" />
             <span>FILTRER</span>
          </button>
        </div>
      </div>

      {/* Operations Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="relative group p-5 rounded-2xl bg-white border border-slate-100 hover:border-tunisia-red/10 transition-all duration-500 hover:shadow-xl hover:shadow-slate-100/50">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                
                {/* Visual Anchor */}
                <div className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:scale-105 shadow-sm",
                  invoice.status === 'paid' 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-500 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white"
                    : "bg-amber-50 border-amber-100 text-amber-500 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-white"
                )}>
                   {invoice.status === 'paid' ? <CheckIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </div>

                {/* Primary Info */}
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black text-tunisia-red bg-tunisia-red/5 px-2 py-0.5 rounded-full border border-tunisia-red/10 uppercase tracking-widest opacity-80">
                        {invoice.formatted_number || formatInvoiceId(invoice.invoice_number || invoice.id)}
                      </span>
                      <span className="text-[8px] font-black text-slate-400 italic">
                        {formatDateToLocal(invoice.date)}
                      </span>
                   </div>
                   <h4 className="text-base font-black text-slate-900 truncate leading-tight transition-colors group-hover:text-tunisia-red">
                     {invoice.name || 'Client Anonyme'}
                   </h4>
                   <p className="text-[9px] font-bold text-slate-400 mt-0.5 truncate tracking-wide opacity-60">
                     {invoice.email || 'Aucun contact Email'}
                   </p>
                </div>

                {/* Financial Summary */}
                <div className="text-center sm:text-right px-4 border-l border-slate-50 sm:border-r">
                   <p className="text-xl font-black text-slate-900 tracking-tight">
                     {formatCurrency(invoice.amount)}
                   </p>
                   <p className={clsx(
                     "text-[8px] font-black uppercase tracking-[0.2em] mt-0.5 opacity-80",
                     invoice.status === 'paid' ? "text-emerald-500" : "text-amber-500"
                   )}>
                     {invoice.status === 'paid' ? 'Soldée' : 'En attente'}
                   </p>
                </div>

                {/* Actions Hub */}
                <div className="flex items-center gap-2.5">
                  <Link 
                    href={`/dashboard/invoices/${invoice.id}/view`}
                    className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-xl text-white hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-95"
                    title="Détails"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                  
                  {invoice.status !== 'paid' && (
                    <button 
                      onClick={() => markInvoiceAsPaid(invoice.id)}
                      className="group/pay h-10 px-5 bg-emerald-500 text-white rounded-xl text-[8px] font-black uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/10 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckIcon className="w-3.5 h-3.5 transition-transform group-hover/pay:scale-110" />
                      PAYER
                    </button>
                  )}

                  <button 
                    onClick={() => {
                      setSelectedInvoiceId(invoice.id);
                      setModalOpen(true);
                    }}
                    className="flex items-center justify-center w-10 h-10 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-tunisia-red hover:border-tunisia-red/20 transition-all hover:bg-tunisia-red/5 active:scale-95"
                    title="Supprimer"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
             <MagnifyingGlassIcon className="w-16 h-16 mb-6 text-slate-200" />
             <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Aucune opération trouvée</p>
          </div>
        )}
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
        title="Supprimer l'opération ?"
        message="Cette action est définitive. L'historique financier associé sera effacé de nos registres de sécurité."
        confirmLabel="Finaliser la Suppression"
        cancelLabel="Annuler"
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
