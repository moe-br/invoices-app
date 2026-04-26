import Form from '@/app/ui/devis/edit-form';
import Breadcrumbs from '@/app/ui/devis/breadcrumbs';
import { fetchQuoteById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [quote, customers] = await Promise.all([
        fetchQuoteById(id),
        fetchCustomers(),
    ]);
    if (!quote) {
        notFound()
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Devis', href: '/dashboard/devis' },
                    {
                        label: 'Éditer Devis',
                        href: `/dashboard/devis/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form quote={quote} customers={customers} />
        </main>
    );
}