import Image from 'next/image';
import { outfit } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  CustomersTableType,
  FormattedCustomersTable,
} from '@/app/lib/definitions';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className={`w-full ${outfit.className}`}>
      <Search placeholder="Rechercher des clients..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="glass-card p-4 md:p-8 border-white/40 dark:border-white/5">
              <div className="md:hidden space-y-4">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="w-full rounded-[2rem] bg-white dark:bg-slate-950/40 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/5 pb-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={customer.image_url}
                            className="rounded-full ring-2 ring-white dark:ring-slate-800 shadow-md grayscale group-hover:grayscale-0 transition-all"
                            width={48}
                            height={48}
                            alt={`${customer.name}'s profile picture`}
                          />
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900"></div>
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white tracking-tight">{customer.name}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{customer.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Invoices</p>
                        <p className="font-black text-slate-900 dark:text-white transition-colors">{customer.total_invoices}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
                        <p className="font-black text-tunisia-red">{customer.total_pending}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Paid</p>
                        <p className="font-black text-green-500">{customer.total_paid}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full text-slate-900 dark:text-white md:table">
                <thead className="rounded-2xl text-left text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 dark:border-white/5">
                  <tr>
                    <th scope="col" className="px-6 py-8 sm:pl-10">Client</th>
                    <th scope="col" className="px-6 py-8">Factures</th>
                    <th scope="col" className="px-6 py-8">En Attente</th>
                    <th scope="col" className="px-6 py-8">Total Payé</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="w-full border-b border-slate-50 dark:border-white/5 transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/5 group cursor-default">
                      <td className="whitespace-nowrap py-6 pl-10 pr-6">
                        <div className="flex items-center gap-4">
                          <Image
                            src={customer.image_url}
                            className="rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-transparent group-hover:ring-white dark:group-hover:ring-slate-700 group-hover:shadow-md"
                            width={36}
                            height={36}
                            alt={`${customer.name}'s profile picture`}
                          />
                          <div>
                            <p className="font-bold text-slate-950 dark:text-white tracking-tight">{customer.name}</p>
                            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-6 text-sm font-black text-slate-600 dark:text-slate-400 tabular-nums">
                        {customer.total_invoices}
                      </td>
                      <td className="whitespace-nowrap px-6 py-6 text-sm font-black text-tunisia-red tabular-nums">
                        {customer.total_pending}
                      </td>
                      <td className="whitespace-nowrap px-6 py-6 text-sm font-black text-green-600 tabular-nums">
                        {customer.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
