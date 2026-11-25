import type { ReactNode } from "react";
import AppSidebar from "./components/AppSidebar";

export default function EmpresasLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f4f8]">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
