'use client';

import { outfit, inter } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';


export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );


  return (
    <form action={formAction} className={`${outfit.className} space-y-6`}>
      <div className="flex-1">
        <div className="w-full">
          <div>
            <label
              className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-300"
              htmlFor="email"
            >
              Email Professionnel
            </label>
            <div className="relative group">
              <input
                className="peer block w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red/50 focus:bg-white/10 focus:ring-4 focus:ring-tunisia-red/10"
                id="email"
                type="email"
                name="email"
                placeholder="nom@entreprise.tn"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors peer-focus:text-tunisia-red" />
            </div>
          </div>
          <div className="mt-6">
            <label
              className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-slate-300"
              htmlFor="password"
            >
              Mot de Passe
            </label>
            <div className="relative group">
              <input
                className="peer block w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-tunisia-red/50 focus:bg-white/10 focus:ring-4 focus:ring-tunisia-red/10"
                id="password"
                type="password"
                name="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors peer-focus:text-tunisia-red" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        
        <button 
          className="group relative mt-10 flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-tunisia-red px-8 font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-red-500/20"
          aria-disabled={isPending}
          disabled={isPending}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isPending ? 'Connexion...' : 'Se Connecter'}
            {!isPending && <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 animate-shimmer"></div>
        </button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-red-500 border border-red-500/20 mt-4 w-full animate-shake">
              <ExclamationCircleIcon className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-wider">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
