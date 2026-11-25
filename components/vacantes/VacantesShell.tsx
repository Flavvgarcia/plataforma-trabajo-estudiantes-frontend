'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { StudentSidebar } from "@/components/navigation/StudentSidebar";

const MOBILE_NAV = [
  { label: 'Vacantes', href: '/vacantes' },
  { label: 'Cursos', href: '/mis-cursos' },
  { label: 'Insignias', href: '/mis-insignias' },
  { label: 'Perfil', href: '/mi-perfil' },
] as const;

export function VacantesShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDetailPage = pathname !== '/vacantes' && pathname.startsWith('/vacantes/');

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />

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
