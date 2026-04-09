import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { outfit, lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';


export default async function RevenueChart() { // Make component async, remove the props
  let revenue = await fetchRevenue(); // Fetch data inside the component {
  const chartHeight = 350;

  // If no revenue data, provide default months with 0 revenue to show structure
  if (!revenue || revenue.length === 0) {
    revenue = [
      { month: 'Jan', revenue: 0 },
      { month: 'Feb', revenue: 0 },
      { month: 'Mar', revenue: 0 },
      { month: 'Apr', revenue: 0 },
      { month: 'May', revenue: 0 },
      { month: 'Jun', revenue: 0 },
      { month: 'Jul', revenue: 0 },
      { month: 'Aug', revenue: 0 },
      { month: 'Sep', revenue: 0 },
      { month: 'Oct', revenue: 0 },
      { month: 'Nov', revenue: 0 },
      { month: 'Dec', revenue: 0 },
    ];
  }

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className={`w-full md:col-span-4 ${outfit.className}`}>
      <h2 className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-slate-500 ml-2">
        Analyse Visuelle
      </h2>

      <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-slate-200 dark:from-white/5 to-transparent">
        <div className="relative p-8 rounded-[2.9rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
          {/* Subtle Internal Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-tunisia-red/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-3 rounded-[2rem] bg-slate-100/50 dark:bg-slate-950/40 p-10 md:gap-6 border border-slate-200 dark:border-white/5">
            <div
              className="mb-6 hidden flex-col justify-between text-[10px] font-black text-slate-400 dark:text-slate-600 sm:flex uppercase tracking-tighter"
              style={{ height: `${chartHeight}px` }}
            >
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>

            {revenue.map((month) => (
              <div key={month.month} className="flex flex-col items-center gap-4 group">
                <div
                  className="w-full rounded-full bg-gradient-to-t from-tunisia-red/80 to-tunisia-red/10 group-hover:from-tunisia-red group-hover:to-rose-400 transition-all duration-700 cursor-pointer shadow-[0_0_30px_rgba(231,0,19,0.1)] relative overflow-hidden group/bar"
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-4 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                </div>
                <p className="-rotate-90 text-[10px] font-black text-slate-400 dark:text-slate-500 sm:rotate-0 uppercase tracking-widest group-hover:text-tunisia-red dark:group-hover:text-white transition-colors">
                  {month.month}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-10 px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/5">
                <CalendarIcon className="h-4 w-4 text-slate-400" />
              </div>
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Flux 12 Mois</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 animate-slow-pulse">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
               <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Données Réelles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}