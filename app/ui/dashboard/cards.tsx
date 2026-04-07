import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { outfit, lusitana } from '@/app/ui/fonts';

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
    <div className={`glass-card p-6 border-white/40 ${outfit.className}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-tunisia-red/10 to-transparent p-3 border border-tunisia-red/5">
          {Icon ? <Icon className="h-6 w-6 text-tunisia-red" /> : null}
        </div>
        <div className="h-2 w-2 rounded-full bg-slate-200 animate-pulse"></div>
      </div>
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</h3>
        <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
