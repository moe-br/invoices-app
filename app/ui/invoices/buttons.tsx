import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-tunisia-red px-4 text-sm font-bold text-white transition-all hover:bg-red-700 shadow-lg shadow-red-900/20 active:scale-95"
    >
      <span className="hidden md:block uppercase tracking-wider">New Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 transition-colors"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function ViewInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/view`}
      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 transition-colors text-tunisia-blue"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-lg border border-slate-200 p-2 hover:bg-red-50 hover:text-red-600 transition-colors">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
