"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { HOME_ROUTE, submitRegister, type UserRole } from "./authService";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { PasswordInput } from "./PasswordInput";
import { RoleSelector } from "./RoleSelector";
import {
  AUTH_ERROR_CLASS,
  AUTH_INPUT_CLASS,
  useAccessibleValidation,
} from "./useAccessibleValidation";

const PASSWORD_PATTERN = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}";

export function RegisterForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  const [role, setRole] = useState<UserRole>("estudiante");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await submitRegister({
        role,
        fullName: fullName.trim(),
        companyName: role === "empresa" ? companyName.trim() : undefined,
        email: email.trim(),
        password,
      });
      router.push(HOME_ROUTE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        {role === "empresa" ? (
          <div className="group flex flex-col">
            <label
              htmlFor="company-name"
              className="mb-1.5 text-[13px] leading-[1.35] font-bold text-[#12122B]"
            >
              Nombre de la empresa
            </label>
            <input
              id="company-name"
              name="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej. Innovación Digital S.A."
              autoComplete="organization"
              enterKeyHint="next"
              required
              aria-invalid="false"
              data-error="register-company-error"
              className={AUTH_INPUT_CLASS}
            />
            <div id="register-company-error" className={AUTH_ERROR_CLASS}>
              <span
                role="img"
                aria-label="Error"
                className="shrink-0 font-bold"
              >
                !
              </span>
              <span>Ingresa el nombre de tu empresa.</span>
            </div>
          </div>
        ) : null}

        <div className="group flex flex-col">
          <label
            htmlFor="full-name"
            className="mb-1.5 text-[13px] leading-[1.35] font-bold text-[#12122B]"
          >
            {role === "empresa" ? "Nombre de contacto" : "Nombre completo"}
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={
              role === "empresa"
                ? "Ej. Carlos Mendoza"
                : "Ej. Sofía Hernández"
            }
            autoComplete="name"
            enterKeyHint="next"
            required
            aria-invalid="false"
            data-error="register-name-error"
            className={AUTH_INPUT_CLASS}
          />
          <div id="register-name-error" className={AUTH_ERROR_CLASS}>
            <span role="img" aria-label="Error" className="shrink-0 font-bold">
              !
            </span>
            <span>Ingresa tu nombre para crear la cuenta.</span>
          </div>
        </div>

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
            placeholder={
              role === "empresa" ? "contacto@empresa.com" : "nombre@correo.com"
            }
            autoComplete="username"
            spellCheck={false}
            enterKeyHint="next"
            required
            aria-invalid="false"
            data-error="register-email-error"
            className={AUTH_INPUT_CLASS}
          />
          <div id="register-email-error" className={AUTH_ERROR_CLASS}>
            <span role="img" aria-label="Error" className="shrink-0 font-bold">
              !
            </span>
            <span>
              Ingresa un correo válido con el formato nombre@correo.com.
            </span>
          </div>
        </div>

        <PasswordInput
          id="new-password"
          name="new-password"
          label="Contraseña"
          placeholder="Crea una contraseña segura"
          autoComplete="new-password"
          errorId="register-password-error"
          errorMessage="La contraseña no cumple con todos los requisitos indicados arriba."
          value={password}
          onChange={setPassword}
          minLength={8}
          pattern={PASSWORD_PATTERN}
          describedBy="register-password-rules"
          enterKeyHint="done"
          hintContent={
            <ul
              id="register-password-rules"
              className="mb-2 list-disc pl-[18px] text-[13px] leading-[1.45] text-[#4A4A68] transition-colors group-has-[input:user-invalid]:font-semibold group-has-[input:user-invalid]:text-[#B42318] group-has-[input.user-invalid-fallback]:font-semibold group-has-[input.user-invalid-fallback]:text-[#B42318] group-has-[input:user-valid]:invisible group-has-[input.user-valid-fallback]:invisible"
            >
              <li>Mínimo 8 caracteres</li>
              <li>Una letra mayúscula y una minúscula</li>
              <li>Un número y un símbolo</li>
            </ul>
          }
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[12px] border-2 border-[#3730A3] bg-white px-4 text-[15px] leading-none font-bold text-[#3730A3] transition-colors hover:bg-[#EEEDFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta con correo"}
        </button>
      </form>

      <p className="mt-4 text-center text-[13px] leading-[1.4] text-[#4A4A68]">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="inline-flex min-h-[44px] items-center font-bold text-[#3730A3] hover:underline focus-visible:rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
        >
          Iniciar sesión
        </Link>
      </p>

      <div ref={announcerRef} aria-live="polite" className="sr-only" />
    </div>
  );
}
