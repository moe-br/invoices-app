'use client';

import { outfit } from '@/app/ui/fonts';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { PercentBadgeIcon } from '@heroicons/react/24/outline';


export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction} className={outfit.className}>
      <div className="glass-card p-8 md:p-12 border-white/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Customer Name */}
          <div className="space-y-3">
            <label htmlFor="customer" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">
              Client
            </label>
            <div className="relative group">
              <select
                id="customer"
                name="customerId"
                className="peer block w-full cursor-pointer rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red focus:bg-white focus:ring-4 focus:ring-tunisia-red/5 shadow-sm"
                defaultValue=""
                aria-describedby="customer-error"
              >
                <option value="" disabled>Sélectionner un client</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-tunisia-red" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error: string) => (
                  <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Invoice Amount */}
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
                placeholder="0.000"
                className="peer block w-full rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red focus:bg-white focus:ring-4 focus:ring-tunisia-red/5 shadow-sm"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-tunisia-red" />
            </div>
          </div>

          {/* VAT Rate */}
          <div className="space-y-3">
            <label htmlFor="vat_rate" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">
              Taux de TVA
            </label>
            <div className="relative group">
              <select
                id="vat_rate"
                name="vat_rate"
                className="peer block w-full cursor-pointer rounded-2xl border border-slate-200 bg-white/50 py-4 pl-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red focus:bg-white focus:ring-4 focus:ring-tunisia-red/5 shadow-sm"
                defaultValue="19"
              >
                <option value="19">19% (Standard)</option>
                <option value="13">13% (Réduit)</option>
                <option value="7">7% (Réduit)</option>
                <option value="0">0% (Exonéré)</option>
              </select>
              <PercentBadgeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors peer-focus:text-tunisia-red" />
            </div>
          </div>

          {/* Invoice Status */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 block ml-1">
              État de la facture
            </label>
            <div className="flex gap-4 p-1 rounded-[1.25rem] bg-slate-100 border border-slate-200">
              <div className="flex-1 relative">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="pending"
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm text-slate-400"
                >
                  <ClockIcon className="h-4 w-4" /> En attente
                </label>
              </div>
              <div className="flex-1 relative">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <label
                  htmlFor="paid"
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-black uppercase tracking-widest transition-all peer-checked:bg-green-500 peer-checked:text-white peer-checked:shadow-sm text-slate-400"
                >
                  <CheckIcon className="h-4 w-4" /> Payée
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
          <Link
            href="/dashboard/invoices"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            Annuler
          </Link>
          <button 
            type="submit"
            className="flex h-14 items-center gap-3 rounded-2xl bg-tunisia-red px-10 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-red-500/20 transition-all hover:scale-[1.05] active:scale-95"
          >
            Créer la facture
          </button>
        </div>
      </div>
    </form>
  );
}
