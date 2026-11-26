"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TalentedLogoIcon } from "../mi-perfil/icons";

const ADMIN_NAV = [
  { href: "/admin/resumen", label: "Resumen" },
  { href: "/admin/vacantes", label: "Vacantes" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/moderacion", label: "Moderación" },
  { href: "/mis-cursos", label: "Cursos con IA" },
  { href: "/admin/auditoria", label: "Auditoría" },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[264px] shrink-0 flex-col bg-white border-r border-[#E4E3F1] sticky top-0 h-screen py-5 px-3.5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-6">
        <TalentedLogoIcon />
        <span
          className="text-[22px] font-bold text-[#12122B] tracking-tight"
          style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
        >
          Talented
        </span>
      </div>

      {/* Sección label */}
      <p className="px-2 mb-3 text-[13px] font-bold text-[#4A4A68] tracking-widest uppercase">
        Administración
      </p>

      {/* Nav */}
      <nav aria-label="Navegación de administración" className="flex flex-col gap-1">
        {ADMIN_NAV.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`min-h-[44px] flex items-center px-3 rounded-xl text-[14px] transition-colors ${
                isActive
                  ? "bg-[#EEEDFC] text-[#12122B] font-bold"
                  : "text-[#12122B] font-normal hover:bg-[#F7F6FC]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
