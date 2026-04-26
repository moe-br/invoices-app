'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCustomer } from '@/app/lib/actions';
import clsx from 'clsx';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  IdentificationIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CreateCustomerForm() {
  const [state, dispatch] = useActionState(createCustomer, { message: '', errors: {} });
  const [customerType, setCustomerType] = useState<'individual' | 'company'>('individual');

  return (
    <form action={dispatch} className="space-y-6">
      <div className="glass-card p-8 border-white/20  space-y-8">
        {/* Customer Type Toggle */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Type de Client</label>
          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit gap-1">
            <button
              type="button"
              onClick={() => setCustomerType('individual')}
              className={clsx(
                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                customerType === 'individual' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Particulier
            </button>
            <button
              type="button"
              onClick={() => setCustomerType('company')}
              className={clsx(
                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                customerType === 'company' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Société
            </button>
          </div>
          <input type="hidden" name="type" value={customerType} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">
              {customerType === 'company' ? 'Raison Sociale' : 'Nom Complet'}
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder={customerType === 'company' ? "Nom de l'entreprise..." : "Nom du client..."}
                className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
                required
              />
              <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
            </div>
            {state?.errors?.name && (
              <p className="text-xs font-bold text-rose-500">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="contact@example.com"
                className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
            </div>
            {state?.errors?.email && (
              <p className="text-xs font-bold text-rose-500">{state.errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-400">
              Téléphone
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="+216 -- --- ---"
                className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
              />
              <PhoneIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
            </div>
          </div>

          {/* ID Field (CIN or tax_id) */}
          {customerType === 'individual' ? (
            <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
              <label htmlFor="cin" className="text-xs font-black uppercase tracking-widest text-slate-400">
                Numéro CIN
              </label>
              <div className="relative">
                <input
                  id="cin"
                  name="cin"
                  type="text"
                  placeholder="0-------"
                  maxLength={8}
                  className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
                />
                <IdentificationIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
              </div>
            </div>
          ) : (
            <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
              <label htmlFor="tax_id" className="text-xs font-black uppercase tracking-widest text-slate-400">
                Matricule Fiscal (MF)
              </label>
              <div className="relative">
                <input
                  id="tax_id"
                  name="tax_id"
                  type="text"
                  placeholder="Enter MF..."
                  className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
                />
                <IdentificationIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
              </div>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-slate-400">
            Adresse de Facturation
          </label>
          <div className="relative">
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Ville, Code Postal, Pays..."
              className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
            />
            <MapPinIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-12 items-center rounded-2xl bg-slate-100  px-8 text-sm font-black uppercase tracking-widest text-slate-600  hover:bg-slate-200  transition-all active:scale-95"
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>

      {state?.message && (
        <p className="mt-2 text-sm font-bold text-rose-500 text-center">{state.message}</p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex h-12 items-center rounded-2xl bg-tunisia-red px-12 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-red-900/20 transition-all active:scale-95 ${
        pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
      }`}
    >
      {pending ? 'Saving...' : 'Create Client'}
    </button>
  );
}
