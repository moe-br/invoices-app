import { outfit } from '@/app/ui/fonts';
import { UserButton } from '@clerk/nextjs';
import { fetchBusinessProfile } from '@/app/lib/data';
import Link from 'next/link';
import { PencilIcon, Building2Icon, PhoneIcon, GlobeIcon, MailIcon, MapPinIcon, CheckCircle2, User, FileText } from 'lucide-react';
import ProfileForm from '@/app/ui/settings/profile-form';
import DataImportCenter from '@/app/ui/settings/data-import-center';

export default async function Page(props: { searchParams: Promise<{ edit?: string }> }) {
  const searchParams = await props.searchParams;
  const isEdit = searchParams.edit === 'true';
  const profile = await fetchBusinessProfile();

  return (
    <div className={`w-full ${outfit.className}`}>
      <div className="flex w-full items-center justify-between mb-8 text-slate-900  transition-colors">
        <h1 className="text-2xl font-black uppercase tracking-tight">Paramètres</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mon Compte Section */}
        <div className="bg-white/50  backdrop-blur-3xl border border-slate-200/60  p-8 rounded-3xl shadow-xl h-fit">
          <h2 className="text-sm font-black uppercase tracking-widest text-tunisia-red mb-6">Mon Compte</h2>
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/30  border border-white/20 ">
            <UserButton appearance={{ elements: { userButtonBox: "scale-[1.5]", userButtonAvatarBox: "w-12 h-12 shadow-2xl" } }} />
            <div>
              <p className="text-sm font-bold text-slate-900 ">Gérer votre profil</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Sécurité, Email, Préférences</p>
            </div>
          </div>
        </div>

        {/* Informations Business Section */}
        <div className="bg-white/50  backdrop-blur-3xl border border-slate-200/60  p-8 rounded-3xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-tunisia-red">Informations Business</h2>
            {!isEdit ? (
              <Link
                href="/dashboard/settings?edit=true"
                className="group flex items-center gap-2 px-4 py-2 bg-tunisia-red text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <PencilIcon className="w-3" />
                Modifier
              </Link>
            ) : (
              <Link
                href="/dashboard/settings"
                className="group flex items-center gap-2 px-4 py-2 bg-slate-200  text-slate-600  rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
              >
                Annuler
              </Link>
            )}
          </div>

          {!isEdit ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30  border border-white/20 ">
                <div className="w-16 h-16 rounded-xl bg-slate-100  flex items-center justify-center overflow-hidden border border-slate-200 ">
                  {profile?.logo_url ? (
                    <img src={profile.logo_url} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <Building2Icon className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-slate-900  truncate">
                    {profile?.business_name || 'Non défini'}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                    {profile?.business_type || 'Type inconnu'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-600 ">
                  <FileText className="w-4" />
                  <span>MF: {profile?.tax_id || '—'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 ">
                  <User className="w-4" />
                  <span>CIN: {profile?.cin || '—'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 ">
                  <PhoneIcon className="w-4" />
                  <span>{profile?.phone || '—'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 ">
                  <MailIcon className="w-4" />
                  <span className="truncate">{profile?.email || '—'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 ">
                  <GlobeIcon className="w-4" />
                  <span className="truncate">{profile?.website || '—'}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600 ">
                  <MapPinIcon className="w-4 mt-1" />
                  <span className="leading-relaxed">{profile?.address || '—'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <ProfileForm initialData={profile} />
            </div>
          )}
        </div>

        {/* Section Données & Importation */}
        <div className="bg-white/50  backdrop-blur-3xl border border-slate-200/60  p-8 rounded-3xl shadow-xl md:col-span-2">
          <h2 className="text-sm font-black uppercase tracking-widest text-tunisia-red mb-6">Données & Importation</h2>
          <DataImportCenter />
        </div>
      </div>
    </div>
  );
}
