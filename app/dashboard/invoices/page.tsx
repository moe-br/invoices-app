import { Suspense } from 'react';
import { fetchFilteredInvoices, fetchCustomers } from '@/app/lib/data';
import FinancialOperations from '@/app/ui/invoices/financial-operations';
import Form from '@/app/ui/invoices/create-form';
import { Metadata } from 'next';
import { outfit } from '@/app/ui/fonts';

export const metadata: Metadata = {
    title: 'Financial Operations | TuniBill',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    // Fetch data in parallel
    const [invoices, customers] = await Promise.all([
        fetchFilteredInvoices(query, currentPage),
        fetchCustomers(),
    ]);

    return (
        <main className={`${outfit.className} min-h-screen bg-white dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500`}>
            {/* Unified Split Layout */}
            <div className="flex flex-col xl:flex-row gap-8 h-full max-w-[1600px] mx-auto">
                
                {/* Left Side: Financial Operations List (60%) */}
                <div className="flex-1 xl:flex-[1.4] flex flex-col min-h-[600px]">
                    <FinancialOperations invoices={invoices} />
                </div>

                {/* Right Side: Invoice Issuance Form (40%) */}
                <div className="flex-1 xl:flex-1 flex flex-col">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden h-full shadow-sm dark:shadow-none transition-all">
                        <Form customers={customers} />
                    </div>
                </div>

            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden opacity-30 dark:opacity-60">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-tunisia-blue/5 dark:bg-tunisia-blue/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tunisia-red/5 dark:bg-tunisia-red/10 blur-[120px] rounded-full"></div>
            </div>
        </main>
    );
}