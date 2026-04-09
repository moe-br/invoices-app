import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import ThemeToggle from '@/app/ui/dashboard/theme-toggle';
import { PowerIcon } from '@heroicons/react/24/outline';
import { SignOutButton, UserButton } from '@clerk/nextjs';


import { outfit } from '@/app/ui/fonts';

export default function SideNav() {
  return (
    <div className={`flex h-full flex-col p-4 md:p-6 bg-white/70 dark:bg-slate-950/40 backdrop-blur-3xl border-r border-slate-200 dark:border-white/5 ${outfit.className} relative z-50 transition-colors duration-500`}>
      <Link
        className="mb-10 flex h-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-tunisia-red to-red-900 p-4 shadow-2xl shadow-red-500/20 md:h-32 transition-all hover:scale-[1.02] border border-white/10 group"
        href="/"
      >
        <div className="w-full text-white px-1 group-hover:scale-105 transition-transform duration-500">
          <TuniBillLogo showRed={false} />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-4">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 md:block relative overflow-hidden group">
           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tunisia-blue/5 to-transparent opacity-50 dark:opacity-100"></div>
        </div>
        
        <div className="flex flex-col gap-4">
          <ThemeToggle />
          <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
            <button className="flex h-[64px] w-full grow items-center justify-center gap-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4 text-sm font-bold text-slate-500 dark:text-slate-400 shadow-sm transition-all hover:bg-tunisia-red hover:text-white hover:border-tunisia-red hover:shadow-2xl hover:shadow-red-500/30 md:flex-none md:justify-start">
              <PowerIcon className="w-6 h-6" />
              <div className="hidden md:block uppercase tracking-[0.3em] text-[10px] font-black">Déconnexion</div>
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
