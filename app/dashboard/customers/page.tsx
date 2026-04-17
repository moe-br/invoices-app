import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { outfit } from '@/app/ui/fonts';
import CsvImporter from '@/app/ui/customers/csv-importer';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import DeleteAllCustomersButton from '@/app/ui/customers/delete-all-button';

export const metadata: Metadata = {
  title: 'Clients | TuniBill',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main className={`w-full ${outfit.className}`}>
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase transition-colors">Clients</h1>
        <div className="flex items-center gap-2">
          <CreateCustomer />
          <DeleteAllCustomersButton />
        </div>
      </div>
      <CustomersTable customers={customers} />
    </main>
  );
}
