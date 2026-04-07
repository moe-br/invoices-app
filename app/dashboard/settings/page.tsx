import { outfit } from '@/app/ui/fonts';
import ApiKeyGenerator from '@/app/ui/settings/api-key-generator';

export default function Page() {
  return (
    <div className={`w-full ${outfit.className}`}>
      <div className="flex w-full items-center justify-between mb-8 text-slate-900 dark:text-white transition-colors">
        <h1 className="text-2xl font-black uppercase tracking-tight">Paramètres</h1>
      </div>
      
      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
        <ApiKeyGenerator />
      </div>
    </div>
  );
}
