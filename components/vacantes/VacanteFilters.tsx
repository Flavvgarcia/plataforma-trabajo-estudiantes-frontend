'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  MODALIDAD_LABELS,
  TIPO_VACANTE_LABELS,
  type Modalidad,
  type TipoVacante,
} from './data/types';

export interface VacanteFilterState {
  ubicacion: string;
  modalidades: Modalidad[];
  tipo: TipoVacante | 'todos';
}

interface VacanteFiltersProps {
  filters: VacanteFilterState;
  onChange: (next: VacanteFilterState) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const MODALIDADES: Modalidad[] = ['remoto', 'hibrido', 'presencial'];
const TIPOS: Array<{ value: TipoVacante | 'todos'; label: string }> = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencia', label: TIPO_VACANTE_LABELS.residencia },
  { value: 'practicas', label: TIPO_VACANTE_LABELS.practicas },
  { value: 'primer_empleo', label: TIPO_VACANTE_LABELS.primer_empleo },
];

type MobilePanel = 'ubicacion' | 'modalidad' | 'tipo' | null;

export function DesktopVacanteFilters({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: VacanteFiltersProps) {
  const ubicacionId = useId();
  const radioName = useId();

  const toggleModalidad = (mod: Modalidad) => {
    const exists = filters.modalidades.includes(mod);
    const modalidades = exists
      ? filters.modalidades.filter((m) => m !== mod)
      : [...filters.modalidades, mod];
    onChange({ ...filters, modalidades });
  };

  return (
    <aside
      aria-label="Filtros de vacantes"
      className="hidden rounded-2xl border border-[#E4E3F1] bg-white p-5 lg:block"
    >
      <div className="flex items-center justify-between gap-2">
        <h2
          className="text-base font-bold text-[#12122B]"
          style={{
            fontFamily:
              'var(--font-talented-grotesk), "Space Grotesk", sans-serif',
          }}
        >
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="rounded text-xs font-semibold text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="mt-4 space-y-5">
        <div>
          <label
            htmlFor={ubicacionId}
            className="block text-sm font-semibold text-[#12122B]"
          >
            Ubicación
          </label>
          <input
            id={ubicacionId}
            name="ubicacion"
            type="text"
            value={filters.ubicacion}
            onChange={(e) =>
              onChange({ ...filters, ubicacion: e.target.value })
            }
            placeholder="Morelia, Mich."
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
            className="mt-1.5 min-h-11 w-full rounded-xl border border-[#E4E3F1] bg-white px-3.5 text-base text-[#12122B] placeholder:text-[#6B6A8A] focus-visible:border-[#3730A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-[#12122B]">
            Modalidad
          </legend>
          <div className="mt-2.5 space-y-2.5">
            {MODALIDADES.map((mod) => {
              const id = `${ubicacionId}-mod-${mod}`;
              const checked = filters.modalidades.includes(mod);
              return (
                <div key={mod} className="flex items-center gap-2.5">
                  <input
                    id={id}
                    name="modalidad"
                    type="checkbox"
                    value={mod}
                    checked={checked}
                    onChange={() => toggleModalidad(mod)}
                    className="h-4.5 w-4.5 cursor-pointer rounded border-[#6B6A8A] accent-[#3730A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
                  />
                  <label
                    htmlFor={id}
                    className="cursor-pointer text-sm font-medium text-[#12122B]"
                  >
                    {MODALIDAD_LABELS[mod]}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-[#12122B]">Tipo</legend>
          <div className="mt-2.5 space-y-2.5">
            {TIPOS.map((item) => {
              const id = `${ubicacionId}-tipo-${item.value}`;
              return (
                <div key={item.value} className="flex items-center gap-2.5">
                  <input
                    id={id}
                    name={radioName}
                    type="radio"
                    value={item.value}
                    checked={filters.tipo === item.value}
                    onChange={() => onChange({ ...filters, tipo: item.value })}
                    className="h-4.5 w-4.5 cursor-pointer border-[#6B6A8A] accent-[#3730A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
                  />
                  <label
                    htmlFor={id}
                    className="cursor-pointer text-sm font-medium text-[#12122B]"
                  >
                    {item.label}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </aside>
  );
}

export function MobileVacanteFilters({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: VacanteFiltersProps) {
  const [openPanel, setOpenPanel] = useState<MobilePanel>(null);
  const baseId = useId();
  const panelId = `${baseId}-panel`;

  const togglePanel = (panel: Exclude<MobilePanel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const toggleModalidad = (mod: Modalidad) => {
    const exists = filters.modalidades.includes(mod);
    const modalidades = exists
      ? filters.modalidades.filter((m) => m !== mod)
      : [...filters.modalidades, mod];
    onChange({ ...filters, modalidades });
  };

  const pillClasses = (isActive: boolean, isOpen: boolean) =>
    `inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-3.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3] ${
      isOpen || isActive
        ? 'border-[#3730A3] bg-[#EEEDFC] text-[#3730A3]'
        : 'border-[#3730A3]/70 bg-white text-[#3730A3]'
    }`;

  return (
    <div className="lg:hidden">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-expanded={openPanel === 'ubicacion'}
          aria-controls={panelId}
          onClick={() => togglePanel('ubicacion')}
          className={pillClasses(
            filters.ubicacion.trim().length > 0,
            openPanel === 'ubicacion'
          )}
        >
          <span>Ubicación</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-expanded={openPanel === 'modalidad'}
          aria-controls={panelId}
          onClick={() => togglePanel('modalidad')}
          className={pillClasses(
            filters.modalidades.length > 0,
            openPanel === 'modalidad'
          )}
        >
          <span>
            Modalidad
            {filters.modalidades.length > 0
              ? ` (${filters.modalidades.length})`
              : ''}
          </span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-expanded={openPanel === 'tipo'}
          aria-controls={panelId}
          onClick={() => togglePanel('tipo')}
          className={pillClasses(filters.tipo !== 'todos', openPanel === 'tipo')}
        >
          <span>
            {filters.tipo === 'todos'
              ? 'Tipo'
              : TIPO_VACANTE_LABELS[filters.tipo]}
          </span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onReset();
              setOpenPanel(null);
            }}
            className="ml-auto min-h-11 px-2 text-xs font-semibold text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
          >
            Limpiar
          </button>
        )}
      </div>

      {openPanel && (
        <div
          id={panelId}
          className="mt-3 rounded-2xl border border-[#E4E3F1] bg-white p-4 shadow-sm"
        >
          {openPanel === 'ubicacion' && (
            <div>
              <label
                htmlFor={`${baseId}-mobile-ubicacion`}
                className="block text-sm font-semibold text-[#12122B]"
              >
                Ubicación
              </label>
              <input
                id={`${baseId}-mobile-ubicacion`}
                name="ubicacion_movil"
                type="text"
                value={filters.ubicacion}
                onChange={(e) =>
                  onChange({ ...filters, ubicacion: e.target.value })
                }
                placeholder="Morelia, Mich."
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="search"
                className="mt-1.5 min-h-12 w-full rounded-xl border border-[#E4E3F1] bg-white px-3.5 text-base text-[#12122B] placeholder:text-[#6B6A8A] focus-visible:border-[#3730A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
              />
            </div>
          )}

          {openPanel === 'modalidad' && (
            <fieldset>
              <legend className="text-sm font-semibold text-[#12122B]">
                Modalidad
              </legend>
              <div className="mt-2.5 space-y-1">
                {MODALIDADES.map((mod) => {
                  const id = `${baseId}-mobile-mod-${mod}`;
                  return (
                    <div
                      key={mod}
                      className="flex min-h-11 items-center gap-3"
                    >
                      <input
                        id={id}
                        name="modalidad_movil"
                        type="checkbox"
                        value={mod}
                        checked={filters.modalidades.includes(mod)}
                        onChange={() => toggleModalidad(mod)}
                        className="h-5 w-5 cursor-pointer rounded border-[#6B6A8A] accent-[#3730A3]"
                      />
                      <label
                        htmlFor={id}
                        className="cursor-pointer text-sm font-medium text-[#12122B]"
                      >
                        {MODALIDAD_LABELS[mod]}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          )}

          {openPanel === 'tipo' && (
            <fieldset>
              <legend className="text-sm font-semibold text-[#12122B]">
                Tipo de vacante
              </legend>
              <div className="mt-2.5 space-y-1">
                {TIPOS.map((item) => {
                  const id = `${baseId}-mobile-tipo-${item.value}`;
                  return (
                    <div
                      key={item.value}
                      className="flex min-h-11 items-center gap-3"
                    >
                      <input
                        id={id}
                        name={`${baseId}-mobile-tipo`}
                        type="radio"
                        value={item.value}
                        checked={filters.tipo === item.value}
                        onChange={() =>
                          onChange({ ...filters, tipo: item.value })
                        }
                        className="h-5 w-5 cursor-pointer border-[#6B6A8A] accent-[#3730A3]"
                      />
                      <label
                        htmlFor={id}
                        className="cursor-pointer text-sm font-medium text-[#12122B]"
                      >
                        {item.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpenPanel(null)}
              className="min-h-10 rounded-lg bg-[#3730A3] px-4 text-sm font-semibold text-white hover:bg-[#2E2785] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
            >
              Listo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
