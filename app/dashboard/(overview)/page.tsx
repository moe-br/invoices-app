import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { outfit } from '@/app/ui/fonts';
import { SparklesIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default async function Page() {
    const now = new Date();
    const day = now.toLocaleDateString('fr-FR', { weekday: 'long' });
    const date = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const today = `${day.charAt(0).toUpperCase() + day.slice(1)}, ${date}`;

    return (
        <main className={`relative ${outfit.className}`}>
            {/* Premium Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tunisia-red/5 blur-[120px] rounded-full -z-10 pointer-events-none opacity-60 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tunisia-blue/5 blur-[100px] rounded-full -z-10 pointer-events-none opacity-40"></div>

            {/* Welcome Hub Section */}
            <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between mb-10 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5 bg-gradient-to-r from-tunisia-red to-rose-600 bg-clip-text text-transparent">
                        <SparklesIcon className="w-3.5 h-3.5 text-tunisia-red" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Premium Dashboard</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter leading-tight">
                        Bon retour, <span className="text-slate-400">Moez</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-slate-400">
                        <CalendarIcon className="w-3 h-3" />
                        <p className="text-[9px] font-black uppercase tracking-widest italic opacity-80">{today}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-2xl p-1.5 rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-100/30">
                    <CreateCustomer />
                    <CreateInvoice />
                </div>
            </div>

            {/* Metrics Ribbon Section */}
            <div className="mb-12 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-tunisia-red rounded-full"></div>
                <div className="pl-6">
                    <Suspense fallback={<CardsSkeleton />}>
                        <CardWrapper />
                    </Suspense>
                </div>
            </div>

            {/* Analytics & Operations Section */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-8">
                <div className="md:col-span-4 lg:col-span-5">
                    <Suspense fallback={<RevenueChartSkeleton />}>
                        <RevenueChart />
                    </Suspense>
                </div>
                <div className="md:col-span-4 lg:col-span-3">
                    <Suspense fallback={<LatestInvoicesSkeleton />}>
                        <LatestInvoices />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}