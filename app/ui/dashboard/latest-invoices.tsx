import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { outfit } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  const formatInvoiceId = (id: string | number) => {
    const rawId = id.toString();
    if (/^\d+$/.test(rawId)) {
      return `Fac_${rawId.padStart(3, '0')}`;
    }
    return `Fac_${rawId.substring(0, 4).toUpperCase()}`;
  };

  return (
    <div className={`flex w-full flex-col md:col-span-4 ${outfit.className}`}>
      <h2 className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-slate-500 ml-2">
        Opérations Récentes
      </h2>
      <div className="flex grow flex-col justify-between relative p-1 rounded-[2rem] bg-gradient-to-br from-slate-200  to-transparent">
        <div className="relative grow p-5 rounded-[1.9rem] bg-white/40  backdrop-blur-3xl border border-slate-200  flex flex-col justify-between transition-colors duration-500">
          <div className="space-y-0.5">
            {latestInvoices.map((invoice, i) => {
              return (
                <Link
                  key={invoice.id}
                  href={`/dashboard/invoices/${invoice.id}/view`}
                  className={clsx(
                    'flex flex-row items-center justify-between p-4 rounded-xl transition-all duration-500 hover:bg-slate-50  group cursor-pointer border border-transparent hover:border-slate-200'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Premium Initials Avatar */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100  border border-slate-200  text-slate-900  font-black text-[10px] transition-all duration-500 group-hover:bg-tunisia-red group-hover:border-tunisia-red group-hover:text-white group-hover:shadow-[0_0_15px_rgba(231,0,19,0.25)] shadow-inner">
                        {invoice.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-black text-slate-900  tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                        {invoice.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[8px] font-black text-tunisia-red uppercase tracking-widest bg-tunisia-red/10 px-1.5 py-0.5 rounded-full border border-tunisia-red/20 opacity-80">
                          {invoice.formatted_number || formatInvoiceId(invoice.invoice_number || invoice.id)}
                        </p>
                        <p className="hidden text-[9px] font-medium text-slate-500  sm:block tracking-wide opacity-60">
                          {invoice.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black text-slate-900  tabular-nums group-hover:text-tunisia-red transition-colors duration-500">
                      {invoice.amount}
                    </p>
                    <p className="text-[7px] font-black uppercase tracking-widest text-slate-400  mt-0.5">Succès</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200  px-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5  border border-emerald-500/10  rounded-full group/sync transition-all hover:bg-emerald-500/10 ">
              <div className="relative">
                <ArrowPathIcon className="h-3 w-3 text-emerald-500  animate-spin-slow" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20 scale-150" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 ">Synchronisé</span>
            </div>

            <Link href="/dashboard/customers">
              <button className="relative group/btn py-2 px-6 flex items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-tunisia-blue group-hover:text-tunisia-red transition-colors">
                  Tout Voir
                </span>
                <div className="absolute inset-x-0 -bottom-1 h-[1px] bg-tunisia-blue group-hover:bg-tunisia-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
