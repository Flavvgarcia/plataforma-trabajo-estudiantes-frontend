import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión · Talented",
  description:
    "Inicia sesión en Talented como estudiante o empresa con Google o correo electrónico.",
};

export default function LoginPage() {
  return (
    <AuthShell subtitle="Tu primer empleo, con ventaja">
      <LoginForm />
    </AuthShell>
  );
}
