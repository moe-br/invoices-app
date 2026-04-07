import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { outfit, lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';


export default async function RevenueChart() { // Make component async, remove the props
  const revenue = await fetchRevenue(); // Fetch data inside the component {
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className={`w-full md:col-span-4 ${outfit.className}`}>
      <h2 className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-slate-400">
        Revenue Analysis
      </h2>

      <div className="glass-card p-8 border-white/40">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-3 rounded-2xl bg-slate-50/50 p-6 md:gap-4 border border-slate-200/40">
          <div
            className="mb-6 hidden flex-col justify-between text-xs font-bold text-slate-300 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-3 group">
              <div
                className="w-full rounded-full bg-slate-200 group-hover:bg-tunisia-red transition-all duration-500 cursor-pointer shadow-inner relative overflow-hidden"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <p className="-rotate-90 text-[10px] font-black text-slate-400 sm:rotate-0 uppercase tracking-tighter">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last 12 months</span>
          </div>
          <div className="text-xs font-black text-tunisia-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Live Data</div>
        </div>
      </div>
    </div>
  );
}