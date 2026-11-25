import type { GapItem, HabilidadCoincidente } from './data/types';

interface GapSectionProps {
  habilidadesCoincidentes: HabilidadCoincidente[];
  gaps: GapItem[];
  onOpenReport: () => void;
}

export function GapSection({
  habilidadesCoincidentes,
  gaps,
  onOpenReport,
}: GapSectionProps) {
  return (
    <div className="space-y-6">
      <section aria-labelledby="heading-coincides">
        <h2
          id="heading-coincides"
          className="text-base font-bold text-slate-900 sm:text-lg"
        >
          Por qué coincides
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {habilidadesCoincidentes.map((hab) => (
            <div
              key={hab.habilidad_id}
              className="rounded-xl border border-[#52B788] bg-[#EFFAF3] p-4"
            >
              <div className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-sm font-bold text-emerald-800"
                >
                  ✓
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {hab.nombre}
                </h3>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                {hab.evidencia}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="heading-falta">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="heading-falta"
            className="text-base font-bold text-slate-900 sm:text-lg"
          >
            Lo que te falta
          </h2>

          <button
            type="button"
            onClick={onOpenReport}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#3B2DB2] bg-white px-4 text-xs font-semibold text-[#3B2DB2] transition hover:bg-[#EEF0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2] sm:text-sm"
          >
            <span className="sm:hidden">Reportar</span>
            <span className="hidden sm:inline">
              Reportar / Aportar evidencia
            </span>
          </button>
        </div>

        <p className="mt-1 text-xs text-slate-600 sm:text-sm">
          La vacante lo pide, pero tu perfil aún no lo demuestra.
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {gaps.map((gap) => {
            const isDisputado = gap.estado === 'disputado';
            return (
              <div
                key={gap.id}
                className="rounded-xl border border-[#D99B52] bg-[#FEF6EB] p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <span
                      aria-hidden="true"
                      className="text-sm font-bold text-amber-800"
                    >
                      !
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {gap.nombre}
                    </h3>
                  </div>
                  {isDisputado && (
                    <span className="shrink-0 rounded-full bg-[#EEF0FF] px-2 py-0.5 text-[11px] font-semibold text-[#3B2DB2]">
                      En revisión
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                  {gap.motivo_vacante}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
