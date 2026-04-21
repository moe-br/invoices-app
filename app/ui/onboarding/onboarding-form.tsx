'use client';

import { useState } from 'react';
import { 
  Building2, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { saveBusinessProfile } from '@/app/lib/actions';
import { BusinessType } from '@/app/lib/definitions';
import { outfit } from '@/app/ui/fonts';
import clsx from 'clsx';
import { Button } from '@/app/ui/button';

export default function OnboardingForm({ initialData }: { initialData?: any }) {
  const [step, setStep] = useState(1);
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

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

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

  const selectBusinessType = (type: BusinessType) => {
    setFormData((prev) => ({ ...prev, businessType: type }));
    nextStep();
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
      if (result?.message) {
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
    <div className={clsx("max-w-3xl mx-auto space-y-8", outfit.className)}>
      {/* Progress Bar */}
      <div className="relative pt-4">
        <div className="flex mb-2 items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                step >= s ? "bg-tunisia-red border-tunisia-red text-white shadow-lg shadow-red-500/20" : "bg-white  border-slate-200  text-slate-400"
              )}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : <span>{s}</span>}
              </div>
              <span className={clsx("mt-2 text-xs font-semibold uppercase tracking-wider", step >= s ? "text-slate-900 " : "text-slate-400")}>
                {s === 1 ? 'Typologie' : s === 2 ? 'Identité' : 'Coordonnées'}
              </span>
            </div>
          ))}
          <div className="absolute top-[34px] left-[5%] right-[5%] h-[2px] bg-slate-100  -z-10">
            <div className="h-full bg-tunisia-red transition-all duration-500 ease-out" style={{ width: `${((step - 1) / 2) * 90 + 5}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-white/70  backdrop-blur-xl rounded-3xl p-8 border border-white/20  shadow-2xl">
        <form onSubmit={handleSubmit}>
          {message && (
            <div className={clsx("mb-6 p-4 rounded-2xl border text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300", message.includes('Succès') ? "bg-green-50  border-green-200 text-green-600" : "bg-red-50  border-red-200 text-red-600")}>
              {message}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600   bg-clip-text text-transparent">Bienvenue chez TuniBill</h2>
                <p className="text-slate-500 ">Quelle est la structure de votre activité ?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BusinessTypeCard 
                  title="Société" 
                  description="SUARL, SARL, SA..." 
                  icon={Building2} 
                  selected={formData.businessType === 'societe'}
                  onClick={() => selectBusinessType('societe')}
                />
                <BusinessTypeCard 
                  title="Auto-entrepreneur" 
                  description="Indépendant / Freelance" 
                  icon={User} 
                  selected={formData.businessType === 'auto_entrepreneur'}
                  onClick={() => selectBusinessType('auto_entrepreneur')}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold ">Identité de votre Business</h2>
                <p className="text-slate-500 ">Donnez un nom et un visage à votre entreprise.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ">{labels.name}</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-tunisia-red transition-colors" />
                    <input 
                      type="text" name="businessName" value={formData.businessName} onChange={handleChange}
                      placeholder={formData.businessType === 'societe' ? "Ex: TuniBill SARL" : "Ex: Mohamed Ben Ali"}
                      className="w-full pl-12 pr-4 py-3 bg-white  border border-slate-200  rounded-2xl focus:ring-2 focus:ring-tunisia-red focus:border-transparent outline-none "
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 ">Votre Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100  border-2 border-dashed border-slate-200  flex items-center justify-center overflow-hidden">
                      {formData.logoUrl ? <img src={formData.logoUrl} alt="Preview" className="w-full h-full object-contain" /> : <ImageIcon className="w-8 h-8 text-slate-400" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="inline-flex items-center px-4 py-2 bg-white  border border-slate-200  rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-50 ">
                        <ImageIcon className="w-4 h-4 mr-2" /> Choisir une image
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-slate-500 hover:text-slate-800  font-semibold transition-colors">
                  <ChevronLeft className="w-5 h-5" /> Retour
                </button>
                <Button type="button" onClick={nextStep} disabled={!formData.businessName} className="rounded-2xl px-8 h-12">
                  Continuer <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold ">Coordonnées & Informations Légales</h2>
                <p className="text-slate-500 ">Ces informations figureront sur vos factures. Tous les champs sont obligatoires.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label={labels.taxId} icon={FileText} name="taxId" value={formData.taxId} onChange={handleChange} placeholder="1234567/A/B/C/000" error={errors.taxId} required />
                <InputField label="CIN (Carte d'Identité Nationale) *" icon={User} name="cin" value={formData.cin} onChange={handleChange} placeholder="Identifiant CIN" error={errors.cin} required />
                <InputField label="Téléphone *" icon={Phone} name="phone" value={formData.phone} onChange={handleChange} placeholder="+216 -- --- ---" error={errors.phone} required />
                <InputField label="Email Business *" icon={Mail} name="email" value={formData.email} onChange={handleChange} placeholder="contact@domaine.tn" error={errors.email} required />
                <InputField label="Site Web (Lien social) *" icon={Globe} name="website" value={formData.website} onChange={handleChange} placeholder="www.domaine.tn" error={errors.website} required />
                
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ">Adresse *</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-3 w-5 h-5 text-slate-400 group-focus-within:text-tunisia-red transition-colors" />
                    <textarea 
                      name="address" value={formData.address} onChange={handleChange} rows={2} required
                      placeholder="Adresse complète du siège"
                      className="w-full pl-12 pr-4 py-3 bg-white  border border-slate-200  rounded-2xl focus:ring-2 focus:ring-tunisia-red outline-none "
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-semibold transition-colors">
                  <ChevronLeft className="w-5 h-5" /> Retour
                </button>
                <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-12 h-12">
                  {isSubmitting ? "Chargement..." : "Terminer"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function InputField({ label, icon: Icon, name, value, onChange, placeholder, error, required }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 ">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-tunisia-red transition-colors" />
        <input 
          type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
          className="w-full pl-12 pr-4 py-3 bg-white  border border-slate-200  rounded-2xl focus:ring-2 focus:ring-tunisia-red outline-none "
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error[0]}</p>}
    </div>
  );
}

function BusinessTypeCard({ title, description, icon: Icon, selected, onClick }: any) {
  return (
    <div onClick={onClick} className={clsx("cursor-pointer p-6 rounded-3xl border-2 transition-all group", selected ? "border-tunisia-red bg-tunisia-red/5" : "border-slate-100  bg-white/50  hover:border-slate-200")}>
      <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", selected ? "bg-tunisia-red text-white" : "bg-slate-50  text-slate-500 group-hover:text-tunisia-red")}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className={clsx("font-bold text-lg mb-1", selected ? "text-tunisia-red" : "text-slate-900 ")}>{title}</h3>
      <p className="text-sm text-slate-500 ">{description}</p>
    </div>
  );
}
