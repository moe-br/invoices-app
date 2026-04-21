import Link from 'next/link';
import { outfit } from '@/app/ui/fonts';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import clsx from 'clsx';

import Image from 'next/image';

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={clsx("w-full py-12 border-t border-slate-200", className, outfit.className)}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <TuniBillLogo showRed={true} />
          <p className="text-sm text-slate-500 font-medium">
            Facturation Intelligente pour la Tunisie.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            <Link href="/privacy" className="hover:text-tunisia-red transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-tunisia-red transition-colors">Conditions</Link>
            <Link href="/contact" className="hover:text-tunisia-red transition-colors">Contact</Link>
          </div>

          <div className="text-xs text-slate-400 uppercase tracking-[0.2em] font-black">
            &copy; {new Date().getFullYear()} TuniBill. Tous droits réservés.
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 transition-all hover:border-tunisia-red/30 group">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Powered by</span>
            <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <Image
                src="/logofooter1.png"
                alt="Medicane"
                width={120}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
