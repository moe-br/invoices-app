import Form from '@/app/ui/devis/create-form';
import Breadcrumbs from '@/app/ui/devis/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Devis', href: '/dashboard/devis' },
                    {
                        label: 'Créer Devis',
                        href: '/dashboard/devis/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}