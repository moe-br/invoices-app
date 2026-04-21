import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { outfit, lusitana } from '@/app/ui/fonts';
import clsx from 'clsx';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};
import { fetchCardData } from '@/app/lib/data';


export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar snap-x no-scrollbar">
      <div className="snap-center min-w-[240px] flex-1">
        <Card title="Encaissé" value={totalPaidInvoices} type="collected" />
      </div>
      <div className="snap-center min-w-[240px] flex-1">
        <Card title="En attente" value={totalPendingInvoices} type="pending" />
      </div>
      <div className="snap-center min-w-[240px] flex-1">
        <Card title="Total Factures" value={numberOfInvoices} type="invoices" />
      </div>
      <div className="snap-center min-w-[240px] flex-1">
        <Card title="Total Clients" value={numberOfCustomers} type="customers" />
      </div>
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className={`relative group p-6 rounded-[2rem] bg-white/40  backdrop-blur-3xl border border-slate-200  overflow-hidden transition-all hover:scale-[1.02] hover:border-tunisia-red/20 ${outfit.className}`}>
      {/* Radiant Background Glow */}
      <div className={clsx(
        "absolute -right-8 -top-8 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700",
        {
          'bg-tunisia-red/20': type === 'collected' || type === 'invoices',
          'bg-tunisia-blue/20': type === 'pending' || type === 'customers',
        }
      )}></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={clsx(
          "rounded-xl p-3 border transition-all duration-500",
          {
            'bg-tunisia-red/10 border-tunisia-red/20 text-tunisia-red': type === 'collected' || type === 'invoices',
            'bg-tunisia-blue/10 border-tunisia-blue/20 text-tunisia-blue': type === 'pending' || type === 'customers',
          }
        )}>
          {Icon ? <Icon className="h-6 w-6" /> : null}
        </div>
        <div className="flex items-center gap-2 opacity-60">
           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ">Live</span>
           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1.5">{title}</h3>
        <p className="text-3xl font-black text-slate-900  tracking-tight">
          {value}
        </p>
        <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-slate-400  italic">
           <ArrowTrendingUpIcon className="w-2.5 h-2.5 text-emerald-500" />
           <span>+12.5%</span>
        </div>
      </div>
    </div>
  );
}
