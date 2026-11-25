import Link from "next/link";
import { notFound } from "next/navigation";
import {
  empresas,
  getEmpresaById,
  getResenasByEmpresa,
} from "../data/empresas";
import EmpresaResumen from "../components/EmpresaResumen";
import ResenaCard from "../components/ResenaCard";
import VerificacionModal from "../components/VerificacionModal";

export function generateStaticParams() {
  return empresas.map((empresa) => ({ id: empresa.id }));
}

export default async function EmpresaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const empresa = getEmpresaById(id);

  if (!empresa) {
    notFound();
  }

  const resenasEmpresa = getResenasByEmpresa(empresa.id);

  return (
    <div className="px-12 py-10">
      <Link
        href="/empresas"
        className="text-sm font-semibold text-indigo-700 hover:underline"
      >
        ← Empresas
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-zinc-900">
        Reseñas de empresa
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <EmpresaResumen empresa={empresa} />

          {empresa.fuenteExterna && (
            <section className="rounded-2xl border border-dashed border-zinc-400 p-6">
              <h2 className="text-lg font-bold text-zinc-900">
                Fuentes externas
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                No cuentan en el puntaje de Talented.
              </p>
              <p className="mt-4 text-sm font-semibold">
                <a
                  href={empresa.fuenteExterna.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:underline"
                >
                  {empresa.fuenteExterna.nombre}:{" "}
                  {empresa.fuenteExterna.rating.toFixed(1)} ★ · Ver fuente ↗
                </a>
              </p>
            </section>
          )}

          <VerificacionModal empresaId={empresa.id} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-zinc-900">Comentarios</h2>
          {resenasEmpresa.length === 0 ? (
            <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 shadow-sm">
              Aún no hay reseñas para esta empresa. ¡Sé el primero en opinar!
            </p>
          ) : (
            resenasEmpresa.map((resena) => (
              <ResenaCard key={resena.id} resena={resena} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
