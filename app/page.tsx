import TuniBillLogo from '@/app/ui/tunibill-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { outfit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className={`flex min-h-screen flex-col bg-slate-950 text-white ${outfit.className} overflow-hidden`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-tunisia-red/10 blur-[150px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-tunisia-blue/20 blur-[150px] -z-10 rounded-full"></div>

      {/* Header / Nav */}
      <header className="flex items-center justify-between p-8 md:p-12 relative z-20">
        <div className="scale-110">
          <TuniBillLogo />
        </div>
        <Link
          href="/login"
          className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-white/10 border border-white/10"
        >
          <span>Se Connecter</span>
          <ArrowRightIcon className="w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </header>

      {/* Hero Content */}
      <div className="flex grow flex-col gap-12 p-8 md:p-24 relative z-10">
        <div className="max-w-[800px] space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="flex h-2 w-2 rounded-full bg-tunisia-red animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Nouveau: Calcul de Timbre Fiscaux 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
            Facturation <span className="text-tunisia-red">Intelligente</span> pour la Tunisie.
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed max-w-[600px]">
            La plateforme SaaS premium pour les entreprises tunisiennes. Gérez vos factures, vos clients et votre conformité légale avec élégance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Link
              href="/login"
              className="flex items-center justify-center gap-4 rounded-[2rem] bg-tunisia-red px-10 py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-red-500/20 transition-all hover:scale-[1.05] active:scale-95"
            >
              <span>Démarrer TuniBill</span>
              <ArrowRightIcon className="w-5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-white/10"
            >
              Voir Démo
            </Link>
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="relative mt-12 w-full rounded-[3rem] glass-card p-1 border-white/10 shadow-2xl overflow-hidden scale-[1.02] transform translate-y-6">
          <div className="rounded-[2.9rem] overflow-hidden bg-slate-900/50 backdrop-blur-3xl">
            <Image
              src="/hero-desktop.png"
              width={1400}
              height={800}
              className="hidden md:block opacity-80"
              alt="TuniBill Dashboard Preview"
              priority
            />
            <Image
              src="/hero-mobile.png"
              width={600}
              height={900}
              className="block md:hidden opacity-80"
              alt="TuniBill Mobile Preview"
            />
          </div>
        </div>
      </div>
      
      <footer className="p-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 opacity-40">
        &copy; {new Date().getFullYear()} TuniBill &bull; Made with excellence for Tunisia
      </footer>
    </main>
  );
}
