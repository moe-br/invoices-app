'use client';

import { useState } from 'react';
import { 
  Building2, 
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  User
} from 'lucide-react';
import { saveBusinessProfile } from '@/app/lib/actions';
import { BusinessType } from '@/app/lib/definitions';
import { outfit } from '@/app/ui/fonts';
import clsx from 'clsx';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessType: initialData?.business_type || '' as BusinessType | '',
    businessName: initialData?.business_name || '',
    logoUrl: initialData?.logo_url || '',
    taxId: initialData?.tax_id || '',
    cin: initialData?.cin || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    website: initialData?.website || '',
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logoUrl: ['L\'image est trop volumineuse (max 2Mo)'] }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const result = await saveBusinessProfile(data);
      if (result?.errors) {
        setErrors(result.errors);
      }
      if (result?.message && !result.errors) {
        router.push('/dashboard/settings');
        router.refresh();
      } else if (result?.message) {
        setMessage(result.message);
      }
    } catch (err: any) {
      setMessage("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLabels = () => {
    switch (formData.businessType) {
      case 'societe':
        return {
          name: 'Raison Sociale *',
          taxId: 'Matricule Fiscal (MF) *',
        };
      case 'auto_entrepreneur':
        return {
          name: 'Nom & Prénom *',
          taxId: 'Matricule Fiscal *',
        };
      default:
        return {
          name: 'Nom commercial *',
          taxId: 'Matricule Fiscal *',
        };
    }
  };

  const labels = getLabels();

  return (
    <div className={clsx("w-full space-y-8", outfit.className)}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {message && (
          <div className={clsx("p-4 rounded-xl border text-xs font-medium", message.includes('Succès') ? "bg-green-50 dark:bg-green-900/20 border-green-200 text-green-600" : "bg-red-50 dark:bg-red-900/20 border-red-200 text-red-600")}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">1. Typologie d'activité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'societe', title: 'Société', icon: Building2 },
              { id: 'auto_entrepreneur', title: 'Indépendant', icon: User }
            ].map((type) => (
              <div 
                key={type.id}
                onClick={() => setFormData(p => ({ ...p, businessType: type.id as BusinessType }))}
                className={clsx(
                  "cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center",
                  formData.businessType === type.id 
                    ? "border-tunisia-red bg-tunisia-red/5 text-tunisia-red" 
                    : "border-slate-100 dark:border-slate-800 bg-white/30 dark:bg-white/5 hover:border-slate-200"
                )}
              >
                <type.icon className={clsx("w-6 h-6", formData.businessType === type.id ? "text-tunisia-red" : "text-slate-400")} />
                <span className="text-xs font-bold uppercase tracking-tight">{type.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label={labels.name} icon={Building2} name="businessName" value={formData.businessName} onChange={handleChange} required error={errors.businessName} />
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">Logo Business</label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                {formData.logoUrl ? <img src={formData.logoUrl} alt="Preview" className="w-full h-full object-contain" /> : <ImageIcon className="w-5 h-5 text-slate-400" />}
              </div>
              <label className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-200 text-center transition-colors">
                Modifier Logo
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          <InputField label={labels.taxId} icon={FileText} name="taxId" value={formData.taxId} onChange={handleChange} required error={errors.taxId} />
          <InputField label="CIN (Individuel) *" icon={User} name="cin" value={formData.cin} onChange={handleChange} required error={errors.cin} />
          <InputField label="Téléphone *" icon={Phone} name="phone" value={formData.phone} onChange={handleChange} required error={errors.phone} />
          <InputField label="Email Business *" icon={Mail} name="email" value={formData.email} onChange={handleChange} required error={errors.email} />
          <InputField label="Site Web (Lien) *" icon={Globe} name="website" value={formData.website} onChange={handleChange} required error={errors.website} />

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">Adresse *</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-3 w-4 h-4 text-slate-400 group-focus-within:text-tunisia-red transition-colors" />
              <textarea 
                name="address" value={formData.address} onChange={handleChange} rows={2} required
                className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-tunisia-red outline-none dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-12 h-12 bg-gradient-to-r from-tunisia-red to-red-600 border-none shadow-xl shadow-red-500/20">
            {isSubmitting ? "Enregistrement..." : "Sauvegarder les modifications"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, icon: Icon, name, value, onChange, required, placeholder, error }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-tunisia-red transition-colors" />
        <input 
          type="text" name={name} value={value} onChange={onChange} required={required} placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-tunisia-red outline-none dark:text-white"
        />
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1">{error[0]}</p>}
    </div>
  );
}
