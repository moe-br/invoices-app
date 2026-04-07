import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { outfit } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Clients | TuniBill',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main className={`w-full ${outfit.className}`}>
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Clients</h1>
      </div>
      <CustomersTable customers={customers} />
    </main>
  );
}
