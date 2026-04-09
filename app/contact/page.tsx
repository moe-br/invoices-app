'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChevronRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import Footer from '@/app/ui/footer';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-tunisia-red selection:text-white font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(231,0,19,0.1),transparent_70%)] opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tunisia-blue/10 blur-[120px] rounded-full opacity-30"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-slate-950/20 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="hover:scale-105 transition-transform">
            <TuniBillLogo />
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">Accueil</Link>
            <Link href="/sign-in" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Connexion</Link>
          </nav>
        </div>
      </header>

      <div className="relative z-10 pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Side: Context & Branding */}
          <div className="lg:col-span-5 pt-12">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">
              PARLONS <span className="text-white/30">DE</span> <br />
              VOTRE FUTUR.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-16 max-w-lg">
              Que vous soyez une startup en pleine croissance ou une institution établie, TuniBill scale avec vos ambitions.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-tunisia-red/10 border border-tunisia-red/20 flex items-center justify-center text-tunisia-red group-hover:scale-110 transition-transform">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Email Stratégique</p>
                  <p className="text-lg font-bold">business@tunibill.tn</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-tunisia-blue/10 border border-tunisia-blue/20 flex items-center justify-center text-tunisia-blue group-hover:scale-110 transition-transform">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Ligne Directe</p>
                  <p className="text-lg font-bold">+216 27 777 586</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Siège Social</p>
                  <p className="text-lg font-bold">Les Berges du Lac 2, Tunis</p>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-white/5 flex gap-8 items-center text-slate-600">
              <GlobeAltIcon className="w-6 h-6 opacity-50" />
              <ShieldCheckIcon className="w-6 h-6 opacity-50" />
              <SparklesIcon className="w-6 h-6 opacity-50" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">TuniBill Enterprise Ready</span>
            </div>
          </div>

          {/* Right Side: Glassmorphic Form */}
          <div className="lg:col-span-7">
            <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent">
              <div className="relative p-10 md:p-14 rounded-[2.9rem] bg-slate-900/40 backdrop-blur-3xl border border-white/5">

                {status === 'success' ? (
                  <div className="py-24 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                      <SparklesIcon className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black mb-6">Demande Reçue !</h2>
                    <p className="text-slate-400 text-lg mb-12">Un de nos experts en ingénierie financière vous contactera sous 24h.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10 group/form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Nom Complet</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-slate-950 transition-all text-sm font-medium"
                          placeholder="Moez Ben Salem"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Entreprise</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-slate-950 transition-all text-sm font-medium"
                          placeholder="InnovCorp Tunisia"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Email Professionnel</label>
                      <input
                        required
                        type="email"
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-slate-950 transition-all text-sm font-medium"
                        placeholder="moez@innovcorp.tn"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Secteur d'Activité</label>
                      <select className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-slate-950 transition-all text-sm font-medium appearance-none cursor-pointer">
                        <option>Technologie & SaaS</option>
                        <option>Services Financiers</option>
                        <option>Santé & Pharmacie</option>
                        <option>Industrie & Manufacture</option>
                        <option>Export / International</option>
                        <option>Autre</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Votre Message</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-tunisia-red focus:bg-slate-950 transition-all text-sm font-medium resize-none"
                        placeholder="Parlez-nous de vos défis de facturation..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full relative group/btn p-[2px] rounded-2xl bg-gradient-to-r from-tunisia-red to-rose-600 overflow-hidden active:scale-95 transition-all shadow-[0_20px_50px_rgba(231,0,19,0.3)] disabled:opacity-50"
                    >
                      <div className="relative px-8 py-6 bg-slate-950 rounded-[0.9rem] flex items-center justify-center gap-4 transition-all group-hover/btn:bg-transparent">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                          {status === 'sending' ? 'Transmission...' : 'Envoyer la Demande'}
                        </span>
                        <ArrowRightIcon className="w-4 h-4 text-white group-hover/btn:translate-x-2 transition-transform" />
                      </div>
                    </button>
                  </form>
                )}

              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tunisia-red/20 blur-[60px] rounded-full pointer-events-none group-hover/form:bg-tunisia-red/30 transition-all"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="bg-slate-950/50 border-t border-white/5 relative z-10" />

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}
