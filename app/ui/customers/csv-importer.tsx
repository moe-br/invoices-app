'use client';

import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { ArrowDownTrayIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { bulkImportCustomers } from '@/app/lib/actions';

export default function CsvImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(false);
    setMessage(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
      } else {
        setMessage({ text: 'Please upload a valid CSV file.', type: 'error' });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    setMessage(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
      complete: async (results) => {
        const data = results.data;
        if (!data || data.length === 0) {
          setMessage({ text: 'The CSV file is empty.', type: 'error' });
          setLoading(false);
          return;
        }

        try {
          const result = await bulkImportCustomers(data);
          if (result.success) {
            setMessage({ text: `Successfully imported ${result.count} customers!`, type: 'success' });
            setFile(null);
          } else {
            setMessage({ text: result.message || 'Error importing customers.', type: 'error' });
          }
        } catch (error) {
          setMessage({ text: 'A critical error occurred while importing.', type: 'error' });
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        setMessage({ text: `CSV Parse Error: ${error.message}`, type: 'error' });
        setLoading(false);
      }
    });
  };

  return (
    <div className="w-full bg-white  shadow-sm border border-slate-200  rounded-2xl p-6 mb-8 transition-colors">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 ">Bulk CSV Import</h2>
        <p className="text-sm text-slate-500 ">
          Effortlessly sync your external database by uploading a single dataset. Ensure your CSV has columns like <code className="bg-slate-100  px-1 py-0.5 rounded">name</code> and <code className="bg-slate-100  px-1 py-0.5 rounded">email</code>.
        </p>
      </div>

      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`w-full relative overflow-hidden border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${isHovering ? 'border-tunisia-red bg-rose-50' : file ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'} ${!file ? 'cursor-pointer' : ''}`}
      >
        <input 
          type="file" 
          accept=".csv" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
        />
        
        {!file ? (
          <>
            <div className="w-16 h-16 rounded-full bg-white  shadow-sm flex items-center justify-center text-slate-400">
              <ArrowDownTrayIcon className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700 ">Choose a CSV file or drag it here</p>
              <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Up to 5MB</p>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between bg-white  border border-emerald-200  p-4 rounded-xl shadow-sm z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100  text-emerald-600  rounded-lg">
                <DocumentTextIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-800  text-sm truncate max-w-[200px] md:max-w-xs">{file.name}</span>
                <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50  rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mt-4 p-4 rounded-xl border ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {file && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-tunisia-red text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-rose-600 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-md shadow-tunisia-red/20"
          >
            {loading ? 'Importing Customers...' : 'Start Import'}
          </button>
        </div>
      )}
    </div>
  );
}
