import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Crear cuenta · Talented",
  description:
    "Crea tu cuenta en Talented como estudiante o empresa y comienza tu camino profesional.",
};

export default function RegistroPage() {
  return (
    <AuthShell subtitle="Crea tu cuenta y da el siguiente paso">
      <RegisterForm />
    </AuthShell>
  );
}
