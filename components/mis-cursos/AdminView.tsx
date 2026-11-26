import type { AdminData, CourseStatus } from "./types";
import { AiBanner } from "./AiBanner";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_LABEL: Record<CourseStatus, string> = {
  publicado: "Publicado",
  en_revision: "En revisión",
  borrador: "Borrador",
};

const STATUS_CLASSES: Record<CourseStatus, string> = {
  publicado: "bg-[#EEF8F0] text-[#14532D]",
  en_revision: "bg-[#FFF3DC] text-[#5C3600]",
  borrador: "bg-[#E4E3F1] text-[#4A4A68]",
};

// ─── Componentes internos ─────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string;
  valueClass?: string;
}

function KpiCard({ label, value, valueClass = "text-[#3730A3]" }: KpiCardProps) {
  return (
    <div className="flex-1 min-w-[180px] bg-white border border-[#E4E3F1] rounded-xl px-5 py-4">
      <p className="text-[13px] text-[#4A4A68] mb-2">{label}</p>
      <p
        className={`text-[30px] font-bold ${valueClass}`}
        style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Vista principal ──────────────────────────────────────────────────────────
interface AdminViewProps {
  data: AdminData;
}

/**
 * Vista de administrador para "Cursos con IA".
 * Muestra: KPIs · tabla de cursos · panel de errores reportados · aviso IA.
 * Los botones (Exportar, Ver curso, Revisar, Regenerar con IA) son display
 * y se conectarán a la API cuando el backend esté listo.
 */
export function AdminView({ data }: AdminViewProps) {
  const { kpis, courses, errorReports, aiNotice } = data;

  return (
    <main className="flex-1 min-w-0 p-6 md:p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-[32px] font-bold text-[#12122B] leading-tight"
            style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
          >
            Cursos con IA
          </h1>
          <p className="text-[13px] text-[#4A4A68] mt-1">
            Minicursos generados y su desempeño
          </p>
        </div>

        {/* Botón exportar — secundario */}
        <button
          type="button"
          className="min-h-[44px] px-5 border-2 border-[#3730A3] text-[#3730A3] font-bold text-[13px] rounded-lg bg-white hover:bg-[#EEEDFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3]"
          /* TODO: onClick → GET /admin/cursos/exportar */
        >
          Exportar reporte
        </button>
      </div>

      {/* KPIs */}
      <div className="flex gap-4 flex-wrap">
        <KpiCard label="Cursos generados" value={kpis.generatedCourses.toLocaleString()} />
        <KpiCard
          label="Aprobación promedio"
          value={`${kpis.avgApprovalPercent} %`}
          valueClass="text-[#15803D]"
        />
        <KpiCard
          label="Errores reportados"
          value={String(kpis.reportedErrors)}
          valueClass="text-[#B45309]"
        />
        <KpiCard
          label="Carga de 1.ª lección"
          value={`${kpis.firstLessonLoadSeconds} s`}
        />
      </div>

      {/* Fila inferior: tabla + panel errores */}
      <div className="flex gap-6 items-start flex-wrap xl:flex-nowrap">

        {/* Tabla de cursos */}
        <section
          aria-label="Cursos por habilidad"
          className="flex-1 min-w-0 bg-white border border-[#E4E3F1] rounded-xl overflow-hidden"
        >
          {/* Encabezado de tabla */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E3F1]">
            <h2
              className="text-[18px] font-bold text-[#12122B]"
              style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
            >
              Cursos por habilidad
            </h2>
            <button
              type="button"
              className="min-h-[44px] px-4 border-2 border-[#3730A3] text-[#3730A3] font-bold text-[13px] rounded-lg bg-white hover:bg-[#EEEDFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3]"
              /* TODO: onClick → navegar a /admin/cursos */
            >
              Ver todos los cursos
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E4E3F1]">
                  {["Curso", "Inscritos", "Aprobación", "Reportes", "Estado", "Acción"].map(
                    (col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-5 py-3 text-[12px] font-bold text-[#4A4A68] uppercase tracking-wide whitespace-nowrap"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E3F1]">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-[#F7F6FC] transition-colors">
                    {/* Curso */}
                    <td className="px-5 py-4">
                      <span className="text-[14px] font-bold text-[#12122B] block">
                        {course.name}
                      </span>
                    </td>

                    {/* Inscritos */}
                    <td className="px-5 py-4 text-[14px] text-[#12122B]">
                      {course.enrolledCount.toLocaleString()}
                    </td>

                    {/* Aprobación */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-[78px] h-2 bg-[#E4E3F1] rounded-full overflow-hidden shrink-0">
                          <div
                            className="h-full bg-[#3730A3] rounded-full"
                            style={{ width: `${course.approvalPercent}%` }}
                          />
                        </div>
                        <span className="text-[14px] text-[#12122B] whitespace-nowrap">
                          {course.approvalPercent} %
                        </span>
                      </div>
                    </td>

                    {/* Reportes */}
                    <td className="px-5 py-4 text-[14px] text-[#12122B]">
                      {course.reportCount}
                    </td>

                    {/* Estado */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold ${
                          STATUS_CLASSES[course.status]
                        }`}
                      >
                        {STATUS_LABEL[course.status]}
                      </span>
                    </td>

                    {/* Acción */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="min-h-[44px] px-4 border-2 border-[#3730A3] text-[#3730A3] font-bold text-[13px] rounded-lg bg-white hover:bg-[#EEEDFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3]"
                        /* TODO: onClick → navegar a /admin/cursos/:id */
                      >
                        Ver curso
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Columna derecha: panel de errores y aviso de IA */}
        <div className="w-full xl:w-[360px] shrink-0 flex flex-col gap-4">
          {/* Panel de errores reportados */}
          <aside
            aria-label="Errores reportados"
            className="bg-white border border-[#E4E3F1] rounded-xl p-6 flex flex-col gap-4"
          >
            <h2
              className="text-[18px] font-bold text-[#12122B]"
              style={{ fontFamily: "var(--font-talented-grotesk, 'Space Grotesk'), sans-serif" }}
            >
              Errores reportados
            </h2>

            {/* Tarjetas de error */}
            {errorReports.map((report) => (
              <article
                key={report.id}
                className="border border-[#B45309] bg-[#FFF8EA] rounded-xl p-5 flex flex-col gap-3"
              >
                <div>
                  <h3 className="text-[16px] font-bold text-[#12122B] leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-[13px] text-[#4A4A68] mt-1">{report.description}</p>
                </div>

                {/* Acciones */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    className="min-h-[44px] px-4 border-2 border-[#3730A3] text-[#3730A3] font-bold text-[13px] rounded-lg bg-white hover:bg-[#EEEDFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3730A3]"
                    /* TODO: onClick → GET /admin/errores/:id */
                  >
                    Revisar
                  </button>
                  <button
                    type="button"
                    className="min-h-[44px] px-4 border-2 border-[#B45309] text-[#B45309] font-bold text-[13px] rounded-lg bg-white hover:bg-[#FFF3DC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309]"
                    /* TODO: onClick → POST /admin/cursos/:id/regenerar */
                  >
                    Regenerar con IA
                  </button>
                </div>
              </article>
            ))}
          </aside>

          {/* Aviso IA — afuera del div de errores reportados con salto de línea */}
          <AiBanner
            stacked
            message={aiNotice.message}
            reportLabel={aiNotice.reportLabel}
            onReport={
              /* TODO: conectar a POST /admin/reportar-error */
              undefined
            }
          />
        </div>
      </div>
    </main>
  );
}
