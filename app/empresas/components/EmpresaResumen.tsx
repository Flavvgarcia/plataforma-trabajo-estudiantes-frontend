import { MapPin } from "lucide-react";
import Stars from "./Stars";
import RatingBar from "./RatingBar";
import type { Empresa } from "../data/empresas";

export default function EmpresaResumen({ empresa }: { empresa: Empresa }) {
  return (
    <section className="rounded-2xl border border-[#E4E3F1] bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
            {empresa.nombre}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-[15px] text-[#4A4A68]">
            <MapPin size={16} aria-hidden="true" className="shrink-0" />
            {empresa.sector} · {empresa.ubicacion}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-5xl leading-none font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
            {empresa.rating.toFixed(1)}
          </span>
          <Stars rating={empresa.rating} size={20} className="mt-2" />
          <span className="mt-2 text-[13px] text-[#4A4A68]">
            {empresa.totalResenas} reseñas verificadas
          </span>
        </div>
      </div>

      <hr className="my-6 border-[#E4E3F1]" />

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
