import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import TuniBillLogo from '@/app/ui/tunibill-logo';
import {
  LogOut,
  HeadphonesIcon,
  Settings,
  Sparkles,
} from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { fetchSidebarData } from '@/app/lib/data';
import { outfit } from '@/app/ui/fonts';

export default async function SideNav() {
  let user: Awaited<ReturnType<typeof currentUser>> = null;
  let counts = { invoices: 0, customers: 0, quotes: 0, deliveryNotes: 0, companies: 0, catalog: 0 };

  try {
    [counts, user] = await Promise.all([
      fetchSidebarData(),
      currentUser()
    ]);
  } catch (e) {
    // Clerk API may fail transiently — render sidebar anyway
    console.error('SideNav data fetch error:', e);
    try { counts = await fetchSidebarData(); } catch {}
  }

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? user?.firstName?.[1] ?? ''}`;

  return (
    <div className={`flex h-full flex-col bg-[#fafafa] border-r border-slate-100 transition-colors duration-500 relative overflow-hidden ${outfit.className}`}>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 0)', backgroundSize: '20px 20px' }}
      />

      {/* ── Logo ─────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-5 border-b border-slate-100 relative">
        <Link href="/dashboard" className="block group">
          <TuniBillLogo showRed={true} className="h-8 w-auto transition-all group-hover:scale-105" />
        </Link>

        {/* Live badge */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[7px] font-black uppercase tracking-widest text-emerald-600">Live</span>
        </div>
      </div>

      {/* ── Nav Links ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1 custom-scrollbar">
        <NavLinks counts={counts} />
      </div>

      {/* ── Bottom utilities ─────────────────────────── */}
      <div className="px-3 pb-4 space-y-1 border-t border-slate-100 pt-3">
        <Link
          href="/contact"
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-md hover:shadow-slate-100 transition-all group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow-sm transition-all">
            <HeadphonesIcon className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-bold tracking-wide">Support</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-md hover:shadow-slate-100 transition-all group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow-sm transition-all">
            <Settings className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-bold tracking-wide">Paramètres</span>
        </Link>
      </div>

      {/* ── User profile card ────────────────────────── */}
      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-gradient-to-br from-tunisia-red/20 to-tunisia-blue/20 flex items-center justify-center">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[11px] font-black text-slate-700">{initials}</span>
              )}
            </div>
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>

          {/* Name + plan */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-slate-900 truncate leading-none mb-0.5">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-tunisia-red" />
              <p className="text-[8px] text-slate-400 font-bold truncate leading-none uppercase tracking-wider">
                Pro Plan
              </p>
            </div>
          </div>

          {/* Sign out */}
          <SignOutButton>
            <button
              className="p-1.5 rounded-lg text-slate-300 hover:text-tunisia-red hover:bg-tunisia-red/5 transition-all"
              title="Se déconnecter"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
