import { fetchInvoiceById, fetchCustomers, fetchBusinessProfile } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import InvoiceTemplate from '@/app/ui/invoices/invoice-template';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

import PrintButton from '@/app/ui/invoices/print-button';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  // Fetch the invoice, the customer list, and the user's business profile
  const [invoice, customers, profile] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    fetchBusinessProfile(),
  ]);

  if (!invoice) {
    notFound();
  }

  const customer = customers.find((c: any) => c.id === invoice.customer_id);

  return (
    <main>
      <div className="no-print">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'View Invoice',
              href: `/dashboard/invoices/${id}/view`,
              active: true,
            },
          ]}
        />
      </div>
      <div className="flex justify-between items-center mb-8 no-print">
        <Link
          href="/dashboard/invoices"
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-tunisia-red transition-colors"
        >
          <ArrowLeftIcon className="w-4" />
          <span>Back to list</span>
        </Link>
        <PrintButton />
      </div>

      <InvoiceTemplate 
        invoice={invoice} 
        customer={customer || { name: 'Unknown' }} 
        profile={profile}
      />
    </main>
  );
}
