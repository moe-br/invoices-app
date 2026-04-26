'use client';

import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteQuote } from '@/app/lib/quote-actions';
import { useState } from 'react';
import ConfirmationModal from '@/app/ui/confirmation-modal';

export function CreateQuote() {
  return (
    <Link
      href="/dashboard/devis/create"
      className="flex h-10 items-center rounded-lg bg-tunisia-red px-4 text-sm font-bold text-white transition-all hover:bg-red-700 shadow-lg shadow-red-900/20 active:scale-95"
    >
      <span className="hidden md:block uppercase tracking-wider">Nouveau Devis</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateQuote({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/devis/${id}/edit`}
      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 transition-colors"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function ViewQuote({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/devis/${id}/view`}
      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 transition-colors text-tunisia-blue"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

export function DeleteQuote({ id }: { id: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setModalOpen(true)}
        className="rounded-lg border border-slate-200 p-2 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => deleteQuote(id)}
        title="Supprimer le devis ?"
        message="Êtes-vous sûr de vouloir supprimer définitivement ce devis ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </>
  );
}
