"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificacionModal({
  empresaId,
}: {
  empresaId: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-indigo-600 py-4 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Dejar reseña
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="verifica-titulo"
            className="w-full max-w-md rounded-2xl border-2 border-indigo-600 bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="verifica-titulo"
              className="text-xl font-bold text-zinc-900"
            >
              Modal: verifica tu proceso
            </h2>

            <label className="mt-6 flex cursor-pointer items-center gap-3 text-base text-zinc-800">
              <input
                type="radio"
                name="verificacion"
                defaultChecked
                className="h-5 w-5 accent-indigo-600"
              />
              Tuve entrevista
            </label>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(`/empresas/${empresaId}/nueva`);
              }}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
