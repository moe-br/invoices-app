'use client';

import { InvoiceForm, Customer, CompanyProfile } from '@/app/lib/definitions';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

const companyInfo: CompanyProfile = {
  name: 'TuniBill International',
  address: 'Avenue Habib Bourguiba, Tunis 1000, Tunisie',
  tax_id: '1234567A/P/M/000',
  rc_number: 'B0112342023',
  phone: '+216 71 000 000',
  email: 'contact@tunibill.tn',
  website: 'www.tunibill.tn',
};

export default function InvoiceTemplate({
  invoice,
  customer,
}: {
  invoice: any;
  customer: any;
}) {
  const totalHT = invoice.amount;
  const vatAmount = invoice.vat_amount;
  const stampDuty = invoice.stamp_duty;
  const totalTTC = totalHT + vatAmount + stampDuty;

  // Function to format the ID like Fac_001
  const formatInvoiceId = (id: string) => {
    const num = id.split('-')[0].replace(/\D/g, '').slice(-3) || '001';
    return `Fac_${num.padStart(3, '0')}`;
  };

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto rounded-xl border border-gray-100 text-slate-800 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tunisia-red mb-2">{companyInfo.name}</h1>
          <p className="text-sm font-medium">{companyInfo.address}</p>
          <p className="text-sm font-medium">MF: {companyInfo.tax_id} | RC: {companyInfo.rc_number}</p>
          <p className="text-sm font-medium">Tél: {companyInfo.phone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-400">Facture</h2>
          <p className="text-lg font-bold">N°: {formatInvoiceId(invoice.id)}</p>
          <p className="text-sm border-t border-slate-100 pt-1 mt-1 font-medium">Tunis, le {formatDateToLocal(invoice.date)}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-transparent print:border print:border-slate-200">
          <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Facturer à</h3>
          <p className="text-lg font-bold mb-1">{customer.name}</p>
          <p className="text-sm text-slate-600 mb-1 leading-relaxed">{customer.address || 'Adresse non spécifiée'}</p>
          {customer.tax_id && (
            <p className="text-sm font-bold text-slate-700 mt-2">MF: {customer.tax_id}</p>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-12 border-collapse overflow-hidden rounded-xl border border-slate-200">
        <thead>
          <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-[0.2em] print:bg-slate-100 print:text-black">
            <th className="px-6 py-4 text-left font-black">Description</th>
            <th className="px-6 py-4 text-center font-black">Taux TVA</th>
            <th className="px-6 py-4 text-right font-black">Montant HT</th>
            <th className="px-6 py-4 text-right font-black">Montant TTC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="bg-white">
            <td className="px-6 py-8 text-sm font-bold text-slate-900 leading-relaxed">
              Prestations de services / Vente de marchandises
            </td>
            <td className="px-6 py-8 text-sm text-center font-bold text-slate-600">{invoice.vat_rate}%</td>
            <td className="px-6 py-8 text-sm text-right font-bold text-slate-600">{formatCurrency(invoice.amount)}</td>
            <td className="px-6 py-8 text-sm text-right font-black text-tunisia-blue">
              {formatCurrency(invoice.amount + invoice.vat_amount)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-4">
          <div className="flex justify-between text-sm items-center">
            <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Total HT:</span>
            <span className="font-bold text-slate-900">{formatCurrency(totalHT)}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">TVA ({invoice.vat_rate}%):</span>
            <span className="font-bold text-slate-900">{formatCurrency(vatAmount)}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Droit de Timbre:</span>
            <span className="font-bold text-slate-900">{formatCurrency(stampDuty)}</span>
          </div>
          <div className="flex justify-between text-xl border-t-2 border-slate-900 pt-4 mt-2">
            <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Net À Payer:</span>
            <span className="font-black text-tunisia-red text-2xl">{formatCurrency(totalTTC)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-gray-100 pt-8 text-center text-[10px] text-slate-300 uppercase tracking-widest leading-loose">
        <p>Merci pour votre confiance. En cas de retard de paiement, une pénalité de 10% sera appliquée.</p>
        <p className="mt-2 font-black text-tunisia-blue">{companyInfo.website}</p>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          nav, aside, footer:not(.print-footer), .breadcrumbs, .print-button-container { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; border: none !important; }
          .glass-card { box-shadow: none !important; border: 1px solid #e2e8f0 !important; background: white !important; }
        }
      `}</style>
    </div>
  );
}
