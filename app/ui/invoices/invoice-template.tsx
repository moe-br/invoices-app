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

  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto rounded-xl border border-gray-100 text-slate-800">
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
          <p className="text-lg font-bold">N°: INV-{invoice.id.slice(0, 8).toUpperCase()}</p>
          <p className="text-sm">Tunis, le {formatDateToLocal(invoice.date)}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Facturer à</h3>
          <p className="text-lg font-bold mb-1">{customer.name}</p>
          <p className="text-sm text-slate-600 mb-1">{customer.address || 'Adresse non spécifiée'}</p>
          {customer.tax_id && (
            <p className="text-sm font-bold text-slate-700">MF: {customer.tax_id}</p>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-12 border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white uppercase text-xs tracking-widest">
            <th className="px-6 py-4 text-left rounded-tl-lg">Description</th>
            <th className="px-6 py-4 text-center">Taux TVA</th>
            <th className="px-6 py-4 text-right">Montant HT</th>
            <th className="px-6 py-4 text-right rounded-tr-lg">Montant TTC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr>
            <td className="px-6 py-6 text-sm font-bold">Prestations de services / Vente de marchandises</td>
            <td className="px-6 py-6 text-sm text-center font-medium">{invoice.vat_rate}%</td>
            <td className="px-6 py-6 text-sm text-right font-medium">{formatCurrency(invoice.amount)}</td>
            <td className="px-6 py-6 text-sm text-right font-bold text-tunisia-blue">
              {formatCurrency(invoice.amount + invoice.vat_amount)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-500">Total Hors Taxe:</span>
            <span className="font-bold">{formatCurrency(totalHT)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-500">TVA ({invoice.vat_rate}%):</span>
            <span className="font-bold">{formatCurrency(vatAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-500">Droit de Timbre:</span>
            <span className="font-bold">{formatCurrency(stampDuty)}</span>
          </div>
          <div className="flex justify-between text-xl border-t border-slate-200 pt-3 mt-3">
            <span className="font-black text-slate-900 uppercase">NET À PAYER:</span>
            <span className="font-black text-tunisia-red">{formatCurrency(totalTTC)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 border-t border-gray-100 pt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
        <p>Merci pour votre confiance. En cas de retard de paiement, une pénalité de 10% sera appliquée.</p>
        <p className="mt-1 font-bold">{companyInfo.website}</p>
      </div>
    </div>
  );
}
