'use client';

import { outfit } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  FormattedCustomersTable,
} from '@/app/lib/definitions';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteCustomer } from '@/app/lib/actions';
import { useState } from 'react';
import ConfirmationModal from '@/app/ui/confirmation-modal';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  return (
    <div className={`w-full ${outfit.className}`}>
      <Search placeholder="Rechercher des clients..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="glass-card p-4 md:p-8 border-white/40 ">
              <div className="md:hidden space-y-4">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="w-full rounded-[2rem] bg-white  p-6 shadow-xl shadow-slate-200/50  border border-slate-100  group"
                  >
                    <div className="flex items-center justify-between border-b border-slate-50  pb-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {/* Initials Avatar */}
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tunisia-red text-white font-black text-lg shadow-md ring-2 ring-white  transition-all group-hover:scale-105">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <p className="font-black text-slate-900  tracking-tight">{customer.name}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{customer.email}</p>
                          {customer.phone && (
                            <p className="text-[10px] font-bold text-tunisia-red mt-1 tracking-wider">{customer.phone}</p>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setSelectedCustomerId(customer.id);
                          setModalOpen(true);
                        }}
                        className="p-3 bg-rose-50  text-rose-500 rounded-2xl hover:bg-rose-100  transition-all active:scale-90"
                        title="Supprimer le client"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Factures</p>
                        <p className="font-black text-slate-900  transition-colors">{customer.total_invoices}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">En Attente</p>
                        <p className="font-black text-tunisia-red">{customer.total_pending}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payé</p>
                        <p className="font-black text-green-500">{customer.total_paid}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-slate-900  md:table">
                <thead className="rounded-2xl text-left text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-8 sm:pl-10">Client</th>
                    <th scope="col" className="px-6 py-8">Factures</th>
                    <th scope="col" className="px-6 py-8">En Attente</th>
                    <th scope="col" className="px-6 py-8">Total Payé</th>
                    <th scope="col" className="relative py-8 pl-6 pr-10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="w-full border-b border-slate-50  transition-all duration-300 hover:bg-white/60  group cursor-default">
                      <td className="whitespace-nowrap py-6 pl-10 pr-6">
                        <div className="flex items-center gap-4">
                          {/* Initials Avatar */}
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100  text-slate-900  font-black text-xs transition-all duration-500 group-hover:bg-tunisia-red group-hover:text-white group-hover:shadow-md">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-950  tracking-tight">{customer.name}</p>
                            <p className="text-xs font-medium text-slate-400 ">{customer.email}</p>
                            {customer.phone && (
                              <p className="text-[10px] font-bold text-tunisia-red mt-1">{customer.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-6 text-sm font-black text-slate-600  tabular-nums">
                        {customer.total_invoices}
                      </td>
                      <td className="whitespace-nowrap px-6 py-6 text-sm font-black text-tunisia-red tabular-nums">
                        {customer.total_pending}
                      </td>
                      <td className="whitespace-nowrap px-6 py-6 text-sm font-black text-green-600 tabular-nums">
                        {customer.total_paid}
                      </td>
                      <td className="whitespace-nowrap py-6 pl-6 pr-10 text-right">
                        <div className="flex justify-end gap-3 transition-all duration-300">
                          <button 
                            onClick={() => {
                              setSelectedCustomerId(customer.id);
                              setModalOpen(true);
                            }}
                            className="p-2.5 bg-rose-50  border border-rose-100  rounded-xl text-rose-500 hover:text-white hover:bg-rose-500 transition-all shadow-sm  active:scale-90"
                            title="Supprimer le client"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (selectedCustomerId) {
            deleteCustomer(selectedCustomerId);
            setSelectedCustomerId(null);
          }
        }}
        title="Supprimer le client ?"
        message="Êtes-vous sûr de vouloir supprimer ce client ? Cette action supprimera également toutes ses informations de contact."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
}
