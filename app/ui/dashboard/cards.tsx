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
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
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
    <div className={`relative group p-8 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:scale-[1.02] hover:border-tunisia-red/20 ${outfit.className}`}>
      {/* Radiant Background Glow */}
      <div className={clsx(
        "absolute -right-10 -top-10 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700",
        {
          'bg-tunisia-red/20': type === 'collected' || type === 'invoices',
          'bg-tunisia-blue/20': type === 'pending' || type === 'customers',
        }
      )}></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={clsx(
          "rounded-2xl p-4 border transition-all duration-500",
          {
            'bg-tunisia-red/10 border-tunisia-red/20 text-tunisia-red': type === 'collected' || type === 'invoices',
            'bg-tunisia-blue/10 border-tunisia-blue/20 text-tunisia-blue': type === 'pending' || type === 'customers',
          }
        )}>
          {Icon ? <Icon className="h-7 w-7" /> : null}
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600">Live</span>
           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{title}</h3>
        <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 italic">
           <ArrowTrendingUpIcon className="w-3 h-3 text-emerald-500" />
           <span>+12.5% vs dernier mois</span>
        </div>
      </div>
    </div>
  );
}
