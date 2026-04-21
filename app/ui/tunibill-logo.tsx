import { BanknotesIcon } from '@heroicons/react/24/outline';
import { outfit } from '@/app/ui/fonts';

export default function TuniBillLogo({ className = "", showRed = false }: { className?: string; showRed?: boolean }) {
  return (
    <div
      className={`${outfit.className} flex flex-row items-center leading-none ${className} gap-3`}
    >
      <div className="rounded-xl md:rounded-2xl bg-tunisia-red/10 p-2 border border-tunisia-red/20 shadow-sm">
        <BanknotesIcon className="h-6 w-6 md:h-7 md:w-7 text-tunisia-red" />
      </div>
      <div className="flex flex-col">
        <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-tight uppercase whitespace-nowrap">
          Tuni{showRed ? <span className="text-tunisia-red">Bill</span> : "Bill"}
        </p>
        <p className="text-[7px] md:text-[8px] font-black text-slate-400 tracking-[0.4em] uppercase ml-1 mt-0.5">Invoicing Premium</p>
      </div>
    </div>
  );
}
