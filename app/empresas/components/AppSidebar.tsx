"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

const navItems: NavItem[] = [
  {
    label: "Vacantes",
    href: "/vacantes",
    icon: (
      <Icon>
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </Icon>
    ),
  },
  {
    label: "Mis cursos",
    href: "/mis-cursos",
    icon: (
      <Icon>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </Icon>
    ),
  },
  {
    label: "Mis insignias",
    href: "/mis-insignias",
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
      </Icon>
    ),
  },
  {
    label: "Mis CVs",
    href: "/mis-cvs",
    icon: (
      <Icon>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8M8 17h8" />
      </Icon>
    ),
  },
  {
    label: "Empresas",
    href: "/empresas",
    icon: (
      <Icon>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
      </Icon>
    ),
  },
  {
    label: "Autoconocimiento",
    href: "/autoconocimiento",
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </Icon>
    ),
  },
  {
    label: "Mi perfil",
    href: "/mi-perfil",
    icon: (
      <Icon>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
      </Icon>
    ),
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-zinc-200 bg-white px-5 py-6">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-b from-indigo-500 to-indigo-700 text-xl font-bold text-white shadow-sm">
          T
        </span>
        <span className="text-xl font-bold text-zinc-900">Talented</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-700">
            MF
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">
              María Fernanda
            </p>
            <p className="text-xs text-zinc-500">Estudiante</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-indigo-700 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
