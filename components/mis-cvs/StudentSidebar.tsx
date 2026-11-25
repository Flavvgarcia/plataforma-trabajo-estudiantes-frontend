import Image from "next/image";
import Link from "next/link";
import logo from "./talented-logo.svg";

const menu = [
  ["Vacantes", "/vacantes", "M3 7h18v13H3z M8 7V4h8v3"],
  ["Mis cursos", "/mis-cursos", "M3 5h6q3 0 3 2q0-2 3-2h6v14h-6q-3 0-3 2q0-2-3-2H3z M12 7v14"],
  ["Mis insignias", "/mis-insignias", "M16 14l2 7-6-3-6 3 2-7 M18 9a6 6 0 1 1-12 0a6 6 0 1 1 12 0"],
  ["Mis CVs", "/mis-cvs", "M6 2h8l4 5v15H6z M14 2v6h4"],
  ["Empresas", "/empresas", "M5 3h14v18H5z M8 7h2m3 0h3m-8 4h2m3 0h3m-6 10v-6h4v6"],
  ["Autoconocimiento", "/autoconocimiento", "M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0 M15 8l-2 6-5 2 2-6z"],
  ["Mi perfil", "/mi-perfil", "M16 7a4 4 0 1 1-8 0a4 4 0 1 1 8 0 M3 21v-2a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v2"],
];

export default function StudentSidebar() {
  return (
    <aside className="hidden flex-col gap-6 border-r border-[#e2e1f1] bg-white px-3.5 py-6 min-[901px]:flex">
      <div className="flex items-center gap-2.5 pl-2 text-[22px] font-bold">
        <Image src={logo} alt="" width={36} height={36} /> Talented
      </div>
      <nav aria-label="Secciones de estudiante" className="grid gap-1">
        {menu.map(([nombre, ruta, icono]) => (
          <Link
            key={ruta}
            href={ruta}
            aria-current={ruta === "/mis-cvs" ? "page" : undefined}
            className="flex items-center gap-2.5 rounded-[10px] p-3 text-[15px] hover:bg-[#eeedfc] hover:text-[#3930aa] aria-[current=page]:bg-[#eeedfc] aria-[current=page]:font-bold aria-[current=page]:text-[#3930aa]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d={icono} /></svg>
            {nombre}
          </Link>
        ))}
      </nav>
      <footer className="mt-auto text-sm">
        <div className="flex items-center gap-2.5 rounded-[14px] border border-[#e2e1f1] p-3">
          <b className="rounded-full bg-[#eeedfc] p-[9px] text-[#3930aa]">MF</b>
          <div>
            <strong>María Fernanda</strong>
            <small className="block text-sm text-[#535373]">Estudiante</small>
          </div>
        </div>
        <Link href="/login" className="mx-3 mt-2.5 inline-block font-bold text-[#3930aa]">Ir al acceso</Link>
      </footer>
    </aside>
  );
}
