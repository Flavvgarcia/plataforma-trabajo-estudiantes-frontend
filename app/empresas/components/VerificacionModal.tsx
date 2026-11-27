"use client";

import { SquarePen, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]";

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
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3730A3] text-base font-bold text-white transition-colors hover:bg-[#2E2888] ${focusRing}`}
      >
        <SquarePen size={18} aria-hidden="true" />
        Dejar reseña
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#12122B]/40 p-4"
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="verifica-titulo"
            className="w-full max-w-md rounded-2xl border-2 border-[#3730A3] bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="verifica-titulo"
                className="text-xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]"
              >
                Verifica tu proceso
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                autoFocus
                className={`-mt-2 -mr-2 grid size-11 shrink-0 place-items-center rounded-lg text-[#4A4A68] hover:bg-[#F7F6FC] ${focusRing}`}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-[15px] font-bold text-[#12122B]">
              <input
                type="radio"
                name="verificacion"
                defaultChecked
                className="size-5 accent-[#3730A3]"
              />
              Tuve entrevista
            </label>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(`/empresas/${empresaId}/nueva`);
              }}
              className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#3730A3] text-base font-bold text-white transition-colors hover:bg-[#2E2888] ${focusRing}`}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
