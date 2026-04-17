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
        className="flex h-10 items-center rounded-lg bg-red-50 px-4 text-sm font-bold text-red-600 transition-all hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 active:scale-95 border border-red-200 dark:border-red-900/30"
      >
        <span className="hidden md:block uppercase tracking-wider">Delete All</span>
        <TrashIcon className="h-5 md:ml-4" />
      </button>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete All Clients?"
        message="Are you sure you want to permanently delete all clients and their associated invoices? This action cannot be undone."
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete All'}
        cancelLabel="Cancel"
      />
    </>
  );
}
