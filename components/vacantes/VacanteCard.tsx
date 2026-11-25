import Link from 'next/link';
import { CircularMatchBadge } from './CircularMatchBadge';
import {
  MODALIDAD_LABELS,
  TIPO_VACANTE_LABELS,
  type VacanteConCoincidencia,
} from './data/types';

interface VacanteCardProps {
  vacante: VacanteConCoincidencia;
}

export function VacanteCard({ vacante }: VacanteCardProps) {
  const ubicacionTexto =
    vacante.modalidad === 'remoto' ? 'Remoto' : vacante.ciudad;
  const esDirecta = vacante.fuente.tipo === 'directa';

  return (
    <article className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-[#3B2DB2]/40 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold leading-snug text-slate-900 sm:text-[17px]">
            <Link
              href={`/vacantes/${vacante.id}`}
              className="focus:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-[#3B2DB2] focus-visible:after:ring-offset-2"
            >
              {vacante.titulo}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {vacante.empresa.nombre} · {ubicacionTexto}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#3B2DB2]">
              {MODALIDAD_LABELS[vacante.modalidad]}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold text-[#3B2DB2]">
              {TIPO_VACANTE_LABELS[vacante.tipo]}
            </span>
          </div>

          <div className="mt-3">
            {esDirecta ? (
              <span className="text-xs font-semibold text-[#3B2DB2]">
                Publicada en {vacante.fuente.nombre}
              </span>
            ) : (
              <a
                href={vacante.enlace_aplicar}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1 rounded text-xs font-semibold text-[#3B2DB2] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
              >
                <span>Fuente: {vacante.fuente.nombre}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <CircularMatchBadge porcentaje={vacante.coincidencia.porcentaje} />
      </div>
    </article>
  );
}
