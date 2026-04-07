import { BanknotesIcon } from '@heroicons/react/24/outline';
import { outfit } from '@/app/ui/fonts';

export default function TuniBillLogo({ className = "text-white", showRed = false }: { className?: string; showRed?: boolean }) {
  return (
    <div
      className={`${outfit.className} flex flex-row items-center leading-none ${className} gap-3 group transition-transform hover:scale-[1.02]`}
    >
      <div className="rounded-xl md:rounded-2xl bg-white/20 p-2 border border-white/30 shadow-inner group-hover:bg-white/30 transition-colors">
        <BanknotesIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-xl md:text-2xl font-black tracking-tighter leading-tight uppercase whitespace-nowrap">
          Tuni{showRed ? <span className="text-tunisia-red">Bill</span> : "Bill"}
        </p>
        <p className="text-[7px] md:text-[8px] font-black tracking-[0.4em] uppercase opacity-70 ml-1 mt-0.5">Invoicing Premium</p>
      </div>
    </div>
  );
}
