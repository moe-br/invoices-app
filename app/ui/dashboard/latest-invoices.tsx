import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { outfit, lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className={`flex w-full flex-col md:col-span-4 ${outfit.className}`}>
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-slate-400">
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between glass-card p-6 border-white/40 dark:border-white/5">
        <div className="bg-white/5 dark:bg-slate-950/30 rounded-3xl overflow-hidden border border-white/10 dark:border-white/5">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between p-4 transition-colors hover:bg-white/40 dark:hover:bg-white/5 group cursor-pointer',
                  {
                    'border-t border-white/10 dark:border-white/5': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <Image
                      src={invoice.image_url}
                      alt={`${invoice.name}'s profile picture`}
                      className="mr-4 rounded-full grayscale group-hover:grayscale-0 transition-all duration-300 ring-2 ring-white/50"
                      width={40}
                      height={40}
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white md:text-base tracking-tight transition-colors">
                      {invoice.name}
                    </p>
                    <p className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block tracking-wide transition-colors">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-black text-tunisia-red md:text-base tabular-nums">
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="flex items-center gap-2">
            <ArrowPathIcon className="h-4 w-4 text-slate-400 animate-spin-slow" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synced</h3>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-tunisia-blue hover:text-tunisia-red transition-colors">View All</button>
        </div>
      </div>
    </div>
  );
}
