'use client';

import React, { useState, useRef } from 'react';
import {
  CloudArrowUpIcon,
  LinkIcon,
  DocumentChartBarIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { outfit } from '@/app/ui/fonts';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { bulkImportCustomers } from '@/app/lib/actions';

export default function DataImportCenter() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File): Promise<any[]> => {
    const fileName = file.name.toLowerCase();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Handle CSV
      if (fileName.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (err) => reject(err)
        });
      }
      // Handle Excel
      else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        reader.onload = (e) => {
          try {
            const arrayBuffer = e.target?.result;
            const data = new Uint8Array(arrayBuffer as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            if (!workbook.SheetNames.length) {
              return reject(new Error('Le fichier Excel est vide.'));
            }

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            resolve(json);
          } catch (err) {
            reject(err);
          }
        };
        reader.readAsArrayBuffer(file);
      }
      // Handle JSON
      else if (fileName.endsWith('.json')) {
        reader.onload = (e) => {
          try {
            resolve(JSON.parse(e.target?.result as string));
          } catch (err) {
            reject(err);
          }
        };
        reader.readAsText(file);
      } else {
        reject(new Error('Format non supporté. Utilisez .csv, .xlsx ou .json'));
      }
    });
  };

  const findArrayInData = (data: any): any[] | null => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      // Look for any property that is an array
      for (const key in data) {
        if (Array.isArray(data[key])) return data[key];
      }
    }
    return null;
  };

  const handleImport = async () => {
    if (!file) return;
    setStatus('uploading');
    setMessage('');

    try {
      const rawData = await processFile(file);
      const data = findArrayInData(rawData);

      if (!data) {
        throw new Error(`Structure de données non reconnue. Nous attendons un tableau de clients.`);
      }

      // Ensure we pass only plain objects to Server Action
      const plainData = JSON.parse(JSON.stringify(data));
      const result = await bulkImportCustomers(plainData);

      if (result.success) {
        setStatus('success');
        setMessage(result.message || 'Importation terminée avec succès.');
        setFile(null);
      } else {
        setStatus('error');
        setMessage(result.message || 'Erreur lors de l’importation.');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage(err.message || 'Une erreur critique est survenue.');
    } finally {
      setTimeout(() => {
        if (status !== 'error') setStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className={`${outfit.className} space-y-8`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Data Synchronisation & Import
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            Support natif JSON, Excel (.xlsx) et CSV
          </p>
        </div>
        {status !== 'idle' && (
          <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-in slide-in-from-right duration-500 ${status === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
            status === 'error' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
              'bg-tunisia-red/10 text-tunisia-red border border-tunisia-red/20'
            }`}>
            {status === 'uploading' && <div className="w-2 h-2 bg-tunisia-red rounded-full animate-ping" />}
            {status === 'success' && <CheckCircleIcon className="w-3 h-3" />}
            {status === 'error' && <ExclamationCircleIcon className="w-3 h-3" />}
            {status === 'uploading' ? 'Traitement en cours...' : status === 'success' ? 'Succès' : 'Échec'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] p-10 transition-all duration-500 flex flex-col items-center justify-center text-center gap-6 ${dragActive
            ? 'border-tunisia-red bg-rose-50 dark:bg-tunisia-red/5 scale-[0.98] shadow-2xl shadow-tunisia-red/10'
            : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-slate-400 dark:hover:border-white/20'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".json,.xlsx,.xls,.csv"
            onChange={handleFileChange}
          />

          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center text-slate-400 group-hover:text-tunisia-red group-hover:scale-110">
            {file ? (
              <DocumentChartBarIcon className="w-10 h-10 text-emerald-500" />
            ) : (
              <CloudArrowUpIcon className="w-10 h-10" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-base font-black text-slate-900 dark:text-white">
              {file ? file.name : 'Déposez vos fichiers ici'}
            </p>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : 'JSON, Excel ou CSV (Max 10MB)'}
            </p>
          </div>

          {!file && (
            <div className="px-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Parcourir les fichiers
            </div>
          )}

          {file && (
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="absolute top-8 right-8 p-2.5 bg-rose-500/10 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sync Zone */}
        <div className="flex flex-col gap-6 justify-between p-10 rounded-[2.5rem] bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-tunisia-red/5 rounded-full blur-[80px]" />
          
          <div className="space-y-6 relative">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-tunisia-blue mb-3 flex items-center gap-2">
                <ExclamationCircleIcon className="w-4 h-4" />
                Format de Données
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">
                Assurez-vous que vos colonnes incluent :<br />
                <span className="text-tunisia-red font-black">Nom</span>, 
                <span className="text-tunisia-red font-black ml-2">Email</span>, 
                <span className="text-tunisia-red font-black ml-2">Téléphone</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Statut de Synchro</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{file ? 'Prêt' : 'En attente'}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-tunisia-red transition-all duration-1000 ${file ? 'w-full' : 'w-0'}`} 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 relative">
            <button
              disabled={!file || status === 'uploading'}
              onClick={handleImport}
              className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 ${status === 'success'
                ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20'
                : status === 'error'
                  ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'
                  : 'bg-tunisia-red text-white shadow-2xl shadow-tunisia-red/20 disabled:bg-tunisia-red/20 disabled:text-tunisia-red/40 disabled:shadow-none hover:scale-[1.02] active:scale-98'
                }`}
            >
              {status === 'idle' && (
                <>
                  Lancer la Synchronisation
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
              {status === 'uploading' && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Traitement...
                </div>
              )}
              {status === 'success' && (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Import Terminée
                </>
              )}
              {status === 'error' && (
                <>
                  <ExclamationCircleIcon className="w-5 h-5" />
                  Réessayer
                </>
              )}
            </button>

            {message && (
              <p className={`text-[10px] font-bold text-center animate-in fade-in slide-in-from-top-1 duration-500 py-3 rounded-xl border ${
                status === 'error' ? 'text-rose-500 bg-rose-500/5 border-rose-500/10' : 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10'
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}
