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
  const [url, setUrl] = useState('');
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
    if (!file && !url) return;
    setStatus('uploading');
    setMessage('');

    try {
      let rawData: any;
      
      if (file) {
        rawData = await processFile(file);
      } else if (url) {
        const response = await fetch(url);
        rawData = await response.json();
      }

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
        setUrl('');
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
           <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-in slide-in-from-right duration-500 ${
             status === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
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
          className={`relative group cursor-pointer border-2 border-dashed rounded-[2rem] p-8 transition-all duration-500 flex flex-col items-center justify-center text-center gap-4 ${
            dragActive 
              ? 'border-tunisia-red bg-rose-50 dark:bg-tunisia-red/5 scale-[0.98]' 
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
          
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center text-slate-400 group-hover:text-tunisia-red group-hover:scale-110">
            {file ? (
              <DocumentChartBarIcon className="w-8 h-8 text-emerald-500" />
            ) : (
              <CloudArrowUpIcon className="w-8 h-8" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {file ? file.name : 'Déposez vos fichiers ici'}
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : 'JSON, Excel ou CSV (Max 10MB)'}
            </p>
          </div>

          {!file && (
            <button className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
               Parcourir
            </button>
          )}

          {file && (
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="absolute top-6 right-6 p-2 bg-rose-500/10 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sync Zone */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-tunisia-blue/10 rounded-lg text-tunisia-blue">
                <LinkIcon className="w-4 h-4" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Synchro via URL</p>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="https://votre-source.com/data.json"
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-6 pr-12 text-xs text-slate-900 dark:text-white outline-none focus:border-tunisia-blue/50 transition-all shadow-sm"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                <GlobeIcon />
              </div>
            </div>
          </div>

          <button 
            disabled={!file && !url || status === 'uploading'}
            onClick={handleImport}
            className={`w-full py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 ${
              status === 'success'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : status === 'error'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-slate-900 dark:bg-tunisia-red text-white shadow-xl shadow-slate-900/20 dark:shadow-red-500/20 disabled:opacity-50 disabled:scale-100 hover:scale-[1.02] active:scale-98'
            }`}
          >
            {status === 'idle' && (
              <>
                Lancer l’Importation
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
            {status === 'uploading' && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Traitement du dataset...
              </div>
            )}
            {status === 'success' && (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                Données synchronisées
              </>
            )}
            {status === 'error' && (
              <>
                <ExclamationCircleIcon className="w-5 h-5" />
                Échec : Réessayez
              </>
            )}
          </button>
          
          {message && status === 'error' && (
            <p className="text-[10px] text-rose-500 font-bold text-center animate-in fade-in duration-300">
              {message}
            </p>
          )}
          {message && status === 'success' && (
            <p className="text-[10px] text-emerald-500 font-bold text-center animate-in fade-in duration-300">
              {message}
            </p>
          )}
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
