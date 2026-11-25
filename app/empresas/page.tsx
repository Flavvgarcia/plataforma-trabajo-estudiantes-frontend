import { empresas } from "./data/empresas";
import EmpresaCard from "./components/EmpresaCard";

export default function EmpresasPage() {
  return (
    <div className="px-12 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Empresas</h1>
      <p className="mt-2 text-zinc-500">
        Consulta las reseñas de empresas y comparte tu experiencia.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {empresas.map((empresa) => (
          <EmpresaCard key={empresa.id} empresa={empresa} />
        ))}
      </div>
    </div>
  );
}
