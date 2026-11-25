import type { ReactNode } from "react";
import { StudentLayout } from "@/components/navigation/StudentLayout";
import { VacantesShell } from "@/components/vacantes/VacantesShell";

export default function VacantesLayout({ children }: { children: ReactNode }) {
  return (
    <StudentLayout>
      <VacantesShell>{children}</VacantesShell>
    </StudentLayout>
  );
}
