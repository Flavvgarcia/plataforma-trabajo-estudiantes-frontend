import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { empresas, getEmpresaById } from "../../data/empresas";
import NuevaResenaForm from "../../components/NuevaResenaForm";

export function generateStaticParams() {
  return empresas.map((empresa) => ({ id: empresa.id }));
}

export default async function NuevaResenaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const empresa = getEmpresaById(id);

  if (!empresa) {
    notFound();
  }

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
      <Link
        href={`/empresas/${empresa.id}`}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-bold text-[#3730A3] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {empresa.nombre}
      </Link>

      <h1 className="mt-2 text-3xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
        Reseñar empresa
      </h1>
      <p className="mt-2 text-[15px] text-[#4A4A68]">
        Comparte tu experiencia para ayudar a otros estudiantes.
      </p>

      <div className="mt-8 max-w-2xl">
        <NuevaResenaForm empresa={empresa} />
      </div>
    </div>
  );
}
