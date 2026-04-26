'use client';

import { outfit } from '@/app/ui/fonts';
import { CustomerField, QuoteForm } from '@/app/lib/definitions';
import { useState } from 'react';
import ClientSelect from '@/app/ui/invoices/client-select';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { updateQuote, State } from '@/app/lib/quote-actions';
import { useActionState } from 'react';

export default function EditQuoteForm({
  quote,
  customers,
}: {
  quote: QuoteForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateQuoteWithId = updateQuote.bind(null, quote.id);
  const [state, formAction] = useActionState(updateQuoteWithId, initialState);
  const [selectedCustomerId, setSelectedCustomerId] = useState(quote.customer_id);

  return (
    <form action={formAction} className={outfit.className}>
      <div className="glass-card p-8 md:p-12 border-white/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Customer Name */}
          <div className="space-y-3">
            <ClientSelect 
              customers={customers} 
              value={selectedCustomerId} 
              onChange={setSelectedCustomerId} 
              label="Client"
            />
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error: string) => (
                  <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            
            <div className="mt-4">
              <label htmlFor="validity_days" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block ml-1 mb-2">
                Validité (jours)
              </label>
              <input
                id="validity_days"
                name="validity_days"
                type="number"
                defaultValue={quote.validity_days || 30}
                className="block w-full rounded-2xl border border-slate-200 bg-white/50 py-4 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red focus:bg-white focus:ring-4 focus:ring-tunisia-red/5 shadow-sm"
              />
            </div>
          </div>

          {/* Quote Amount */}
          <div className="space-y-3">
            <label htmlFor="amount" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">
              Montant HT (TND)
            </label>
            <div className="relative group">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.001"
                defaultValue={quote.amount / 1000}
                placeholder="0.000"
                className="peer block w-full rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red focus:bg-white focus:ring-4 focus:ring-tunisia-red/5 shadow-sm"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-tunisia-red" />
            </div>

            {/* Hidden items array pass through */}
            <input type="hidden" name="items" value={JSON.stringify(quote.items || [])} />
            <input type="hidden" name="vat_rate" value={quote.vat_rate} />
          </div>

          {/* Quote Status */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">
              État du devis
            </label>
            <div className="grid grid-cols-3 gap-4 p-1 rounded-[1.25rem] bg-slate-100 border border-slate-200">
              <div className="relative">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  defaultValue="pending"
                  defaultChecked={quote.status === 'pending'}
                  className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="pending"
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm text-slate-400"
                >
                  <ClockIcon className="h-4 w-4" /> En attente
                </label>
              </div>
              <div className="relative">
                <input
                  id="accepted"
                  name="status"
                  type="radio"
                  defaultValue="accepted"
                  defaultChecked={quote.status === 'accepted'}
                  className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="accepted"
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all peer-checked:bg-green-500 peer-checked:text-white peer-checked:shadow-sm text-slate-400"
                >
                  <CheckIcon className="h-4 w-4" /> Accepté
                </label>
              </div>
              <div className="relative">
                <input
                  id="rejected"
                  name="status"
                  type="radio"
                  defaultValue="rejected"
                  defaultChecked={quote.status === 'rejected'}
                  className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="rejected"
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all peer-checked:bg-red-500 peer-checked:text-white peer-checked:shadow-sm text-slate-400"
                >
                  <XMarkIcon className="h-4 w-4" /> Refusé
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
          <div />
          <button 
            type="submit"
            className="flex h-14 items-center gap-3 rounded-2xl bg-tunisia-red px-10 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-red-500/20 transition-all hover:scale-[1.05] active:scale-95"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </form>
  );
}
