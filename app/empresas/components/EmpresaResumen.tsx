import Stars from "./Stars";
import RatingBar from "./RatingBar";
import type { Empresa } from "../data/empresas";

export default function EmpresaResumen({ empresa }: { empresa: Empresa }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">{empresa.nombre}</h2>
          <p className="mt-1 text-zinc-500">
            {empresa.sector} · {empresa.ubicacion}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-5xl font-bold leading-none text-zinc-900">
            {empresa.rating.toFixed(1)}
          </span>
          <Stars rating={empresa.rating} size={20} className="mt-2" />
          <span className="mt-2 text-sm text-zinc-500">
            {empresa.totalResenas} reseñas verificadas
          </span>
        </div>
      </div>

      <hr className="my-6 border-zinc-200" />

      <div className="flex flex-col gap-5">
        {empresa.categorias.map((categoria) => (
          <RatingBar
            key={categoria.label}
            label={categoria.label}
            value={categoria.value}
          />
        ))}
      </div>
    </section>
  );
}
