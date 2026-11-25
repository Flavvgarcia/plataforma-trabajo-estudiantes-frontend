'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CircularMatchBadge } from './CircularMatchBadge';
import { GapSection } from './GapSection';
import { ReportarGapDrawer } from './ReportarGapDrawer';
import {
  MODALIDAD_LABELS,
  type GapItem,
  type ReporteGapPayload,
  type VacanteConCoincidencia,
} from './data/types';

interface VacanteDetailClientProps {
  vacante: VacanteConCoincidencia;
}

export function VacanteDetailClient({ vacante }: VacanteDetailClientProps) {
  const [gaps, setGaps] = useState<GapItem[]>(vacante.coincidencia.gaps);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const openGapsCount = gaps.filter((g) => g.estado === 'abierto').length;
  const ubicacionTexto =
    vacante.modalidad === 'remoto' ? 'Remoto' : vacante.ciudad;

  const handleSubmitReport = (payload: ReporteGapPayload) => {
    setGaps((prev) =>
      prev.map((gap) =>
        payload.gapIds.includes(gap.id)
          ? {
              ...gap,
              estado: 'disputado',
              marcado_incorrecto:
                payload.motivo === 'marcado_incorrecto'
                  ? true
                  : gap.marcado_incorrecto,
              evidencia:
                payload.enlaceEvidencia ||
                payload.archivoNombre ||
                payload.comentario ||
                gap.evidencia,
            }
          : gap
      )
    );
    setIsReportOpen(false);
    setStatusMessage(
      payload.gapIds.length === 1
        ? 'Reporte enviado. Un administrador revisará el gap seleccionado.'
        : `Reporte enviado para ${payload.gapIds.length} gaps. Un administrador los revisará.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">
      <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-5 flex items-center gap-3 lg:mb-6 lg:flex-col lg:items-start lg:gap-2">
          <Link
            href="/vacantes"
            aria-label="Volver a vacantes"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200/60 hover:text-[#3B2DB2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2] lg:px-0 lg:hover:bg-transparent"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ←
            </span>
            <span className="hidden lg:inline">Volver a vacantes</span>
          </Link>

          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            <span className="lg:hidden">Detalle de la vacante</span>
            <span className="hidden lg:inline">
              Detalle de la vacante y gaps
            </span>
          </h1>
        </header>

        {statusMessage && (
          <div
            role="status"
            aria-live="polite"
            className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          >
            <span>{statusMessage}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="shrink-0 text-xs font-semibold text-emerald-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Cerrar
            </button>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:items-start lg:gap-6">
          <div className="space-y-6">
            <section
              aria-label="Resumen de la vacante"
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                    {vacante.titulo}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {vacante.empresa.nombre} · {ubicacionTexto} ·{' '}
                    {MODALIDAD_LABELS[vacante.modalidad]}
                  </p>
                </div>
                <CircularMatchBadge
                  porcentaje={vacante.coincidencia.porcentaje}
                  size={58}
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {vacante.resumen}
              </p>

              <div className="mt-3">
                <a
                  href={vacante.enlace_aplicar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded text-sm font-semibold text-[#3B2DB2] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                >
                  <span>Ver oferta completa</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            <GapSection
              habilidadesCoincidentes={
                vacante.coincidencia.habilidades_coincidentes
              }
              gaps={gaps}
              onOpenReport={() => setIsReportOpen(true)}
            />
          </div>

          <aside
            aria-label="Acciones de coincidencia"
            className="mt-6 space-y-4 lg:mt-0"
          >
            <div className="hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs lg:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                TU COINCIDENCIA
              </p>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#3B2DB2]">
                {vacante.coincidencia.porcentaje} %
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {openGapsCount > 0
                  ? `Cierra tus ${openGapsCount} ${
                      openGapsCount === 1 ? 'gap' : 'gaps'
                    } para ser el candidato ideal.`
                  : 'Todos tus gaps están en revisión o cerrados.'}
              </p>

              <div className="mt-4 space-y-2.5">
                <Link
                  href="/mis-cursos"
                  className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#3B2DB2] px-4 text-center text-sm font-semibold text-white transition hover:bg-[#31249A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                >
                  Tomar curso rápido con IA
                </Link>
                <Link
                  href="/mis-cvs"
                  className="flex min-h-11 w-full items-center justify-center rounded-xl border border-[#3B2DB2] bg-white px-4 py-2 text-center text-sm font-semibold text-[#3B2DB2] transition hover:bg-[#EEF0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                >
                  Generar CV adaptado para esta vacante
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-[#D99B52] bg-[#FEF6EB] p-4 text-xs leading-relaxed text-amber-950">
              <strong className="font-bold">Generado por IA.</strong> Este
              análisis puede contener errores. Usa{' '}
              <span className="lg:hidden">«Reportar»</span>
              <span className="hidden lg:inline">
                «Reportar / Aportar evidencia»
              </span>{' '}
              si algo no es correcto.
            </div>

            <div className="space-y-2.5 pt-2 lg:hidden">
              <Link
                href="/mis-cursos"
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#3B2DB2] px-4 text-center text-sm font-semibold text-white transition hover:bg-[#31249A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
              >
                Tomar curso rápido con IA
              </Link>
              <Link
                href="/mis-cvs"
                className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#3B2DB2] bg-white px-4 py-2 text-center text-sm font-semibold text-[#3B2DB2] transition hover:bg-[#EEF0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
              >
                Generar CV adaptado para esta vacante
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <ReportarGapDrawer
        isOpen={isReportOpen}
        gaps={gaps}
        onClose={() => setIsReportOpen(false)}
        onSubmitReport={handleSubmitReport}
      />
    </div>
  );
}
