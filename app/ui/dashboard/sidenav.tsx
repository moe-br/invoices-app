import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { handleSignOut } from '@/app/lib/actions';


import { outfit } from '@/app/ui/fonts';

export default function SideNav() {
  return (
    <div className={`flex h-full flex-col p-4 md:p-6 bg-slate-100/50 backdrop-blur-3xl border-r border-slate-200/60 ${outfit.className}`}>
      <Link
        className="mb-8 flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-tunisia-red to-red-800 p-4 shadow-2xl shadow-red-500/20 md:h-32 transition-transform hover:scale-[1.02] active:scale-98"
        href="/"
      >
        <div className="w-32 text-white md:w-36">
          <TuniBillLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-3">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-2xl bg-white/30 border border-white/20 md:block"></div>
        <form action={handleSignOut}>
          <button className="flex h-[52px] w-full grow items-center justify-center gap-3 rounded-2xl bg-white/60 border border-slate-200/60 p-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-tunisia-red hover:text-white hover:border-tunisia-red hover:shadow-lg hover:shadow-red-500/20 md:flex-none md:justify-start md:p-4">
            <PowerIcon className="w-6" />
            <div className="hidden md:block uppercase tracking-widest text-[10px] font-black">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
