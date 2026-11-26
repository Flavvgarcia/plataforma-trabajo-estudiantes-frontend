import type { Focus } from "./resumeStore";

// Archivos de muestra para el perfil de Nova Software, en el mismo orden que la vista.
const files = {
  experiencia: {
    pdf: new URL("./descargas/experiencia.pdf", import.meta.url).href,
    docx: new URL("./descargas/experiencia.docx", import.meta.url).href,
  },
  habilidades: {
    pdf: new URL("./descargas/habilidades.pdf", import.meta.url).href,
    docx: new URL("./descargas/habilidades.docx", import.meta.url).href,
  },
};

export default function ResumeDownloads({ focus, revision, approved }: {
  focus: Focus; revision: number; approved: boolean;
}) {
  const style = "grid min-h-12 place-items-center rounded-xl border-2 border-[#3930aa] bg-white px-2 text-sm font-bold text-[#3930aa]";
  return (
    <div className="grid grid-cols-2 gap-2">
      {(["pdf", "docx"] as const).map(ext => {
        const label = ext === "pdf" ? "Descargar PDF" : "Descargar Word";
        return approved ? (
          <a key={ext} className={style + " hover:bg-[#eeedfc]"} href={files[focus][ext]}
            download={`CV-Maria-Fernanda-Lopez-Nova-Software-v${revision}.${ext}`}>{label}</a>
        ) : <button key={ext} className={style + " opacity-55"} disabled>{label}</button>;
      })}
    </div>
  );
}
