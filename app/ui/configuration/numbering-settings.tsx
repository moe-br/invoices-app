'use client';

import React, { useState, useEffect } from 'react';
import { outfit } from '@/app/ui/fonts';
import { 
  HashtagIcon, 
  CheckIcon, 
  ArrowPathIcon,
  CalendarDaysIcon,
  NumberedListIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { saveNumberingSettings } from '@/app/lib/actions';

interface NumberingSettingsProps {
  initialSettings: {
    invoice_pattern: string;
    invoice_digits: number;
    invoice_reset: string;
    nextNumber: number;
  };
}

export default function NumberingSettings({ initialSettings }: NumberingSettingsProps) {
  const [pattern, setPattern] = useState(initialSettings.invoice_pattern || '{seq}');
  const [digits, setDigits] = useState(initialSettings.invoice_digits || 4);
  const [reset, setReset] = useState(initialSettings.invoice_reset || 'never');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [preview, setPreview] = useState('');

  const generatePreview = (p: string, d: number, n: number) => {
    const now = new Date();
    const YYYY = now.getFullYear().toString();
    const MM = (now.getMonth() + 1).toString().padStart(2, '0');
    const DD = now.getDate().toString().padStart(2, '0');
    const seq = n.toString().padStart(d, '0');

    return p
      .replace('{YYYY}', YYYY)
      .replace('{MM}', MM)
      .replace('{DD}', DD)
      .replace('{seq}', seq);
  };

  useEffect(() => {
    setPreview(generatePreview(pattern, digits, initialSettings.nextNumber));
  }, [pattern, digits, initialSettings.nextNumber]);

  const insertVariable = (variable: string) => {
    setPattern(prev => prev + variable);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append('invoice_pattern', pattern);
    formData.append('invoice_digits', digits.toString());
    formData.append('invoice_reset', reset);

    const result = await saveNumberingSettings(formData);
    setIsSaving(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className={`${outfit.className} space-y-8`}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-white  border border-slate-200  shadow-sm">
           <HashtagIcon className="w-6 h-6 text-tunisia-red" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900  uppercase tracking-tight">Numérotation</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Format des numéros pour vos documents</p>
        </div>
      </div>

      {/* Tabs Placeholder */}
      <div className="flex p-1 bg-slate-100  rounded-2xl w-full max-w-md mx-auto">
         <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest bg-white  text-slate-900  rounded-xl shadow-sm border border-slate-200 ">Facture</button>
         <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-50 cursor-not-allowed">Devis</button>
         <button type="button" className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-50 cursor-not-allowed">Bon de Livraison</button>
      </div>

      {/* Preview Card */}
      <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white text-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-tunisia-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4 relative z-10">Prochain Numéro</p>
         <h4 className="text-5xl font-black tracking-tight relative z-10">{preview}</h4>
      </div>

      {/* Pattern Input */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Modèle de Numérotation</label>
        <div className="relative">
          <input 
            type="text" 
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full p-6 rounded-2xl bg-white  border border-slate-200  text-slate-900  font-bold text-lg focus:ring-2 focus:ring-tunisia-red transition-all"
            placeholder="Ex: FAC-{YYYY}-{seq}"
          />
          <div className="flex gap-2 mt-4 flex-wrap">
             <button type="button" onClick={() => insertVariable('{YYYY}')} className="px-4 py-2 bg-slate-100  hover:bg-tunisia-red hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-200  text-slate-500">+ {`{YYYY}`} (Année)</button>
             <button type="button" onClick={() => insertVariable('{MM}')} className="px-4 py-2 bg-slate-100  hover:bg-tunisia-red hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-200  text-slate-500">+ {`{MM}`} (Mois)</button>
             <button type="button" onClick={() => insertVariable('{seq}')} className="px-4 py-2 bg-slate-100  hover:bg-tunisia-red hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-200  text-slate-500">+ {`{seq}`} (N° séq)</button>
          </div>
        </div>
      </div>

      {/* Digits Selector */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Format du Compteur</label>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => setDigits(d)}
              className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-1 ${digits === d 
                ? 'bg-tunisia-blue text-white border-tunisia-blue shadow-lg shadow-tunisia-blue/20' 
                : 'bg-white  border-slate-200  text-slate-500 hover:border-slate-400'}`}
            >
              <span className="text-sm font-black">{"1".padStart(d, '0')}</span>
              <span className="text-[8px] uppercase tracking-widest font-bold opacity-70">{d} chif.</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Rule */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Remise à Zéro du Compteur</label>
        <div className="space-y-3">
          {[
            { id: 'never', label: 'Jamais', desc: 'Le compteur ne repart jamais à zéro' },
            { id: 'yearly', label: 'Chaque année', desc: 'Repart à 1 le 1er janvier' },
            { id: 'monthly', label: 'Chaque mois', desc: 'Repart à 1 le 1er du mois' }
          ].map((rule) => (
            <button
              type="button"
              key={rule.id}
              onClick={() => setReset(rule.id)}
              className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between ${reset === rule.id 
                ? 'bg-tunisia-blue/5 border-tunisia-blue border-2' 
                : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${reset === rule.id ? 'border-tunisia-blue bg-tunisia-blue' : 'border-slate-300'}`}>
                  {reset === rule.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div>
                   <p className={`text-[11px] font-black uppercase tracking-wider ${reset === rule.id ? 'text-tunisia-blue' : 'text-slate-900'}`}>{rule.label}</p>
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{rule.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 flex justify-end items-center gap-4">
         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Valeurs par défaut</p>
         <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-2xl ${success 
            ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
            : 'bg-slate-900 text-white shadow-slate-900/40 hover:scale-105 active:scale-95'}`}
         >
           {isSaving ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : success ? <CheckCircleIcon className="w-4 h-4" /> : null}
           {success ? 'Enregistré' : 'Enregistrer'}
         </button>
      </div>
    </div>
  );
}
