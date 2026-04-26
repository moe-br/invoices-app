import { fetchQuoteById, fetchCustomers, fetchBusinessProfile } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import QuoteTemplate from '@/app/ui/devis/quote-template';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/app/ui/devis/breadcrumbs';

import PrintButton from '@/app/ui/devis/print-button';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  // Fetch the quote, the customer list, and the user's business profile
  const [quote, customers, profile] = await Promise.all([
    fetchQuoteById(id),
    fetchCustomers(),
    fetchBusinessProfile(),
  ]);

  if (!quote) {
    notFound();
  }

  const customer = customers.find((c: any) => c.id === quote.customer_id);

  return (
    <main>
      <div className="no-print">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Devis', href: '/dashboard/devis' },
            {
              label: 'Détails du Devis',
              href: `/dashboard/devis/${id}/view`,
              active: true,
            },
          ]}
        />
      </div>
      <div className="flex justify-between items-center mb-8 no-print">
        <Link
          href="/dashboard/devis"
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-tunisia-red transition-colors"
        >
          <ArrowLeftIcon className="w-4" />
          <span>Retour à la liste</span>
        </Link>
        <PrintButton />
      </div>

      <QuoteTemplate 
        quote={quote} 
        customer={customer || { name: 'Unknown' }} 
        profile={profile}
      />
    </main>
  );
}
