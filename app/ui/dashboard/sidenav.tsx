import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import {
  LogOut,
  Mail,
  LifeBuoy,
  Settings,
  MoreVertical
} from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { fetchSidebarData } from '@/app/lib/data';
import { outfit } from '@/app/ui/fonts';
import clsx from 'clsx';

export default async function SideNav() {
  const [counts, user] = await Promise.all([
    fetchSidebarData(),
    currentUser()
  ]);

  return (
    <div className={clsx(
      "flex h-full flex-col p-6 bg-[#fcfcfd]  border-r border-slate-200  transition-colors duration-500 relative overflow-hidden",
      outfit.className
    )}>
      {/* Decorative Dots Background */}
      <div className="absolute inset-0 opacity-[0.03]  pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#2d3fe0 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      {/* Top Section: Logo */}
      <div className="mb-6 px-1">
        <Link href="/dashboard" className="block group">
          <TuniBillLogo showRed={true} className="h-8 w-auto transition-transform group-hover:scale-105" />
        </Link>
      </div>

      {/* Middle Section: Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-4">
        <NavLinks counts={counts} />
      </div>

      {/* Bottom Section: Utilities & Profile */}
      <div className="mt-auto pt-5 space-y-4 border-t border-slate-200 ">
        <div className="space-y-0.5">
          <Link href="/contact" className="flex items-center gap-3 px-4 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-900  transition-colors group">
            <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-tunisia-red transition-colors" />
            <span>Nous Contacter</span>
          </Link>

          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-[10px] font-bold text-slate-500 hover:text-slate-900  transition-colors group">
            <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-tunisia-red transition-colors" />
            <span>Paramètres</span>
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/50  border border-slate-200  shadow-sm transition-all hover:shadow-md group relative">
          <div className="w-8 h-8 rounded-lg bg-tunisia-red/10 border border-tunisia-red/20 flex items-center justify-center text-tunisia-red text-[10px] font-black overflow-hidden relative">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{user?.firstName?.[0]}{user?.lastName?.[0] || user?.firstName?.[1]}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-slate-900  truncate tracking-tight leading-none mb-1">
              {user?.firstName}
            </p>
            <p className="text-[8px] text-slate-400 font-bold truncate tracking-tight leading-none">
              Business Account
            </p>
          </div>

          <SignOutButton>
            <button className="p-1 text-slate-400 hover:text-tunisia-red transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
