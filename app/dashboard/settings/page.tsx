import { outfit } from '@/app/ui/fonts';
import { UserButton } from '@clerk/nextjs';
import ApiKeyGenerator from '@/app/ui/settings/api-key-generator';

export default function Page() {
  return (
    <div className={`w-full ${outfit.className}`}>
      <div className="flex w-full items-center justify-between mb-8 text-slate-900 dark:text-white transition-colors">
        <h1 className="text-2xl font-black uppercase tracking-tight">Paramètres</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
          <h2 className="text-sm font-black uppercase tracking-widest text-tunisia-red mb-6">Mon Compte</h2>
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/5">
            <UserButton appearance={{ elements: { userButtonBox: "scale-[1.5]", userButtonAvatarBox: "w-12 h-12 shadow-2xl" } }} />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Gérer votre profil</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Sécurité, Email, Préférences</p>
            </div>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
          <h2 className="text-sm font-black uppercase tracking-widest text-tunisia-red mb-6">API & Intégrations</h2>
          <ApiKeyGenerator />
        </div>
      </div>
    </div>
  );
}
