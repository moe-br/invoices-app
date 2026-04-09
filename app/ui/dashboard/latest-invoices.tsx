import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { outfit } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  
  const formatInvoiceId = (id: string | number) => {
    const rawId = id.toString();
    if(/^\d+$/.test(rawId)) {
        return `Fac_${rawId.padStart(3, '0')}`;
    }
    return `Fac_${rawId.substring(0, 4).toUpperCase()}`;
  };

  return (
    <div className={`flex w-full flex-col md:col-span-4 ${outfit.className}`}>
      <h2 className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-slate-500 ml-2">
        Opérations Récentes
      </h2>
      <div className="flex grow flex-col justify-between relative p-1 rounded-[3rem] bg-gradient-to-br from-slate-200 dark:from-white/5 to-transparent">
        <div className="relative grow p-6 rounded-[2.9rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 flex flex-col justify-between transition-colors duration-500">
          <div className="space-y-1">
            {latestInvoices.map((invoice, i) => {
              return (
                <div
                  key={invoice.id}
                  className={clsx(
                    'flex flex-row items-center justify-between p-5 rounded-2xl transition-all duration-500 hover:bg-slate-50 dark:hover:bg-white/5 group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/5',
                  )}
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      {/* Premium Initials Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black text-xs transition-all duration-500 group-hover:bg-tunisia-red group-hover:border-tunisia-red group-hover:text-white group-hover:shadow-[0_0_20px_rgba(231,0,19,0.3)] shadow-inner">
                        {invoice.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                        {invoice.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                          <p className="text-[9px] font-black text-tunisia-red uppercase tracking-widest bg-tunisia-red/10 px-2 py-0.5 rounded-full border border-tunisia-red/20 opacity-80">
                              {formatInvoiceId(invoice.id)}
                          </p>
                          <p className="hidden text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:block tracking-wide">
                              {invoice.email}
                          </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white tabular-nums group-hover:text-tunisia-red transition-colors duration-500">
                      {invoice.amount}
                    </p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mt-1">Success</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-white/5 px-2">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="h-4 w-4 text-emerald-500 dark:text-emerald-400 animate-spin-slow opacity-60" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">Synchronisé</h3>
            </div>
            <button className="relative group/btn py-2 px-6 flex items-center justify-center">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-tunisia-blue group-hover:text-tunisia-red transition-colors">Tout Voir</span>
               <div className="absolute inset-x-0 -bottom-1 h-[1px] bg-tunisia-blue group-hover:bg-tunisia-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
