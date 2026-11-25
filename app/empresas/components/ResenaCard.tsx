import Stars from "./Stars";
import type { Resena } from "../data/empresas";

export default function ResenaCard({ resena }: { resena: Resena }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <Stars rating={resena.rating} size={18} />
      <p className="mt-4 text-zinc-800">{resena.comentario}</p>
      <div className="mt-5 flex items-center justify-between">
        {resena.verificada ? (
          <span className="text-sm font-semibold text-green-600">
            Reseña verificada
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="text-sm font-semibold text-indigo-700 hover:underline"
        >
          Reportar
        </button>
      </div>
    </article>
  );
}
