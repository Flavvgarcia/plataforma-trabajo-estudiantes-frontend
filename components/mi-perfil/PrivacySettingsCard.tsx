"use client";

import { CheckCircleIcon, EmptyCircleIcon } from "./icons";
import type { PrivacyFieldKey, PrivacySettings } from "./types";

interface PrivacySettingsCardProps {
  privacy: PrivacySettings;
  onToggle: (key: PrivacyFieldKey) => void;
}

const PRIVACY_ITEMS: { key: PrivacyFieldKey; label: string }[] = [
  { key: "estudios", label: "Estudios" },
  { key: "experiencia", label: "Experiencia" },
  { key: "habilidades", label: "Habilidades" },
  { key: "idiomas", label: "Idiomas" },
  { key: "notas", label: "Notas" },
];

export function PrivacySettingsCard({
  privacy,
  onToggle,
}: PrivacySettingsCardProps) {
  return (
    <section
      aria-labelledby="privacy-heading"
      className="lg:bg-white lg:border lg:border-[#E4E3F1] lg:rounded-2xl lg:p-4"
    >
      <h2
        id="privacy-heading"
        className="text-[18.72px] font-bold text-[#12122B]"
        style={{ fontFamily: "var(--font-talented-grotesk), sans-serif" }}
      >
        ¿Qué ven las empresas?
      </h2>

      <div className="mt-3 grid grid-cols-1 lg:grid-cols-5 gap-2.5 lg:gap-3">
        {PRIVACY_ITEMS.map(({ key, label }) => {
          const isPublic = privacy[key];

          return (
            <button
              key={key}
              type="button"
              role="switch"
              aria-checked={isPublic}
              aria-label={`${label}: ${isPublic ? "Público" : "Privado"}`}
              onClick={() => onToggle(key)}
              className="min-h-[54px] bg-white border border-[#E4E3F1] rounded-xl px-4 py-2.5 flex items-center justify-between text-left hover:border-[#3730A3]/40 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-[13px] font-bold text-[#12122B]">{label}</p>
                <p className="text-[13px] font-bold text-[#4A4A68]">
                  {isPublic ? "Público" : "Privado"}
                </p>
              </div>
              {isPublic ? (
                <CheckCircleIcon className="shrink-0" />
              ) : (
                <EmptyCircleIcon className="shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
