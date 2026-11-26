import { useSyncExternalStore } from "react";

export type Focus = "experiencia" | "habilidades";

type Report = { revision: number; section: string; comment: string };
type Review = { revision: number; focus: Focus; approved: boolean; reports: Report[] };

const key = "talented:demo:mis-cvs:nova:v1";
const changed = "talented:cv-review-changed";
const initial: Review = { revision: 1, focus: "experiencia", approved: false, reports: [] };
let temporary: string | null = null;

function snapshot() {
  if (temporary !== null) return temporary;
  try { return localStorage.getItem(key); } catch { return null; }
}

function decode(raw: string | null): Review {
  if (!raw) return initial;
  try {
    const data = JSON.parse(raw);
    if (Number.isSafeInteger(data?.revision) && data.revision > 0 &&
        ["experiencia", "habilidades"].includes(data.focus) &&
        typeof data.approved === "boolean" && Array.isArray(data.reports) &&
        data.reports.every((r: Report) => r && Number.isSafeInteger(r.revision) &&
          typeof r.section === "string" && typeof r.comment === "string")) return data;
  } catch { /* Una copia local dañada se abre como un borrador nuevo. */ }
  return initial;
}

function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener(changed, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(changed, notify);
  };
}

export function useReview() {
  return decode(useSyncExternalStore(subscribe, snapshot, () => null));
}

export function saveReview(revision: number, update: (current: Review) => Review) {
  const current = decode(snapshot());
  if (current.revision !== revision) return "Esta versión cambió. Revisa el CV actual.";
  const next = JSON.stringify(update(current));
  let message = "";
  try {
    localStorage.setItem(key, next);
    temporary = null;
  } catch {
    temporary = next;
    message = "El navegador solo permite conservar este cambio hasta cerrar o recargar la página.";
  }
  window.dispatchEvent(new Event(changed));
  return message;
}
