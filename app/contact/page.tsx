'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import Footer from '@/app/ui/footer';
import { outfit } from '@/app/ui/fonts';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <main className={`min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-tunisia-red selection:text-white ${outfit.className} overflow-x-hidden transition-colors duration-700`}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(231,0,19,0.03),transparent_70%)] opacity-100"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-tunisia-blue/5 blur-[140px] rounded-full opacity-60"></div>
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-tunisia-red/5 blur-[120px] rounded-full opacity-40"></div>
        {/* Subtle Dots */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#2d3fe0 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 border-b border-slate-100 bg-white/70 backdrop-blur-3xl shadow-sm transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="hover:scale-105 transition-transform flex items-center gap-2">
            <TuniBillLogo showRed={true} className="h-8" />
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-tunisia-red transition-colors">Accueil</Link>
            <Link href="/sign-in" className="px-8 py-3 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">Connexion</Link>
          </nav>
        </div>
      </header>

      <div className="relative z-10 pt-40 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

          {/* Left Side: Context & Branding */}
          <div className="lg:col-span-5 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-tunisia-red/5 border border-tunisia-red/10 rounded-full mb-8">
               <SparklesIcon className="w-3.5 h-3.5 text-tunisia-red" />
               <span className="text-[9px] font-black uppercase tracking-widest text-tunisia-red">Service Enterprise</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-slate-950 mb-10 transition-all duration-500">
              CONSTRUISONS <br />
              VOTRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-tunisia-red to-red-600">FUTUR.</span>
            </h1>
            
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-16 max-w-lg">
              De l'audit initial à l'automatisation complète de votre cycle financier. Notre ingénierie au service de votre croissance.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-tunisia-red group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1.5">Email Stratégique</p>
                  <p className="text-lg font-black text-slate-900">business@tunibill.tn</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-tunisia-blue group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1.5">Ligne Directe</p>
                  <p className="text-lg font-black text-slate-900">+216 27 777 586</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1.5">Siège Social</p>
                  <p className="text-lg font-black text-slate-900">Les Berges du Lac 2, Tunis</p>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-slate-100 flex gap-8 items-center text-slate-300">
              <GlobeAltIcon className="w-6 h-6 opacity-40 hover:text-tunisia-blue transition-colors cursor-help" />
              <ShieldCheckIcon className="w-6 h-6 opacity-40 hover:text-emerald-500 transition-colors cursor-help" />
              <SparklesIcon className="w-6 h-6 opacity-40 hover:text-tunisia-red transition-colors cursor-help" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 italic">TuniBill Precision Engineering</span>
            </div>
          </div>

          {/* Right Side: Premium Form Card */}
          <div className="lg:col-span-7">
            <div className="relative p-1 rounded-[3.5rem] bg-gradient-to-br from-slate-200 to-transparent shadow-2xl shadow-slate-200/50">
              <div className="relative p-10 md:p-16 rounded-[3.4rem] bg-white/80 backdrop-blur-3xl border border-white">

                {status === 'success' ? (
                  <div className="py-24 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto mb-10 shadow-lg shadow-emerald-500/10">
                      <SparklesIcon className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">Demande Reçue !</h2>
                    <p className="text-slate-500 text-lg mb-12 font-medium">Un de nos experts en ingénierie financière vous contactera sous 24h.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/20"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10 group/form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nom Complet</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                          placeholder="Moez Ben Salem"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Entreprise</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                          placeholder="InnovCorp Tunisia"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Email Professionnel</label>
                      <input
                        required
                        type="email"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300 shadow-inner"
                        placeholder="moez@innovcorp.tn"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Secteur d'Activité</label>
                      <div className="relative group">
                         <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-white transition-all text-sm font-bold text-slate-900 appearance-none cursor-pointer shadow-inner">
                          <option>Technologie & SaaS</option>
                          <option>Services Financiers</option>
                          <option>Santé & Pharmacie</option>
                          <option>Industrie & Manufacture</option>
                          <option>Export / International</option>
                          <option>Autre</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-tunisia-red transition-colors">
                           <GlobeAltIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Votre Message</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300 resize-none shadow-inner"
                        placeholder="Parlez-nous de vos défis de facturation..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full p-6 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-slate-900/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4 group/btn"
                    >
                      {status === 'sending' ? 'Transmission...' : 'Envoyer la Demande'}
                      <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="bg-white border-t border-slate-100 relative z-10" />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fcfcfd; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </main>
  );
}
