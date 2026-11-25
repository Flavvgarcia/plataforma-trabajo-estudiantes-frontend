"use client";

interface AiAnalysisCardProps {
  progress: number;
  fileName?: string;
}

export function AiAnalysisCard({ progress, fileName }: AiAnalysisCardProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const isComplete = clamped >= 100;

  return (
    <div className="bg-white border border-[#E4E3F1] rounded-2xl p-4">
      <p className="text-[16px] font-bold text-[#12122B]">
        {isComplete
          ? "Análisis completado · revisa tus datos"
          : "Analizando tu CV con IA…"}
      </p>

      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de análisis de CV con IA"
        className="mt-3 h-2 w-full rounded-full bg-[#EEEDFC] overflow-hidden"
      >
        <div
          className="h-full bg-[#3730A3] rounded-full transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <p className="mt-2.5 text-[13px] text-[#4A4A68]">
        {isComplete
          ? `100 % · ${fileName ? `datos extraídos de ${fileName}` : "listo para revisar"}`
          : `${clamped} % · puede tardar hasta 30 segundos`}
      </p>
    </div>
  );
}
