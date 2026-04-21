'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCustomer } from '@/app/lib/actions';
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

  return (
    <form action={dispatch} className="space-y-6">
      <div className="glass-card p-8 border-white/20  space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter client name"
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
                placeholder="Enter email address"
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
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter phone number"
                className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
              />
              <PhoneIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
            </div>
          </div>

          {/* Tax ID */}
          <div className="space-y-2">
            <label htmlFor="tax_id" className="text-xs font-black uppercase tracking-widest text-slate-400">
              Tax ID / Matricule Fiscal
            </label>
            <div className="relative">
              <input
                id="tax_id"
                name="tax_id"
                type="text"
                placeholder="Enter Tax ID"
                className="peer block w-full rounded-2xl border-none bg-slate-50  py-4 pl-12 text-sm font-bold text-slate-900  placeholder:text-slate-400 focus:ring-2 focus:ring-tunisia-red transition-all"
              />
              <IdentificationIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 peer-focus:text-tunisia-red" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-slate-400">
            Billing Address
          </label>
          <div className="relative">
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter full address"
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
