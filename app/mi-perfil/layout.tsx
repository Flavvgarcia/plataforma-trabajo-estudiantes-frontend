import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StudentLayout } from "@/components/navigation/StudentLayout";

export const metadata: Metadata = {
  title: "Mi perfil | Talented",
  description:
    "Gestiona tu perfil profesional, CV analizado por IA y privacidad.",
};

export default function MiPerfilLayout({ children }: { children: ReactNode }) {
  return <StudentLayout>{children}</StudentLayout>;
}
