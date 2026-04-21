'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { outfit } from '@/app/ui/fonts';

interface RevenueAreaChartProps {
  data: { label: string; amount: number }[];
}

export default function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Format Y-axis to show 'k'
  const formatYAxis = (value: number) => {
    if (value === 0) return '0k';
    return `${value.toFixed(2)}k`;
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 border border-slate-100 p-4 rounded-2xl shadow-2xl backdrop-blur-xl ring-1 ring-black/5 animate-in fade-in zoom-in duration-300">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{label}</p>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-tunisia-red animate-pulse"></div>
             <p className="text-sm font-black text-slate-900 tracking-tight">
               {payload[0].value.toFixed(3)} <span className="text-[10px] text-slate-400">TND</span>
             </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return <div className="w-full h-[350px] animate-pulse bg-slate-50  rounded-3xl" />;
  }

  return (
    <div className={`w-full h-[320px] p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group ${outfit.className}`}>
      {/* Chart Decorative Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Croissance de Revenus</h3>
           <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-black text-slate-900 leading-tight">Performance Annuelle</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5 px-2.5 py-1 bg-tunisia-red/5 border border-tunisia-red/10 rounded-full">
              <div className="w-1 h-1 rounded-full bg-tunisia-red"></div>
              <span className="text-[7px] font-black uppercase tracking-widest text-tunisia-red">En Temps Réel</span>
           </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e70013" stopOpacity={0.08} />
              <stop offset="95%" stopColor="#e70013" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f8fafc"
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 8, fontWeight: 900, fill: '#cbd5e1' }}
            dy={10}
            interval={Math.floor(data.length / 6)}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 8, fontWeight: 900, fill: '#cbd5e1' }}
            tickFormatter={formatYAxis}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f1f5f9', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#e70013"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAmount)"
            animationBegin={200}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
