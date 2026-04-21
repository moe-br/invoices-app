'use client';

import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Truck,
  Users,
  Building2,
  BookOpen,
  Hash,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { outfit } from '@/app/ui/fonts';

interface NavLinksProps {
  counts: {
    invoices: number;
    customers: number;
    quotes: number;
    deliveryNotes: number;
    companies: number;
    catalog: number;
  };
}

export default function NavLinks({ counts }: NavLinksProps) {
  const pathname = usePathname();

  const sections: { title?: string; links: { name: string; href: string; icon: any; count?: number }[] }[] = [
    {
      links: [
        { name: 'ACCUEIL', href: '/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      title: 'DOCUMENTS',
      links: [
        { name: 'FACTURES', href: '/dashboard/invoices', icon: FileText, count: counts.invoices },
        { name: 'DEVIS', href: '#', icon: FilePlus, count: counts.quotes },
      ]
    },
    {
      title: 'CONTACTS',
      links: [
        { name: 'CLIENTS', href: '/dashboard/customers', icon: Users, count: counts.customers },
        { name: 'SOCIETES', href: '#', icon: Building2, count: counts.companies },
      ]
    },
    {
      title: 'CONFIGURATION',
      links: [
        { name: 'Numerotation', href: '/dashboard/configuration', icon: Hash },
      ]
    }
  ];

  return (
    <div className={`space-y-5 ${outfit.className}`}>
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-1.5">
          {section.title && (
            <h3 className="px-4 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-60">
              {section.title}
            </h3>
          )}
          <div className="space-y-0.5">
            {section.links.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'group relative flex h-10 items-center justify-between rounded-xl px-4 py-2 transition-all duration-300',
                    {
                      'bg-white text-slate-900 shadow-sm border border-slate-100': isActive,
                      'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50': !isActive,
                    }
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      "p-1 rounded-lg transition-all duration-300",
                      isActive ? "bg-tunisia-red/5 text-tunisia-red scale-105" : "text-slate-400 group-hover:text-slate-600"
                    )}>
                      <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className={clsx(
                      "text-[9px] font-black tracking-[0.1em] transition-all",
                      isActive ? "text-slate-900" : "text-slate-500 group-hover:translate-x-1"
                    )}>
                      {link.name}
                    </span>
                  </div>

                  {isActive && (
                    <div className="absolute left-0 w-0.5 h-3 bg-tunisia-red rounded-full"></div>
                  )}

                  {link.count !== undefined && (
                    <span className={clsx(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full tabular-nums transition-colors",
                      isActive ? "bg-tunisia-red/10 text-tunisia-red" : "text-slate-300 group-hover:text-slate-400"
                    )}>
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
