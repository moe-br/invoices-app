import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';




import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { CreateCustomer } from '@/app/ui/customers/buttons';

export default async function Page() {

    return (
        <main>
            <div className="flex w-full items-center justify-between mb-8">
                <h1 className={`${lusitana.className} text-xl md:text-2xl text-slate-900 dark:text-white transition-colors uppercase font-black tracking-tight`}>
                    Dashboard
                </h1>
                <div className="flex items-center gap-3">
                    <CreateCustomer />
                    <CreateInvoice />
                </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}