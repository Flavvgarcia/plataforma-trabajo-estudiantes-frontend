interface AiBannerProps {
  message: string;
  reportLabel: string;
  /** Callback cuando el usuario pulsa "Reportar error" — conectar al back cuando esté listo */
  onReport?: () => void;
  /** Si es true o por defecto en paneles estrechos, coloca el botón en una línea separada */
  stacked?: boolean;
}

/**
 * Banner permanente de aviso de IA.
 * Según DESING.md y Figma:
 * Título y texto fluyen juntos en un párrafo y el enlace "Reportar error" va abajo en su propia línea.
 */
export function AiBanner({
  message,
  reportLabel,
  onReport,
  stacked = false,
}: AiBannerProps) {
  if (stacked) {
    return (
      <div
        role="note"
        aria-label="Aviso de contenido generado por IA"
        className="flex flex-col gap-2 p-4 rounded-xl border border-[#B45309] bg-[#FFF3DC]"
      >
        <p className="text-[13px] leading-relaxed text-[#5C3600]">
          <strong className="font-bold mr-1.5">Generado por IA.</strong>
          <span>{message}</span>
        </p>
        <div>
          <button
            type="button"
            onClick={onReport}
            className="text-[13px] font-bold text-[#3730A3] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3] rounded"
          >
            {reportLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="note"
      aria-label="Aviso de contenido generado por IA"
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-4 rounded-xl border border-[#B45309] bg-[#FFF3DC]"
    >
      <p className="text-[13px] leading-relaxed text-[#5C3600] flex-1">
        <strong className="font-bold mr-1.5">Generado por IA.</strong>
        <span>{message}</span>
      </p>
      <div>
        <button
          type="button"
          onClick={onReport}
          className="text-[13px] font-bold text-[#3730A3] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3] rounded whitespace-nowrap"
        >
          {reportLabel}
        </button>
      </div>
    </div>
  );
}
