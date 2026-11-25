import type { ReactNode } from "react";
import { StudentLayout } from "@/components/navigation/StudentLayout";
import { StudentSidebar } from "@/components/navigation/StudentSidebar";

export default function EmpresasLayout({ children }: { children: ReactNode }) {
  return (
    <StudentLayout>
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </StudentLayout>
  );
}
