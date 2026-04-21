import { CalendarIcon } from '@heroicons/react/24/outline';
import { outfit } from '@/app/ui/fonts';
import { fetchDailyRevenue } from '@/app/lib/data';
import RevenueAreaChart from '@/app/ui/dashboard/revenue-area-chart';

export default async function RevenueChart() {
  const dailyRevenue = await fetchDailyRevenue();

  return (
    <div className={`w-full md:col-span-4 ${outfit.className}`}>
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-sm font-black text-slate-900  tracking-tight">
          Évolution des revenus
        </h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Ce mois-ci
        </span>
      </div>

      <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-slate-200  to-transparent shadow-2xl shadow-slate-200/50 ">
        <div className="relative p-8 rounded-[2.9rem] bg-white/80  backdrop-blur-3xl border border-slate-200  overflow-hidden transition-colors duration-500">
          {/* Subtle Internal Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-tunisia-blue/5 blur-[100px] rounded-full pointer-events-none"></div>

          <RevenueAreaChart data={dailyRevenue} />

          <div className="flex items-center justify-between mt-8 px-4 border-t border-slate-100  pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50  flex items-center justify-center border border-slate-200 ">
                <CalendarIcon className="h-4 w-4 text-slate-400" />
              </div>
              <span className="text-[10px] font-black text-slate-400  uppercase tracking-[0.2em]">Flux Mensuel</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Temps Réel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}