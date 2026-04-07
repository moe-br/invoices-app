import TuniBillLogo from '@/app/ui/tunibill-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { outfit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className={`flex min-h-screen flex-col bg-slate-950 text-white ${outfit.className} relative overflow-hidden`}>
      {/* Soft, Fluid Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-gradient-to-b from-tunisia-red/20 to-rose-500/10 blur-[120px] -z-20 rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-tunisia-blue/20 to-blue-400/10 blur-[140px] -z-20 rounded-full"></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] -z-20 rounded-full mix-blend-screen"></div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-6 md:px-16 md:py-8 z-50 bg-slate-950/20 backdrop-blur-3xl border-b border-white/5">
        <TuniBillLogo />
        <Link
          href="/login"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-tunisia-red px-8 text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.05] active:scale-95 shadow-xl shadow-red-500/20"
        >
          Se Connecter
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </header>

      {/* Hero Content */}
      <div className="flex grow flex-col items-center text-center gap-16 p-8 md:p-24 pt-56 relative z-10">
        <div className="max-w-[900px] flex flex-col items-center space-y-10">
          <h1 className="text-6xl md:text-9xl font-black leading-[1.05] tracking-tighter">
            Facturation <span className="text-transparent bg-clip-text bg-gradient-to-br from-tunisia-red to-rose-400 drop-shadow-sm">Intelligente</span> <br className="hidden md:block" /> pour la Tunisie.
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-[700px]">
            La plateforme SaaS premium pour les entreprises tunisiennes. Gérez vos factures, vos clients et votre conformité légale avec élégance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-r from-tunisia-red to-rose-600 px-10 py-5 text-sm font-bold tracking-wider shadow-2xl shadow-red-500/30 transition-all hover:scale-[1.03] hover:shadow-red-500/50 hover:from-rose-600 hover:to-tunisia-red active:scale-95"
            >
              <span>Démarrer avec TuniBill</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-10 py-5 text-sm font-bold tracking-wider backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/20 active:scale-95"
            >
              Voir la Démo 👀
            </Link>
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="relative mt-16 w-full max-w-5xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-tunisia-red to-tunisia-blue opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
          <div className="relative rounded-[3rem] glass-card p-1 border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden scale-[1.02] transform transition-transform group-hover:scale-[1.03]">
            <div className="rounded-[2.9rem] overflow-hidden bg-slate-900/80 backdrop-blur-3xl aspect-[16/10] relative">
              <Image
                src="/tunibill_desktop_hero.png"
                width={1400}
                height={875}
                className="hidden md:block w-full h-full object-cover opacity-90"
                alt="TuniBill Dashboard Preview"
                priority
              />
              <Image
                src="/tunibill_mobile_hero.png"
                width={600}
                height={900}
                className="block md:hidden w-full h-full object-cover opacity-90"
                alt="TuniBill Mobile Preview"
              />
              {/* Soft Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="p-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 opacity-40">
        &copy; {new Date().getFullYear()} TuniBill &bull; Made with excellence for Tunisia
      </footer>
    </main>
  );
}
