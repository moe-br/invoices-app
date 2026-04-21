"use client";

import React, { useEffect, useState } from 'react';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  CloudArrowUpIcon, 
  BeakerIcon, 
  SparklesIcon, 
  GlobeAltIcon,
  CreditCardIcon,
  FingerPrintIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { outfit } from '@/app/ui/fonts';
import Threads from '@/components/Threads';
import Footer from '@/app/ui/footer';
import { Show, UserButton } from '@clerk/nextjs';

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col text-slate-900 ${outfit.className} relative overflow-hidden bg-white selection:bg-tunisia-red selection:text-white`}>
      {/* Immersive Threads Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <Threads 
          amplitude={1.2} 
          distance={0.6} 
          enableMouseInteraction={true} 
          color={[0.9, 0, 0.07]} 
        />
      </div>

      {/* Radiant Glow Atmosphere */}
      <div className="fixed top-[-15%] right-[-10%] w-[60%] h-[60%] bg-tunisia-red/5 blur-[150px] -z-10 rounded-full animate-slow-pulse"></div>
      <div className="fixed bottom-[10%] left-[-15%] w-[50%] h-[50%] bg-tunisia-blue/5 blur-[150px] -z-10 rounded-full"></div>

      {/* Premium Header */}
      <header className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 md:px-16 md:py-5 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-3xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="flex items-center gap-12">
          <TuniBillLogo showRed={true} />
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="#features" className="hover:text-tunisia-red transition-colors">Produit</Link>
            <Link href="#ecosystem" className="hover:text-tunisia-red transition-colors">Écosystème</Link>
            <Link href="#security" className="hover:text-tunisia-red transition-colors">Sécurité</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Show when="signed-in">
            <div className="flex items-center gap-4 md:gap-6">
              <Link 
                href="/dashboard"
                className="group flex items-center gap-3 rounded-full bg-slate-100 border border-slate-200 px-8 py-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md transition-all hover:bg-slate-200 hover:shadow-2xl hover:shadow-slate-200/20"
              >
                Dashboard
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border-2 border-slate-200 shadow-xl" } }} />
            </div>
          </Show>
          <Show when="signed-out">
            <Link 
              href="/sign-in"
              className="group flex items-center gap-3 rounded-full bg-tunisia-red px-8 py-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-rose-600 shadow-2xl shadow-red-500/20 active:scale-95"
            >
              Sign In
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Show>
        </div>
      </header>

      {/* Hero Section: The "Perfect" First Impression */}
      <section className="relative pt-64 pb-40 px-6 md:px-12 flex flex-col items-center text-center z-10">
        <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 border border-slate-200 mb-12 animate-float">
          <SparklesIcon className="w-4 h-4 text-tunisia-red" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">The Gold Standard of Tunisian Billing</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-[-0.04em] max-w-7xl mb-12 text-center text-slate-900">
          <span className="block opacity-30">L'EXCELLENCE DE</span>
          <span className="relative inline-block">
             LA GESTION
             <svg className="absolute -bottom-6 left-0 w-full h-4 text-tunisia-red opacity-80" viewBox="0 0 400 20" preserveAspectRatio="none">
                <path d="M0 10 Q 100 0, 200 10 T 400 10" stroke="currentColor" fill="none" strokeWidth="6" />
             </svg>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mb-16 animate-in slide-in-from-bottom-8 duration-1000">
          Transformez votre complexité financière en un mécanisme de <span className="text-slate-900 italic font-black">haute précision</span>. L'outil ultime pour les leaders de l'économie tunisienne.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Show when="signed-out">
            <Link href="/sign-up" className="relative group px-12 py-5 bg-white text-slate-950 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 overflow-hidden text-sm">
              <span className="relative z-10">Start the Journey</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-tunisia-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="relative group px-12 py-5 bg-white text-slate-950 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 overflow-hidden text-sm">
              <span className="relative z-10">Go to Dashboard</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-tunisia-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          </Show>
          <Link href="#features" className="px-12 py-5 bg-slate-100 border border-slate-200 rounded-[1.5rem] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all text-sm">
            Explore TuniBill
          </Link>
        </div>
        
        <div className="mt-24 flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">
           <span className="w-12 h-[1px] bg-slate-800"></span>
           L'Excellence Tunisienne Certifiée
           <span className="w-12 h-[1px] bg-slate-800"></span>
        </div>
      </section>

      {/* Partner Marquee (Social Proof) */}
      <section id="ecosystem" className="py-20 border-y border-slate-100 bg-slate-50/50 backdrop-blur-3xl z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Connecting the Tunisian Tech Ecosystem</span>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-tunisia-red"></div>
               <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            </div>
        </div>
        <div className="flex overflow-hidden group py-4">
          <div className="flex space-x-24 animate-marquee whitespace-nowrap">
            {[
              { label: 'BIAT_CORE', icon: GlobeAltIcon },
              { label: 'AMEN_TECH', icon: ShieldCheckIcon },
              { label: 'BT_GLOBAL', icon: CreditCardIcon },
              { label: 'TUNISIE_TELECOM', icon: CloudArrowUpIcon },
              { label: 'DGI_COMPLIANT', icon: SparklesIcon },
              { label: 'POSTE_TN', icon: CubeTransparentIcon }
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-6 text-slate-400 group-hover:text-white transition-all duration-700 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-tunisia-red/50 transition-colors">
                  <p.icon className="w-7 h-7" />
                </div>
                <span className="text-2xl font-black tracking-tight italic">{p.label}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-24 animate-marquee whitespace-nowrap ml-24" aria-hidden="true">
             {[
              { label: 'BIAT_CORE', icon: GlobeAltIcon },
              { label: 'AMEN_TECH', icon: ShieldCheckIcon },
              { label: 'BT_GLOBAL', icon: CreditCardIcon },
              { label: 'TUNISIE_TELECOM', icon: CloudArrowUpIcon },
              { label: 'DGI_COMPLIANT', icon: SparklesIcon },
              { label: 'POSTE_TN', icon: CubeTransparentIcon }
            ].map((p, i) => (
              <div key={i + 'copy'} className="flex items-center gap-6 text-slate-400 group-hover:text-white transition-all duration-700 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <p.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tight italic">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TuniBill Workflow Section (How it Works) */}
      <section className="relative py-48 px-6 md:px-16 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-32">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-tunisia-red mb-8">Le Workflow</h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10 text-slate-900">L'Automatisation en <span className="text-slate-200">Mouvement.</span></h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
             {/* Progress Line */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block"></div>
             
             {[
               {
                 step: "01",
                 title: "Phase Data",
                 desc: "Importez vos données (Excel, CSV, API) dans notre environnement sécurisé. TuniBill nettoie et structure instantanément vos bases de clients.",
                 icon: CloudArrowUpIcon,
                 color: "tunisia-red"
               },
               {
                 step: "02",
                 title: "Phase Intelligence",
                 desc: "Nos algorithmes appliquent les règles fiscales tunisiennes en temps réel. TVA, Timbre fiscal et conformité RNE sont injectés automatiquement.",
                 icon: SparklesIcon,
                 color: "tunisia-blue"
               },
               {
                 step: "03",
                 title: "Phase Finance",
                 desc: "Générez, envoyez et archivez vos factures. Visualisez vos performances financières sur des tableaux de bord haute-fidélité.",
                 icon: CreditCardIcon,
                 color: "emerald-500"
               }
             ].map((item, i) => (
                <div key={i} className="relative group p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-tunisia-red/20 transition-all duration-500 shadow-sm hover:shadow-xl">
                  <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center z-20 shadow-xl">
                     <span className="text-2xl font-black text-slate-900">{item.step}</span>
                  </div>
                  <div className={`mb-12 w-20 h-20 rounded-[2rem] bg-${item.color}/10 border border-${item.color}/10 flex items-center justify-center text-${item.color} group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-black mb-6">{item.title}</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="relative py-48 px-6 md:px-16 z-10 bg-slate-50">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
            <div className="max-w-xl">
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10 text-slate-900">Des Chiffres qui <br /> <span className="text-tunisia-red">Parlent.</span></h3>
               <p className="text-slate-500 text-xl font-medium leading-relaxed">TuniBill n'est pas seulement un logiciel ; c'est un accélérateur de croissance pour l'économie tunisienne moderne.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 w-full max-w-2xl">
               {[
                 { label: "Factures Émises", value: "2M+", desc: "Sécurisées chaque année" },
                 { label: "Conformité", value: "100%", desc: "DGI & RNE Garantie" },
                 { label: "Gain de Temps", value: "15h", desc: "Économisées par mois" },
                 { label: "Taux d'Erreur", value: "0%", desc: "Erreurs fiscales évitées" }
               ].map((stat, i) => (
                 <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-tunisia-red/20 transition-all shadow-sm">
                    <div className="text-4xl md:text-6xl font-black text-slate-900 mb-2 group-hover:text-tunisia-red transition-colors">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">{stat.label}</div>
                    <div className="text-slate-500 text-xs leading-relaxed">{stat.desc}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* The Master Bento Grid: "Perfect" Content Presentation split by TuniBill Modules */}
      <section id="features" className="relative py-48 px-6 md:px-16 z-10">
        <div className="max-w-7xl mx-auto">
          <header className="max-w-2xl mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-tunisia-red mb-6 border-l-4 border-tunisia-red pl-6">Système TuniBill</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">L'ingénierie au service du business.</h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Une suite d'outils de précision conçue pour automatiser votre cycle financier avec une conformité totale aux normes tunisiennes.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px]">
            {/* Feature 1: Compliance */}
            <div className="md:col-span-8 relative group rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 p-12 transition-all duration-700 hover:border-tunisia-red/30">
              <div className="absolute top-0 right-0 p-12 translate-x-12 translate-y-[-12] opacity-5 group-hover:opacity-10 transition-all duration-1000 scale-150 group-hover:rotate-12">
                <ShieldCheckIcon className="w-[30rem] h-[30rem] text-tunisia-red" />
              </div>
              <div className="relative z-10 h-full flex flex-col max-w-lg">
                <div className="w-16 h-16 rounded-[1.25rem] bg-tunisia-red flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(231,0,19,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheckIcon className="w-9 h-9 text-white" />
                </div>
                <h4 className="text-4xl font-black tracking-tight mb-6">Souveraineté Fiscale</h4>
                <p className="text-slate-400 text-lg leading-relaxed mb-auto">
                   Gestion native du Matricule Fiscal, Timbre fiscal, TVA variable, et conformité RNE. Votre bouclier administratif pour une croissance sans limites.
                </p>
                <div className="pt-8 flex flex-wrap gap-4">
                   <div className="px-5 py-2 rounded-full bg-white border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500">Timbre Fiscal Auto</div>
                   <div className="px-5 py-2 rounded-full bg-white border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500">Vérification RNE</div>
                   <div className="px-5 py-2 rounded-full bg-white border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500">Reporting DGI</div>
                </div>
              </div>
            </div>

            {/* Feature 2: Smart Cards */}
            <div className="md:col-span-4 relative group rounded-[3rem] overflow-hidden bg-white border border-slate-200 p-10 flex flex-col hover:border-tunisia-blue/40 transition-all duration-500 shadow-sm hover:shadow-xl">
               <div className="mb-8 w-14 h-14 rounded-2xl bg-tunisia-blue/10 border border-tunisia-blue/10 flex items-center justify-center text-tunisia-blue">
                 <ChartBarIcon className="w-8 h-8" />
               </div>
               <h4 className="text-2xl font-black mb-4">Vision Stratégique</h4>
               <p className="text-slate-500 text-sm leading-relaxed mb-8">Maîtrisez votre cash-flow avec une précision chirurgicale grâce à nos algorithmes d'analyse prédictive.</p>
               
               <div className="mt-auto space-y-4">
                  {[85, 60, 95].map((w, i) => (
                    <div key={i} className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-tunisia-blue transition-all duration-1000 delay-${300 + i*100}`} 
                        style={{ width: `${w}%` }}
                      ></div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Feature 3: Security */}
            <div id="security" className="md:col-span-4 relative group rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 p-10 flex flex-col hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl">
               <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
               <div className="mb-8 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-600">
                 <FingerPrintIcon className="w-8 h-8" />
               </div>
               <h4 className="text-2xl font-black mb-4 text-slate-900">Coffre-fort Numérique</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Chiffrement AES-256 et isolation hermétique de chaque instance client. La sécurité des données est notre priorité absolue.</p>
            </div>

            {/* Feature 4: TuniBill Pulse */}
            <div className="md:col-span-8 relative group rounded-[3rem] overflow-hidden bg-white border border-slate-200 p-12 transition-all duration-500 hover:border-tunisia-red/20 shadow-xl">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="relative z-10">
                    <div className="mb-8 w-14 h-14 rounded-2xl bg-tunisia-red/5 border border-tunisia-red/10 flex items-center justify-center text-tunisia-red animate-pulse">
                      <SparklesIcon className="w-8 h-8" />
                    </div>
                    <h4 className="text-3xl font-black mb-4 tracking-tight text-slate-900">TuniBill <span className="text-tunisia-red italic">Pulse</span></h4>
                    <p className="text-slate-500 text-md leading-relaxed">Anticipez l'avenir avec notre moteur de prédiction. TuniBill analyse vos cycles de paiement pour projeter votre santé financière à 90 jours.</p>
                  </div>
                  
                  <div className="relative flex items-center justify-center group/pulse">
                     <div className="absolute inset-0 bg-tunisia-red/[0.03] blur-[80px] rounded-full group-hover/pulse:bg-tunisia-red/5 transition-all"></div>
                     <div className="relative w-full aspect-square max-w-[280px] bg-white rounded-full border border-slate-100 flex items-center justify-center p-8 overflow-hidden shadow-2xl transform group-hover/pulse:scale-105 transition-transform duration-700">
                        {/* Recursive Circles Visualization */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-40">
                           <div className="w-[120%] h-[120%] border border-dashed border-slate-200 rounded-full animate-spin-slow"></div>
                           <div className="absolute w-[80%] h-[80%] border border-slate-50 rounded-full"></div>
                        </div>
                        <div className="text-center relative z-10">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Score de Santé</p>
                           <p className="text-6xl font-black text-slate-900">98.4</p>
                           <div className="mt-4 flex items-center gap-2 justify-center text-emerald-500 font-bold text-xs">
                              <ArrowRightIcon className="w-3 h-3 -rotate-45" />
                              <span>+12.5%</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Stories Section (Testimonials) */}
      <section className="relative py-48 px-6 md:px-16 z-10">
         <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-tunisia-red mb-16">Histoires de Réussite</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { 
                   name: "Yassine Ferjani", 
                   role: "CEO @ TN_Tech", 
                   quote: "TuniBill a révolutionné notre gestion financière. Ce qui prenait 3 jours se fait maintenant en 5 minutes.",
                   image: "https://avatar.vercel.sh/yassine"
                 },
                 { 
                   name: "Mariem Selmi", 
                   role: "Directrice Finance @ MedicLink", 
                   quote: "La conformité fiscale était notre plus grand stress. Avec TuniBill, nous sommes sereins à 100%.",
                   image: "https://avatar.vercel.sh/mariem"
                 },
                 { 
                   name: "Sami Mansour", 
                   role: "Fondateur @ BoutiqueDigital", 
                   quote: "L'interface est d'une élégance rare. C'est un plaisir d'utiliser cet outil au quotidien.",
                   image: "https://avatar.vercel.sh/sami"
                 }
               ].map((t, i) => (
                 <div key={i} className="group relative p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-tunisia-red/30 transition-all duration-500 transform hover:-translate-y-4 shadow-sm hover:shadow-xl">
                    <div className="mb-8 flex items-center gap-4">
                       <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl border-2 border-slate-100" />
                       <div>
                          <p className="font-black text-slate-900">{t.name}</p>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                       </div>
                    </div>
                    <p className="text-slate-500 text-lg italic leading-relaxed">"{t.quote}"</p>
                    <div className="absolute top-8 right-8 text-slate-100 text-8xl font-black select-none pointer-events-none">"</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA: The Grand Finale - Redesigned to be MORE MODERN & MINIMALIST */}
      <section className="relative py-64 px-6 md:px-16 z-10 flex flex-col items-center text-center overflow-hidden">
        {/* Massive Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tunisia-red/5 blur-[160px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl">
           <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-[-0.04em] leading-none text-slate-900">
             PASSEZ À <br /> 
             <span className="text-slate-100 italic tracking-tighter">VITESSE TUNIBILL.</span>
           </h2>
           
           <p className="text-slate-500 text-lg md:text-xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
             Rejoignez l'élite des innovateurs qui ont déjà simplifié leur destin financier avec notre plateforme.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
             <Show when="signed-out">
               <Link href="/sign-up" className="relative group px-16 py-6 bg-white text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10">Créer mon compte</span>
               </Link>
             </Show>
             <Show when="signed-in">
               <Link href="/dashboard" className="relative group px-16 py-6 bg-white text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10">Aller au Tableau de Bord</span>
               </Link>
             </Show>
             <Link href="/contact" className="px-16 py-6 bg-slate-100 border border-slate-200 text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 transition-all backdrop-blur-3xl">
               Contact Business
             </Link>
           </div>
        </div>
      </section>

      <Footer className="bg-white border-t border-slate-100" />

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes slow-pulse {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        .animate-slow-pulse {
          animation: slow-pulse 8s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .reveal-text {
          background: linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .shadow-massive {
           box-shadow: 0 100px 200px -50px rgba(0,0,0,0.5), 0 0 100px rgba(231,0,19,0.02);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
