import Link from "next/link";
import Stars from "./Stars";
import type { Empresa } from "../data/empresas";

export default function EmpresaCard({ empresa }: { empresa: Empresa }) {
  return (
    <Link
      href={`/empresas/${empresa.id}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-700">
            {empresa.nombre}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {empresa.sector} · {empresa.ubicacion}
          </p>
        </div>
        <span className="text-2xl font-bold leading-none text-zinc-900">
          {empresa.rating.toFixed(1)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Stars rating={empresa.rating} size={16} />
        <span className="text-sm text-zinc-500">
          {empresa.totalResenas} reseñas
        </span>
      </div>

      <span className="mt-5 text-sm font-semibold text-indigo-700 group-hover:underline">
        Ver reseñas →
      </span>
    </Link>
  );
}
