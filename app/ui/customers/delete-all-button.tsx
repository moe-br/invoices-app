'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteAllCustomers } from '@/app/lib/actions';
import { useState } from 'react';
import ConfirmationModal from '@/app/ui/confirmation-modal';

export default function DeleteAllCustomersButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAllCustomers();
    } catch (error) {
      console.error('Failed to delete all customers:', error);
    } finally {
      setIsDeleting(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex h-10 items-center rounded-lg bg-red-50 px-4 text-sm font-bold text-red-600 transition-all hover:bg-red-100   active:scale-95 border border-red-200 "
      >
        <span className="hidden md:block uppercase tracking-wider">Tout Supprimer</span>
        <TrashIcon className="h-5 md:ml-4" />
      </button>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer tous les Clients ?"
        message="Êtes-vous sûr de vouloir supprimer définitivement tous les clients et leurs factures associées ? Cette action est irréversible."
        confirmLabel={isDeleting ? 'Suppression...' : 'Tout Supprimer'}
        cancelLabel="Annuler"
      />
    </>
  );
}
