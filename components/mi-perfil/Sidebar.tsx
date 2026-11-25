"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingIcon,
  CompassIcon,
  FileTextIcon,
  TalentedLogoIcon,
  UserIcon,
} from "./icons";

interface SidebarProps {
  initials: string;
  fullName: string;
  role: string;
}

const NAV_ITEMS = [
  { href: "/vacantes", label: "Vacantes", Icon: BriefcaseIcon },
  { href: "/mis-cursos", label: "Mis cursos", Icon: BookOpenIcon },
  { href: "/mis-insignias", label: "Mis insignias", Icon: AwardIcon },
  { href: "/mis-cvs", label: "Mis CVs", Icon: FileTextIcon },
  { href: "/empresas", label: "Empresas", Icon: BuildingIcon },
  { href: "/autoconocimiento", label: "Autoconocimiento", Icon: CompassIcon },
  { href: "/mi-perfil", label: "Mi perfil", Icon: UserIcon },
] as const;

export function Sidebar({ initials, fullName, role }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[248px] shrink-0 flex-col justify-between bg-white border-r border-[#E4E3F1] sticky top-0 h-screen py-5 px-3.5">
      <div>
        <Link
          href="/vacantes"
          className="flex items-center gap-3 px-2 mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3] rounded-xl"
        >
          <TalentedLogoIcon />
          <span
            className="text-[22px] font-bold text-[#12122B] tracking-tight"
            style={{ fontFamily: "var(--font-talented-grotesk), sans-serif" }}
          >
            Talented
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const isActive =
              pathname === href || (href === "/mi-perfil" && !pathname);

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`min-h-[44px] flex items-center gap-3 px-3 rounded-xl text-[15px] transition-colors ${
                  isActive
                    ? "bg-[#EEEDFC] text-[#3730A3] font-bold"
                    : "text-[#12122B] font-normal hover:bg-[#F7F6FC]"
                }`}
              >
                <Icon
                  className={isActive ? "text-[#3730A3]" : "text-[#4A4A68]"}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="border border-[#E4E3F1] rounded-2xl p-3 flex items-center gap-3 bg-white">
          <div className="h-9 w-9 rounded-full bg-[#EEEDFC] text-[#3730A3] font-bold text-[13px] flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-[#12122B] truncate">
              {fullName}
            </p>
            <p className="text-[13px] text-[#4A4A68] truncate">{role}</p>
          </div>
        </div>

        <Link
          href="/login"
          className="mt-3 inline-flex items-center min-h-[36px] px-2 text-[13px] font-bold text-[#3730A3] hover:underline"
        >
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
