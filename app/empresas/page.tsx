import { empresas } from "./data/empresas";
import EmpresaCard from "./components/EmpresaCard";

export default function EmpresasPage() {
  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
      <h1 className="text-3xl font-bold text-[#12122B] [font-family:var(--font-talented-grotesk),Arial,sans-serif]">
        Empresas
      </h1>
      <p className="mt-2 text-[15px] text-[#4A4A68]">
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
