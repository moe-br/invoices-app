'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CustomerField } from '@/app/lib/definitions';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  CheckIcon, 
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { outfit } from '@/app/ui/fonts';
import clsx from 'clsx';

export default function ClientSelect({ 
  customers, 
  value, 
  onChange, 
  label = "Client Selection"
}: { 
  customers: CustomerField[]; 
  value: string; 
  onChange: (id: string) => void;
  label?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCustomer = useMemo(() => 
    customers.find(c => c.id === value), 
    [customers, value]
  );

  const filteredCustomers = useMemo(() => {
    if (!search) return customers;
    return customers.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={clsx("space-y-2 relative", outfit.className)} ref={containerRef}>
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
        {label}
      </label>
      
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full cursor-pointer bg-slate-50 dark:bg-slate-900 border rounded-2xl py-4 px-5 flex items-center justify-between transition-all group overflow-hidden relative",
          isOpen ? "border-tunisia-red shadow-[0_0_30px_rgba(231,0,19,0.1)]" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
        )}
      >
        <div className="flex items-center gap-4">
          {selectedCustomer ? (
            <>
              <div className="w-8 h-8 rounded-xl bg-tunisia-red/10 border border-tunisia-red/20 flex items-center justify-center text-tunisia-red text-[10px] font-black">
                {getInitials(selectedCustomer.name)}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedCustomer.name}
              </span>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <UserPlusIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                New / Manual Client
              </span>
            </>
          )}
        </div>
        <ChevronDownIcon className={clsx(
          "w-4 h-4 text-slate-400 transition-transform duration-300",
          isOpen && "rotate-180 text-tunisia-red"
        )} />

        {/* Hidden Input for Form Submission */}
        <input type="hidden" name="customerId" value={value} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 z-[100] p-1 rounded-3xl bg-white/70 dark:bg-slate-950/80 backdrop-blur-3xl border border-slate-200 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Search Input */}
          <div className="relative p-3">
            <MagnifyingGlassIcon className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              autoFocus
              type="text"
              placeholder="Rechercher un client..."
              className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 dark:text-white outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* List */}
          <div className="max-h-[300px] overflow-y-auto px-1 pb-2 custom-scrollbar">
            <div 
              onClick={() => {
                onChange('');
                setIsOpen(false);
                setSearch('');
              }}
              className={clsx(
                "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all mb-1",
                !value ? "bg-tunisia-red text-white" : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black",
                  !value ? "bg-white/20" : "bg-slate-200 dark:bg-slate-800"
                )}>
                  <UserPlusIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">New / Manual Entry</p>
                  <p className={clsx("text-[10px] opacity-70 font-bold", !value ? "text-white" : "text-slate-400")}>Add billing details manually</p>
                </div>
              </div>
              {!value && <CheckIcon className="w-4 h-4" />}
            </div>

            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div 
                  key={customer.id}
                  onClick={() => {
                    onChange(customer.id);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={clsx(
                    "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all mb-1",
                    value === customer.id ? "bg-tunisia-red text-white shadow-xl shadow-red-500/20" : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-900 dark:text-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black",
                      value === customer.id ? "bg-white/20" : "bg-tunisia-red/10 border border-tunisia-red/20 text-tunisia-red"
                    )}>
                      {getInitials(customer.name)}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{customer.name}</p>
                      <p className={clsx("text-[10px] opacity-60 font-medium", value === customer.id ? "text-white" : "text-slate-500 dark:text-slate-400")}>
                        {customer.email}
                      </p>
                    </div>
                  </div>
                  {value === customer.id && <CheckIcon className="w-4 h-4" />}
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-xs font-bold text-slate-500 italic">Aucun client trouvé</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); }
      `}</style>
    </div>
  );
}
