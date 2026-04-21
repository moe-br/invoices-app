'use client';

import { outfit } from '@/app/ui/fonts';
import { CustomerField } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import {
  XMarkIcon,
  DocumentPlusIcon,
  TrashIcon,
  PlusIcon,
  SparklesIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState, useState, useMemo } from 'react';
import ClientSelect from '@/app/ui/invoices/client-select';
import clsx from 'clsx';

type InvoiceItem = {
  id: string;
  description: string;
  qty: string | number;
  unitPrice: string | number;
};

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [billingName, setBillingName] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: Math.random().toString(36).substr(2, 9), description: '', qty: 1, unitPrice: '' }
  ]);

  const vatRate = 19;
  const stampDuty = 1.000;

  const hTAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const q = typeof item.qty === 'number' ? item.qty : parseFloat(item.qty) || 0;
      const p = typeof item.unitPrice === 'number' ? item.unitPrice : parseFloat(item.unitPrice) || 0;
      return sum + (q * p);
    }, 0);
  }, [items]);

  const vatAmount = hTAmount * (vatRate / 100);
  const totalTTC = hTAmount === 0 ? 0 : hTAmount + vatAmount + stampDuty;

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), description: '', qty: 1, unitPrice: '' }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <form action={formAction} className={`${outfit.className} bg-white p-6 md:p-8 h-full text-slate-900 overflow-y-auto custom-scrollbar relative`}>
      <div className="max-w-4xl mx-auto">

        {/* Workspace Header */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-2 opacity-60">
             <SparklesIcon className="w-3.5 h-3.5 text-tunisia-red" />
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Creation Workspace</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Éditeur de Facture</h1>
          <p className="text-[11px] font-bold text-slate-400 mt-2 opacity-60">Émission de documents fiscaux avec précision.</p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Client Workspace */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
               <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black italic">01</div>
               <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Destinataire</h2>
            </div>
            
            <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-500">
              <ClientSelect 
                customers={customers} 
                value={selectedCustomerId} 
                onChange={setSelectedCustomerId} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Raison Sociale</label>
                  <input
                    type="text"
                    name="billingName"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    placeholder="Nom du client..."
                    className="w-full bg-white border border-slate-100 rounded-xl py-3 px-5 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all placeholder:opacity-30"
                    required={!selectedCustomerId}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Matricule Fiscal</label>
                  <input type="text" name="tax_id" placeholder="MF..." className="w-full bg-white border border-slate-100 rounded-xl py-3 px-5 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all placeholder:opacity-30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Téléphone</label>
                  <input type="text" name="phone" placeholder="+216 -- --- ---" required className="w-full bg-white border border-slate-100 rounded-xl py-3 px-5 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all placeholder:opacity-30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                  <input type="email" name="email" placeholder="contact@..." required className="w-full bg-white border border-slate-100 rounded-xl py-3 px-5 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all placeholder:opacity-30" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Adresse Facturation</label>
                  <input type="text" name="address" placeholder="Ville, Code Postal, Pays..." className="w-full bg-white border border-slate-100 rounded-xl py-3 px-5 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all placeholder:opacity-30" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Line Items Workspace */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
               <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black italic">02</div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Services & Articles</h2>
               </div>
               <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-tunisia-red transition-all active:scale-95 group"
               >
                  <PlusIcon className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                  AJOUTER
               </button>
            </div>

            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-700">
              {items.map((item, index) => (
                <div key={item.id} className="relative group p-4 rounded-xl bg-slate-50/30 border border-slate-100 hover:border-tunisia-red/10 transition-all duration-500 hover:bg-white hover:shadow-lg">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Prestation</label>
                        <input
                          type="text"
                          required
                          placeholder="Désignation..."
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-white border border-slate-50 rounded-lg py-2.5 px-4 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all placeholder:opacity-30"
                        />
                      </div>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-6 p-2 text-slate-200 hover:text-tunisia-red hover:bg-tunisia-red/5 rounded-lg transition-all"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Qté</label>
                        <input
                          type="number"
                          required
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          className="w-full bg-white border border-slate-50 rounded-lg py-2.5 px-4 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">P.U (HT)</label>
                        <input
                          type="number"
                          step="0.001"
                          required
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                          className="w-full bg-white border border-slate-50 rounded-lg py-2.5 px-4 text-[11px] font-bold text-slate-900 outline-none focus:border-tunisia-red/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Inputs */}
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <input type="hidden" name="amount" value={hTAmount} />
          <input type="hidden" name="status" value="pending" />
          <input type="hidden" name="vat_rate" value={vatRate} />

          {/* Step 3: Financial Summary & Finalization */}
          <div className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden group transition-all hover:border-tunisia-red/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tunisia-red/5 blur-[40px] rounded-full"></div>
            
            <div className="flex items-center gap-3 border-b border-slate-50 pb-5">
               <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black italic">03</div>
               <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Résumé & Validation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Net Hors Taxe</p>
                  <p className="text-base font-black text-slate-900">{formatCurrency(hTAmount)}</p>
               </div>
               <div className="space-y-1 md:border-l md:border-slate-50 md:pl-6">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">TVA & Timbre</p>
                  <p className="text-base font-black text-slate-900 opacity-60">{formatCurrency(vatAmount + stampDuty)}</p>
               </div>
               <div className="space-y-1 md:pl-6">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-red font-black">Montant Total (TTC)</p>
                  <p className="text-2xl font-black text-tunisia-red tracking-tight">{formatCurrency(totalTTC)}</p>
               </div>
            </div>

            <button
              type="submit"
              disabled={(!billingName && !selectedCustomerId) || hTAmount === 0}
              className="w-full py-4 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.3em] shadow-lg shadow-slate-950/10 hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group/submit mt-4"
            >
              <DocumentPlusIcon className="w-4 h-4 transition-transform group-hover/submit:translate-x-1" />
              Générer la Facture
            </button>
          </div>
        </div>

        {state.message && (
          <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-center">
             <p className="text-xs text-rose-500 font-bold uppercase tracking-widest">{state.message}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </form>
  );
}
