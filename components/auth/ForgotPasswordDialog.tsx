"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AUTH_INPUT_CLASS } from "./useAccessibleValidation";

interface ForgotPasswordDialogProps {
  open: boolean;
  initialEmail?: string;
  onClose: () => void;
}

export function ForgotPasswordDialog({
  open,
  initialEmail = "",
  onClose,
}: ForgotPasswordDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const inputId = useId();
  const [email, setEmail] = useState(initialEmail);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      setEmail(initialEmail);
      setSubmitted(false);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initialEmail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setSubmitted(true);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
        }
      }}
      className="m-auto w-[min(420px,calc(100%-32px))] overflow-visible rounded-[14px] border-2 border-[#3730A3] bg-white p-6 text-[#12122B] shadow-[0_20px_50px_rgba(18,18,43,0.18)] backdrop:bg-[#12122B]/45 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          id={titleId}
          className="text-[20px] leading-[1.25] font-bold text-[#12122B]"
          style={{
            fontFamily:
              'var(--font-auth-heading), "Space Grotesk", Arial, Helvetica, sans-serif',
          }}
        >
          Recuperar contraseña
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Cerrar ventana"
          className="-mt-2 -mr-2 flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] text-[#4A4A68] hover:bg-[#EEEDFC] hover:text-[#3730A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
        >
          <span aria-hidden="true" className="text-[20px] leading-none">
            ×
          </span>
        </button>
      </div>

      {submitted ? (
        <div className="mt-4 space-y-4">
          <div
            role="status"
            className="rounded-[10px] border border-[#15803D] bg-[#F0FDF4] p-3.5 text-[14px] leading-[1.45] text-[#14532D]"
          >
            <p className="font-bold">✓ Solicitud registrada</p>
            <p className="mt-1">
              Si existe una cuenta asociada a <strong>{email}</strong>,
              enviaremos instrucciones para restablecer tu contraseña.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#3730A3] px-4 text-[15px] font-bold text-white transition-colors hover:bg-[#2E2785] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
          >
            Volver al inicio de sesión
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 space-y-4">
          <p className="text-[14px] leading-[1.45] text-[#4A4A68]">
            Ingresa el correo electrónico de tu cuenta y te enviaremos un enlace
            para crear una nueva contraseña.
          </p>

          <div className="group flex flex-col">
            <label
              htmlFor={inputId}
              className="mb-1.5 text-[13px] font-bold text-[#12122B]"
            >
              Correo electrónico
            </label>
            <input
              id={inputId}
              name="recovery-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@correo.com"
              autoComplete="email"
              spellCheck={false}
              enterKeyHint="done"
              required
              className={AUTH_INPUT_CLASS}
            />
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row-reverse">
            <button
              type="submit"
              className="flex min-h-[48px] flex-1 cursor-pointer items-center justify-center rounded-[12px] bg-[#3730A3] px-4 text-[15px] font-bold text-white transition-colors hover:bg-[#2E2785] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
            >
              Enviar enlace
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex min-h-[48px] cursor-pointer items-center justify-center rounded-[12px] border-2 border-[#3730A3] bg-white px-4 text-[15px] font-bold text-[#3730A3] transition-colors hover:bg-[#EEEDFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
