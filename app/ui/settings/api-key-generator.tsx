'use client';

import { useState } from 'react';
import { generateApiKey } from '@/app/lib/actions';
import { KeyIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function ApiKeyGenerator() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateApiKey();
      if (result.success && result.key) {
        setApiKey(result.key);
      } else {
        setError(result.message || 'Error generating key');
      }
    } catch (e) {
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Developer API Keys</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Generate an API key to securely push clients from your external databases natively into TuniBill via the REST API.
          </p>
        </div>
      </div>

      <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-white/10">
        {!apiKey ? (
          <div className="flex flex-col items-start gap-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              No active keys visible
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 disabled:opacity-50"
            >
              <KeyIcon className="w-5 h-5" />
              {loading ? 'Generating...' : 'Generate New API Key'}
            </button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-100/50 dark:bg-tunisia-red/10 border border-amber-200 dark:border-tunisia-red/20 p-4 rounded-xl">
              <h3 className="text-amber-800 dark:text-rose-400 font-bold text-sm mb-1">⚠️ Store this key securely</h3>
              <p className="text-xs text-amber-700 dark:text-rose-300">
                This is the only time your API key will be displayed. If you lose it, you will need to generate a new one.
              </p>
            </div>
            
            <div className="flex items-center w-full max-w-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden shadow-inner">
              <code className="flex-grow px-4 py-3 text-sm text-slate-800 dark:text-slate-200 font-mono select-all">
                {apiKey}
              </code>
              <button
                onClick={handleCopy}
                className="h-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border-l border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[60px]"
                title="Copy to clipboard"
              >
                {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <DocumentDuplicateIcon className="w-5 h-5 text-slate-500" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
