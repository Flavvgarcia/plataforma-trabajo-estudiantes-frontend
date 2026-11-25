"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  File,
  Newspaper,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import talentedLogo from "@/components/auth/assets/talented-logo.svg";
import { INITIAL_PROFILE } from "@/components/mi-perfil/types";

const navigation = [
  { href: "/vacantes", label: "Vacantes", Icon: BriefcaseBusiness },
  { href: "/mis-cursos", label: "Mis cursos", Icon: BookOpen },
  { href: "/mis-insignias", label: "Mis insignias", Icon: Award },
  { href: "/mis-cvs", label: "Mis CVs", Icon: File },
  { href: "/empresas", label: "Empresas", Icon: Newspaper },
  { href: "/autoconocimiento", label: "Autoconocimiento", Icon: Compass },
  { href: "/mi-perfil", label: "Mi perfil", Icon: UserRound },
] as const;

type SidebarProfile = Pick<typeof INITIAL_PROFILE, "initials" | "fullName" | "role">;

export function StudentSidebar({
  profile = INITIAL_PROFILE,
}: {
  profile?: SidebarProfile;
}) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col overflow-y-auto border-r border-[#E4E3F1] bg-white px-3.5 py-5 text-[#12122B] [font-family:var(--font-talented-inter),Arial,sans-serif] lg:flex">
      <Link
        href="/vacantes"
        className="mb-5 flex w-fit items-center gap-2.5 rounded-xl px-2 text-[22px] font-bold tracking-tight [font-family:var(--font-talented-grotesk),Arial,sans-serif] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
      >
        <Image src={talentedLogo} alt="" width={36} height={36} />
        Talented
      </Link>

      <nav aria-label="Navegación principal" className="flex flex-col gap-1">
        {navigation.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-[15px] leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3] ${
                active
                  ? "bg-[#EEEDFC] font-bold text-[#3730A3]"
                  : "text-[#12122B] hover:bg-[#F7F6FC]"
              }`}
            >
              <Icon
                aria-hidden="true"
                size={20}
                className={active ? "shrink-0" : "shrink-0 text-[#4A4A68]"}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-5">
        <div className="flex items-center gap-2.5 rounded-[14px] border border-[#E4E3F1] p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#EEEDFC] text-[13px] font-bold text-[#3730A3]">
            {profile.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] leading-[18px] font-bold">
              {profile.fullName}
            </p>
            <p className="truncate text-[13px] leading-[18px] text-[#4A4A68]">
              {profile.role}
            </p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-1.5 inline-flex min-h-[30px] items-center rounded-md px-3 text-[13px] font-bold text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
