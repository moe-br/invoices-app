'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-tunisia-red px-4 text-sm font-bold text-white transition-all hover:bg-red-700 shadow-lg shadow-red-900/20 active:scale-95"
    >
      <span className="hidden md:block uppercase tracking-wider">Nouveau Client</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
