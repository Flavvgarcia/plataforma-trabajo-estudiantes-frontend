import { ArrowLeft, ExternalLink, Star } from "lucide-react";
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
    <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
      <Link
        href="/empresas"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-bold text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Empresas
      </Link>

      <h1 className="mt-2 text-3xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
        Reseñas de empresa
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <EmpresaResumen empresa={empresa} />

          {empresa.fuenteExterna && (
            <section className="rounded-2xl border border-dashed border-[#C9C7DD] bg-white/60 p-6">
              <h2 className="text-lg font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
                Fuentes externas
              </h2>
              <p className="mt-2 text-[13px] text-[#4A4A68]">
                No cuentan en el puntaje de Talented.
              </p>
              <p className="mt-4 text-sm font-bold">
                <a
                  href={empresa.fuenteExterna.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
                >
                  {empresa.fuenteExterna.nombre}:{" "}
                  {empresa.fuenteExterna.rating.toFixed(1)}
                  <Star
                    size={14}
                    fill="currentColor"
                    aria-label="estrellas"
                    className="text-[#B45309]"
                  />
                  · Ver fuente
                  <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </p>
            </section>
          )}

          <VerificacionModal empresaId={empresa.id} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
            Comentarios
          </h2>
          {resenasEmpresa.length === 0 ? (
            <p className="rounded-2xl border border-[#E4E3F1] bg-white p-6 text-[15px] text-[#4A4A68]">
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
