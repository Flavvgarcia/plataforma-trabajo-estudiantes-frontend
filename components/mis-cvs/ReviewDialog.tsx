import { useEffect, useRef, useState, type FormEvent } from "react";
import { saveReview, type Focus } from "./resumeStore";

export type DialogRequest = {
  mode: "regenerate" | "report"; revision: number; focus: Focus;
  previous?: { section: string; comment: string };
};

export default function ReviewDialog({ request, onClose, onSaved }: {
  request: DialogRequest; onClose: () => void; onSaved: (message: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [section, setSection] = useState(request.previous?.section ?? "Experiencia");
  const [comment, setComment] = useState(request.previous?.comment ?? "");
  const regenerate = request.mode === "regenerate";
  const nextFocus = request.focus === "experiencia" ? "habilidades" : "experiencia";
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!regenerate && !comment.trim()) return;
    const warning = saveReview(request.revision, current => {
      if (regenerate) return { ...current, focus: nextFocus, revision: current.revision + 1, approved: false };
      const report = { revision: current.revision, section, comment: comment.trim() };
      return { ...current, reports: [...current.reports.filter(r => r.revision !== current.revision), report] };
    });
    onSaved(warning || (regenerate ? "Nueva versión lista para revisar." : "Reporte guardado en este navegador."));
    onClose();
  }

  return (
    <dialog ref={dialog} onCancel={onClose} aria-labelledby="review-title"
      className="fixed inset-0 m-auto max-h-[90dvh] w-[min(92vw,440px)] overflow-auto rounded-2xl border border-[#e2e1f1] bg-white p-6 text-[#171633] shadow-xl backdrop:bg-[#16142e]/45">
      <form onSubmit={submit} className="grid gap-4">
        <h2 id="review-title" className="text-xl font-bold">{regenerate ? "Regenerar CV" : "Reportar un error"}</h2>
        {regenerate ? <p className="text-sm text-[#535373]">
          La nueva versión mostrará primero {nextFocus === "habilidades" ? "tus habilidades" : "tu experiencia"}.
          Conserva los datos originales y vuelve a quedar pendiente de aprobación.
        </p> : (
          <>
            <p className="text-sm text-[#535373]">Reporte de la versión {request.revision}. En esta demo se guarda en este navegador.</p>
            <div className="grid gap-1 text-sm font-bold">
              <label htmlFor="report-section">Sección</label>
              <select id="report-section" value={section} onChange={e => setSection(e.target.value)} className="rounded-lg border border-[#aaa8c5] bg-white p-2 font-normal">
                {["Experiencia", "Insignias", "Educación", "Habilidades", "Datos de contacto"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <label className="grid gap-1 text-sm font-bold">¿Qué dato es incorrecto?
              <textarea value={comment} onChange={e => setComment(e.target.value)} required maxLength={500} rows={3}
                className="resize-y rounded-lg border border-[#aaa8c5] p-2 font-normal" />
            </label>
          </>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" onClick={onClose} className="min-h-11 rounded-lg border border-[#ccc9e7] px-4 font-bold text-[#3930aa]">Cancelar</button>
          <button disabled={!regenerate && !comment.trim()} className="min-h-11 rounded-lg bg-[#3930aa] px-4 font-bold text-white disabled:opacity-50">
            {regenerate ? "Generar versión" : "Guardar reporte"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
