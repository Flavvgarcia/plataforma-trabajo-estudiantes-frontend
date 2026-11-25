'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type {
  GapItem,
  MotivoReporteGap,
  ReporteGapPayload,
} from './data/types';

interface ReportarGapDrawerProps {
  isOpen: boolean;
  gaps: GapItem[];
  onClose: () => void;
  onSubmitReport: (payload: ReporteGapPayload) => void;
}

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

const MOTIVOS: Array<{ value: MotivoReporteGap; label: string }> = [
  {
    value: 'marcado_incorrecto',
    label: 'El gap es incorrecto: ya lo demuestro',
  },
  {
    value: 'aportar_evidencia',
    label: 'Quiero aportar evidencia',
  },
  {
    value: 'error_ia',
    label: 'Es un error de la IA',
  },
];

function isValidOptionalUrl(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function ReportarGapDrawer({
  isOpen,
  gaps,
  onClose,
  onSubmitReport,
}: ReportarGapDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstGapCheckboxRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const titleId = useId();
  const urlId = useId();
  const urlErrorId = useId();
  const fileId = useId();
  const fileErrorId = useId();
  const commentId = useId();
  const gapsErrorId = useId();
  const motivoGroupName = useId();

  const getDefaultSelectedIds = () => {
    const defaultGap = gaps.find((g) => g.estado === 'abierto') ?? gaps[0];
    return defaultGap ? [defaultGap.id] : [];
  };

  const [selectedGapIds, setSelectedGapIds] = useState<string[]>(
    getDefaultSelectedIds
  );
  const [motivo, setMotivo] = useState<MotivoReporteGap>('marcado_incorrecto');
  const [enlaceEvidencia, setEnlaceEvidencia] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [comentario, setComentario] = useState('');

  const [gapsError, setGapsError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const resetForm = () => {
    setSelectedGapIds(getDefaultSelectedIds());
    setMotivo('marcado_incorrecto');
    setEnlaceEvidencia('');
    setArchivo(null);
    setComentario('');
    setGapsError(null);
    setUrlError(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Sync React open state with native <dialog>.showModal() / .close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Fallback for browsers without native <dialog closedby="any"> support (e.g. Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (
      typeof HTMLDialogElement !== 'undefined' &&
      'closedBy' in HTMLDialogElement.prototype
    ) {
      return;
    }

    const isOutside = (e: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    let pressedOutside = false;
    const handlePointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handleDialogClose = () => {
    if (dialogRef.current) {
      dialogRef.current.returnValue = '';
    }
    resetForm();
    onClose();
  };

  const toggleGap = (gapId: string) => {
    setSelectedGapIds((prev) => {
      const next = prev.includes(gapId)
        ? prev.filter((id) => id !== gapId)
        : [...prev, gapId];
      if (next.length > 0) setGapsError(null);
      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) {
      setArchivo(null);
      setFileError(null);
      return;
    }

    const isPdfOrImage =
      picked.type === 'application/pdf' || picked.type.startsWith('image/');
    if (!isPdfOrImage) {
      setArchivo(null);
      setFileError('Solo se permiten archivos PDF o imágenes.');
      e.target.value = '';
      return;
    }

    if (picked.size > MAX_FILE_BYTES) {
      setArchivo(null);
      setFileError('El archivo supera el límite máximo de 5 MB.');
      e.target.value = '';
      return;
    }

    setArchivo(picked);
    setFileError(null);
  };

  const handleUrlBlur = () => {
    if (enlaceEvidencia.trim() && !isValidOptionalUrl(enlaceEvidencia)) {
      setUrlError(
        'Ingresa un enlace válido que empiece con https:// o http://.'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let firstInvalid: HTMLElement | null = null;

    if (selectedGapIds.length === 0) {
      setGapsError('Selecciona al menos un gap para reportar.');
      firstInvalid = firstInvalid ?? firstGapCheckboxRef.current;
    } else {
      setGapsError(null);
    }

    if (!isValidOptionalUrl(enlaceEvidencia)) {
      setUrlError(
        'Ingresa un enlace válido que empiece con https:// o http://.'
      );
      firstInvalid = firstInvalid ?? urlInputRef.current;
    } else {
      setUrlError(null);
    }

    if (fileError) {
      firstInvalid = firstInvalid ?? fileInputRef.current;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    onSubmitReport({
      gapIds: selectedGapIds,
      motivo,
      enlaceEvidencia: enlaceEvidencia.trim(),
      archivoNombre: archivo?.name ?? null,
      comentario: comentario.trim(),
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={handleDialogClose}
      {...({ closedby: 'any' } as Record<string, string>)}
      className="m-0 h-dvh max-h-dvh w-full max-w-none flex-col bg-white p-0 text-slate-900 shadow-2xl open:flex lg:ml-auto lg:mr-0 lg:w-full lg:max-w-[400px] [&:modal]:overscroll-contain backdrop:overflow-hidden backdrop:bg-slate-900/45 backdrop:overscroll-contain"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 lg:border-b-0 lg:pb-1 lg:pt-6">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Cerrar reporte"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2] lg:hidden"
        >
          <span aria-hidden="true" className="text-lg">
            ←
          </span>
        </button>

        <h1 id={titleId} className="text-lg font-bold text-slate-900">
          <span className="lg:hidden">Reportar gap</span>
          <span className="hidden lg:inline">Reportar / Aportar evidencia</span>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-3 lg:pt-1"
      >
        <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
          Dinos si algún gap no es correcto o agrega evidencia para que lo
          revisemos.
        </p>

        <fieldset
          className="mt-4"
          aria-describedby={gapsError ? gapsErrorId : undefined}
        >
          <legend className="text-sm font-bold text-slate-900">
            ¿Sobre qué gap?
          </legend>
          <div className="mt-2 space-y-1.5">
            {gaps.map((gap, index) => {
              const checkboxId = `${titleId}-gap-${gap.id}`;
              const checked = selectedGapIds.includes(gap.id);
              return (
                <div key={gap.id} className="flex min-h-10 items-center gap-2.5">
                  <input
                    ref={index === 0 ? firstGapCheckboxRef : undefined}
                    id={checkboxId}
                    name="gaps"
                    type="checkbox"
                    value={gap.id}
                    checked={checked}
                    onChange={() => toggleGap(gap.id)}
                    aria-invalid={gapsError ? 'true' : undefined}
                    className="h-5 w-5 cursor-pointer rounded border-slate-400 accent-[#3B2DB2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                  />
                  <label
                    htmlFor={checkboxId}
                    className="cursor-pointer text-sm text-slate-800"
                  >
                    {gap.nombre}
                  </label>
                </div>
              );
            })}
          </div>
          {gapsError && (
            <p
              id={gapsErrorId}
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-700"
            >
              {gapsError}
            </p>
          )}
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-bold text-slate-900">
            ¿Qué pasó?
          </legend>
          <div className="mt-2 space-y-1.5">
            {MOTIVOS.map((item) => {
              const radioId = `${titleId}-motivo-${item.value}`;
              return (
                <div
                  key={item.value}
                  className="flex min-h-10 items-center gap-2.5"
                >
                  <input
                    id={radioId}
                    name={motivoGroupName}
                    type="radio"
                    value={item.value}
                    checked={motivo === item.value}
                    onChange={() => setMotivo(item.value)}
                    className="h-4.5 w-4.5 cursor-pointer border-slate-400 accent-[#3B2DB2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
                  />
                  <label
                    htmlFor={radioId}
                    className="cursor-pointer text-sm text-slate-800"
                  >
                    {item.label}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4">
          <label
            htmlFor={urlId}
            className="block text-sm font-bold text-slate-900"
          >
            Enlace a tu evidencia (opcional)
          </label>
          <input
            ref={urlInputRef}
            id={urlId}
            name="enlace_evidencia"
            type="url"
            value={enlaceEvidencia}
            onChange={(e) => {
              setEnlaceEvidencia(e.target.value);
              if (urlError && isValidOptionalUrl(e.target.value)) {
                setUrlError(null);
              }
            }}
            onBlur={handleUrlBlur}
            placeholder="https://github.com/mi-proyecto"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            aria-invalid={urlError ? 'true' : undefined}
            aria-describedby={urlError ? urlErrorId : undefined}
            className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-[#3B2DB2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
          />
          {urlError && (
            <p
              id={urlErrorId}
              role="alert"
              className="mt-1 text-xs font-medium text-red-700"
            >
              {urlError}
            </p>
          )}
        </div>

        <div className="mt-4">
          <div className="relative">
            <input
              ref={fileInputRef}
              id={fileId}
              name="archivo_evidencia"
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              aria-describedby={fileError ? fileErrorId : undefined}
              className="peer sr-only"
            />
            <label
              htmlFor={fileId}
              className="flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#3B2DB2]/70 bg-white px-4 py-3 text-center transition hover:bg-[#F6F7FF] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#3B2DB2]"
            >
              <span className="text-sm font-bold text-slate-900">
                Adjuntar archivo
              </span>
              <span className="mt-0.5 text-xs text-slate-600">
                {archivo ? archivo.name : 'PDF o imagen · máx. 5 MB'}
              </span>
            </label>
          </div>

          {archivo && (
            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-600">
              <span className="truncate">{archivo.name}</span>
              <button
                type="button"
                onClick={() => {
                  setArchivo(null);
                  setFileError(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="ml-2 shrink-0 font-semibold text-[#3B2DB2] hover:underline"
              >
                Quitar
              </button>
            </div>
          )}

          {fileError && (
            <p
              id={fileErrorId}
              role="alert"
              className="mt-1 text-xs font-medium text-red-700"
            >
              {fileError}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor={commentId}
            className="block text-sm font-bold text-slate-900"
          >
            Comentario
          </label>
          <textarea
            id={commentId}
            name="comentario"
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Explica brevemente qué debería cambiar"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-3.5 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-[#3B2DB2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
          />
        </div>

        <div className="mt-5 space-y-2.5">
          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#3B2DB2] px-4 text-sm font-semibold text-white transition hover:bg-[#31249A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
          >
            Enviar reporte
          </button>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#3B2DB2] bg-white px-4 text-sm font-semibold text-[#3B2DB2] transition hover:bg-[#EEF0FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2DB2]"
          >
            Cancelar
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Un administrador lo revisará y te avisaremos del resultado.
        </p>
      </form>
    </dialog>
  );
}
