import profile from "./perfil-demo.json";
import type { Focus } from "./resumeStore";

const badge = "inline-flex rounded-full bg-[#eeedfc] px-2.5 py-1 text-xs font-bold text-[#3730a3]";

export default function ResumeCard({ focus }: { focus: Focus }) {
  const sections = {
    Experiencia: (
      <div className="rounded-lg bg-[#fff5c5] p-2.5">
        <p className="font-bold">{profile.puesto}</p>
        <p className="my-1 text-sm text-[#535373]">{profile.descripcion}</p>
        <span className={badge}>Relevante para la vacante</span>
      </div>
    ),
    Insignias: <div className="flex flex-wrap gap-2">{profile.insignias.map(item => <span key={item} className={badge}>{item}</span>)}</div>,
    Educación: <p className="text-sm text-[#535373]">{profile.educacion}</p>,
    Habilidades: <div className="flex flex-wrap gap-2">{profile.habilidades.map(item => <span key={item} className={badge}>{item}</span>)}</div>,
  };
  const order = focus === "habilidades"
    ? (["Habilidades", "Insignias", "Experiencia", "Educación"] as const)
    : (["Experiencia", "Insignias", "Educación", "Habilidades"] as const);

  return (
    <article aria-labelledby="candidate-name" className="min-w-0 rounded-[14px] border border-[#e2e1f1] bg-white p-5 min-[901px]:col-start-1 min-[901px]:row-start-1 min-[901px]:row-span-2 min-[901px]:p-6">
      <header className="mb-4 border-b border-[#e2e1f1] pb-4">
        <h2 id="candidate-name" className="text-[23px] leading-tight font-bold">{profile.nombre}</h2>
        <p className="mt-2 text-sm text-[#535373]">{profile.ciudad} · {profile.correo}</p>
      </header>
      {order.map(title => (
        <section key={title} className="mt-2">
          <h3 className="mb-2 text-base font-bold uppercase text-[#3930aa]">{title}</h3>
          {sections[title]}
        </section>
      ))}
    </article>
  );
}
