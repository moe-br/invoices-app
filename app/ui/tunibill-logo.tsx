import { BanknotesIcon } from '@heroicons/react/24/outline';
import { outfit } from '@/app/ui/fonts';

export default function TuniBillLogo() {
  return (
    <div
      className={`${outfit.className} flex flex-row items-center leading-none text-white gap-2`}
    >
      <div className="rounded-xl bg-white/20 p-2 border border-white/30 shadow-inner">
        <BanknotesIcon className="h-10 w-10 text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-[32px] font-black tracking-tighter leading-tight uppercase">Tuni<span className="text-tunisia-red">Bill</span></p>
        <p className="text-[8px] font-black tracking-[0.4em] uppercase opacity-60 ml-1">Premium Invoicing</p>
      </div>
    </div>
  );
}
