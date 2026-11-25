"use client";

import { useState } from "react";
import Link from "next/link";
import profile from "./perfil-demo.json";
import ResumeCard from "./ResumeCard";
import ResumeDownloads from "./ResumeDownloads";
import ReviewDialog, { type DialogRequest } from "./ReviewDialog";
import StudentSidebar from "./StudentSidebar";
import { saveReview, useReview } from "./resumeStore";

export default function AdaptedResume() {
  const review = useReview();
  const [dialog, setDialog] = useState<DialogRequest | null>(null);
  const [notice, setNotice] = useState("");
  const report = review.reports.find(item => item.revision === review.revision);

  function openDialog(mode: DialogRequest["mode"]) {
    setDialog({ mode, focus: review.focus, revision: review.revision, previous: report });
  }

  function approve() {
    const warning = saveReview(review.revision, current => ({ ...current, approved: true }));
    setNotice(warning || "Versión aprobada. Ya puedes descargar el CV.");
  }

  return (
    <div lang="es" className="min-h-dvh bg-[#f7f6fc] font-sans leading-[1.4] text-[#171633] min-[901px]:grid min-[901px]:grid-cols-[clamp(200px,19.5vw,254px)_minmax(0,1fr)]">
      <StudentSidebar />
      <main className="mx-auto w-full max-w-[640px] px-4 pt-5 pb-12 min-[901px]:mx-0 min-[901px]:max-w-[1500px] min-[901px]:p-[clamp(18px,2.2vw,32px)]">
        <header className="mb-4">
          <h1 className="hidden text-[28px] leading-tight font-bold min-[901px]:block">CV adaptado</h1>
          <p className="mt-1 hidden text-sm text-[#535373] min-[901px]:block">{profile.empresa} · Versión {review.revision}</p>
          <h1 className="mb-4 flex items-center gap-5 text-lg font-bold min-[901px]:hidden">
            <Link href="/vacantes" aria-label="Volver a Vacantes" className="grid min-h-10 min-w-8 place-items-center">←</Link>
            CV para {profile.empresa}
          </h1>
          <div className="flex items-center gap-2 rounded-xl border border-[#e2e1f1] bg-white px-3 py-2.5 text-sm text-[#535373] min-[901px]:hidden">
            <b className="rounded-full bg-[#eeedfc] px-2 py-1 text-xs text-[#3730a3]">Paso 7 de 9</b>
            CV adaptado · v{review.revision}
            <div aria-hidden="true" className="ml-auto h-2 w-14 rounded-full bg-[#e4e3f2]">
              <div className="h-full w-7/9 rounded-full bg-[#3930aa]" />
            </div>
          </div>
        </header>
        <div className="grid items-start gap-3 min-[901px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[901px]:grid-rows-[auto_1fr] min-[901px]:gap-x-4">
          <aside aria-label="Aviso sobre contenido generado por IA" className="rounded-xl border border-[#ea8b37] bg-[#fff4df] p-3 text-sm text-[#663700] min-[901px]:col-start-2">
            <strong>Adaptación de muestra.</strong> Se reorganizan los datos del perfil para esta vacante. Revísalos antes de aprobar.{" "}
            <button onClick={() => openDialog("report")} className="font-bold text-[#3930aa] hover:underline">
              {report ? "Ver o editar reporte" : "Reportar error"}
            </button>
          </aside>
          <ResumeCard focus={review.focus} />
          <div role="group" aria-label="Acciones del CV" className="grid gap-3 min-[901px]:col-start-2 min-[901px]:row-start-2">
            <button disabled={review.approved} onClick={approve}
              className="min-h-12 rounded-xl bg-[#3930aa] px-3 text-sm font-bold text-white enabled:hover:bg-[#292179] disabled:bg-[#e4f2eb] disabled:text-[#235838]">
              {review.approved ? "✓ CV aprobado" : "Aprobar"}
            </button>
            <button onClick={() => openDialog("regenerate")} className="min-h-12 rounded-xl border-2 border-[#3930aa] bg-white px-2 text-sm font-bold text-[#3930aa] hover:bg-[#eeedfc]">
              Rechazar / Regenerar
            </button>
            <ResumeDownloads focus={review.focus} revision={review.revision} approved={review.approved} />
            <p className="text-sm text-[#535373]">
              {review.approved ? "Aprobado en este navegador. Puedes descargar esta versión." : "Aprueba esta versión para descargarla en PDF o Word."}
            </p>
            <p role="status" className="text-sm font-medium text-[#3930aa] empty:hidden">{notice}</p>
          </div>
        </div>
      </main>
      {dialog && <ReviewDialog request={dialog} onClose={() => setDialog(null)} onSaved={setNotice} />}
    </div>
  );
}
