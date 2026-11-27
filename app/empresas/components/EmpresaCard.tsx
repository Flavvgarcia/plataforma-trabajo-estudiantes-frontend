import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Stars from "./Stars";
import type { Empresa } from "../data/empresas";

export default function EmpresaCard({ empresa }: { empresa: Empresa }) {
  return (
    <Link
      href={`/empresas/${empresa.id}`}
      className="group flex flex-col rounded-2xl border border-[#E4E3F1] bg-white p-6 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif] group-hover:text-[#3730A3]">
            {empresa.nombre}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-[13px] text-[#4A4A68]">
            <MapPin size={14} aria-hidden="true" className="shrink-0" />
            {empresa.sector} · {empresa.ubicacion}
          </p>
        </div>
        <span className="text-2xl leading-none font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
          {empresa.rating.toFixed(1)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Stars rating={empresa.rating} size={16} />
        <span className="text-[13px] text-[#4A4A68]">
          {empresa.totalResenas} reseñas
        </span>
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#3730A3] group-hover:underline">
        Ver reseñas
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
