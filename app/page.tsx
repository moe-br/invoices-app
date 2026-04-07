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
        <div className="relative mt-16 w-full max-w-5xl md:max-w-6xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-tunisia-red to-tunisia-blue opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
          <div className="relative rounded-[3rem] glass-card p-1 border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden scale-[1.02] transform transition-transform group-hover:scale-[1.03]">
            <div className="rounded-[2.9rem] overflow-hidden bg-slate-900/80 backdrop-blur-3xl aspect-[16/10] relative object-cover">
              <Image
                src="/premium_hero_graphic.png"
                width={1024}
                height={1024}
                className="w-full h-full object-cover opacity-90"
                alt="TuniBill Financial Intelligence"
                priority
              />
              {/* Soft Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="relative w-full py-24 px-8 md:px-24 flex flex-col items-center z-10 bg-slate-950">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-tunisia-red mb-4">Fonctionnalités Clés</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Créé pour l'excellence financière</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card 1 */}
          <div className="bg-white/[0.03] border border-white/[0.05] p-10 rounded-[2rem] hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tunisia-red/10 blur-[50px] rounded-full group-hover:bg-tunisia-red/20 transition-all"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-tunisia-red to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Facturation Automatisée</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Générez des factures conformes (Matricule Fiscal, Timbre, TVA) en quelques clics. Fini les calculs Excel fastidieux.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/[0.03] border border-white/[0.05] p-10 rounded-[2rem] hover:bg-white/[0.05] transition-colors relative overflow-hidden group tracking-tight">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Multi-Tenancy Isolé</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Une architecture SaaS pure. Les données de vos clients sont strictement isolées avec un cryptage de niveau bancaire de bout en bout.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white/[0.03] border border-white/[0.05] p-10 rounded-[2rem] hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">B2B REST API & CSV</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Synchronisez instantanément vos bases de données via notre API tokenisée ou en déposant un simple fichier Excel (CSV).</p>
          </div>
        </div>
      </section>

      {/* How It Works Flow Section */}
      <section id="how-it-works" className="relative w-full py-24 px-8 md:px-24 flex flex-col items-center z-10 bg-slate-950 border-y border-white/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,0,18,0.05),transparent_70%)]"></div>
        <div className="text-center mb-16 relative">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-tunisia-red mb-4">Architecture</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Flux de données intelligent</h3>
        </div>
        
        <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Step 1: User Site */}
          <div className="flex-1 flex flex-col items-center group">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-tunisia-red/50 transition-all shadow-2xl">
              <svg className="w-10 h-10 text-slate-400 group-hover:text-tunisia-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9V3m0 9L3 21" /></svg>
            </div>
            <span className="text-white font-bold">Votre Site / CRM</span>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Source externe</p>
          </div>

          {/* Connector 1 */}
          <div className="hidden md:flex flex-col items-center text-tunisia-red/30">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-tunisia-red to-transparent"></div>
            <span className="text-[10px] font-black my-2">API / CSV</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-tunisia-red to-transparent"></div>
          </div>

          {/* Step 2: TuniBill Engine */}
          <div className="flex-1 flex flex-col items-center group">
            <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-tunisia-red/20 to-rose-600/10 border border-tunisia-red/30 flex items-center justify-center mb-4 shadow-[0_0_50px_-12px_rgba(217,0,18,0.3)] animate-pulse">
              <TuniBillLogo />
            </div>
            <span className="text-white font-bold">TuniBill Core</span>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Traitement intelligent</p>
          </div>

          {/* Connector 2 */}
          <div className="hidden md:flex flex-col items-center text-blue-500/30">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-tunisia-blue to-transparent"></div>
            <span className="text-[10px] font-black my-2">SQL / AUTH</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-tunisia-blue to-transparent"></div>
          </div>

          {/* Step 3: Database & Invoices */}
          <div className="flex-1 flex flex-col items-center group">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-tunisia-blue/50 transition-all shadow-2xl">
              <svg className="w-10 h-10 text-slate-400 group-hover:text-tunisia-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="text-white font-bold">Factures Finales</span>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Isolées en Base</p>
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section id="pricing" className="relative w-full py-24 px-8 md:px-24 flex flex-col items-center z-10 bg-slate-950">
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-tunisia-red mb-4">Tarification</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">Des plans simples pour évoluer</h3>
          <p className="text-slate-400">Passez à la vitesse supérieure. Aucun frais caché.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-center">

          {/* Starter Plan */}
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 shadow-xl">
            <h4 className="text-slate-300 font-bold uppercase tracking-wider text-xs mb-2">Starter</h4>
            <div className="flex items-baseline gap-2 mb-6"><span className="text-5xl font-black">0</span><span className="text-slate-500 font-semibold">TND / mo</span></div>
            <p className="text-sm text-slate-400 mb-8 pb-8 border-b border-white/5 h-16">Parfait pour les entrepreneurs individuels démarrant leur aventure.</p>
            <ul className="space-y-4 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Jusqu'à 50 clients</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Factures PDF basiques</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>Aucun accès API</li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors">Commencer Gratuitement</button>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-slate-900 border border-tunisia-red/50 rounded-3xl p-10 shadow-2xl shadow-tunisia-red/10 scale-105 z-10">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-tunisia-red to-orange-500 text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full">Le plus populaire</div>
            <h4 className="text-rose-400 font-bold uppercase tracking-wider text-xs mb-2">Professionnel</h4>
            <div className="flex items-baseline gap-2 mb-6"><span className="text-5xl font-black">29</span><span className="text-slate-500 font-semibold">TND / mo</span></div>
            <p className="text-sm text-slate-400 mb-8 pb-8 border-b border-white/5 h-16">Toute la puissance de TuniBill pour les PMEs ambitieuses.</p>
            <ul className="space-y-4 text-sm text-slate-200 mb-8">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-tunisia-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Clients & Factures Illimités</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-tunisia-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Accès au Hub Développeur API</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-tunisia-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Import CSV Simplifié</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-tunisia-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Analyses & Graphiques Avancés</li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold bg-tunisia-red hover:bg-rose-600 text-white shadow-lg shadow-red-500/20 transition-all">S'Abonner</button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 shadow-xl">
            <h4 className="text-slate-300 font-bold uppercase tracking-wider text-xs mb-2">Enterprise</h4>
            <div className="flex items-baseline gap-2 mb-6"><span className="text-4xl font-black">Sur Mesure</span></div>
            <p className="text-sm text-slate-400 mb-8 pb-8 border-b border-white/5 h-16">Déploiement dédié et infrastructure personnalisée.</p>
            <ul className="space-y-4 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Toutes les options du plan Pro</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Bases de données dédiées Neuon</li>
              <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Support SLA 24/7</li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors">Contacter les Ventes</button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="relative w-full py-24 px-8 md:px-24 flex flex-col items-center z-10 bg-slate-900/50 border-t border-b border-white/[0.02]">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-6">Besoin d'aide ?</h2>
            <p className="text-slate-400 mb-8 text-lg">Notre équipe de support basée à Tunis est là pour vous assister. Consultez nos FAQs ou envoyez-nous un message direct.</p>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <h5 className="font-bold text-white text-sm mb-1">Comment intégrer l'API ?</h5>
                <p className="text-xs text-slate-400">Rendez-vous dans vos paramètres, générez un Token, et attachez le en tant que Bearer Header sur toutes les requêtes.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <h5 className="font-bold text-white text-sm mb-1">Comment annuler mon abonnement ?</h5>
                <p className="text-xs text-slate-400">Vous pouvez suspendre ou supprimer vos données à tout moment via le Dashboard.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Contactez-nous</h3>
            <div className="space-y-4">
              <input type="email" placeholder="Votre Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tunisia-red transition-colors" />
              <textarea placeholder="Comment peut-on vous aider ?" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tunisia-red transition-colors"></textarea>
              <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Envoyer le message</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-8 py-16 md:px-24 bg-[#0a0a0f] border-t border-white/5 relative overflow-hidden">
        {/* Footer Top */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6 opacity-80"><TuniBillLogo /></div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-6">
              Simplifiez la gestion de votre entreprise et passez plus de temps à faire ce qui compte vraiment. Approuvé par des centaines de PMEs en Tunisie.
            </p>
            {/* Socials Placeholder */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"><span className="text-xs">𝕏</span></div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"><span className="text-xs font-serif">In</span></div>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Produit</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Fonctionnalités</li>
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Tarifs</li>
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Guide API</li>
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Témoignages</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Légal</h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Conditions Générales</li>
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Confidentialité</li>
              <li className="hover:text-tunisia-red cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            &copy; {new Date().getFullYear()} TuniBill. Tous droits réservés.
          </p>

          {/* Powered by Medicane Badge */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-white/5 rounded-full shadow-lg group hover:border-indigo-500/30 transition-all cursor-pointer">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Powered by</span>
            <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image src="/logofooter2.png" alt="Medicane Logo" width={100} height={30} className="w-auto h-6" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
