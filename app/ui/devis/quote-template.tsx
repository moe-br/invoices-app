'use client';

import { QuoteForm, Customer, BusinessProfile } from '@/app/lib/definitions';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import Image from 'next/image';

export default function QuoteTemplate({
  quote,
  customer,
  profile,
}: {
  quote: any;
  customer: any;
  profile: BusinessProfile | null;
}) {
  const totalHT = quote.amount;
  const vatAmount = quote.vat_amount;
  const stampDuty = quote.stamp_duty;
  const totalTTC = totalHT + vatAmount + stampDuty;
  const validityDays = quote.validity_days || 30;

  // Function to format the ID like dev_0001
  const formatQuoteId = (id: string, num?: number) => {
    if (num) {
      return `dev_${num.toString().padStart(4, '0')}`;
    }
    const extract = id.split('-')[0].replace(/\D/g, '').slice(-4) || '0001';
    return `dev_${extract.padStart(4, '0')}`;
  };

  const quoteNumber = quote.formatted_number || formatQuoteId(quote.id, quote.quote_number);

  return (
    <div className="bg-white p-8 sm:p-12 max-w-4xl mx-auto rounded-3xl border border-slate-100 text-slate-800 shadow-2xl shadow-slate-200/60 print:shadow-none print:border-none print:p-0 print:m-0 transition-all duration-500 relative overflow-hidden">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          body { 
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .no-print { display: none !important; }
          
          /* High Precision A4 Print Styles */
          .bg-white { 
            width: 210mm !important;
            min-height: 297mm !important;
            padding: 1.5cm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            display: block !important;
            position: relative !important;
            box-sizing: border-box !important;
            border-radius: 0 !important;
          }

          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

        {/* Top Header */}
        <div className="flex justify-between items-start mb-12 pb-8 border-b border-slate-100">
          <div className="space-y-4">
            {profile?.logo_url ? (
              <Image
                src={profile.logo_url}
                alt="Logo"
                width={140}
                height={70}
                className="max-h-16 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-tunisia-red rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-tunisia-red/20">
                  <span className="text-white font-black text-xl italic">T</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">TuniBill</h2>
              </div>
            )}
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[250px]">
              {profile?.business_name && <p className="text-slate-900 mb-1">{profile.business_name}</p>}
              <p>{profile?.address}</p>
              <p>Tél : {profile?.phone}</p>
              <p className="text-tunisia-red mt-2">MF: {profile?.tax_id}</p>
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <div className="mb-4">
              <h1 className="text-5xl font-black uppercase tracking-[0.2em] text-slate-100 leading-none select-none">Devis</h1>
            </div>
            <div className="space-y-2">
              <div className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest inline-block">
                Réf: {quoteNumber}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                Date: {formatDateToLocal(quote.date)}
              </p>
            </div>
          </div>
        </div>

        {/* Client Info & Background Blob */}
        <div className="relative mb-12">
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-tunisia-red/5 blur-[60px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 glass-card p-8 border-slate-100 bg-white/50 backdrop-blur-sm">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-tunisia-blue mb-4 block opacity-60">À l&apos;attention de</span>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{customer.name}</h3>
                <div className="text-[11px] text-slate-500 space-y-1 font-bold uppercase tracking-wider">
                    {customer.address && <p>{customer.address}</p>}
                    {customer.email && <p className="normal-case opacity-70 italic">{customer.email}</p>}
                </div>
              </div>
              <div className="text-right">
                {(customer.tax_id || customer.cin) && (
                  <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg inline-block">
                    {customer.type === 'company' && customer.tax_id ? (
                      <>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Matricule Fiscal</p>
                        <p className="text-[11px] font-black text-slate-900">{customer.tax_id}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">CIN</p>
                        <p className="text-[11px] font-black text-slate-900">{customer.cin}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-slate-100">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                <th className="px-8 py-5 text-left">Description des Prestations</th>
                <th className="px-6 py-5 text-center">Qté</th>
                <th className="px-6 py-5 text-center">TVA</th>
                <th className="px-6 py-5 text-right whitespace-nowrap">P.U (HT)</th>
                <th className="px-8 py-5 text-right whitespace-nowrap">Total HT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {quote.items && Array.isArray(quote.items) && quote.items.length > 0 ? (
                quote.items.map((item: any) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-[12px] font-black text-slate-900 tracking-tight">{item.description}</p>
                    </td>
                    <td className="px-6 py-6 text-center text-[12px] font-bold text-slate-500">{item.qty}</td>
                    <td className="px-6 py-6 text-center text-[12px] font-bold text-slate-500">{quote.vat_rate}%</td>
                    <td className="px-6 py-6 text-right text-[12px] font-bold text-slate-500 tabular-nums">{formatCurrency(Number(item.unitPrice) * 1000)}</td>
                    <td className="px-8 py-6 text-right text-[12px] font-black text-tunisia-blue tabular-nums">
                      {formatCurrency(Number(item.qty) * Number(item.unitPrice) * 1000)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-8 py-8 text-[12px] font-bold text-slate-400 italic">Aucun détail disponible</td>
                  <td colSpan={4}></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals & Notes */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <div className="h-full bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Notes & Conditions</p>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                  Ce devis est valable pour une durée de {validityDays} jours à compter de la date d&apos;émission ci-dessus. Le timbre fiscal vous sera facturé au moment de la facturation seulement (inclus ci-dessous à titre informatif).
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-tunisia-red/10 flex items-center justify-center">
                    <span className="text-tunisia-red text-[10px] font-black italic">!</span>
                 </div>
                 <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest italic">Document certifié conforme</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="space-y-3 px-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  <span>Total Hors Taxe</span>
                  <span className="text-slate-900 tabular-nums">{formatCurrency(totalHT)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  <span>TVA ({quote.vat_rate}%)</span>
                  <span className="text-slate-900 tabular-nums">{formatCurrency(vatAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  <span>Timbre Fiscal</span>
                  <span className="text-slate-900 tabular-nums">{formatCurrency(stampDuty)}</span>
                </div>
             </div>
             <div className="bg-tunisia-red p-6 rounded-2xl shadow-xl shadow-tunisia-red/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex justify-between items-end">
                   <div>
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">Total TTC Estimé</p>
                      <p className="text-3xl font-black text-white tracking-tighter tabular-nums leading-none">
                        {formatCurrency(totalTTC)}
                      </p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-xs font-black">DT</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Absolute Footer */}
        <div className="absolute bottom-[1.5cm] left-[1.5cm] right-[1.5cm] border-t border-slate-100 pt-8">
           <div className="flex justify-between items-end">
              <div className="text-left space-y-1">
                 <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">tunibill.tn</p>
                 <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Solution de Devis & Facturation intelligente</p>
              </div>
              <div className="text-right opacity-30 select-none">
                 <h2 className="text-xl font-black text-slate-200 tracking-tighter uppercase italic">Verified by TuniBill</h2>
              </div>
           </div>
        </div>
      </div>
  );
}
