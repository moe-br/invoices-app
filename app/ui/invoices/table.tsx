import Image from 'next/image';
import { outfit } from '@/app/ui/fonts';
import { UpdateInvoice, DeleteInvoice, ViewInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className={`mt-6 flow-root ${outfit.className}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="glass-card p-4 md:p-8 border-white/40 dark:border-white/5">
          <div className="md:hidden space-y-4">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="w-full rounded-[2rem] bg-white dark:bg-slate-950/40 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 transition-transform active:scale-95"
              >
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-white/5 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full ring-2 ring-white dark:ring-slate-800 shadow-md grayscale group-hover:grayscale-0 transition-all"
                        width={48}
                        height={48}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900"></div>
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white tracking-tight">{invoice.name}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{invoice.email}</p>
                    </div>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-tunisia-blue dark:text-white tracking-tighter">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {formatDateToLocal(invoice.date)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 text-tunisia-blue dark:text-slate-400">
                    <ViewInvoice id={invoice.id} />
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-slate-900 dark:text-white md:table">
            <thead className="rounded-2xl text-left text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 dark:border-white/5">
              <tr>
                <th scope="col" className="px-6 py-8 sm:pl-10">Client</th>
                <th scope="col" className="px-6 py-8">Facture</th>
                <th scope="col" className="px-6 py-8">Émis le</th>
                <th scope="col" className="px-6 py-8">État</th>
                <th scope="col" className="relative py-8 pl-6 pr-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b border-slate-50 dark:border-white/5 transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/5 group cursor-default"
                >
                  <td className="whitespace-nowrap py-6 pl-10 pr-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 ring-2 ring-transparent group-hover:ring-white dark:group-hover:ring-slate-700 group-hover:shadow-md"
                        width={36}
                        height={36}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <div>
                        <p className="font-bold text-slate-950 dark:text-white tracking-tight">{invoice.name}</p>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{invoice.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-6 font-black text-slate-900 dark:text-tunisia-red md:text-tunisia-red tabular-nums">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest tabular-nums">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-6">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-6 pl-6 pr-10">
                    <div className="flex justify-end gap-3 opacity-40 dark:opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <ViewInvoice id={invoice.id} />
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
