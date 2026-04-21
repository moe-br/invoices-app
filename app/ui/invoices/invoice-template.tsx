'use client';

import { InvoiceForm, Customer, BusinessProfile } from '@/app/lib/definitions';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import Image from 'next/image';

export default function InvoiceTemplate({
  invoice,
  customer,
  profile,
}: {
  invoice: any;
  customer: any;
  profile: BusinessProfile | null;
}) {
  const totalHT = invoice.amount;
  const vatAmount = invoice.vat_amount;
  const stampDuty = invoice.stamp_duty;
  const totalTTC = totalHT + vatAmount + stampDuty;

  // Function to format the ID like fac_0001
  const formatInvoiceId = (id: string, num?: number) => {
    if (num) {
      return `fac_${num.toString().padStart(4, '0')}`;
    }
    const extract = id.split('-')[0].replace(/\D/g, '').slice(-4) || '0001';
    return `fac_${extract.padStart(4, '0')}`;
  };

  const invoiceNumber = invoice.formatted_number || formatInvoiceId(invoice.id, invoice.invoice_number);

  return (
    <div className="bg-white p-6 sm:p-10 max-w-4xl mx-auto rounded-3xl border border-slate-100 text-slate-800 shadow-2xl shadow-slate-200/50 print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full transition-all duration-500">
      <style jsx global>{`
        @media print {
          /* Force A4 Size and eliminate browser text */
          @page {
            size: A4;
            margin: 0;
          }
          
          .no-print, .no-print * { display: none !important; }
          
          body { 
            background: white !important; 
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Reset layout containers */
          *, *::before, *::after { box-sizing: border-box !important; }
          .h-screen, .md\:overflow-hidden { height: auto !important; overflow: visible !important; }
          
          .bg-white { 
            width: 100% !important;
            padding: 1.2cm !important; /* Safe physical margin inside the page */
            margin: 0 !important;
            display: block !important;
            border: none !important;
            box-shadow: none !important;
          }
          
          nav, aside, .breadcrumbs, .print-button-container { display: none !important; }
        }
      `}</style>

      {/* Top Header */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100 print:mb-4 print:pb-4">
        <div>
          {profile?.logo_url ? (
            <Image
              src={profile.logo_url}
              alt="Logo"
              width={120}
              height={60}
              className="max-h-12 w-auto object-contain"
            />
          ) : (
            <h2 className="text-xl font-black text-tunisia-red tracking-tighter italic uppercase underline decoration-tunisia-blue decoration-4 underline-offset-4">TuniBill</h2>
          )}
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-black uppercase tracking-widest text-slate-100 leading-none print:text-slate-200">Facture</h1>
          <div className="mt-2 text-right">
             <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider print:bg-black">N°: {invoiceNumber}</span>
             <p className="text-[8px] text-slate-400 font-bold mt-1 uppercase tracking-[0.2em]">{formatDateToLocal(invoice.date)}</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 print:mb-4 print:gap-3">
        <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-between print:bg-slate-50 print:p-4">
          <div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-blue mb-2 block opacity-50">DE</span>
            <h3 className="text-base font-black text-slate-900 leading-tight mb-1">{profile?.business_name}</h3>
            <div className="text-[10px] text-slate-600 space-y-0.5 font-medium">
                <p>{profile?.address}</p>
                <p>Tél : {profile?.phone}</p>
                <p className="font-bold text-slate-400 mt-1 uppercase tracking-wider">MF: {profile?.tax_id}</p>
            </div>
          </div>
          {profile?.website && (
            <div className="mt-2 pt-2 border-t border-slate-200/50">
              <p className="text-[9px] font-black text-tunisia-red tracking-widest leading-none">
                {profile.website.toLowerCase()}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between print:shadow-none print:border-slate-200 print:p-4">
           <div>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-tunisia-blue mb-2 block opacity-50">FACTURER A</span>
            <h3 className="text-base font-black text-slate-900 leading-tight mb-1">{customer.name}</h3>
            <div className="text-[10px] text-slate-600 space-y-0.5 font-medium">
                {customer.address && <p>{customer.address}</p>}
                {customer.email && <p>{customer.email}</p>}
                {customer.tax_id && <p className="font-bold text-slate-400 mt-1 uppercase tracking-wider">MF: {customer.tax_id}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 mb-6 print:mb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white uppercase text-[8px] tracking-[0.2em] print:bg-slate-100 print:text-slate-900">
              <th className="px-5 py-2.5 text-left font-black print:px-4">Description</th>
              <th className="px-5 py-2.5 text-center font-black print:px-4">Qté</th>
              <th className="px-5 py-2.5 text-center font-black print:px-4">TVA</th>
              <th className="px-5 py-2.5 text-right font-black print:px-4">Prix Unitaire</th>
              <th className="px-5 py-2.5 text-right font-black print:px-4">Total HT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items && Array.isArray(invoice.items) && invoice.items.length > 0 ? (
              invoice.items.map((item: any) => (
                <tr key={item.id} className="bg-white">
                  <td className="px-5 py-3 text-[10px] font-bold text-slate-800 print:px-4 print:py-2">
                    {item.description}
                  </td>
                  <td className="px-5 py-3 text-[10px] text-center font-bold text-slate-500 print:px-4 print:py-2">
                    {item.qty}
                  </td>
                  <td className="px-5 py-3 text-[10px] text-center font-bold text-slate-500 print:px-4 print:py-2">
                    {invoice.vat_rate}%
                  </td>
                  <td className="px-5 py-3 text-[10px] text-right font-bold text-slate-500 print:px-4 print:py-2">
                    {formatCurrency(Number(item.unitPrice))}
                  </td>
                  <td className="px-5 py-3 text-[10px] text-right font-black text-tunisia-blue print:px-4 print:py-2">
                    {formatCurrency(Number(item.qty) * Number(item.unitPrice))}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td className="px-5 py-4 text-[10px] font-bold text-slate-800 print:px-4 print:py-3">
                  Prestations de services / Vente de marchandises
                </td>
                <td className="px-5 py-4 text-[10px] text-center font-bold text-slate-500 print:px-4 print:py-3">1</td>
                <td className="px-5 py-4 text-[10px] text-center font-bold text-slate-500 print:px-4 print:py-3">{invoice.vat_rate}%</td>
                <td className="px-5 py-4 text-[10px] text-right font-bold text-slate-800 print:px-4 print:py-3">{formatCurrency(totalHT)}</td>
                <td className="px-5 py-4 text-[10px] text-right font-black text-tunisia-blue print:px-4 print:py-3">
                  {formatCurrency(totalHT)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="flex justify-end mb-6 text-right print:mb-4">
        <div className="w-full max-w-[240px] space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100 print:bg-slate-50 print:p-3">
           <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-400">
              <span>Total HT</span>
              <span className="text-slate-900">{formatCurrency(totalHT)}</span>
           </div>
           <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-400">
              <span>TVA ({invoice.vat_rate}%)</span>
              <span className="text-slate-900">{formatCurrency(vatAmount)}</span>
           </div>
           <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-400">
              <span>Timbre</span>
              <span className="text-slate-900">{formatCurrency(stampDuty)}</span>
           </div>
           <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-1">
              <span className="text-[10px] font-black text-slate-900 uppercase">Net À Payer</span>
              <span className="text-base font-black text-tunisia-red">{formatCurrency(totalTTC)}</span>
           </div>
        </div>
      </div>

      {/* Professional Footer */}
      <div className="border-t border-slate-100 pt-4 text-center print:pt-4">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-1">Merci pour votre confiance</p>
        <p className="text-[7px] text-slate-300 uppercase tracking-widest leading-relaxed mb-1">
          En cas de retard de paiement, une pénalité de 10% sera appliquée conformément à la réglementation.
        </p>
        <p className="text-[9px] font-black text-tunisia-blue uppercase tracking-widest">
           tunibill.tn
        </p>
      </div>
    </div>
  );
}
