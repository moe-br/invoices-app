import { outfit } from '@/app/ui/fonts';
import { fetchBusinessProfile } from '@/app/lib/data';
import { fetchNextInvoiceNumber } from '@/app/lib/data';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import NumberingSettings from '@/app/ui/configuration/numbering-settings';

export default async function Page() {
  const [profile, nextNumber] = await Promise.all([
    fetchBusinessProfile(),
    fetchNextInvoiceNumber()
  ]);

  if (!profile) return null;

  return (
    <div className={`w-full ${outfit.className}`}>
      <div className="flex w-full items-center justify-between mb-8 text-slate-900  transition-colors">
        <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
          <WrenchScrewdriverIcon className="w-8 h-8 text-tunisia-red" />
          Configuration
        </h1>
      </div>

      <div className="flex justify-center">
        {/* Numbering Section */}
        <div className="bg-white/50  backdrop-blur-3xl border border-slate-200/60  p-8 pt-10 rounded-[2.5rem] shadow-xl w-full max-w-2xl h-fit">
           <NumberingSettings initialSettings={{
             invoice_pattern: profile.invoice_pattern || '{seq}',
             invoice_digits: profile.invoice_digits || 4,
             invoice_reset: profile.invoice_reset || 'never',
             nextNumber: nextNumber
           }} />
        </div>
      </div>
    </div>
  );
}
