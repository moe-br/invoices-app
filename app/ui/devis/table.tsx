import { outfit } from '@/app/ui/fonts';
import { UpdateQuote, DeleteQuote, ViewQuote } from '@/app/ui/devis/buttons';
import QuoteStatus from '@/app/ui/devis/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredQuotes } from '@/app/lib/data';

export default async function QuotesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const quotes = await fetchFilteredQuotes(query, currentPage);

  const formatQuoteId = (id: string | number) => {
    const rawId = id.toString();
    if(/^\d+$/.test(rawId)) {
        return `Dev_${rawId.padStart(4, '0')}`;
    }
    return `Dev_${rawId.substring(0, 4).toUpperCase()}`;
  };

  return (
    <div className={`mt-6 flow-root ${outfit.className}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="glass-card p-4 md:p-8 border-white/40 ">
          <div className="md:hidden space-y-4">
            {quotes?.map((quote) => (
              <div
                key={quote.id}
                className="w-full rounded-[2rem] bg-white  p-6 shadow-xl shadow-slate-200/50  border border-slate-100  transition-all active:scale-95 group hover:bg-slate-50 "
              >
                <div className="flex items-center justify-between border-b border-slate-50  pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Initials Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tunisia-red text-white font-black text-lg shadow-md ring-2 ring-white  transition-all group-hover:scale-105">
                        {quote.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white "></div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-tunisia-red uppercase tracking-[0.2em] mb-0.5">
                        {quote.formatted_number || formatQuoteId(quote.quote_number || quote.id)}
                      </p>
                      <p className="font-black text-slate-900  tracking-tight">{quote.name}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{quote.email}</p>
                    </div>
                  </div>
                  <QuoteStatus status={quote.status} />
                </div>
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-tunisia-blue  tracking-tighter">
                      {formatCurrency(quote.amount)}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {formatDateToLocal(quote.date)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 text-tunisia-blue ">
                    <ViewQuote id={quote.id} />
                    <UpdateQuote id={quote.id} />
                    <DeleteQuote id={quote.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-slate-900  md:table">
            <thead className="rounded-2xl text-left text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 ">
              <tr>
                <th scope="col" className="px-6 py-8 sm:pl-10">Client</th>
                <th scope="col" className="px-6 py-8">Devis</th>
                <th scope="col" className="px-6 py-8">Émis le</th>
                <th scope="col" className="px-6 py-8">État</th>
                <th scope="col" className="relative py-8 pl-6 pr-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {quotes?.map((quote) => (
                <tr
                  key={quote.id}
                  className="w-full border-b border-slate-50  transition-all duration-300 hover:bg-white/60  group cursor-default"
                >
                  <td className="whitespace-nowrap py-6 pl-10 pr-6">
                    <div className="flex items-center gap-4">
                      {/* Initials Avatar */}
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100  text-slate-900  font-black text-xs transition-all duration-500 group-hover:bg-tunisia-red group-hover:text-white group-hover:shadow-md">
                        {quote.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-tunisia-red uppercase tracking-wider mb-0.5">
                            {quote.formatted_number || formatQuoteId(quote.quote_number || quote.id)}
                        </p>
                        <p className="font-bold text-slate-950  tracking-tight">{quote.name}</p>
                        <p className="text-xs font-medium text-slate-400 ">{quote.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-6 font-black text-slate-900  md:text-tunisia-red tabular-nums group-hover:translate-x-1 transition-transform">
                    {formatCurrency(quote.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-6 text-xs font-bold text-slate-500  uppercase tracking-widest tabular-nums">
                    {formatDateToLocal(quote.date)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-6">
                    <QuoteStatus status={quote.status} />
                  </td>
                  <td className="whitespace-nowrap py-6 pl-6 pr-10">
                    <div className="flex justify-end gap-3 opacity-40  group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <ViewQuote id={quote.id} />
                      <UpdateQuote id={quote.id} />
                      <DeleteQuote id={quote.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
