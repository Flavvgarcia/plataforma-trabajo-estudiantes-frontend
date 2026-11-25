'use client';

import { useId, useMemo, useState } from 'react';
import { VacanteCard } from './VacanteCard';
import {
  DesktopVacanteFilters,
  MobileVacanteFilters,
  type VacanteFilterState,
} from './VacanteFilters';
import {
  MODALIDAD_LABELS,
  TIPO_VACANTE_LABELS,
  type VacanteConCoincidencia,
} from './data/types';

interface VacantesListClientProps {
  initialVacantes: VacanteConCoincidencia[];
}

const INITIAL_FILTERS: VacanteFilterState = {
  ubicacion: '',
  modalidades: [],
  tipo: 'todos',
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string): string[] {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(' ') : [];
}

export function VacantesListClient({
  initialVacantes,
}: VacantesListClientProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<VacanteFilterState>(INITIAL_FILTERS);
  const searchInputId = useId();

  const hasActiveFilters =
    query.trim().length > 0 ||
    filters.ubicacion.trim().length > 0 ||
    filters.modalidades.length > 0 ||
    filters.tipo !== 'todos';

  const resetAll = () => {
    setQuery('');
    setFilters(INITIAL_FILTERS);
  };

  const filteredVacantes = useMemo(() => {
    const queryTokens = tokenize(query);
    const locTokens = tokenize(filters.ubicacion);

    return initialVacantes
      .filter((v) => {
        if (filters.modalidades.length > 0) {
          if (!filters.modalidades.includes(v.modalidad)) return false;
        }

        if (filters.tipo !== 'todos' && v.tipo !== filters.tipo) {
          return false;
        }

        if (locTokens.length > 0) {
          const locationHaystack = normalizeText(`${v.ciudad} ${v.estado_mx}`);
          if (!locTokens.every((token) => locationHaystack.includes(token))) {
            return false;
          }
        }

        if (queryTokens.length > 0) {
          const haystack = normalizeText(
            [
              v.titulo,
              v.resumen,
              v.empresa.nombre,
              v.fuente.nombre,
              v.ciudad,
              v.estado_mx,
              MODALIDAD_LABELS[v.modalidad],
              TIPO_VACANTE_LABELS[v.tipo],
              ...v.carreras,
              ...v.coincidencia.habilidades_coincidentes.map((h) => h.nombre),
              ...v.coincidencia.gaps.map((g) => g.nombre),
            ].join(' ')
          );
          if (!queryTokens.every((token) => haystack.includes(token))) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => b.coincidencia.porcentaje - a.coincidencia.porcentaje);
  }, [initialVacantes, query, filters]);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Vacantes
          </h1>
        </header>

        <search aria-label="Buscar y filtrar vacantes">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-6">
            <DesktopVacanteFilters
              filters={filters}
              onChange={setFilters}
              onReset={resetAll}
              hasActiveFilters={hasActiveFilters}
            />

            <div className="space-y-4">
              <div>
                <label htmlFor={searchInputId} className="sr-only">
                  Buscar vacantes por palabra clave
                </label>
                <input
                  id={searchInputId}
                  name="q"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por palabra clave"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="search"
                  className="min-h-12 w-full rounded-full border border-slate-300 bg-white px-5 text-base text-slate-900 shadow-xs placeholder:text-slate-400 focus-visible:border-[#3B2DB2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                />
              </div>

              <MobileVacanteFilters
                filters={filters}
                onChange={setFilters}
                onReset={resetAll}
                hasActiveFilters={hasActiveFilters}
              />

              <p role="status" aria-live="polite" className="sr-only">
                {filteredVacantes.length === 1
                  ? 'Se encontró 1 vacante'
                  : `Se encontraron ${filteredVacantes.length} vacantes`}
              </p>

              {filteredVacantes.length > 0 ? (
                <div className="space-y-3.5">
                  {filteredVacantes.map((vacante) => (
                    <VacanteCard key={vacante.id} vacante={vacante} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
                  <p className="text-base font-semibold text-slate-900">
                    No encontramos vacantes con esos filtros
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Prueba limpiando los filtros o buscando otra palabra clave.
                  </p>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#3B2DB2] px-5 text-sm font-semibold text-white hover:bg-[#31249A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </search>
      </main>
    </div>
  );
}
