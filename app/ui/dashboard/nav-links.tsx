'use client';

import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  Users,
  Building2,
  Hash,
  ChevronRight,
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

const sections = (counts: NavLinksProps['counts']) => [
  {
    links: [
      {
        name: 'Tableau de Bord',
        href: '/dashboard',
        icon: LayoutDashboard,
        exact: true,
        count: undefined,
      },
    ],
  },
  {
    title: 'Documents',
    links: [
      {
        name: 'Factures',
        href: '/dashboard/invoices',
        icon: FileText,
        count: counts.invoices,
        exact: false,
      },
      {
        name: 'Devis',
        href: '/dashboard/devis',
        icon: FilePlus2,
        count: counts.quotes,
        exact: false,
      },
    ],
  },
  {
    title: 'Contacts',
    links: [
      {
        name: 'Clients',
        href: '/dashboard/customers',
        icon: Users,
        count: counts.customers,
        exact: false,
      },
      {
        name: 'Sociétés',
        href: '/dashboard/companies',
        icon: Building2,
        count: counts.companies,
        exact: false,
      },
    ],
  },
  {
    title: 'Réglages',
    links: [
      {
        name: 'Numérotation',
        href: '/dashboard/configuration',
        icon: Hash,
        exact: false,
        count: undefined,
      },
    ],
  },
];

export default function NavLinks({ counts }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={`space-y-6 ${outfit.className}`}>
      {sections(counts).map((section, idx) => (
        <div key={idx}>
          {section.title && (
            <div className="flex items-center gap-2 px-3 mb-2">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400/70 select-none">
                {section.title}
              </p>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
          )}

          <ul className="space-y-1">
            {section.links.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300',
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                        : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-md hover:shadow-slate-100'
                    )}
                  >
                    {/* Icon container */}
                    <div
                      className={clsx(
                        'flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 shrink-0',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow-sm'
                      )}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>

                    {/* Label */}
                    <span
                      className={clsx(
                        'flex-1 text-[11px] font-bold tracking-wide leading-none transition-all duration-200',
                        isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-900 group-hover:translate-x-0.5'
                      )}
                    >
                      {link.name}
                    </span>

                    {/* Count badge */}
                    {link.count !== undefined && link.count > 0 && (
                      <span
                        className={clsx(
                          'text-[9px] font-black px-2 py-0.5 rounded-full tabular-nums transition-all',
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                        )}
                      >
                        {link.count}
                      </span>
                    )}

                    {/* Chevron (only on hover for inactive) */}
                    {!isActive && (
                      <ChevronRight
                        className="w-3 h-3 text-slate-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    )}

                    {/* Active left accent bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-tunisia-red rounded-r-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
