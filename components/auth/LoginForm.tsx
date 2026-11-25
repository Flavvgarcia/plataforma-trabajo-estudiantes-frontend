"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { HOME_ROUTE, submitLogin, type UserRole } from "./authService";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { PasswordInput } from "./PasswordInput";
import { RoleSelector } from "./RoleSelector";
import {
  AUTH_ERROR_CLASS,
  AUTH_INPUT_CLASS,
  useAccessibleValidation,
} from "./useAccessibleValidation";

export function LoginForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  const [role, setRole] = useState<UserRole>("estudiante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  useAccessibleValidation(formRef, announcerRef);

  const handleGoogleClick = () => {
    router.push(HOME_ROUTE);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(":invalid");
      firstInvalid?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLogin({
        role,
        email: email.trim(),
        password,
      });
      router.push(HOME_ROUTE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <RoleSelector role={role} onChange={setRole} />

        <GoogleAuthButton
          label="Continuar con Google"
          disabled={isSubmitting}
          onClick={handleGoogleClick}
        />

        <div className="my-5 flex items-center gap-3" role="separator">
          <span className="h-px flex-1 bg-[#E4E3F1]" aria-hidden="true" />
          <span className="text-[13px] whitespace-nowrap text-[#4A4A68]">
            o con tu correo
          </span>
          <span className="h-px flex-1 bg-[#E4E3F1]" aria-hidden="true" />
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="group flex flex-col">
            <label
              htmlFor="email"
              className="mb-1.5 text-[13px] leading-[1.35] font-bold text-[#12122B]"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@correo.com"
              autoComplete="username"
              spellCheck={false}
              enterKeyHint="next"
              required
              aria-invalid="false"
              data-error="login-email-error"
              className={AUTH_INPUT_CLASS}
            />
            <div id="login-email-error" className={AUTH_ERROR_CLASS}>
              <span
                role="img"
                aria-label="Error"
                className="shrink-0 font-bold"
              >
                !
              </span>
              <span>
                Ingresa un correo válido con el formato nombre@correo.com.
              </span>
            </div>
          </div>

          <PasswordInput
            id="current-password"
            name="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            autoComplete="current-password"
            errorId="login-password-error"
            errorMessage="Ingresa tu contraseña para iniciar sesión."
            value={password}
            onChange={setPassword}
            enterKeyHint="done"
          />

          <div className="-mt-1">
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="inline-flex min-h-[44px] cursor-pointer items-center py-1 text-[13px] font-bold text-[#3730A3] hover:underline focus-visible:rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[12px] border-2 border-[#3730A3] bg-white px-4 text-[15px] leading-none font-bold text-[#3730A3] transition-colors hover:bg-[#EEEDFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3] disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión con correo"}
          </button>
        </form>

        <p className="mt-4 text-center text-[13px] leading-[1.4] text-[#4A4A68]">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/registro"
            className="inline-flex min-h-[44px] items-center font-bold text-[#3730A3] hover:underline focus-visible:rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
          >
            Crear cuenta
          </Link>
        </p>

        <div ref={announcerRef} aria-live="polite" className="sr-only" />
      </div>

      <ForgotPasswordDialog
        open={forgotOpen}
        initialEmail={email}
        onClose={() => setForgotOpen(false)}
      />
    </>
  );
}
