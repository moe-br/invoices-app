import { Metadata } from 'next';
import CreateCustomerForm from '@/app/ui/customers/create-form';
import { outfit } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Add New Client | TuniBill',
};

export default function Page() {
  return (
    <main className={`max-w-4xl mx-auto w-full pt-4 pb-12 ${outfit.className}`}>
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors">
          New Client
        </h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
          Add a new strategic partner to your ecosystem
        </p>
      </div>

      <CreateCustomerForm />
    </main>
  );
}
