'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const DESKTOP_NAV = [
  {
    label: 'Vacantes',
    href: '/vacantes',
    icon: 'M3 7h18v13H3z M8 7V4h8v3',
  },
  {
    label: 'Mis cursos',
    href: '/mis-cursos',
    icon: 'M3 5h6q3 0 3 2q0-2 3-2h6v14h-6q-3 0-3 2q0-2-3-2H3z M12 7v14',
  },
  {
    label: 'Mis insignias',
    href: '/mis-insignias',
    icon: 'M16 14l2 7-6-3-6 3 2-7 M18 9a6 6 0 1 1-12 0a6 6 0 1 1 12 0',
  },
  {
    label: 'Mis CVs',
    href: '/mis-cvs',
    icon: 'M6 2h8l4 5v15H6z M14 2v6h4',
  },
  {
    label: 'Empresas',
    href: '/empresas',
    icon: 'M5 3h14v18H5z M8 7h2m3 0h3m-8 4h2m3 0h3m-6 10v-6h4v6',
  },
  {
    label: 'Autoconocimiento',
    href: '/autoconocimiento',
    icon: 'M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0 M15 8l-2 6-5 2 2-6z',
  },
  {
    label: 'Mi perfil',
    href: '/mi-perfil',
    icon: 'M16 7a4 4 0 1 1-8 0a4 4 0 1 1 8 0 M3 21v-2a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v2',
  },
] as const;

const MOBILE_NAV = [
  { label: 'Vacantes', href: '/vacantes' },
  { label: 'Cursos', href: '/mis-cursos' },
  { label: 'Insignias', href: '/mis-insignias' },
  { label: 'Perfil', href: '/mi-perfil' },
] as const;

function TalentedLogo() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B47E0] to-[#3B2DB2] text-white shadow-xs"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M6.5 8.5h11M12 8.5v9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="17.5" cy="5.5" r="1.5" fill="currentColor" />
      </svg>
    </span>
  );
}

export function VacantesShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDetailPage = pathname !== '/vacantes' && pathname.startsWith('/vacantes/');

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] text-slate-900">
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-[#E4E3F1] bg-white px-3.5 py-5 lg:flex">
        <Link
          href="/vacantes"
          className="mb-6 flex items-center gap-2.5 rounded-xl px-2 py-1 text-[21px] font-bold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
        >
          <TalentedLogo />
          <span>Talented</span>
        </Link>

        <nav aria-label="Navegación principal" className="flex flex-col gap-1">
          {DESKTOP_NAV.map((item) => {
            const isActive =
              item.href === '/vacantes'
                ? pathname.startsWith('/vacantes')
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2] ${
                  isActive
                    ? 'bg-[#EEF0FF] font-semibold text-[#3B2DB2]'
                    : 'font-medium text-slate-700 hover:bg-[#F5F6FF] hover:text-[#3B2DB2]'
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <footer className="mt-auto pt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#E4E3F1] bg-white p-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-xs font-bold text-[#3B2DB2]">
              MF
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                María Fernanda
              </p>
              <p className="truncate text-xs text-slate-500">Estudiante</p>
            </div>
          </div>

          <Link
            href="/login"
            className="mt-3 inline-block px-3 text-xs font-semibold text-[#3B2DB2] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
          >
            Cerrar sesión
          </Link>
        </footer>
      </aside>

      <div className={`min-w-0 flex-1 ${isDetailPage ? '' : 'pb-16 lg:pb-0'}`}>
        {children}
      </div>

      {!isDetailPage && (
        <nav
          aria-label="Navegación móvil"
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white px-2 py-2 lg:hidden"
        >
          {MOBILE_NAV.map((item) => {
            const isActive =
              item.href === '/vacantes'
                ? pathname.startsWith('/vacantes')
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-10 rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2] ${
                  isActive
                    ? 'text-[#3B2DB2] underline decoration-2 underline-offset-4'
                    : 'text-[#3B2DB2]/80 hover:text-[#3B2DB2]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
