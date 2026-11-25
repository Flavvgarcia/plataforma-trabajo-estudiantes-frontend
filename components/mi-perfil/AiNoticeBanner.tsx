"use client";

import { useState } from "react";

interface AiNoticeBannerProps {
  onReportError: (details: string) => Promise<void>;
}

export function AiNoticeBanner({ onReportError }: AiNoticeBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reported, setReported] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!details.trim()) return;
    setIsSubmitting(true);
    await onReportError(details.trim());
    setIsSubmitting(false);
    setDetails("");
    setIsModalOpen(false);
    setReported(true);
  };

  return (
    <>
      <div className="bg-[#DCD9FA] border border-[#3730A3] rounded-xl px-4 py-3 text-[13px] leading-snug">
        <strong className="font-bold text-[#3730A3]">Generado por IA.</strong>{" "}
        <span className="text-[#4A4A68]">
          Revisa y corrige los datos que extrajo de tu CV.
        </span>{" "}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="font-bold text-[#3730A3] hover:underline cursor-pointer lg:block lg:mt-0.5"
        >
          Reportar error
        </button>
        {reported ? (
          <p className="mt-1 text-[12px] font-medium text-[#15803D]">
            Reporte enviado para revisión.
          </p>
        ) : null}
      </div>

      {isModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-error-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#12122B]/40 p-4"
        >
          <div className="w-full max-w-md bg-white border-[1.5px] border-[#3730A3] rounded-2xl p-5 shadow-xl">
            <h3
              id="ai-error-modal-title"
              className="text-[18px] font-bold text-[#12122B]"
              style={{ fontFamily: "var(--font-talented-grotesk), sans-serif" }}
            >
              Reportar error de la IA
            </h3>
            <p className="mt-1 text-[13px] text-[#4A4A68]">
              Cuéntanos qué dato extrajo mal la IA para corregirlo y mejorar el
              modelo.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="ai-error-details"
                  className="block text-[13px] font-bold text-[#12122B] mb-1.5"
                >
                  Descripción del error
                </label>
                <textarea
                  id="ai-error-details"
                  rows={3}
                  required
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="Ej. Mi semestre actual es 7.º, no 5.º"
                  className="w-full rounded-xl border border-[#E4E3F1] px-3.5 py-2.5 text-[14px] text-[#12122B] placeholder:text-[#6B6A8A] focus:outline-none focus:border-[#3730A3]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="min-h-[44px] px-4 rounded-xl border border-[#E4E3F1] bg-white text-[14px] font-bold text-[#4A4A68] hover:bg-[#F7F6FC] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !details.trim()}
                  className="min-h-[44px] px-5 rounded-xl bg-[#3730A3] text-white text-[14px] font-bold hover:bg-[#2E2785] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Enviando…" : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
