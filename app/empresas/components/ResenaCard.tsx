import { BadgeCheck, Flag } from "lucide-react";
import Stars from "./Stars";
import type { Resena } from "../data/empresas";

export default function ResenaCard({ resena }: { resena: Resena }) {
  return (
    <article className="rounded-2xl border border-[#E4E3F1] bg-white p-6">
      <Stars rating={resena.rating} size={18} />
      <p className="mt-4 text-[15px] text-[#12122B]">{resena.comentario}</p>
      <div className="mt-4 flex items-center justify-between">
        {resena.verificada ? (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#15803D]">
            <BadgeCheck size={16} aria-hidden="true" />
            Reseña verificada
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[13px] font-bold text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
        >
          <Flag size={14} aria-hidden="true" />
          Reportar
        </button>
      </div>
    </article>
  );
}
