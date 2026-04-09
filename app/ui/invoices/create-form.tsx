'use client';

import { outfit } from '@/app/ui/fonts';
import { CustomerField } from '@/app/lib/definitions';
import {
  XMarkIcon,
  DocumentPlusIcon,
  ChevronDownIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState, useState, useMemo } from 'react';
import ClientSelect from '@/app/ui/invoices/client-select';

type InvoiceItem = {
  id: string;
  description: string;
  qty: string | number;
  unitPrice: string | number;
};

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  // Form states
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [billingName, setBillingName] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: Math.random().toString(36).substr(2, 9), description: '', qty: 1, unitPrice: '' }
  ]);

  // Derived calculations
  const vatRate = 19; // 19%
  const stampDuty = 1.000; // 1 TND

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
    <form action={formAction} className={`${outfit.className} bg-white dark:bg-slate-950 p-6 md:p-8 h-full text-slate-800 dark:text-slate-200 overflow-y-auto custom-scrollbar transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-0.5">Invoice Issuance</h1>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Generate professional billing for your clients.</p>
          </div>
          <div />
        </div>

        {/* Section 1: Client Selection */}
        <ClientSelect 
          customers={customers} 
          value={selectedCustomerId} 
          onChange={setSelectedCustomerId} 
        />

        {/* Section 2: Client Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-slate-50 dark:bg-slate-800/20 p-6 rounded-2xl border border-slate-200 dark:border-white/5 transition-all">
          <div className="space-y-1.5">
            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-red">Billing Name</label>
            <input
              type="text"
              name="billingName"
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
              placeholder="Client Name"
              className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg py-2.5 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red transition-all shadow-sm dark:shadow-none"
              required={!selectedCustomerId}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-red">MF (Matricule Fiscal)</label>
            <input type="text" name="tax_id" placeholder="Ex: 1234567/..." className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg py-2.5 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red transition-all shadow-sm dark:shadow-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-red">Phone Number</label>
            <input type="text" name="phone" placeholder="+216 ..." required className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg py-2.5 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red transition-all shadow-sm dark:shadow-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-red">Email Address</label>
            <input type="email" name="email" placeholder="client@email.com" required className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg py-2.5 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red transition-all shadow-sm dark:shadow-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-red">Billing Address</label>
            <input type="text" name="address" placeholder="Address..." className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg py-2.5 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red transition-all shadow-sm dark:shadow-none" />
          </div>
        </div>

        {/* Section 4: Items Grid */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">Invoice Items</label>
          {items.map((item, index) => (
            <div key={item.id} className="space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-200 dark:border-white/5 relative group transition-all">
              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">Product / Service Description</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Web Development, Consultation..."
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red/50 transition-all shadow-sm dark:shadow-none"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-6 p-2 text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">Qty</label>
                  <input
                    type="number"
                    required
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                    className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red/50 transition-all shadow-sm dark:shadow-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">Unit Price (HT)</label>
                  <input
                    type="number"
                    step="0.001"
                    required
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                    className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-red/50 transition-all shadow-sm dark:shadow-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Button */}
        <button
          type="button"
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 hover:text-tunisia-red dark:hover:text-slate-400 hover:border-tunisia-red dark:hover:border-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <XMarkIcon className="w-4 h-4 rotate-45" />
          Add {items.length === 1 ? 'Second' : items.length === 2 ? 'Third' : `${items.length + 1}th`} Product
        </button>

        {/* Hidden Inputs for backend */}
        <input type="hidden" name="amount" value={hTAmount} />
        <input type="hidden" name="status" value="pending" />
        <input type="hidden" name="vat_rate" value={vatRate} />

        {/* Calculations Section */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 dark:border-white/5 transition-all">
          <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">TVA ({vatRate}%)</p>
            <p className="text-sm font-black text-slate-900 dark:text-white">{vatAmount.toFixed(3)}</p>
          </div>
          <div className="text-center border-x border-slate-100 dark:border-white/5">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">Timbre</p>
            <p className="text-sm font-black text-slate-900 dark:text-white">{stampDuty.toFixed(3)}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-widest text-tunisia-red mb-1.5">Total TTC (Final)</p>
            <p className="text-sm font-black text-tunisia-red">{totalTTC.toFixed(3)}</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={(!billingName && !selectedCustomerId) || hTAmount === 0}
          className="w-full py-5 bg-tunisia-red text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-tunisia-red/20 hover:bg-tunisia-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-4"
        >
          <DocumentPlusIcon className="w-5 h-5" />
          Issue Invoice
        </button>

        {state.message && (
          <p className="mt-2 text-center text-xs text-rose-500 font-bold">{state.message}</p>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </form>
  );
}
