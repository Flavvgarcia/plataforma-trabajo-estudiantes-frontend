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
    <div className="px-12 py-10">
      <Link
        href={`/empresas/${empresa.id}`}
        className="text-sm font-semibold text-indigo-700 hover:underline"
      >
        ← {empresa.nombre}
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-zinc-900">Reseñar empresa</h1>
      <p className="mt-2 text-zinc-500">
        Comparte tu experiencia para ayudar a otros estudiantes.
      </p>

      <div className="mt-8 max-w-2xl">
        <NuevaResenaForm empresa={empresa} />
      </div>
    </div>
  );
}
