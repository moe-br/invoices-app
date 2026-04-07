'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 p-3 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm transition-all hover:bg-slate-200 dark:hover:bg-slate-700 md:flex-none md:justify-start md:p-4"
    >
      {theme === 'light' ? (
        <>
          <MoonIcon className="w-6" />
          <div className="hidden md:block uppercase tracking-widest text-[10px] font-black">Mode Sombre</div>
        </>
      ) : (
        <>
          <SunIcon className="w-6" />
          <div className="hidden md:block uppercase tracking-widest text-[10px] font-black">Mode Clair</div>
        </>
      )}
    </button>
  );
}
